---
layout: tutorial
key: tutorial
title: "Building Course Player with React and Socket.IO"
index: 8478
subcategory: react-app
date: 2017-08-25
tags: [React, Socket.IO]
---

> Build a realtime course player with React and Socket.IO.

## 1.Course Player
In the posting [Building Course Player with Node.js and Socket.IO]({% link _tutorial/react-app/building-course-player-with-nodejs-and-socketio.md %}), I introduced how to use Socket.IO, HTML5 canvas and jQuery to build an online course player. In this tutorial, we will learn how enhance it with React. We will divide the UI pages and functions to smaller React components.

## 2. React Project
### 2.1 Creating New Project
Create new Node.js app named `course-player-react`.
```raw
$ mkdir course-player-react
$ cd course-player-react
$ npm init
```

### 2.2 Installing Packages
Install 'npm-run-all' globally.
```raw
$ npm install npm-run-all -g
```
And install following packages locally.
```raw
$ npm install socket.io --save
$ npm install socket.io-client --save
$ npm install styled-components --save
```
Open `package.json`, update it as follows.
```json
{
  "name": "courseplayer",
  "version": "1.0.0",
  "description": "Course Player built with Socket.IO",
  "main": "index.js",
  "scripts": {
    "start": "npm-run-all --parallel open:src lint:watch",
    "open:src": "babel-node tools/server.js",
    "lint": "node_modules/.bin/esw webpack.config.* src tools",
    "lint:watch": "npm run lint -- --watch",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "react"
  ],
  "author": "johnny",
  "license": "ISC",
  "dependencies": {
    "babel-polyfill": "^6.26.0",
    "express": "^4.16.2",
    "react": "^16.2.0",
    "react-bootstrap": "^0.31.5",
    "react-dom": "^16.2.0",
    "socket.io": "^2.0.4",
    "socket.io-client": "^2.0.4",
    "styled-components": "^2.4.0"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-react-hmre": "^1.1.1",
    "eslint": "^4.13.1",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-react": "^7.5.1",
    "eslint-watch": "^3.1.3",
    "eventsource-polyfill": "^0.9.6",
    "open": "0.0.5",
    "serve-favicon": "^2.4.5",
    "webpack": "^3.10.0",
    "webpack-dev-middleware": "^2.0.1",
    "webpack-hot-middleware": "^2.21.0"
  }
}
```
Then install packages defined in 'package.json' with the following command.
```raw
$ npm install
```
### 2.3 ES2015
Create file named `.babelrc` in project root folder to tell our app to use React and ES2015.
```json
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
      "presets": ["react-hmre"]
    },
    "production": {
      "presets": ["react", "es2015"]
    }
  }
}
```
Thus, we can use ES6 Syntax. Previously, we use CommonJS syntax to include packages.
```javascript
var Alert = require('react-bootstrap/lib/Alert');
// or
var Alert = require('react-bootstrap').Alert;
```
ES6 modules aren't supported natively yet, but now you can use the syntax with the help of a transpiler like Babel.
```javascript
import Button from 'react-bootstrap/lib/Button';
// or
import { Button } from 'react-bootstrap';
```
### 2.4 ESLint
[ESLint](https://eslint.org/) is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Create file named `.eslintrc` in project root folder to setup linting rules.
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true,
    "mocha": true
  },
  "rules": {
    "quotes": 0,
    "no-console": 1,
    "no-debugger": 1,
    "no-var": 1,
    "semi": [1, "always"],
    "no-trailing-spaces": 0,
    "eol-last": 0,
    "no-unused-vars": 0,
    "no-underscore-dangle": 0,
    "no-alert": 0,
    "no-lone-blocks": 0,
    "jsx-quotes": 1,
    "react/display-name": [ 1, {"ignoreTranspilerName": false }],
    "react/forbid-prop-types": [1, {"forbid": ["any"]}],
    "react/jsx-boolean-value": 1,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": 0,
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-bind": 1,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 0,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/require-extension": "off",
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "react/jsx-wrap-multilines": 1
  }
}
```
### 2.5 Webpack
[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset. Create file named `webpack.config.dev.js` with following content.
```javascript
import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'API_HOST': JSON.stringify('http://localhost:5000')
      }
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
```

## 3. Building Course Player
### 3.1 Data Model
Create file '`src/model/Index.js`'.
```js
class Index {
  constructor (timestamp, grid, offset, length) {
    this.timestamp = timestamp;
    this.grid = grid;
    this.offset = offset;
    this.length = length;  
  }
  row() {
    return this.grid >> 4;
  }
  col() {
    return this.grid & 0xf;
  }
}

