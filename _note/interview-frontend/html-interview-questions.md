---
layout: tutorial
key: note
title: "Html Interview Questions"
index: 9612
category: interview-frontend
date: 2016-01-12
tags: [Html, html5]
---

> Knowledges of html

## 0. Specific
### 0.1 Secure Correct Behavior in Older Browser
Teach web browser to display new element properly. The below css can secure correct behavior in older browsers, you can set the CSS display property for these HTML5 elements to block.
```css
header, section, footer, aside, nav, main, article, figure {
  display: block;
}
```
### 0.2 Create Custom Element
Adds a new element called <myHero> to an HTML page, and defines a style for it.
```html
<!DOCTYPE html>
<html>
<head>
<script>document.createElement("myHero")</script>
<style>
myHero {
  display: block;
  background-color: #dddddd;
  padding: 50px;
  font-size: 30px;
}
</style>
</head>
<body>

<h1>A Heading</h1>
<myHero>My Hero Element</myHero>

</body>
</html>
```
* The JavaScript statement document.createElement("myHero") is needed to create a new element in IE 9, and earlier.

### 0.3 Migration from HTML4 to HTML5

Typical HTML4           | Typical HTML5
------------------------|-------------------
`<div id="header">`     | `<header>`
`<div id="menu">`       | `<nav>`
`<div id="content">`    | `<section>`
`<div class="article">` | `<article>`
`<div id="footer">`     | `<footer>`

## 1. Basic
### 1.1 What is HTML?
HTML is the standard markup language for creating Web pages.
* HTML stands for `Hyper Text Markup Language`
* HTML describes the structure of Web pages using markup
* HTML elements are the building blocks of HTML pages
* HTML elements are represented by tags
* HTML tags label pieces of content such as "heading", "paragraph", "table", and so on
* Browsers do not display the HTML tags, but use them to render the content of the page

Example of html document.
```html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```
* The `<!DOCTYPE html>` declaration defines this document to be HTML5
* The `<html>` element is the root element of an HTML page
* The `<head>` element contains meta information about the document
* The `<title>` element specifies a title for the document
* The `<body>` element contains the visible page content
* The `<h1>` element defines a large heading
* The `<p>` element defines a paragraph

The HTML `<head>` element has nothing to do with HTML headings. The <head> element is a container for metadata. HTML metadata is data about the HTML document. Metadata is not displayed. The <head> element is placed between the <html> tag and the <body> tag.

### 1.2 Tags
* Documents
* Headings
* Paragraphs
* Links
* Images
* Buttons
* Lists
* Tables
* Video
* Audio

```html
<!-- heading h1,h2,h3,h4,h5,h6-->
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
<h4>This is heading 4</h4>
<h5>This is heading 5</h5>
<h6>This is heading 6</h6>

<!-- paragraphs -->
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>

<!-- tooltip with title attribute -->
<p title="I'm a tooltip">
This is a paragraph.
</p>

<!-- links -->
<a href="https://www.w3schools.com">This is a link</a>

<!-- images -->
<img src="johnny.jpg" alt="profile image" width="200" height="150">

<!-- button -->
<button>Click me</button>

<!-- unordered list -->
<ul style="list-style-type:disc;"> <!-- disc, circle, square, none -->
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>

<!-- ordered list -->
<ol start="50" type="I" > <!-- 1:number, A: uppercase letters, a: lowercase letters, I: uppercase roman numbers, i: lowercase roman numbers-->
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>

<!-- description list -->
<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>

<!-- table -->
<table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table>

<!-- video -->
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
Your browser does not support the video tag.
</video>

<!-- audio -->
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

<!-- object -->
<object width="400" height="50" data="bookmark.swf"></object>
<object width="100%" height="500px" data="snippet.html"></object>
<object data="audi.jpeg"></object>
<object width="420" height="315" data="https://www.youtube.com/v/tgbNymZ7vqY"></object>

<!-- line break -->
<br>
```
### 1.3 HTML Styles
Setting the style of an HTML element, can be done with the style attribute.
* Use the `style` attribute for styling HTML elements
* Use `background-color` for background color
* Use `color` for text colors
* Use `font-family` for text fonts
* Use `font-size` for text sizes
* Use `text-align` for text alignment

