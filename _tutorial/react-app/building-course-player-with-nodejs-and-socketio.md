---
layout: tutorial
key: tutorial
title: "Building Course Player with Node.js and Socket.IO"
index: 8475
subcategory: react-app
date: 2016-03-16
tags: [Node.js, Socket.IO, jQuery]
---

>  Build a course player with Socket.IO.

Build a realtime web application to play course recordings with [Socket.IO](https://socket.io/), HTML5 Canvas and [jQuery](https://jquery.com/) based on [Node.js](https://nodejs.org/).

## 1. Course Player
A course player consists of three components: video, screenshot and whiteboard.
* Video is captured by a camera during the lecturing time. It is in mp4 format.
* Screenshot is captured from computer monitor shared by teachers. It contains handouts and materials for the course. Screenshot are actually images.
* Whiteboard is captured from special pens and brushes. Any operation on the board, such as writing, drawing or brushing is recorded.

Check the posting [Introduction of Course Player]({% link _tutorial/react-app/introduction-of-course-player.md %}) to learn the details.

## 2. Course Player Project
### 2.1 Creating New Project
Create new Node.js app named `course-player-socketio`.
```raw
$ mkdir course-player-socketio
$ cd course-player-socketio
$ npm init
```
### 2.2 Installing Packages
Install `express` and `socket.io` locally.
```raw
$ npm install express --save
$ npm install socket.io --save
```
### 2.3 Data Model
Create file '`model/index.js`'.
```js
function Index(timestamp, grid, offset, length) {
  this.timestamp = timestamp;
  this.grid = grid;
  this.offset = offset;
  this.length = length;
  this.row = function() {
    return this.grid >> 4;
  }
  this.col = function() {
    return this.grid & 0xf;
  }
}

module.exports = Index;
```
Create file '`model/screenimage.js`'.
```js
function ScreenImage(row, col, imagestream) {
  this.row = row;
  this.col = col;
  this.imagestream = imagestream;
}

module.exports = ScreenImage;
```
Create file '`model/wbdata.js`'.
```js
function WBData(second, wblines, wbevents) {
  this.second = second;
  this.wblines = wblines;
  this.wbevents = wbevents;
}

module.exports = WBData;
```
Create file '`model/wbevent.js`'.
```js
function WBEvent(timestamp, reserved, x, y) {
  this.timestamp = timestamp;
  this.reserved = reserved;
  this.x = x;
  this.y = y;
}

module.exports = WBEvent;
```
Create file '`model/wbline.js`'.
```js
function WBLine(x0, y0, x1, y1, color, reserved) {
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
  this.color = color;
  this.reserved = reserved;
}

module.exports = WBLine;
```
### 2.4 File Api(Server side)
Create file '`api/fileapi.js`'.
```js
var fs = require('fs');
var zlib = require('zlib');
var Index = require('../model/index');
var ScreenImage = require('../model/screenimage');
var WBLine = require('../model/wbline');
var WBEvent = require('../model/wbevent');
var MAX_ROW_NO = 8;
var MAX_COL_NO = 8;

exports.getIndexFile = function(originalFile, unzippedFile) {
  // unzip the index file if it doesn't exist
  if (!fs.existsSync(unzippedFile)) {
    unzipIndexFile(originalFile, unzippedFile);
  }
  // read the unzipped file to buffer
  return fs.readFileSync(unzippedFile);
};

exports.unzipIndexFile = function(originalFile, unzippedFile) {
  var buffer = fs.readFileSync(originalFile);
  var inflate = zlib.inflateSync(buffer);
  fs.writeFileSync(unzippedFile, inflate);
};

exports.getIndexArray = function(buffer){
  var arr = [];
  var ix = 0;
  var pos = 0;
  while (pos < buffer.length) {
    arr[ix] = new Index(buffer.readUInt16LE(pos), buffer.readInt8(pos+2), buffer.readInt32LE(pos+3), buffer.readUInt32LE(pos+7));
    ix++;
    pos = pos + 11;
  }

  for (var j = 0; j < arr.length; j++) {
    if (arr[j].offset == -1 && j > 0) {
    arr[j].offset = arr[j - 1].offset;
    arr[j].length = arr[j - 1].length;
    }
  }
  // sort by timestamp and grid
  arr.sort((a, b) => {
    var compare = a.timestamp - b.timestamp;
    if (compare == 0) {
    compare = a.grid - b.grid;
    }
    return compare;
  });

  return arr;
};

exports.getSSIndex = function(hm, indexarr, second) {
  var foundset = [];
  for(var i = 0; i < MAX_ROW_NO * MAX_COL_NO; i++) {
    foundset[i] = false;
  }
  var res = [];
  var index = 0;
  var firstItem = 0;
  var firstSecond = second;
  for (; firstSecond >= 0; firstSecond--) {
    if(hm[firstSecond]) {
      firstItem = hm[firstSecond];
      break;
    }
  }

  while (firstItem < indexarr.length && indexarr[firstItem].timestamp == firstSecond) {
    firstItem++;
  }

  if (firstItem > 0) {
    for (var i = firstItem - 1; i >= 0; i--) {
      var row = indexarr[i].grid >> 4;
      var col = indexarr[i].grid & 0xf;
      var value = row * MAX_ROW_NO + col;

      if (!foundset[value]) {
        foundset[value] = true;
        res[index]=indexarr[i];
        index++;
      }
      if (res.length == MAX_ROW_NO * MAX_COL_NO) {
        break;
      }
    }
  }

  return res;
};

exports.getSSData = function(imagedatafile, imageindex) {
  var res = [];
  var index = 0;
  var fd = fs.openSync(imagedatafile, 'r');
  var i = 0;
  for (i = 0; i < imageindex.length; i++) {
    var imageobj = imageindex[i];
    var row = imageobj.grid >> 4;
    var col = imageobj.grid & 0xf;

    var offset = imageindex[i].offset;
    var length = imageindex[i].length;
    var buffer = new Buffer(length);
    fs.readSync(fd, buffer, 0, length, offset);
    // image in base64 format
    var image = "data:image/png;base64," + buffer.toString('base64');
    res[index]= new ScreenImage(row, col, image);
    index++;
  }

  return JSON.stringify(res);
};

exports.getWBIndex = function(indexarr) {
  var res = [];
  for (var i = 0; i < indexarr.length; i++) {
    if(!res[indexarr[i].timestamp]) {
      res[indexarr[i].timestamp] = i;
    }
  }
  return res;
};

exports.getWBImageData = function(wbImageDataFile, wbImageIndex, indexList, second) {
  var res = [];
  var indeximage;
  var minutes = Math.floor(second / 60);

  if (wbImageIndex[minutes]) {
    indeximage = indexList[wbImageIndex[minutes]];
  }

  if (indeximage && indeximage.length>0) {
    var fd = fs.openSync(wbImageDataFile, 'r');
    var length = indeximage.length;
    var buffer = new Buffer(length);
    fs.readSync(fd, buffer, 0, length, indeximage.offset);

    var ix = 0;
    var pos = 0;
    while (pos < buffer.length) {
      res[ix] = new WBLine(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readUInt16LE(pos+4), buffer.readUInt16LE(pos+6),buffer.readInt16LE(pos+8), buffer.readUInt16LE(pos+10));
      ix++;
      pos = pos + 12;
    }
  }

  return res;
};

exports.getWBSequenceData = function(wbSequenceDataFile, wbSequenceIndex, indexList, second) {
  var res = [];
  var indexsequence;
  var minutes = Math.floor(second / 60);

  if (wbSequenceIndex[minutes]) {
    indexsequence = indexList[wbSequenceIndex[minutes]];
  }

  if (indexsequence && indexsequence.length>0) {
    var fd = fs.openSync(wbSequenceDataFile, 'r');
    var length = indexsequence.length;
    var buffer = new Buffer(length);
    fs.readSync(fd, buffer, 0, length, indexsequence.offset);

    var ix = 0;
    var pos = 0;
    while (pos < buffer.length) {
      res[ix] = new WBEvent(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readInt16LE(pos+4), buffer.readInt16LE(pos+6));
      ix++;
      pos = pos + 8;
    }
  }

  return res;
};
```
The following points need to be noted about the above code.
* Use native files system module `fs` provided by Node.js to read data from local files. Notice, we use `zlib` to decompress the index files. And use the index to get offset and length. Then, use them to read small parts of the data from data file instead of reading the whole file.
* For Screenshot, read the decompressed index file `ScreenShot/High/unzippedindex.pak` to get the index list. Then, get offset and length of index to read image data by time(in second) from `ScreenShot/High/1.pak`.
* Whiteboard has two parts, one is the static lines `VectorImage`, another is dynamic drawing events `VectorSequence`. To get data for Whiteboard's lines, first, read the decompressed index file `WB/1/VectorImage/unzippedindex.pak` to get the index list. Then, get offset and length of index to read line data by time(in second) from `WB/1/VectorImage/1.pak`. The same operations to get Whiteboard's events.

### 2.5 Course Api(Server side)
Create file '`api/courseapi.js`'.
```js
var path = require("path");
var WBData = require('../model/wbdata');
var fileApi = require('./fileapi');

const ssIndexFile = path.join(__dirname, '../204304/ScreenShot/High/package.pak');
const unzippedSsIndexFile = path.join(__dirname, '../204304/ScreenShot/High/unzippedindex.pak');
const ssScreenshotDataFile = path.join(__dirname, '../204304/ScreenShot/High/1.pak');
const wbImageIndexFile = path.join(__dirname, '../204304/WB/1/VectorImage/package.pak');
const unzippedWbImageIndexFile = path.join(__dirname, '../204304/WB/1/VectorImage/unzippedindex.pak');
const wbImageDataFile = path.join(__dirname, '../204304/WB/1/VectorImage/1.pak');
const wbSequenceIndexFile = path.join(__dirname, '../204304/WB/1/VectorSequence/package.pak');
const unzippedWbSequenceIndexFile = path.join(__dirname, '../204304/WB/1/VectorSequence/unzippedindex.pak');
const wbSequenceDataFile = path.join(__dirname, '../204304/WB/1/VectorSequence/1.pak');

// Screenshot Cache
var ssIndexArray = null;
var ssHashmap = [];
// Whiteboard Cache
var wbImageIndexArray = null;
var wbImageIndex = null;
var wbSequenceIndexArray = null;
var wbSequenceIndex = null;

exports.getScreenshotData = function(second) {
  if (ssIndexArray===null) {
    var buffer = fileApi.getIndexFile(ssIndexFile, unzippedSsIndexFile);
    ssIndexArray = fileApi.getIndexArray(buffer);
    ssHashmap = [];
    for (var i = 0; i < ssIndexArray.length; i++)
    {
      if(!ssHashmap[ssIndexArray[i].timestamp]) {
        ssHashmap[ssIndexArray[i].timestamp] = i;
      }
    }
  }

  var ssIndex = fileApi.getSSIndex(ssHashmap, ssIndexArray, second);
  return fileApi.getSSData(ssScreenshotDataFile, ssIndex);
};

exports.getWhiteBoardData = function(second) {
  // get lines
  var lines = this.getWBImageData(second);
  // get events
  var events = this.getWBSequenceData(second);
  // combine them to whiteboard data
  var res = new WBData(second, lines, events);

  return JSON.stringify(res);
};

exports.getWBImageData = function(second) {
  if (wbImageIndex===null) {
    var buffer = fileApi.getIndexFile(wbImageIndexFile, unzippedWbImageIndexFile);
    wbImageIndexArray = fileApi.getIndexArray(buffer);
    wbImageIndex = fileApi.getWBIndex(wbImageIndexArray);
  }
  return fileApi.getWBImageData(wbImageDataFile, wbImageIndex, wbImageIndexArray, second);
};

exports.getWBSequenceData = function(second) {
  if (wbSequenceIndex===null) {
    var buffer = fileApi.getIndexFile(wbSequenceIndexFile, unzippedWbSequenceIndexFile);
    wbSequenceIndexArray = fileApi.getIndexArray(buffer);
    wbSequenceIndex = fileApi.getWBIndex(wbSequenceIndexArray);
  }
  return fileApi.getWBSequenceData(wbSequenceDataFile, wbSequenceIndex, wbSequenceIndexArray, second);  
};
```
The following points need to be noted about the above code.
* Define constants for paths of data files.
* Use `getScreenshotData()` to get the Screenshot data by second.
* Use `getWhiteBoardData()` to get the Whiteboard data by second.
* Use local variables to `cache` index files to improve performance.

### 2.6 Server(Server side)
Create file '`server.js`'.
```js
var http = require('http');
var path = require('path');
var express = require('express');
var courseApi = require('./apis/courseapi');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  socket.on('updatetime', function(data) {
    console.log('server.updatetime:' + data.second);
    // Get data for Screenshot
    var ssdata = courseApi.getScreenshotData(data.second);
    // Get data for Whiteboard
    var wbdata = courseApi.getWhiteBoardData(data.second);
    // Notify client through emit with data
    socket.emit('playCourse', {ssdata: ssdata, wbdata:wbdata});
  });
});

var staticPath = __dirname;
app.use(express.static(staticPath));

server.listen(12103, function() {
  console.log('Server is listening at http://localhost:12103');
});

function tick () {
  var dt = new Date();
  dt = dt.toUTCString();
  io.sockets.send(dt);
}
setInterval(tick, 1000);
```
The following points need to be noted about the above code.
* Setup web server with `express` at port `12103`.
* Create a timer to repeatedly notify the client of the server time.
* Open socket connection with `Socket.IO`, monitoring `updatetime` event.
* Once receive the time(data.second) from client, fetch course data for screenshot and whiteboard. Then, emit `playCourse` event to send data back to client.

### 2.7 Home Page(Client Side)
Create file '`index.html`'. It is the default page for this app.
```html
<!DOCTYPE html>
<html>
<head>
  <script type="text/javascript" src="/socket.io/socket.io.js"></script>
  <script type="text/javascript" src="client/player.js"></script>
  <script type="text/javascript">
    var socket = io.connect();
    // Get server time
    socket.on('message', function (time) {
      document.getElementById('time').innerHTML = time;
    });
    // Get course data by second from server
    socket.on('playCourse', function (data) {
      drawScreenshot(data.ssdata, $('#workingss'), $('#playerss'));
      drawWhiteboard(data.wbdata, $('#workingwb'), $('#playerwb'));
    });
  </script>
  <link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
  <link href="/assets/css/Site.css" rel="stylesheet" type="text/css" />
  <script src="/public/scripts/jquery-1.10.2.min.js"></script>
  <script src="/public/scripts/bootstrap.min.js"></script>
  <!--jquery slider bar-->
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
</head>
<body>
    <div>
        <h1>Course Player</h1>
        <p>Built with <a href='https://socket.io/'>Socket.IO</a>, <a href='https://nodejs.org'>Node.js</a> and <a href='https://jquery.com/'>jQuery</a></p>
        <p>Current server time is: <span id="time"></span></p>
    </div>
    <div class="playercontainer">
        <table style="width:100%;" align="center">
            <tr>
                <td align="left"><label for="currenttime">Current Time:</label><input type="text" id="currenttime" readonly style="border:0; color:#f6931f; font-weight:bold;"></td>
                <td colspan="2" align="right"><input type="button" id="btnplay" value="Play"/></td>
                <td align="right"><label for="total">Total Time:</label><input type="text" id="total" readonly style="border:0; color:#f6931f; font-weight:bold;"></td>
            </tr>
            <tr><td colspan="4"><div id="processbar" style="margin-top:10px"></div></td></tr>
            <tr><td colspan="2" align="left"><canvas id="playerss" width="500" height="300" style="margin-top:10px"></canvas></td><td colspan="2" align="right"><canvas id="playerwb" width="500" height="300" style="margin-top:10px"></canvas></td></tr>
        </table>
        <canvas id="workingss" style="display:none" width="500" height="300"></canvas>
        <canvas id="workingwb" style="display:none" width="500" height="300"></canvas>
    </div>
  <div>
    <footer className="container-fluid text-center">
      <p>&copy; 2016 jojozhuang.github.io, All rights reserved.</p>
    </footer>
  </div>
  <!--Add script to update the page and send messages.-->
  <script type="text/javascript">
    $(function () {
        // use jquery slider control to create process bar
        $("#processbar").slider({
            range: "max",
            min: 0,
            max: 4 * 60 * 60 - 30 * 60,
            value: 0,
            slide: function (event, ui) {
                $("#currenttime").val(getReadableTimeText(ui.value));
            },
            stop: function (event, ui) {
                $("#currenttime").val(getReadableTimeText(ui.value));
                clearScreenshot($('#workingss'), $('#playerss'));
                clearWhiteboard($('#workingwb'), $('#playerwb'));
            }
        });
        $("#currenttime").val(getReadableTimeText($("#processbar").slider("value")));
        $("#total").val(getReadableTimeText(4 * 60 * 60 - 30 * 60));

        // play course and emit time to server
        var playstate = "stopped";
        var interval = null;
        $("#btnplay").click(function () {
            playstate = playCourse(playstate, $("#btnplay"), $("#processbar"), $("#currenttime"), $('#workingss'), $('#playerss'), $('#workingwb'), $('#playerwb'));
        });
    });
  </script>
</body>
</html>
```
The following points need to be noted about the above code.
* Import `'/socket.io/socket.io.js'` and call `io.connect()` to create socket connection.
* Monitor `message` event and get the server time.
* Create `Video`, `Screenshot` and `Whiteboard` with canvas and jQuery slider bar. The slider bar is to simulate progress bar of the video player. We define two canvas controls `playerss` and `workingss` for screenshot. `workingss` is invisible. We draw images first on the working canvas. Then, draw the entire image on the `playerss` canvas for only one time to avoid flashing. Same for whiteboard.
* The max value of slider bar is 4 * 60 * 60 - 30 * 60 = 12600 seconds, since each course lasts 3 and half hours.
* Monitor `playCourse` event and get the data from server.
* Use `drawScreenshot(data)` and `drawWhiteboard(data)` to draw screenshot and whiteboard.
* For the jQuery slider bar, use `slide` event to update the time when user is dragging the slider bar. And use `stop` event to update the time when user finishes dragging. Meanwhile, call `clearScreenshot()` and `clearWhiteboard()` methods to clear both screenshot and whiteboard.

### 2.8 Player(Client Side)
Create file '`client/player.js`'. All the functions of course player are defined here.
```js
function playCourse(playstate, btnplay, processbar, currenttime, workingss, ss, workingwb, wb) {
    if (playstate == 'stopped') {
        interval = setInterval(function () {
            processbar.slider("value", processbar.slider("value") + 1);
            currenttime.val(getReadableTimeText(processbar.slider("value")));
            socket.emit('updatetime', {
              second: processbar.slider("value")
            });
        }, 1000);
        btnplay.prop('value', 'Stop');
        playstate = "playing";
    } else if (playstate == 'playing') {
        processbar.slider("value", 0);
        currenttime.val(getReadableTimeText(processbar.slider("value")));
        playstate = "stopped";
        // stop the interval
        clearInterval(interval);
        // clear screenshot and whiteboard
        clearScreenshot(workingss, ss);
        clearWhiteboard(workingwb, wb);
        btnplay.prop('value', 'Play');
    }
    return playstate;
}

function drawScreenshot(ssdata, workingss, ss) {
    var left, top, width, height = 0;
    var imageList = JSON.parse(ssdata);
    console.log(imageList.length);
    for (var i = 0; i < imageList.length; i++) {
        left = workingss.width() / 8 * imageList[i].col;
        top = workingss.height() / 8 * imageList[i].row;
        width = workingss.width() / 8;
        height = workingss.height() / 8;
        drawImageOnCanvas(workingss, left, top, width, height, imageList[i].imagestream);
    }
    // draw entire working canvas to screenshot canvas
    var ctxss = ss[0].getContext('2d')
    ctxss.drawImage(workingss[0], 0, 0);
}

function drawImageOnCanvas(workingss, left, top, width, height, image) {
    var ctx = workingss[0].getContext("2d");
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, left, top, width, height);
    }
    img.src = image;
}

function drawWhiteboard(wbdata, workingwb, wb) {
    var lastPoint;
    var currentColor = -10;
    var currentWidth = 1;
    var ctxwb = workingwb[0].getContext('2d');
    var xRate = workingwb.width() / 9600;
    var yRate = workingwb.height() / 4800;
    var wbobj = JSON.parse(wbdata);
    if (wbobj.wblines) {
      for (var i = 0; i < wbobj.wblines.length; i++) {
        var line = wbobj.wblines[i];
        drawLine(ctxwb, getColor(line.color), getWidth(line.color), line.x0, line.y0,line.x1, line.y1, xRate, yRate);
      }
      var mywb = wb[0].getContext('2d');
      mywb.drawImage(workingwb[0], 0, 0);
    }
    if (wbobj.wbevents) {
      var endMilliseconds = wbobj.second * 1000 % 60000;
      for (var i = 0; i < endMilliseconds; i++) {
        for (var j = 0; j < wbobj.wbevents.length; j++) {
          var event = wbobj.wbevents[j];
          if (event&&event.timestamp == i) {
            if (event.x >=0) {
              if (!lastPoint) {
                lastPoint = event;
              } else {
                drawLine(ctxwb, getColor(currentColor), currentWidth, lastPoint.x, lastPoint.y,event.x, event.y, xRate, yRate);
                lastPoint = event;
              }
            } else {
              switch (event.x) {
                 case -100: //Pen Up
                   currentColor = -8;
                   lastPoint = null;
                   break;
                 case -200: //Clear event
                    clearWhiteboard();
                    lastPoint = null;
                    break;
                 default:
                    currentColor = event.x;
                    currentWidth = getWidth(currentColor);
                    break;
               }
               lastPoint = null;
            }
          }
        }
      }
      var mywb = wb[0].getContext('2d');
      mywb.drawImage(workingwb[0], 0, 0);
    }
}

function drawLine(ctxwb, color, width, x0, y0, x1, y1, xRate, yRate) {
    ctxwb.fillStyle = "solid";
    ctxwb.beginPath();
    ctxwb.strokeStyle = color;
    ctxwb.lineWidth = width;
    ctxwb.moveTo(x0 * xRate, y0 * yRate);
    ctxwb.lineTo(x1 * xRate, y1 * yRate);
    ctxwb.closePath();
    ctxwb.stroke();
}

function getColor(color) {
    switch (color) {
        case -1:
            return '#FF0000';
        case -2:
            return '#0000FF';
        case -3:
            return '#00FF00';
        case -8:
            return '#000000';
        case -9:
            return '#FFFFFF';
        case -10:
            return '#FFFFFF';
        default:
            return '#FFFFFF';
    }
}

function getWidth(color) {
    switch (color) {
        case -1:
            return 1;
        case -2:
            return 1;
        case -3:
            return 1;
        case -8:
            return 1;
        case -9:
            return 8 * 10 / 12;
        case -10:
            return 39 * 10 / 12;
        default:
            return 1;
    }
}

function clearScreenshot(workingss, ss) {
    // reset screen
    var ctxworkingss = workingss[0].getContext('2d');
    ctxworkingss.clearRect(0, 0, workingss.width(), workingss.height());
    var ctxss = ss[0].getContext('2d');
    ctxss.clearRect(0, 0, ss.width(), ss.height());
}

function clearWhiteboard(workingwb, wb) {
    // reset whiteboard
    var ctxworkingwb = workingwb[0].getContext('2d');
    ctxworkingwb.clearRect(0, 0, workingwb.width(), workingwb.height());
    var ctxwb = wb[0].getContext('2d');
    ctxwb.clearRect(0, 0, wb.width(), wb.height());
}

function getReadableTimeText(totalseconds) {
    var hours, minutes, seconds = 0;
    seconds = totalseconds % 60;
    hours = Math.floor(totalseconds / (60 * 60));
    minutes = Math.floor((totalseconds - hours * 60 * 60) / 60);

    var outh, outm, outs = "";
    outh = hours < 10 ? "0" + hours : hours;
    outm = minutes < 10 ? "0" + minutes : minutes;
    outs = seconds < 10 ? "0" + seconds : seconds;

    return outh + ":" + outm + ":" + outs;
}
```
The following points need to be noted about the above code.
* Use `playCourse()` to start or stop the player. When player is started, we setup a timer to increment the time by second and emit `updatetime` event to notify server.
* Use `drawScreenshot(ssdata, workingss, ss)` to draw images on screenshot canvas. Notice, for each screenshot, there is a maximum number of 64 images for each-time drawing. There will be fewer images if some of them are not changed. We draw the images one by one on the hidden working canvas. Then, draw the screenshot canvas with the entire working canvas. Thus, we can prevent canvas from flashing during drawing.
* Use `drawWhiteboard(wbdata, workingwb, wb)` to draw lines and events on whiteboard canvas with the given color, width, and position. Notice, we draw them first on the working canvas. Then, draw the whiteboard canvas with the entire working canvas. Thus, we can prevent canvas from flashing during drawing.

### 2.9 Others
1) Decompress file.  
The data files for screenshot and whiteboard are compressed. We use `zlib` to decompress them. Generally, there are two encoding formats for compression, Gzip and Inflate. Here, we use the `Inflate` method of zlib. In addition, there are two approaches to decompress files, asynchronous and synchronous, see the below sample codes. For this course player, we use the synchronous approach.  
Asynchronous approach.
```js
var inflate = zlib.createInflateSync();
var input = fs.createReadStream(originalFile);
var output = fs.createWriteStream(unzippedFile);

/*output.on('finish', function(){
  console.log("finish");
};*/

input.pipe(inflate).pipe(output);
```
Synchronous approach.
```js
var buffer = fs.readFileSync(originalFile);
var inflate = zlib.inflateSync(buffer);
fs.writeFileSync(unzippedFile, inflate);
```
2) Read buffer.
```js
let buffer = new Buffer([3,0,51,2,0,0,0,212,0,0,0])
var pos = 0;
console.log(buffer.readUInt16LE(0)); // print 3
pos = pos+2;
console.log(buffer.readInt8(2)); // print 51
pos= pos+1;
console.log(buffer.readInt32LE(3)); //print 2
pos = pos+4;
console.log(buffer.readUInt32LE(7)); // print 212
```
3) Image in Base64 format.  
Append `data:image/png;base64` to image data and set it to src of html image control to diaplay it.