export default Index;
```
Create file '`src/model/ScreenImage.js`'.
```js
class ScreenImage {
  constructor (row, col, image) {
    this.row = row;
    this.col = col;
    this.image = image;  
  }
}

export default ScreenImage;
```
Create file '`src/model/WBData.js`'.
```js
class WBData {
  constructor (second, wblines, wbevents) {
    this.second = second;
    this.wblines = wblines;
    this.wbevents = wbevents;
  }
}

export default WBData;
```
Create file '`src/model/WBEvent.js`'.
```js
class WBEvent {
  constructor (x, y, timestamp, reserved) {
    this.x = x;
    this.y = y;
    this.timestamp = timestamp;
    this.reserved = reserved;
  }
}

export default WBEvent;
```
Create file '`src/model/WBLine.js`'.
```js
class WBLine {
  constructor (x0, y0, x1, y1, color, reserved) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.color = color;
    this.reserved = reserved;
  }
}

export default WBLine;
```
### 3.2 File Api(Server Side)
Create file '`src/api/FileApi.js`'.
```javascript
import fs from 'fs';
import zlib from 'zlib';
import Index from '../model/Index';
import ScreenImage from '../model/ScreenImage';
import WBLine from '../model/WBLine';
import WBEvent from '../model/WBEvent';
const MAX_ROW_NO = 8;
const MAX_COL_NO = 8;

class FileApi {
  static getIndexFile(originalFile, unzippedFile) {
    // unzip the index file if it doesn't exist
    if (!fs.existsSync(unzippedFile)) {
      this.unzipIndexFile(originalFile, unzippedFile);
    }
    // read the unzipped file to buffer
    return fs.readFileSync(unzippedFile);
  }

  static unzipIndexFile(originalFile, unzippedFile) {
    let buffer = fs.readFileSync(originalFile);
    let inflate = zlib.inflateSync(buffer);
    fs.writeFileSync(unzippedFile, inflate);
  }

  static getIndexArray (buffer){
    let arr = [];
    let ix = 0;
    let pos = 0;
    while (pos < buffer.length) {
      arr[ix] = new Index(buffer.readUInt16LE(pos), buffer.readInt8(pos+2), buffer.readInt32LE(pos+3), buffer.readUInt32LE(pos+7));
      ix++;
      pos = pos + 11;
    }

    for (let j = 0; j < arr.length; j++) {
      if (arr[j].offset == -1 && j > 0) {
        arr[j].offset = arr[j - 1].offset;
        arr[j].length = arr[j - 1].length;
      }
    }
    // sort by timestamp and grid
    arr.sort((a, b) => {
      let compare = a.timestamp - b.timestamp;
      if (compare == 0) {
        compare = a.grid - b.grid;
      }
      return compare;
    });

    return arr;
  }

