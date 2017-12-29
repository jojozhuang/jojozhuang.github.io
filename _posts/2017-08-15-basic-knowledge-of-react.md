---
layout: post
key: blog
title: "Basic Knowledge of React"
date: 2017-08-15
tags: [React, Developer Tools]
---

> Basic Knowledge to use ReactJS.

## 1. Key Concepts in React
### 1.1 Component
```javascript
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
}
class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
   }
}
class Content extends React.Component {
   render() {
      return (
         <div>
            <h2>Content</h2>
            <p>The content text!!!</p>
         </div>
      );
   }
}
export default App;
```
### 1.2 Component LifeCycle
* `componentWillMount` is executed before rendering, on both the server and the client side.
* `componentDidMount` is executed after the first render only on the client side.
* `componentWillReceiveProps` is invoked as soon as the props are updated before another render is called.
* `shouldComponentUpdate` should return true or false value. This will determine if the component will be updated or not. This is set to true by default. If you are sure that the component doesn't need to render after state or props are updated, you can return false value.
* `componentWillUpdate` is called just before rendering.
* `componentDidUpdate` is called just after rendering.
* `componentWillUnmount` is called after the component is unmounted from the dom.

### 1.3 State
State is the place where the data comes from.
```javascript
import React from 'react';

class App extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         header: "Header from state...",
         content: "Content from state..."
      }
   }
   render() {
      return (
         <div>
            <h1>{this.state.header}</h1>
            <h2>{this.state.content}</h2>
         </div>
      );
   }
}
export default App;
```
Get state value.
```javascript
let products = this.state.products;
```
Set state value.
```javascript
this.setState({products: this.props.products});
```
It's important to note that `setState` method is asynchronous. Don't check state value after calling it. 'this.state' may return the old value.

### 1.4 Props
The main difference between state and props is that props are immutable. This is why the container component should define the state that can be updated and changed, while the child components should only pass data from the state using props.
App.js
```javascript
import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.headerProp}</h1>
            <h2>{this.props.contentProp}</h2>
         </div>
      );
   }
}
export default App;
```
index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App headerProp = "Header from props..." contentProp = "Content
   from props..."/>, document.getElementById('app'));

export default App;
```
Typechecking With PropTypes.
```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired
};
```
For performance reasons, propTypes is only checked in development mode.

## 2. Style in React
### 2.1 CSS Stylesheet
```javascript
import React from 'react';
import './DottedBox.css';

const DottedBox = () => (
  <div className="DottedBox">
    <p className="DottedBox_content">Get started with CSS styling</p>
  </div>
);

export default DottedBox;
```
### 2.2 Inline Styling
```javascript
import React from 'react';

const divStyle = {
  margin: '40px',
  border: '5px solid pink'
};

const Box = () => (
  <div style={divStyle}>
  </div>
);

export default Box;
```
### 2.3 CSS Modules
```javascript
import React from 'react';
import styles from './DashedBox.css';

const DashedBox = () => (
  <div className={styles.container}>
    <p className={styles.content}>Get started with CSS Modules style</p>
  </div>
);

export default DashedBox;
```
### 2.4 Styled-components
[Styled-components](https://github.com/styled-components/styled-components) is a library for React and React Native that allows you to use component-level styles in your application that are written with a mixture of JavaScript and CSS
```javascript
import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin: 40px;
  border: 5px outset pink;
  &:hover {
   background-color: yellow;
 }
`;

const Paragraph = styled.p`
  font-size: 15px;
  text-align: center;
`;

const OutsetBox = () => (
  <div>
    <Paragraph>Get started with styled-components 💅</Paragraph>
  </div>
);

export default OutsetBox;
```

## 3. Using Bootstrap in React
[Bootstrap](https://getbootstrap.com/) is the most popular HTML, CSS, and JavaScript framework for developing responsive, mobile-first web sites. It is completely free to download and use!
### 3.1 Using Bootstrap Directly
First, add Bootstrap reference to the index page.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Game Store - React</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```
Then, use Bootstrap tags and styles to create html controls in React components.
```html
<button type="button" class="btn btn-success" onClick=someCallback>
  Save
</button>
```
### 3.2 React-Bootstrap
[React-Bootstrap](https://react-bootstrap.github.io/introduction.html) is a library of reusable front-end components. You'll get the look-and-feel of Twitter Bootstrap, but with much cleaner code, via Facebook's React.js framework.  
First, install 'react-bootstrap'.
```sh
$ npm install react-bootstrap --saves
```
And, include 'react-bootstrap' in React component.
```javascript
import {Button} from 'react-bootstrap';
```
Then, use react-bootstrap controls as follows.
```html
<Button bsStyle="success" onClick={someCallback}>
  Save
</Button>
```
View the React-Bootstrap library on the [components page](https://react-bootstrap.github.io/components.html).

## 4. React Developer Tools
[React Developer Tools](https://github.com/facebook/react-devtools) is a Chrome DevTools extension for the open-source React JavaScript library. It allows you to inspect the React component hierarchies in the Chrome Developer Tools.

You will get a new tab called React in your Chrome DevTools. This shows you the root React components that were rendered on the page, as well as the subcomponents that they ended up rendering.

You can install it as Chrome extension.
![MIME Type](/public/pics/2017-08-15/extensions.png){:width="800px"}
You will see a tab called `React` in Chrome Developer Tools.
![MIME Type](/public/pics/2017-08-15/devtools.png)

## 5. References
* [Official Docs](https://reactjs.org/docs/hello-world.html)
* [React.Component](https://reactjs.org/docs/react-component.html)
* [ReactJS Tutorial](https://www.tutorialspoint.com/reactjs/index.htm)
* [React.createClass versus extends React.Component](https://toddmotto.com/react-create-class-versus-component/)
* [Four ways to style react components](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822)
* [React-Bootstrap Components](https://react-bootstrap.github.io/components.html)
* [Handling Events](https://reactjs.org/docs/handling-events.html)
* [New React Developer Tools](https://reactjs.org/blog/2015/09/02/new-react-developer-tools.html)
* [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