Syntax of style attribute.
```html
<tagname style="property:value;">  <!--The property is a CSS property. The value is a CSS value.-->
```

Example.
```html
<!-- Background Color -->
<body style="background-color:powderblue;">
    <!-- Text Color -->
    <h1 style="color:blue;">This is a heading</h1>
    <p style="color:red;">This is a paragraph.</p>
    <!-- Fonts -->
    <h1 style="font-family:verdana;">This is a heading</h1>
    <p style="font-family:courier;">This is a paragraph.</p>
    <!-- Text Size -->
    <h1 style="font-size:300%;">This is a heading</h1>
    <p style="font-size:160%;">This is a paragraph.</p>
    <!-- Text Alignment -->
    <h1 style="text-align:center;">Centered Heading</h1>
    <p style="text-align:center;">Centered paragraph.</p>
</body>
```

### 1.4 Formatting
Formatting elements were designed to display special types of text:
* `<b>` - Bold text
* `<strong>` - Important text
* `<i>` - Italic text
* `<em>` - Emphasized text
* `<mark>` - Marked text
* `<small>` - Small text
* `<del>` - Deleted text
* `<ins>` - Inserted text
* `<sub>` - Subscript text
* `<sup>` - Superscript text

Note: Browsers display `<strong>` as `<b>`, and `<em>` as `<i>`. However, there is a difference in the meaning of these tags: `<b>` and `<i>` defines bold and italic text, but `<strong>` and `<em>` means that the text is `important`.

### 1.5 Links
The `target` attribute specifies where to open the linked document. It can have one of the following values:
* `_blank` - Opens the linked document in a new window or tab
* `_self` - Opens the linked document in the same window/tab as it was clicked (this is default)
* `_parent` - Opens the linked document in the parent frame
* `_top` - Opens the linked document in the full body of the window
* `framename` - Opens the linked document in a named frame

Example.
```html
<a href="https://rongzhuang.me/">Visit johnny's website</a>
<a href="https://rongzhuang.me/" target="_blank">Visit johnny website in new tab!</a>
<a href="https://rongzhuang.me/" title="Go to Johnny's website">Visit johnny's website</a>

<!-- bookmark -->
<h2 id="C4">Chapter 4</h2>
<a href="#C4">Jump to Chapter 4</a>               <!-- in the same page --->
<a href="html_demo.html#C4">Jump to Chapter 4</a> <!--in another page-->
```
Image as Link.
```html
<a href="default.asp">
  <img src="smiley.gif" alt="HTML tutorial" style="width:42px;height:42px;border:0;">
</a>
```

### 1.6 HTML Images
Always specify the width and height of an image. Two approaches to specify the size.
```html
<img src="img_girl.jpg" alt="Girl in a jacket" style="width:500px;height:600px;">
<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">

```
Width and Height, or Style?  style attribute is preferred, as it prevents styles sheets from changing the size of images.
```html
<!DOCTYPE html>
<html>
<head>
<style>
img {
  width: 100%;
}
</style>
</head>
<body>

<img src="html5.gif" alt="HTML5 Icon" width="128" height="128"> <!-- the width will be 100% --->
<img src="html5.gif" alt="HTML5 Icon" style="width:128px;height:128px;"> <!-- the width remains 128px --->

</body>
</html>
```

Image Map.
```html
<!-- image map -->
<img src="workplace.jpg" alt="Workplace" usemap="#workmap">
<map name="workmap">
  <area shape="rect" coords="34,44,270,350" alt="Computer" href="computer.htm">
  <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm">
  <area shape="circle" coords="337,300,44" alt="Coffee" href="coffee.htm">
</map>
```
Background Image.
```html
<body style="background-image:url('clouds.jpg');">

<h2>Background Image</h2>

</body>
```
The <picture> Element.
```html
<picture>
  <source media="(min-width: 650px)" srcset="img_pink_flowers.jpg">
  <source media="(min-width: 465px)" srcset="img_white_flower.jpg">
  <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;">
</picture>
```
Always specify an `<img>` element as the last child element of the `<picture>` element. The <img> element is used by browsers that do not support the `<picture>` element, or if none of the `<source>` tags matched.