  static getSSIndex (hm, indexarr, second) {
    let foundset = [];
    for(let i = 0; i < MAX_ROW_NO * MAX_COL_NO; i++) {
      foundset[i] = false;
    }
    let res = [];
    let index = 0;
    let firstItem = 0;
    let firstSecond = second;
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
        for (let i = firstItem - 1; i >= 0; i--) {
          let row = indexarr[i].grid >> 4;
          let col = indexarr[i].grid & 0xf;
          let value = row * MAX_ROW_NO + col;

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
  }

  static getSSData(imagedatafile, imageindex) {
    let res = [];
    let index = 0;
    let fd = fs.openSync(imagedatafile, 'r');
    let i = 0;
    for (i = 0; i < imageindex.length; i++) {
      let imageobj = imageindex[i];
      let row = imageobj.grid >> 4;
      let col = imageobj.grid & 0xf;

      let offset = imageindex[i].offset;
      let length = imageindex[i].length;
      let buffer = new Buffer(length);
      fs.readSync(fd, buffer, 0, length, offset);
      // image in base64 format
      let image = "data:image/png;base64," + buffer.toString('base64');
      res[index]= new ScreenImage(row, col, image);
      index++;
    }

    return JSON.stringify(res);
  }

  static getWBIndex(indexarr) {
    let res = [];
    for (let i = 0; i < indexarr.length; i++) {
      if(!res[indexarr[i].timestamp]) {
          res[indexarr[i].timestamp] = i;
      }
    }
    return res;
  }

  static getWBImageData(wbImageDataFile, wbImageIndex, indexList, second) {
    let res = [];
    let indeximage;
    let minutes = Math.floor(second / 60);

    if (wbImageIndex[minutes]) {
      indeximage = indexList[wbImageIndex[minutes]];
    }

    if (indeximage && indeximage.length>0) {
      let fd = fs.openSync(wbImageDataFile, 'r');
      let length = indeximage.length;
      let buffer = new Buffer(length);
      fs.readSync(fd, buffer, 0, length, indeximage.offset);

      let ix = 0;
      let pos = 0;
      while (pos < buffer.length) {
        res[ix] = new WBLine(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readUInt16LE(pos+4), buffer.readUInt16LE(pos+6),buffer.readInt16LE(pos+8), buffer.readUInt16LE(pos+10));
        ix++;
        pos = pos + 12;
      }
    }

    return res;
  }

  static getWBSequenceData(wbSequenceDataFile, wbSequenceIndex, indexList, second) {
    let res = [];
    let indexsequence;
    let minutes = Math.floor(second / 60);

    if (wbSequenceIndex[minutes]) {
      indexsequence = indexList[wbSequenceIndex[minutes]];
    }

    if (indexsequence && indexsequence.length>0) {
      let fd = fs.openSync(wbSequenceDataFile, 'r');
      let length = indexsequence.length;
      let buffer = new Buffer(length);
      fs.readSync(fd, buffer, 0, length, indexsequence.offset);

      let ix = 0;
      let pos = 0;
      while (pos < buffer.length) {
        res[ix] = new WBEvent(buffer.readUInt16LE(pos), buffer.readUInt16LE(pos+2), buffer.readInt16LE(pos+4), buffer.readInt16LE(pos+6));
        ix++;
        pos = pos + 8;
      }
    }

    return res;
  }
}

export default FileApi;
```
The following points need to be noted about the above code.
* Use native files system module `fs` provided by Node.js to read data from local files. Notice, we use `zlib` to decompress the index files. And use the index to get offset and length. Then, use them to read small parts of the data from data file instead of reading the whole file.
* For Screenshot, read the decompressed index file `ScreenShot/High/unzippedindex.pak` to get the index list. Then, get offset and length of index to read image data by time(in second) from `ScreenShot/High/1.pak`.
* Whiteboard has two parts, one is the static lines `VectorImage`, another is dynamic drawing events `VectorSequence`. To get data for Whiteboard's lines, first, read the decompressed index file `WB/1/VectorImage/unzippedindex.pak` to get the index list. Then, get offset and length of index to read line data by time(in second) from `WB/1/VectorImage/1.pak`. The same operations to get Whiteboard's events.

### 3.3 Course Api(Server Side)
Create file '`src/api/CourseApi.js`'.
```js
import path from 'path';
import Index from '../model/Index';
import WBData from '../model/WBData';
import fileApi from './FileApi';

const ssIndexFile = path.join(__dirname, '../../204304/ScreenShot/High/package.pak');
const unzippedSsIndexFile = path.join(__dirname, '../../204304/ScreenShot/High/unzippedindex.pak');
const ssScreenshotDataFile = path.join(__dirname, '../../204304/ScreenShot/High/1.pak');
const wbImageIndexFile = path.join(__dirname, '../../204304/WB/1/VectorImage/package.pak');
const unzippedWbImageIndexFile = path.join(__dirname, '../../204304/WB/1/VectorImage/unzippedindex.pak');
const wbImageDataFile = path.join(__dirname, '../../204304/WB/1/VectorImage/1.pak');
const wbSequenceIndexFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/package.pak');
const unzippedWbSequenceIndexFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/unzippedindex.pak');
const wbSequenceDataFile = path.join(__dirname, '../../204304/WB/1/VectorSequence/1.pak');

// Screenshot Cache
let ssIndexArray = null;
let ssHashmap = [];
// Whiteboard Cache
let wbImageIndexArray = null;
let wbImageIndex = null;
let wbSequenceIndexArray = null;
let wbSequenceIndex = null;

class CourseApi {

