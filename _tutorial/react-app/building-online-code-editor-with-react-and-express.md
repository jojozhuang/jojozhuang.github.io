---
layout: tutorial
key: tutorial
title: "Building Online Code Editor with React and Express"
index: 8482
subcategory: react-app
date: 2018-06-04
tags: [React, Express]
---

> Build an online code editor with React as front end and Express as back end.

## 1. Introduction
In the posting [Running C and Java in Node.js]({% link _tutorial/node-js/running-c-and-java-in-nodejs.md %}), I introduced how to run C and Java in [Node.js](https://nodejs.org/en/). In this posting, I will introduce how to create a web application to achieve the same function with React and Node.js.

## 2. Server
Use [express](https://expressjs.com/) to setup an web server. Two APIs are available.
* `/api/file/:lang`: get template code for different languages.
* `/api/run`: run submitted code.

### 2.1 Setting up Web Server
Setup web server with express and monitor at port 8080 by default.  
./src/server/index.js
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const FileApi = require('./api/FileApi');
const RunnerManager = require('./compiler/RunnerManager');

const PORT = process.env.PORT || 8080;

const app = express();
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use(express.static('dist'));

// Add headers to enable CORS to support cross domain communication.
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/api/file/:lang', (req, res) => {
  const language = req.params.lang;
  console.log(language);
  FileApi.getFile(language, (content) => {
    const file = {
      lang: language,
      code: content,
    };
    res.send(JSON.stringify(file));
  });
});

app.post('/api/run', (req, res) => {
  const file = req.body;
  console.log(`file.lang: ${file.lang}`, `file.code:${file.code}`);
  RunnerManager.run(file.lang, file.code, res);
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
```
* Use `body-parser` to receive code from client.
* Add headers to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to support cross domain communication.

### 2.2 FileApi
Two functions are provided by FileApi.
* getFile(), get template by the given language.
* saveFile(), save the submitted code with proper language type.

./src/server/api/FileApi.js
```javascript
const mkdirp = require('mkdirp');
const fs = require('fs');
const getDirName = require('path').dirname;
const path = require('path');

module.exports = {
  getFile(lang, callback) {
    let file = '';
    const language = lang.toLowerCase();
    if (language === 'java') {
      file = path.join(__dirname, '../templates', 'Hello.java');
    } else if (language === 'c') {
      file = path.join(__dirname, '../templates', 'Hello.c');
    } else if (language === 'c++') {
      file = path.join(__dirname, '../templates', 'Hello.cpp');
    } else if (language === 'javascript') {
      file = path.join(__dirname, '../templates', 'Hello.js');
    } else if (language === 'python') {
      file = path.join(__dirname, '../templates', 'Hello.py');
    } else {
      callback('');
      return;
    }
    console.log(`getTemplate:${file}`);
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data.toString());
      callback(data.toString());
    });
  },

  saveFile(file, code, callback) {
    // create parent directories if they doesn't exist.
    mkdirp(getDirName(file), (err) => {
      if (err) return callback(err);

      return fs.writeFile(file, code, (err2) => {
        if (err2) {
          throw err2;
        }

        callback();
      });
    });
  },
};
```
### 2.3 Compilers
Use `Factory` and `Strategy` design pattern to build the compilers. Five languages are supported.
* C
* C++
* Java
* JavaScript
* Python

**Runner Base Class**  
./src/server/compiler/Runner.js
```javascript
class Runner {
  constructor() {}

  run(file, directory, filename, extension, callback) {
    console.log(this.file);
  }
}

module.exports = Runner;
```
**Runner for C**  
./src/server/compiler/CRunner.js
```javascript
const { spawn } = require('child_process');
const Runner = require('./Runner');
const path = require('path');

class CRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.c';
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== '.c') {
      console.log(`${file} is not a c file.`);
      return;
    }
    this.compile(file, directory, filename, callback);
  }

  // compile a c file
  compile(file, directory, filename, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    // ['codec.c', '-o','codec.out']
    const argsCompile = [];
    argsCompile[0] = file;
    argsCompile[1] = '-o';
    argsCompile[2] = path.join(directory, `${filename}.out`);
    console.log(`argsCompile:${argsCompile}`);

    // const compile = spawn('gcc', ['codec.c', '-o','codec.out']);
    const compiler = spawn('gcc', argsCompile);
    compiler.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    compiler.stderr.on('data', (data) => {
      console.log(`compile-stderr: ${String(data)}`);
      callback('1', String(data)); // 1, compile error
    });
    compiler.on('close', (data) => {
      if (data === 0) {
        this.execute(directory, filename, options, callback);
      }
    });
  }

  // execute the compiled file
  execute(directory, filename, options, callback) {
    const cmdRun = path.join(directory, `${filename}.out`);

    // const executor = spawn('./Hello.out', [], options);
    const executor = spawn(cmdRun, [], options);
    executor.stdout.on('data', (output) => {
      console.log(String(output));
      callback('0', String(output)); // 0, no error
    });
    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`);
      callback('2', String(output)); // 2, execution failure
    });
    executor.on('close', (output) => {
      this.log(`stdout: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = CRunner;
```
**Runner for C++**  
./src/server/compiler/CppRunner.js
```javascript
const { spawn } = require('child_process');
const Runner = require('./Runner');
const path = require('path');

class CppRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.cpp';
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== '.cpp') {
      console.log(`${file} is not a cpp file.`);
      return;
    }
    this.compile(file, directory, filename, callback);
  }

  // compile a c file
  compile(file, directory, filename, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    // ['codec.c', '-o','codec.out']
    const argsCompile = [];
    argsCompile[0] = file;
    argsCompile[1] = '-o';
    argsCompile[2] = path.join(directory, `${filename}.out`);
    console.log(`argsCompile:${argsCompile}`);

    // const compile = spawn('g++', ['Hello.cpp', '-o','Hello.out']);
    const compiler = spawn('g++', argsCompile);
    compiler.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    compiler.stderr.on('data', (data) => {
      console.log(`compile-stderr: ${String(data)}`);
      callback('1', String(data)); // 1, compile error
    });
    compiler.on('close', (data) => {
      if (data === 0) {
        this.execute(directory, filename, options, callback);
      }
    });
  }

  // execute the compiled file
  execute(directory, filename, options, callback) {
    const cmdRun = path.join(directory, `${filename}.out`);

    // const executor = spawn('./Hello.out', [], options);
    const executor = spawn(cmdRun, [], options);
    executor.stdout.on('data', (output) => {
      console.log(String(output));
      callback('0', String(output)); // 0, no error
    });
    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`);
      callback('2', String(output)); // 2, execution failure
    });
    executor.on('close', (output) => {
      this.log(`stdout: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = CppRunner;
```
**Runner for Java**  
./src/server/compiler/JavaRunner.js
```javascript
const { spawn } = require('child_process');
const Runner = require('./Runner');

class JavaRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.java';
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== '.java') {
      console.log(`${file} is not a java file.`);
    }
    this.compile(file, directory, filename, callback);
  }

  // compile java source file
  compile(file, directory, filename, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    // var compiler = spawn('javac', ['CodeJava.java']);
    const argsCompile = [];
    argsCompile[0] = file;
    const compiler = spawn('javac', argsCompile);
    compiler.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    compiler.stderr.on('data', (data) => {
      console.log(`compile-stderr: ${String(data)}`);
      callback('1', String(data)); // 1, compile error
    });
    compiler.on('close', (data) => {
      if (data === 0) {
        this.execute(filename, options, callback);
      }
    });
  }

  // execute the compiled class file
  execute(filename, options, callback) {
    const argsRun = [];
    argsRun[0] = filename;
    const executor = spawn('java', argsRun, options);
    executor.stdout.on('data', (output) => {
      console.log(String(output));
      callback('0', String(output)); // 0, no error
    });
    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`);
      callback('2', String(output)); // 2, execution failure
    });
    executor.on('close', (output) => {
      this.log(`stdout: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = JavaRunner;
```
**Runner for JavaScript**  
./src/server/compiler/JavaScriptRunner.js
```javascript
const { spawn } = require('child_process');
const Runner = require('./Runner');

class JavaScriptRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.js';
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== '.js') {
      console.log(`${file} is not a javascript file.`);
    }
    this.execute(file, directory, callback);
  }

  execute(file, directory, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const argsRun = [];
    argsRun[0] = file;
    console.log(`options: ${options}`);
    console.log(`argsRun: ${argsRun}`);

    const executor = spawn('node', argsRun, options);
    executor.stdout.on('data', (output) => {
      console.log(String(output));
      callback('0', String(output)); // 0, no error
    });
    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`);
      callback('2', String(output)); // 2, execution failure
    });
    executor.on('close', (output) => {
      this.log(`stdout: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = JavaScriptRunner;
```
* Notice that there is no compile method, only execute method.

**Runner for Python**  
./src/server/compiler/PythonRunner.js
```javascript
const { spawn } = require('child_process');
const Runner = require('./Runner');

class PythonRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.py';
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== '.py') {
      console.log(`${file} is not a python file.`);
    }
    this.execute(file, directory, callback);
  }

  execute(file, directory, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const argsRun = [];
    argsRun[0] = file;
    console.log(`options: ${options}`);
    console.log(`argsRun: ${argsRun}`);
    const executor = spawn('python', argsRun, options);
    executor.stdout.on('data', (output) => {
      console.log(String(output));
      callback('0', String(output)); // 0, no error
    });
    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`);
      callback('2', String(output)); // 2, execution failure
    });
    executor.on('close', (output) => {
      this.log(`stdout: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = PythonRunner;
```
**Runner Manager**  
./src/server/compiler/RunnerManager.js
```javascript
const path = require('path');
const FileApi = require('../api/FileApi');
const CRunner = require('./CRunner');
const CppRunner = require('./CppRunner');
const JavaRunner = require('./JavaRunner');
const JavaScriptRunner = require('./JavaScriptRunner');
const PythonRunner = require('./PythonRunner');

function Factory() {
  this.createRunner = function createRunner(lang) {
    let runner;

    if (lang === 'c') {
      runner = new CRunner();
    } else if (lang === 'c++') {
      runner = new CppRunner();
    } else if (lang === 'java') {
      runner = new JavaRunner();
    } else if (lang === 'javascript') {
      runner = new JavaScriptRunner();
    } else if (lang === 'python') {
      runner = new PythonRunner();
    }

    return runner;
  };
}

module.exports = {
  run(lang, code, res) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());

    const directory = path.join(__dirname, 'temp');
    const file = path.join(directory, runner.defaultFile());
    console.log(`file: ${file}`);
    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .java
    console.log(`filename: ${filename}`);
    console.log(`extension: ${extension}`);

    FileApi.saveFile(file, code, () => {
      runner.run(file, directory, filename, extension, (status, message) => {
        const result = {
          status,
          message,
        };
        res.end(JSON.stringify(result));
      });
    });
  },
};
```
* Use Factory design pattern to create Runner.
* Save the code to file first, then call runner to compile and run it.

### 2.4 Templates
./src/server/templates/Hello.c
```c
#include <stdio.h>
int main()
{
    printf("Hello C!\n");
}
```
./src/server/templates/Hello.cpp
```cpp
#include <iostream>
using namespace std;