### 1.7 Block and Inline Elements
* A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can).
* An inline element does not start on a new line and only takes up as much width as necessary.

Block level elements in HTML:
```html
<address><article><aside><blockquote><canvas><dd><div><dl><dt><fieldset><figcaption><figure><footer><form><h1>-<h6><header><hr><li><main><nav><noscript><ol><p><pre><section><table><tfoot><ul><video>
```
Inline elements in HTML:
```html
<a><abbr><acronym><b><bdo><big><br><button><cite><code><dfn><em><i><img><input><kbd><label><map><object><output><q><samp><script><select><small><span><strong><sub><sup><textarea><time><tt><var>
```

### 1.8 HTML Head
The `<head>` element is a container for metadata (data about data) and is placed between the <html> tag and the <body> tag.
The following tags describe metadata:
* `<title>` - define a title in the browser tab
* `<style>` - define style information
* `<meta>` - specify which character set is used, page description, keywords, author, and other metadata
* `<link>` - link to external style sheets
* `<script>` - define client-side JavaScripts
* `<base>` - specify the base URL and base target for all relative URLs in a page

Example.
```html
<!DOCTYPE html>
<html>

<head>
  <title>Page Title</title>
  <style>
    body {background-color: powderblue;}
    h1 {color: red;}
    p {color: blue;}
  </style>
  <meta charset="UTF-8">
  <meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML, CSS, XML, JavaScript">
  <meta name="author" content="John Doe">
  <meta http-equiv="refresh" content="30"> <!-- Refresh document every 30 seconds -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- control the page's dimensions and scaling -->
  <link rel="stylesheet" href="mystyle.css">
  <base href="https://rongzhuang.me/images/">
</head>

<body>
The content of the document......

<img src="html5.png">
<p>Since we have specified a base URL, the browser will look for the image "html5.png" at "https://rongzhuang.me/images/html5.png"</p>

</body>

</html>
```

### 1.9 HTML Layout
HTML5 offers new semantic elements that define the different parts of a web page:
* `<header>` - Defines a header for a document or a section
* `<nav>` - Defines a container for navigation links
* `<section>` - Defines a section in a document
* `<article>` - Defines an independent self-contained article
* `<aside>` - Defines content aside from the content (like a sidebar)
* `<footer>` - Defines a footer for a document or a section
* `<details>` - Defines additional details
* `<summary>` - Defines a heading for the details element

![image](/public/images/note/9612/html_layout.png){:width="200px"}  

Layout Techniques  
There are five different ways to create multicolumn layouts. Each way has its pros and cons:
* HTML tables (not recommended)
* CSS float property
* CSS flexbox
* CSS framework
* CSS grid

### 1.10 HTML Responsive Web Design
`Responsive Web Design` is about using HTML and CSS to automatically resize, hide, shrink, or enlarge, a website, to make it look good on all devices (desktops, tablets, and phones).

1) Setting The Viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
2) Responsive Images
```html
<img src="img_girl.jpg" style="width:100%;">
<img src="img_girl.jpg" style="max-width:100%;height:auto;">
<picture>
  <source srcset="img_smallflower.jpg" media="(max-width: 600px)">
  <source srcset="img_flowers.jpg" media="(max-width: 1500px)">
  <source srcset="flowers.jpg">
  <img src="img_smallflower.jpg" alt="Flowers">
</picture>
```
3) Responsive Text Size  
The text size can be set with a `vw` unit, which means the "viewport width". That way the text size will follow the size of the browser window.
```html
<h1 style="font-size:10vw">Hello World</h1>
```
4) Media Queries  
With media queries you can define completely different styles for different browser sizes.