  static getScreenshotData (second) {
    if (ssIndexArray===null) {
      let buffer = fileApi.getIndexFile(ssIndexFile, unzippedSsIndexFile);
      ssIndexArray = fileApi.getIndexArray(buffer);
      ssHashmap = [];
      for (let i = 0; i < ssIndexArray.length; i++)
      {
        if(!ssHashmap[ssIndexArray[i].timestamp]) {
          ssHashmap[ssIndexArray[i].timestamp] = i;
        }
      }
    }

    let ssIndex = fileApi.getSSIndex(ssHashmap, ssIndexArray, second);
    return fileApi.getSSData(ssScreenshotDataFile, ssIndex);
  }

  static getWhiteBoardData (second) {
    // get lines
    let lines = this.getWBImageData(second);
    // get events
    let events = this.getWBSequenceData(second);
    // combine them to whiteboard data
    let res = new WBData(second, lines, events);

    return JSON.stringify(res);
  }

  static getWBImageData(second) {
    if (wbImageIndex===null) {
      let buffer = fileApi.getIndexFile(wbImageIndexFile, unzippedWbImageIndexFile);
      wbImageIndexArray = fileApi.getIndexArray(buffer);
      wbImageIndex = fileApi.getWBIndex(wbImageIndexArray);
    }
    return fileApi.getWBImageData(wbImageDataFile, wbImageIndex, wbImageIndexArray, second);
  }

  static getWBSequenceData(second) {
    if (wbSequenceIndex===null) {
      let buffer = fileApi.getIndexFile(wbSequenceIndexFile, unzippedWbSequenceIndexFile);
      wbSequenceIndexArray = fileApi.getIndexArray(buffer);
      wbSequenceIndex = fileApi.getWBIndex(wbSequenceIndexArray);
    }
    return fileApi.getWBSequenceData(wbSequenceDataFile, wbSequenceIndex, wbSequenceIndexArray, second);  
  }
}

export default CourseApi;
```
The following points need to be noted about the above code.
* Define constants for data files.
* Use `getScreenshotData` to the Screenshot data in second.
* Use `getWhiteBoardData` to the Whiteboard data in second.
* Use local variables to `cache` index files to improve performance.

### 3.4 HTTP Server(Server Side)
Create file '`tools/server.js`'.
```javascript
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import favicon from 'serve-favicon';
import courseApi from '../src/api/CourseApi';
import dateTimeApi from '../src/api/DateTimeApi';

const port = 12100;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(favicon(path.join(__dirname,'../public','assets','favicon.ico')));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


const server = app.listen(port, function(err) {
  if (err) {
    //console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('updateTime', function(data) {
    let second = data.time;
    if (second > 0 && second < 12600) {
      // Screenshot
      const ssdata = courseApi.getScreenshotData(second);
      // Whiteboard
      const wbdata = courseApi.getWhiteBoardData(second);

      // Notify client through emit with data
      io.sockets.emit('playCourse', {time: second, ssdata: ssdata, wbdata:wbdata});
    }
  });
});

