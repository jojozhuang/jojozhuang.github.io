---
layout: post
key: blog
title: "Building Course Player with Node.js and Socket.IO"
date: 2016-03-16
tags: [Node.js, Socket.IO, jQuery]
---

> Build realtime course player with Node.js and Socket.IO.

## 1. Realtime Course Player
In this tutorial, I will introduce how to use Node.js and Socket.IO to build a realtime course player. A course player consists of three components: video, screenshot and whiteboard.

* Video is captured by a camera during the lecturing time, and saved as mp4.
* Screenshot is captured from computer monitor through which teachers share their handouts/materials to the students. Screenshot are images which are compressed and saved to a single file.
* Whiteboard is captured from special pens and boards. Any operation on the board, such as writing, drawing or brushing is recorded and stored to a single file.

## 2. Node.js Project
### 2.1 Creating New Project
Create new Node.js app named `CoursePlayerSocketIO`.
```sh
$ mkdir CoursePlayerSocketIO
$ cd CoursePlayerSocketIO
$ npm init
```
### 2.2 Installing Packages
Install packages `express` and `socket.io` locally.
```sh
$ npm install express --save
$ npm install socket.io --save
```
### 2.3 Server
Create file '`server.js`'. Setup web server with `express` and serve our app at port `12103`.
```javascript
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
* Setup server at http://localhost:12103/.
* Setup timer to notify client with the server time.
* Setup connection for `Socket.IO`, monitoring `updatetime` event.
* Once receive the time from client, fetch course data for screenshot and whiteboard. Then, send data back to client via `playCourse`.

### 2.4 Page
Create file '`index.html`'. This is the default page for this app. We add socket.io script.
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
  <link href="/public/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
  <link href="/public/css/Site.css" rel="stylesheet" type="text/css" />
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
* Import `/socket.io/socket.io.js` and call `io.connect()` to create socket object.
* Monitor `message` event and get the time from server.
* Create `Video`, `Screenshot` and `Whiteboard` for course player with jQuery slider bar and canvas.
* Use jQuery slider bar to simulate progress bar of the video player.
* The unit value of slider bar is second. And the max value is 4 * 60 * 60 - 30 * 60 = 12600 seconds, since each course lasts 3 and half hours.
* Monitor `playCourse` event and get the data from server.
* Use `drawScreenshot(data)` and `drawWhiteboard(data)` to draw screenshot and whiteboard.

Create file '`client/player.js`'. This is the default page for this app. We add socket.io script.
```javascript
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
* We define two canvas controls for screenshot. We draw 64 images one by one on the working canvas. Then draw the entire canvas with this working one. Thus, to avoid flashing.


* We define two canvas controls for screenshot. We draw 64 images one by one on the working canvas. Then draw the entire canvas with this working one. Thus, to avoid flashing.


* Use `onChange` event to update the time when user is dragging the slider bar.
* Use `onMouseUp` event to update the time when user finishes dragging. Meanwhile, call parent's `this.props.onTimeChange(time, clear)` method to notify server to send data for drawing.
* Use `handlePlay` to handle the event when user click the `Play` button. When player is started, we setup a timer to increment the time by second and notify server to send data for drawing.

## 3. APIs
Create file '`api/fileapi.js`'.
```javascript
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
* Screenshot is stored in two files, one contains index another contains image data.
* For Screenshot, first, decompress the index file and get the index list. Then, read image data by time(second).
* Whiteboard has two parts, one is the static lines, another is dynamic drawing events. Technically, it has same structure as Screenshot. Both line and event contains two files, index file and data file.
* For lines of Whiteboard, first, decompress the index file and get the index list. Then, read image data by time(second).
* For events of Whiteboard, first, decompress the index file and get the index list. Then, read image data by time(second).

Create file '`api/courseapi.js`'.
```javascript
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
* Define constants for data files.
* Use `getScreenshotData` to get the Screenshot data in second.
* Use `getWhiteBoardData` to get the Whiteboard data in second.
* Use local variables to `cache` index files to improve performance.

### 3.4 Others
1) server.js is running at server side. All components are running at client side.
2) Decompress file.
Asynchronous
```javascript
let inflate = zlib.createInflateSync();
let input = fs.createReadStream(originalFile);
let output = fs.createWriteStream(unzippedFile);

//output.on('finish', function(){
  console.log("finish");
};

input.pipe(inflate).pipe(output);*/
```
Synchronous.
```javascipt
let buffer = fs.readFileSync(originalFile);
let inflate = zlib.inflateSync(buffer);
fs.writeFileSync(unzippedFile, inflate);
```

3) Read buffer.
```javascript
let buffer = new Buffer([3,0,51,0,0,0,0,212,0,0,0])
var pos = 0;
console.log(buffer.readUInt16LE(0));
pos = pos+2;
console.log(buffer.readInt8(2));
pos= pos+1;
console.log(buffer.readInt32LE(3));
pos = pos+4;
console.log(buffer.readUInt32LE(7));*/
```

### 3.5 Final Project Structure
![MIME Type](/public/pics/2016-03-16/projectstructure.png){:width="350px"}

## 4. Running and Testing
Start the RESTful service first, and start this React app, serve it in web server.
```sh
$ npm start
```
Open web browser, access 'http://localhost:12103/'.
![MIME Type](/public/pics/2016-03-16/homepage.png)
Click the `Play` button, course will be played. Both screenshot and Whiteboard will be synced with current time.
![MIME Type](/public/pics/2016-03-16/playing.png)
You can also drag the slider bar to forward or backward.
![MIME Type](/public/pics/2016-03-16/playing2.png)

## 5. Source Files
* [Source files of Course Player(Socket.IO) on Github](https://github.com/jojozhuang/Portfolio/tree/master/CoursePlayerSocketIO)

## 6. References
* [jQuery Slider](https://jqueryui.com/slider/)
* [Sample code for socket.emit and socket.on](https://github.com/socketio/socket.io/issues/2800)