Example: resize the browser window to see that the three div elements below will display horizontally on large screens and stacked vertically on small screens.
```html
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
* {
  box-sizing:border-box;
}

.left {
  background-color:#2196F3;
  padding:20px;
  float:left;
  width:20%; /* The width is 20%, by default */
}

.main {
  background-color:#f1f1f1;
  padding:20px;
  float:left;
  width:60%; /* The width is 60%, by default */
}

.right {
  background-color:#4CAF50;
  padding:20px;
  float:left;
  width:20%; /* The width is 20%, by default */
}

/* Use a media query to add a break point at 800px: */
@media screen and (max-width:800px) {
  .left, .main, .right {
    width:100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}
</style>
</head>
<body>

<h2>Media Queries</h2>
<p>Resize the browser window.</p>

<p>Make sure you reach the breakpoint at 800px when resizing this frame.</p>

<div class="left">
  <p>Left Menu</p>
</div>

<div class="main">
  <p>Main Content</p>
</div>

<div class="right">
  <p>Right Content</p>
</div>

</body>
</html>
```
### 1.11 HTML Input Types
* `<input type="button">`
* `<input type="checkbox">`
* `<input type="color">`
* `<input type="date">`
* `<input type="datetime-local">`
* `<input type="email">`
* `<input type="file">`
* `<input type="hidden">`
* `<input type="image">`
* `<input type="month">`
* `<input type="number">`
* `<input type="password">`
* `<input type="radio">`
* `<input type="range">`
* `<input type="reset">`
* `<input type="search">`
* `<input type="submit">`
* `<input type="tel">`
* `<input type="text">`
* `<input type="time">`
* `<input type="url">`
* `<input type="week">`

### 1.12 HTML Input Attributes
* value
* readonly
* disabled
* size
* maxlength

```html
<input type="text" name="firstname" value="John">
<input type="text" name="firstname" value="John" readonly>
<input type="text" name="firstname" value="John" disabled>
<input type="text" name="firstname" value="John" size="40">
<input type="text" name="firstname" maxlength="10">
```

HTML5 Attributes
* autocomplete
* autofocus
* form
* formaction
* formenctype
* formmethod
* formnovalidate
* formtarget
* height and width
* list
* min and max
* multiple
* pattern (regexp)
* placeholder
* required
* step

The following attributes for `<form>`:
* autocomplete
* novalidate

1) The autocomplete Attribute
The `autocomplete` attribute specifies whether a form or input field should have autocomplete on or off.

When autocomplete is on, the browser automatically completes the input values based on values that the user has entered before.

Tip: It is possible to have autocomplete "on" for the form, and "off" for specific input fields, or vice versa.

The autocomplete attribute works with <form> and the following <input> types: text, search, url, tel, email, password, datepickers, range, and color.

```html
<form action="/action_page.php" autocomplete="on">
  First name:<input type="text" name="fname"><br>
  Last name: <input type="text" name="lname"><br>
  E-mail: <input type="email" name="email" autocomplete="off"><br>
  <input type="submit">
</form>

<form action="/action_page.php" novalidate>
  E-mail: <input type="email" name="user_email">
  <input type="submit">
</form>

<input type="text" name="fname" autofocus>
<input type="number" name="quantity" min="1" max="5">
<input type="text" name="fname" placeholder="First name">
<input type="text" name="usrname" required>
<input type="number" name="points" step="3">
```

## 2. What is New in HTML5?
### 2.1 HTML5 Example
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Title of the document</title>
</head>

<body>
Content of the document......
</body>

</html>
```
### 2.2 New HTML5 Elements
The most interesting new HTML5 elements are:
* New semantic elements like `<header>`, `<footer>`, `<article>`, and `<section>`.
* New attributes of form elements like `number`, `date`, `time`, `calendar`, and `range`.
* New graphic elements: `<svg>` and `<canvas>`.
* New multimedia elements: `<audio>` and `<video>`.

### 2.3 New HTML5 API's
The most interesting new API's in HTML5 are:
* HTML Geolocation
* HTML Drag and Drop
* HTML Local Storage
* HTML Application Cache
* HTML Web Workers
* HTML SSE

### 2.4 HTML5 Canvas
The HTML `<canvas>` element is used to draw graphics, on the fly, via JavaScript.
```html
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>