function tick () {
  let dt = new Date();
  dt = dt.toLocaleString();
  io.sockets.emit("realtime", dt);
}
setInterval(tick, 1000);
```
The following points need to be noted about the above code.
* Setup web server with `express` at port `12100`.
* Create a timer to repeatedly notify the client of the server time.
* Open socket connection with `Socket.IO`, monitoring `updatetime` event.
* Once receive the time(data.second) from client, fetch course data for screenshot and whiteboard. Then, emit `playCourse` event to send data back to client.

### 3.5 Home Page(Client Side)
Create file '`src/index.html`'. Import `'/socket.io/socket.io.js'` to create socket connection later.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Course Player - React</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/bundle.js"></script>
  </body>
</html>
```
Create file '`src/index.js`'.
```jsx
import React from 'react';  
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render((
  <App />
), document.getElementById('root'));
```
### 3.6 Main Components(Client Side)
Create file '`src/components/App.js`'. This `App` component contains three child components, `Header`, `Home` and `Footer`.
```jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';

const App = () => (
  <div>
    <Header />
    <Home />
    <Footer />
  </div>
);

export default App;
```
Create file '`src/components/Header.js`'.
```jsx
import React from 'react';
import { Button, ButtonToolbar} from 'react-bootstrap';

const io = require('socket.io-client');
const socket = io();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
    socket.on('realtime', (time) => this.setTime(time));
  }

  setTime(time) {
    this.setState({time: time});
  }

  render() {
    return (
      <div>
        <div className="container text-center">
          <h1>Course Player</h1>
          <p>Built with React and Socket.IO</p>
          <p>Current server time is: <span id="time">{this.state.time}</span></p>
        </div>
        <hr/>
      </div>
    );
  }
}

export default Header;
```
The following points need to be noted about the above code.
* Import `socket.io-client` and create socket connection with it.
* Monitor `realtime` event and get the server time.
* Display the time by updating the state.

Create file '`src/components/Footer.js`'.
```jsx
import React from 'react';

const Footer = () => {  
  return (
    <div>
      <hr />
      <footer className="container-fluid text-center">
        <p>&copy; 2017 jojozhuang.github.io, All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;
```
Create file '`src/components/Home.js`'.
```jsx
import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import Video from './player/Video';
import Screenshot from './player/Screenshot';
import Whiteboard from './player/Whiteboard';

const playerStyle = {
  backgroundColor: '#ffe3ad',
  border: 'thick solid #808080'
};

const videoStyle = {
  marginTop: '10px'
};

const io = require('socket.io-client');
const socket = io();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };

    socket.on('playCourse', (data) => this.playCourse(data));

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handlePlayerStop = this.handlePlayerStop.bind(this);
  }

  playCourse(data) {
    //console.log('playCourse');
    this.refs.ss.drawScreenShot(data.ssdata);
    this.refs.wb.drawWhiteboard(data.wbdata);
  }

  handlePlayerStop() {
    this.refs.ss.clearScreenshot();
    this.refs.wb.clearWhiteboard();
  }

  handleTimeChange(time, clear) {
    this.setState({ time: time });
    if (clear) {
      this.refs.wb.clearWhiteboard();
    }
    socket.emit('updateTime', { time: time });
  }

  render() {
    return(
      <Grid style={playerStyle}>
        <Row className="show-grid" style={videoStyle}>
          <Col><Video ref="video" onTimeChange={this.handleTimeChange} onStop={this.handlePlayerStop}/></Col>
        </Row>
        <Row className="show-grid">
          <Col sm={6} style="textAlign: 'left'"><Screenshot ref="ss" /></Col>
          <Col sm={6} style="textAlign: 'right'"><Whiteboard ref="wb" /></Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
```
The following points need to be noted about the above code.
* Home component contains three sub components, `Video`, `Screenshot` and `Whiteboard`.
* Import `socket.io-client` and create socket connection with it.
* Monitor `playCourse` event and get the data from server.
* Use `playCourse(data)` to draw screenshot and whiteboard in sub components.
* Use `handleTimeChange` as callback from `Video` component and emit `updateTime` event to server.