// main() is where program execution begins.
int main()
{
    cout << "Hello CPP!\n"; // prints Hello CPP!
    return 0;
}
```
./src/server/templates/Hello.java
```java
class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java!"); // Display the string.
    }
}
```
./src/server/templates/Hello.js
```javascript
function hello() {
  console.log('Hello, javascript!');
}
hello();

```
./src/server/templates/Hello.py
```python
print "Hello, Python!"
```

## 3. Client
### 3.1 Packages
The major packages we use to build the client part of this app.
* [React-Bootstrap](https://react-bootstrap.github.io/): UI components, like button, textbox, etc.
* [bootstrap-select](https://silviomoreto.github.io/bootstrap-select/): A Dropdown selector control.
* [Ace Editor](https://ace.c9.io/): A popular web based code editor.

### 3.2 Resource References
In `./public/index.html`, add reference links for jQuery, Bootstrap css and Bootstrap javascript.
```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
	crossorigin="anonymous"></script>
<!-- Latest compiled and minified CSS and JavaScript for bootstrap-select -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
```
### 3.3 React Components
./src/client/index.js
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
```
./src/client/components/App.js
```jsx
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Editor from './Editor';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/editor" component={Editor} />
    </Switch>
    <Footer />
  </div>
);

export default App;
```
./src/client/components/Editor.js
```jsx
import React from 'react';
import { Form, FormGroup, Col, Button } from 'react-bootstrap';
import LangSelector from './controls/LangSelector';
import CodeEditor from './controls/CodeEditor';
import AlertDismissable from './controls/AlertDismissable';
import OutputBox from './controls/OutputBox';
import StatusImage from './controls/StatusImage';
import CompilerApi from '../api/CompilerApi';

const languages = ['C', 'C++', 'Java', 'JavaScript', 'Python'];

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLang: 2, // java
      task: {
        lang: 'java',
        code: '',
      },
      response: {
        status: '0',
        message: '',
      },
    };

    this.handleRun = this.handleRun.bind(this);
    this.updateSolution = this.updateSolution.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  componentDidMount() {
    CompilerApi.getTask('java')
      // .then(res => res.json())
      .then((task) => {
        console.log(task);
        this.setState({ task });
      });
  }

  handleCodeChange(code) {
    const { task } = this.state;
    task.code = code;
    console.log(code);
    return this.setState({ task });
  }

  handleRun(event) {
    event.preventDefault();
    const { task } = this.state;
    console.log(task);
    CompilerApi.run(task)
      .then((res) => {
        this.setState({ response: res });
      })
      .catch((error) => {
        console.log(error);
        // this.handleError(error);
      });
  }

  updateSolution(event) {
    // event.preventDefault();
    console.log(this.state.task);
    const field = event.target.name;
    const { task } = this.state;
    task[field] = event.target.value;
    return this.setState({ task });
  }

  handleLangChange(event) {
    const index = parseInt(event.target.value, 10);
    CompilerApi.getTask(languages[index]).then((task) => {
      console.log(task);
      this.setState({ task });
    });
    const response = { status: '0', message: '' };
    this.setState({ response });
    return this.setState({ selectedLang: index });
  }

  render() {
    return (
      <div className="container">
        <Form horizontal>
          <FormGroup controlId="code">
            <Col sm={12}>
              <LangSelector
                langs={languages}
                selectedIndex={this.state.selectedLang}
                onChange={this.handleLangChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="code">
            <Col sm={12}>
              <CodeEditor onChange={this.handleCodeChange} code={this.state.task.code} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
              <Button bsStyle="primary" type="button" onClick={this.handleRun}>
                Run
              </Button>
              <StatusImage
                hasError={this.state.response.status !== '0'}
                message={this.state.response.message}
              />
            </Col>
            <Col sm={10} />
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <AlertDismissable
                show={this.state.response.status !== '0'}
                message={this.state.response.message}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <OutputBox
                show={this.state.response.status === '0'}
                message={this.state.response.message}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Editor;
```
./src/client/components/controls/CodeEditor.js  
{% raw %}
```raw
import React from 'react';
import PropTypes from 'prop-types';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';
// Import a Mode (language)
import 'brace/mode/java';
// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/github';

const editorStyle = {
  border: '1px solid lightgray',
};

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    this.props.onChange(newValue);
  }

  render() {
    return (
      <AceEditor
        style={editorStyle}
        readOnly={false}
        onChange={this.onChange}
        width="100%"
        height="400px"
        mode="java"
        theme="github"
        name="aceCodeEditor"
        // onLoad={this.onLoad}
        fontSize={14}
        showPrintMargin
        showGutter
        highlightActiveLine
        value={this.props.code}
        editorProps={{
          $blockScrolling: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CodeEditor;
```
{% endraw %}
Here, we use [Ace Editor](https://ace.c9.io/) as code editor.
* [React-Ace](https://github.com/securingsincity/react-ace)
* [ACE Live Demo](http://securingsincity.github.io/react-ace/)
* [ACE demo](https://ace.c9.io/demo/autoresize.html)

### 3.4 Showing Line Break
To show line break '\n' in html, we need to add style `whiteSpace: pre-wrap` to html tag.
{% raw %}
```raw
<Alert bsStyle="danger" onDismiss={this.handleDismiss}>
  <h4>Oh snap! You got an error!</h4>
  <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.message}</p>
</Alert>
```
{% endraw %}
Here is the sample screenshot for line break. Without the whitespace style, the lines will be concatenated together and hard to read.
![image](/assets/images/frontend/8482/linebreak.png)

## 4. Webpack
For the configuration of Webpack, please refer to another blog [Creating Full Stack App with React and Node.js]({% link _tutorial/react-app/creating-full-stack-app-with-react-and-nodejs.md %}).
The only thing needs to be taken care is nodemon. Add 'temp' folder to ignore in `nodemon.json` to prevent nodemon from monitoring it. Otherwise, server will restart if files inside this folder are changed after user submits code to server.
```javascript
{
  "ignore": ["src/server/compiler/temp/"],
  "watch": ["src/server/"]
}
```

## 5. Testing
Start both the client and server with 'npm run dev'. The client is served at port 3000 and the server is served at port 8080.
```raw
$ npm run dev
```
Open web browser, access 'http://localhost:3000/'.
![image](/assets/images/frontend/8482/homepage.png)
Switch to code editor. By default, Java is selected. You can select any language listed in the dropdown list.
![image](/assets/images/frontend/8482/codeeditor.png)
Click the Run button. The execution result will be printed out if there is no error.
![image](/assets/images/frontend/8482/run.png)
Otherwise, the error will be printed out instead.
![image](/assets/images/frontend/8482/error.png)

## 6. Source Files
* [Source files of Code Editor on Github](https://github.com/jojozhuang/code-editor-react)

## 7. Reference
* [How do I create online compiler for C, C++ and Java using node.js as server language?](https://www.quora.com/How-do-I-create-online-compiler-for-C-C++-and-Java-using-node-js-as-server-language)
* [Making a code compiler using Hackerrank API and ACE editor](http://blog.arpitdubey.com/making-a-code-compiler-using-hackerrank-api-and-ace-editor/)
* [How to use properly ACE Editor in ReactJS](https://ourcodeworld.com/articles/read/562/how-to-use-properly-ace-editor-in-reactjs)
* [Design Pattern Factory in Javascript](http://www.dofactory.com/javascript/factory-method-design-pattern)
* [Design Pattern Strategy in Javascript](http://www.dofactory.com/javascript/strategy-design-pattern)
* [bootstrap-select](https://developer.snapappointments.com/bootstrap-select/)
* [OnChange event using React JS for drop down](https://stackoverflow.com/questions/28868071/onchange-event-using-react-js-for-drop-down)
* [Sample nodemon.json](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md)
* [No 'Access-Control-Allow-Origin' - Node / Apache Port Issue](https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue)