<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// draw line
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();

// draw circle
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

// draw text
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);

// draw image
var img = document.getElementById("scream");
ctx.drawImage(img, 10, 10);
</script>
```

### 2.5 HTML5 SVG
SVG stands for Scalable Vector Graphics. SVG is used to define graphics for the Web.
```html
<!-- SVG Circle -->
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>

<!-- SVG Rectangle -->
<svg width="400" height="100">
  <rect width="400" height="100" style="fill:rgb(0,0,255);stroke-width:10;stroke:rgb(0,0,0)" />
</svg>
```

### 2.6 Differences Between SVG and Canvas
* SVG is a language for describing 2D graphics in XML.
* Canvas draws 2D graphics, on the fly (with a JavaScript).
* SVG is XML based, which means that every element is available within the SVG DOM. You can attach JavaScript event handlers for an element.
* In SVG, each drawn shape is remembered as an object. If attributes of an SVG object are changed, the browser can automatically re-render the shape.
* Canvas is rendered pixel by pixel. In canvas, once the graphic is drawn, it is forgotten by the browser. If its position should be changed, the entire scene needs to be redrawn, including any objects that might have been covered by the graphic.

### 2.7 Comparison of Canvas and SVG
The table below shows some important differences between Canvas and SVG:

| Canvas   | SVG |
| -------- | ----------- |
| 1. Resolution dependent <br> 2.No support for event handlers <br> 3.Poor text rendering capabilities <br>4.You can save the resulting image as .png or .jpg <br> 5.Well suited for graphic-intensive games <br> | 1.Resolution independent <br> 2.Support for event handlers <br> 3.Best suited for applications with large rendering areas (Google Maps) <br> 4.Slow rendering if complex (anything that uses the DOM a lot will be slow) <br> 5.Not suited for game applications |

### 2.8 HTML5 Geolocation
The `getCurrentPosition()` method is used to return the user's position.

```html
<!DOCTYPE html>
<html>
<body>

<p>Click the button to get your coordinates.</p>

<button onclick="getLocation()">Try It</button>

<p id="demo"></p>

<script>
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback,errorCallback,{timeout:10000});
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function successCallback(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  console.log(position);
}
function errorCallback(error) {
  x.innerHTML = error;
  console.log(error);
}
</script>

</body>
</html>
```
### 2.9 HTML5 Drag and Drop
```html
<!DOCTYPE HTML>
<html>
<head>
<script>
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
</script>
</head>
<body>

<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

<img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">