### 3.6 Player Components(Client Side)
Create file '`src/components/player/Video.js`'.
```jsx
import React from 'react';  
import PropTypes from 'prop-types';
import RangeSlider from '../controls/RangeSlider';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty
    };
  }

  render() {
    return (
      <RangeSlider min={0} max={4 * 60 * 60 - 30 * 60} value={0} onTimeChange={this.props.onTimeChange} onStop={this.props.onStop}/>
    );
  }
}

Video.propTypes = {
  onTimeChange: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default Video;
```
The following points need to be noted about the above code.
* Use `RangeSlider`(slider bar) to simulate progress bar of the video player.
* The max value of slider bar is 4 * 60 * 60 - 30 * 60 = 12600 seconds, since each course lasts 3 and half hours.
* Pass function `onTimeChange` and `onStop` from parent component `App` to child component `RangeSlider`.

Create file '`src/components/player/Screenshot.js`'.
```jsx
import React from 'react';  
import PropTypes from 'prop-types';
import Canvas from '../controls/Canvas';

class Screenshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // state
    };
  }

  drawScreenShot(ssdata) {
    //console.log('Screenshot.drawScreenShot');
    const cellWidth = this.playerss.width / 8;
    const cellHeight = this.playerss.height / 8;
    let left, top, width, height = 0;
    const ctxss = this.playerss.getContext('2d');
    const ctxworkingss = this.workingss.getContext('2d');
    let imageList = JSON.parse(ssdata);
    for (let i = 0; i < imageList.length; i++) {
      left = cellWidth * imageList[i].col;
      top = cellHeight * imageList[i].row;
      width = cellWidth;
      height = cellHeight;
      // use hidden canvas to avoid refreshing
      this.drawImageOnCanvas(ctxworkingss, left, top, width, height, imageList[i].image);
    }
    ctxss.drawImage(this.workingss, 0, 0);
  }

  drawImageOnCanvas(ctx, left, top, width, height, image) {
    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, left, top, width, height);
    };
    img.src = image;
  }

  clearScreenshot() {
    // reset screen
    const ctxss = this.playerss.getContext('2d');
    const ctxworkingss = this.workingss.getContext('2d');
    ctxss.clearRect(0, 0, this.playerss.width, this.playerss.height);
    ctxworkingss.clearRect(0, 0, this.workingss.width, this.workingss.height);
  }

  render() {
    //console.log('Screenshot.render');
    return (
      <div>
        <Canvas canvasRef={el => this.playerss = el} display="block"/>
        <Canvas canvasRef={el => this.workingss = el} display="none"/>
        <h4 style="textAlign: 'center'">Screenshot</h4>
      </div>
    );
  }
}

export default Screenshot;
```
The following points need to be noted about the above code.
* We define two canvas controls `playerss` and `workingss` for screenshot. `workingss` is invisible. We draw images first on the working canvas. Then, draw the entire image on the `playerss` canvas for only one time to avoid flashing.