### 2.10 Final Project Structure
![image](/assets/images/frontend/8475/projectstructure.png){:width="350px"}
Notice, folder `204304` contains the data files for screenshot and whiteboard.

## 3. Running and Testing
Start the app.
```raw
$ npm start
```
View the course player at http://localhost:12103/ in chrome. On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The left one is for screenshot and the right one is for whiteboard.
![image](/assets/images/frontend/8475/homepage.png)
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/assets/images/frontend/8475/play.png)
You can drag the slider bar to move forward or backward.
![image](/assets/images/frontend/8475/drag.png)

## 4. Conclusion
### 4.1 Easy to Implement  
If you are familiar with Node.js and javascript, it is not too difficult to develop such real time online application.  
### 4.2 Low Bandwidth Consumption  
Communication occurs only when necessary. Unlike traditional web application, WebSocket makes the web application react at real time. This improve the user experience at client side and system performance at server side.  
### 4.3 Cross-platform  
This player is web based, the only required application on client’s machine is a web browser(eg. Google Chrome). Besides, this course player is based on HTML5, so it can be accessed in different web browsers and on different platforms. No need to install extra plugin in web browser, such as flash player or Silverlight.  

## 5. Source Files
* [Source files of Course Player(Socket.IO) on Github](https://github.com/jojozhuang/course-player-socketio)

## 6. References
* [Get Started: Chat application](https://socket.io/get-started/chat/)
* [jQuery Slider](https://jqueryui.com/slider/)
* [Sample code for socket.emit and socket.on](https://github.com/socketio/socket.io/issues/2800)