</body>
</html>
```

### 2.10 HTML5 Web Storage
HTML web storage provides two objects for storing data on the client:
* `window.localStorage` - stores data with no expiration date
* `window.sessionStorage` - stores data for one session (data is lost when the browser tab is closed)

Before using web storage, check browser support for localStorage and sessionStorage:
```javascript
if (typeof(Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
} else {
  // Sorry! No Web Storage support..
}
```
The localStorage Object
```javascript
// Store
localStorage.setItem("lastname", "Smith");

// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("lastname");
```
Or
```javascript
// Store
localStorage.lastname = "Smith";
// Retrieve
document.getElementById("result").innerHTML = localStorage.lastname;
```
Remove.
```javascript
localStorage.removeItem("lastname");
```
Convert to correct type after fetchhing.
```javascript
if (localStorage.clickcount) {
  localStorage.clickcount = Number(localStorage.clickcount) + 1;
} else {
  localStorage.clickcount = 1;
}
document.getElementById("result").innerHTML = "You have clicked the button " +
localStorage.clickcount + " time(s).";
```

The sessionStorage Object  
The sessionStorage object is equal to the localStorage object, except that it stores the data for only one session. The data is deleted when the user closes the specific browser tab.

### 2.11 HTML5 Web Workers
```html
<!DOCTYPE html>
<html>
<body>

<p>Count numbers: <output id="result"></output></p>
<button onclick="startWorker()">Start Worker</button>
<button onclick="stopWorker()">Stop Worker</button>

<script>
var w;

function startWorker() {
  if (typeof(Worker) !== "undefined") {
    if (typeof(w) == "undefined") {
      w = new Worker("demo_workers.js");
    }
    w.onmessage = function(event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
  }
}

function stopWorker() {
  w.terminate();
  w = undefined;
}
</script>

</body>
</html>
```
demo_workers.js
```javascript
var i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedCount()",500);
}

timedCount();
```
### 2.12 HTML5 Server-Sent Events
A `server-sent event` is when a web page automatically gets updates from a server.

The `EventSource` object is used to receive server-sent event notifications. It has three events.

Events    | Description
----------|------------------------------------------
onopen    | When a connection to the server is opened
onmessage | When a message is received
onerror   | When an error occurs

Example to receive server-sent event notifications.
```javascript
var source = new EventSource("demo_sse.php");
source.onmessage = function(event) {
  document.getElementById("result").innerHTML += event.data + "<br>";
};
```

Server-Side Code Example  
Code in PHP (demo_sse.php):
```raw
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = date('r');
echo "data: The server time is: {$time}\n\n";
flush();
?>
```
Code in ASP (VB) (demo_sse.asp):
```vbscript
<%
Response.ContentType = "text/event-stream"
Response.Expires = -1
Response.Write("data: The server time is: " & now())
Response.Flush()
%>
```
Html Quiz
https://www.w3schools.com/quiztest/quiztest.asp?qtest=HTML

Html Quiz Result
https://online-judge.netlify.com/admin/question/5caadae727c11300141bbde7

## 1. Event Bubbling and Capturing
Event bubbling and capturing are two ways of event propagation in the HTML DOM API, when an event occurs in an element inside another element, and both elements have registered a handle for that event. The event propagation mode determines in which order the elements receive the event.
* With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.
* With capturing, the event is first captured by the outermost element and propagated to the inner elements.

Capturing is also called "trickling", which helps remember the propagation order:
```sh
trickle down, bubble up
```
Back in the old days, Netscape advocated event capturing, while Microsoft promoted event bubbling. Both are part of the W3C Document Object Model Events standard (2000).

IE < 9 uses only event bubbling, whereas IE9+ and all major browsers support both. On the other hand, the performance of event bubbling may be slightly lower for complex DOMs.

We can use the `addEventListener(type, listener, useCapture)` to register event handlers for in either bubbling (default) or capturing mode. To use the capturing model pass the third argument as true.

Example
```html
<div>
    <ul>
        <li></li>
    </ul>
</div>
```
In the structure above, assume that a click event occurred in the `li` element.

In capturing model, the event will be handled by the `div` first (click event handlers in the div will fire first), then in the `ul`, then at the last in the target element `li`.

In the bubbling model, the opposite will happen: the event will be first handled by the `li`, then by the `ul`, and at last by the `div` element.

### 1.1 Stop Event Bubbling :
If you want to stop the event bubbling, this can be achieved by the use of the `event.stopPropagation()` method. If you want to stop the event flow from event target to top element in DOM, event.stopPropagation() method stops the event to travel to the bottom to top.

## 2. Event delegation
Event delegation is a technique for listening to events where you delegate a parent element as the listener for all of the events that happen inside it.

For example, if you wanted to detect any time any field changed in value inside a specific form, you could do this:
```javascript
var form = document.querySelector('#hogwarts-application');

// Listen for changes to fields inside the form
form.addEventListener('input', function (event) {

    // Log the field that was changed
    console.log(event.target);

}, false);
```

## 3. Class Inheritance vs Prototypal Inheritance

## 6. References
* [HTML Interview Questions](https://www.javatpoint.com/html-interview-questions)
* [HTML5 Tutorial](https://www.w3schools.com/html/default.asp)