Create file '`src/components/player/Whiteboard.js`'.
```jsx
import React from 'react';  
import PropTypes from 'prop-types';
import Canvas from '../controls/Canvas';

class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasIsDrawing: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.canvasIsDrawing != nextState.canvasIsDrawing;
  }

  drawWhiteboard(wbdata) {
    //console.log('Whiteboard.drawWhiteboard');
    this.setState({'canvasIsDrawing': true});
    let lastPoint; //use state to preserve the value
    let currentColor = -10;
    let currentWidth = 1;
    const ctxwb = this.playerwb.getContext('2d');
    const ctxworkingwb = this.workingwb.getContext('2d');
    let xRate = this.workingwb.width / 9600;
    let yRate = this.workingwb.height / 4800;
    ctxworkingwb.fillStyle = "solid";
    let wbobj = JSON.parse(wbdata);
    if (wbobj.wblines) {
      for (let i = 0; i < wbobj.wblines.length; i++) {
        let line = wbobj.wblines[i];
        this.drawline(ctxworkingwb, this.getColor(line.color), this.getWidth(line.color), line.x0, line.y0,line.x1, line.y1, xRate, yRate);
      }
      ctxwb.drawImage(this.workingwb, 0, 0);
    }
    if (wbobj.wbevents) {
      lastPoint = this.state.lastPoint;
      let endMilliseconds = wbobj.second * 1000 % 60000;
      for (let i = 0; i < endMilliseconds; i++) {
        for (let j = 0; j < wbobj.wbevents.length; j++) {
          let event = wbobj.wbevents[j];
          if (event&&event.timestamp == i) {
            if (event.x >=0) {
              if (!lastPoint) {
                lastPoint = event;
              } else {
                this.drawline(ctxworkingwb, this.getColor(currentColor), currentWidth, lastPoint.x, lastPoint.y, event.x, event.y, xRate, yRate);
                lastPoint = event;
              }
            } else {
              switch (event.x) {
                 case -100: //Pen Up
                   currentColor = -8;
                   lastPoint = null;
                   break;
                 case -200: //Clear event
                    this.clearWhiteboard();
                    lastPoint = null;
                    break;
                 default:
                    currentColor = event.x;
                    currentWidth = this.getWidth(currentColor);
                    break;
               }
               lastPoint = null;
            }
          }
        }
      }
      ctxwb.drawImage(this.workingwb, 0, 0);
    }
  }

  drawline(workingwb, color, width, x0, y0, x1, y1, xRate, yRate) {
    workingwb.beginPath();
    workingwb.strokeStyle = color;
    workingwb.lineWidth = width;
    workingwb.moveTo(x0 * xRate, y0 * yRate);
    workingwb.lineTo(x1 * xRate, y1 * yRate);
    workingwb.closePath();
    workingwb.stroke();
  }
  getColor(color) {
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

  getWidth(color) {
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

  clearWhiteboard() {
    // reset whiteboard
    const ctxwb = this.playerwb.getContext('2d');
    const ctxworkingwb = this.workingwb.getContext('2d');
    ctxwb.clearRect(0, 0, this.playerwb.width, this.playerwb.height);
    ctxworkingwb.clearRect(0, 0, this.workingwb.width, this.workingwb.height);
  }

  render() {
    //console.log('Whiteboard.render');
    return (
      <div>
        <Canvas canvasRef={el => this.playerwb = el} display="block"/>
        <Canvas canvasRef={el => this.workingwb = el} display="none"/>
        <h4 style="textAlign: 'center'">Whiteboard</h4>
      </div>
    );
  }
}

export default Whiteboard;
```
The following points need to be noted about the above code.
* We define two canvas controls `playerwb` and `workingwb` for screenshot. `workingwb` is invisible. We draw lines and events first on the working canvas. Then, draw the entire working canvas on the `playerwb` canvas for only one time to avoid flashing.

### 3.7 Control Components(Client Side)
Create file '`src/components/controls/RangeSlider.js`'.
```jsx
import React from 'react';  
import PropTypes from 'prop-types';
import { Button, Grid, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import dateTimeApi from '../../api/DateTimeApi';

const Div = styled.div`
  width: 100%;
`;

const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
`;

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'Play',
      bsStyle: 'primary',
      value: 0
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
    this.setTimeState(0, false);
  }

  timer() {
    if(this.state.value >= this.props.max) {
      clearInterval(this.intervalId);
      this.setTimeState(0, false);
      this.setState({buttonText: 'Play'});
      this.setState({bsStyle: 'primary'});
      this.props.onStop();
      return;
    }

    this.setTimeState(parseInt(this.state.value) + 1, false);
  }

  handlePlay(event) {
    if (this.state.buttonText == 'Play') {
      this.setState({buttonText: 'Stop'});
      this.setState({bsStyle: 'danger'});
      this.intervalId = setInterval(this.timer.bind(this), 1000);
    } else {
      this.setState({buttonText: 'Play'});
      this.setState({bsStyle: 'primary'});
      clearInterval(this.intervalId);
      this.setTimeState(0, false);
      this.props.onStop();
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleMouseUp(event) {
    this.setTimeState(event.target.value, true);
  }

  setTimeState(time, clear) {
    //console.log('setTimeState');
    this.setState({value: time});
    this.props.onTimeChange(time, clear);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}><h5 style="textAlign: 'left'">Current Time: {dateTimeApi.getReadableTimeText(this.state.value)}</h5></Col>
          <Col xs={6} md={4}><p style="textAlign: 'center'"><Button bsStyle={this.state.bsStyle} type='button' onClick={this.handlePlay}>{this.state.buttonText}</Button></p></Col>
          <Col xsHidden md={4}><h5 style="textAlign: 'right'">Total Time: {dateTimeApi.getReadableTimeText(12600)}</h5></Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12}><Div>
          <Input type="range" min={this.props.min} max={this.props.max} value={this.state.value} onChange={this.handleChange} onMouseUp={this.handleMouseUp}/>
        </Div></Col>
        </Row>
      </Grid>      
    );
  }
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default RangeSlider;
```
The following points need to be noted about the above code.
* Use `styled-components` to define styled component.
* There are two rows in the grid. The first row contains a button to play and stop the course. The second row contains the range control(slider bar).
* Use `onChange` event to update the time when user is dragging the slider bar.
* Use `onMouseUp` event to update the time when user finishes dragging. Meanwhile, call parent's `this.props.onTimeChange(time, clear)` method to notify server to send data for drawing.
* Use `handlePlay` to handle the event when user click the `Play` button. When player is started, we setup a timer to increment the time by second and notify server to send data for drawing.

Create file '`src/components/controls/Canvas.js`'.
```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

let canvasStyle = {
  background: '#fffbf4',
  margin: '20px auto',
  border: '5px solid #E8E8E8',
  width: 500,
  height: 300,
};

class Canvas extends Component {
  render() {
    return(
      <div>
        <canvas ref={this.props.canvasRef} width="500" height="300" style={Object.assign({},canvasStyle,{display:this.props.display})}/>
       </div>
    );
  }
}

Canvas.propTypes = {
  canvasRef: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired
};

export default Canvas;
```
### 3.8 Final Project Structure
![image](/assets/images/frontend/8478/projectstructure.png){:width="350px"}
Notice, folder `204304` contains the data files for screenshot and whiteboard.

## 4. Running and Testing
Start this React app, serve it in web server.
```raw
$ npm start
```
View the course player at http://localhost:12100/ in chrome. On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The left one is for screenshot and the right one is for whiteboard.
![image](/assets/images/frontend/8478/homepage.png)
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/assets/images/frontend/8478/play.png)
You can drag the slider bar to move forward or backward.
![image](/assets/images/frontend/8478/drag.png)

## 5. Source Files
* [Source files of Course Player(React) on Github](https://github.com/jojozhuang/course-player-react)

## 6. References
* [Range Sliders](https://www.w3schools.com/howto/howto_js_rangeslider.asp)
* [Real-Time React with Socket.io: Building a Pair Programming App](http://www.thegreatcodeadventure.com/real-time-react-with-socket-io-building-a-pair-programming-app/)
* [Call child method from parent](https://stackoverflow.com/questions/37949981/call-child-method-from-parent)
* [basic idea how to use socket io in react](https://stackoverflow.com/questions/17663589/socket-emit-and-socket-on-do-not-work-in-node-js)
* [Sample code for socket.emit and socket.on](https://github.com/socketio/socket.io/issues/2800)
