---
layout: tutorial
key: note
title: "CSS Interview Questions"
index: 9613
subcategory: interview-frontend
date: 2016-01-13
tags: [CSS]
---

> Knowledges of front end.

## 1. CSS
* CSS stands for Cascading Style Sheets
* CSS describes how HTML elements are to be displayed on screen, paper, or in other media
* CSS saves a lot of work. It can control the layout of multiple web pages all at once
* External stylesheets are stored in CSS files

### 1.1 CSS Syntax
A CSS rule-set consists of a `selector` and a `declaration block`:
![image](/public/images/note/9613/selector.gif){:width="500px"}  
* The selector points to the HTML element you want to style.
* The declaration block contains one or more declarations separated by semicolons.
* Each declaration includes a CSS property name and a value, separated by a colon.
* A CSS declaration always ends with a semicolon, and declaration blocks are surrounded by curly braces.

### 1.2 CSS Selectors
CSS selectors are used to "find" (or select) HTML elements based on their element name, id, class, attribute, and more.
* element Selector
* id Selector
* class Selector

```css
/* element selector */
p {
  text-align: center;
  color: red;
}

/* id selector */
#para1 {
  text-align: center;
  color: red;
}

/* class selector */
.center {
  text-align: center;
  color: red;
}

/* only <p> elements with class="center" */
p.center {
  text-align: center;
  color: red;
}

/* Grouping Selectors */
h1, h2, p {
  text-align: center;
  color: red;
}
```

### 1.3 Three Ways to Insert CSS
* External style sheet
* Internal style sheet
* Inline style

External style sheet
```html
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

Internal Style Sheet
```html
<head>
<style>
body {
  background-color: linen;
}

h1 {
  color: maroon;
  margin-left: 40px;
}
</style>
</head>
```

Inline Styles

To use inline styles, add the `style` attribute to the relevant element. The style attribute can contain any CSS property.
```html
<h1 style="color:blue;margin-left:30px;">This is a heading</h1>
```

Multiple Style Sheets  
If some properties have been defined for the same selector (element) in different style sheets, the value from the `last read` style sheet will be used.

### 1.4 Cascading Order
What style will be used when there is more than one style specified for an HTML element?

All the styles in a page will "cascade" into a new "virtual" style sheet by the following rules, where number one has the highest priority:
* Inline style (inside an HTML element)
* External and internal style sheets (in the head section)
* Browser default

So, an `inline style` has the highest priority, and will override external and internal styles and browser defaults.

## 2. Basic
### 2.1 CSS Colors
```html
<!-- Background Color -->
<h1 style="background-color:DodgerBlue;">Hello World</h1>
<p style="background-color:Tomato;">Lorem ipsum...</p>

<!-- Text Color -->
<h1 style="color:Tomato;">Hello World</h1>
<p style="color:DodgerBlue;">Lorem ipsum...</p>
<p style="color:MediumSeaGreen;">Ut wisi enim...</p>

<!-- Border Color -->
<h1 style="border:2px solid Tomato;">Hello World</h1>
<h1 style="border:2px solid DodgerBlue;">Hello World</h1>
<h1 style="border:2px solid Violet;">Hello World</h1>

<!-- Color Value -->
<h1 style="background-color:rgb(255, 99, 71);">...</h1>
<h1 style="background-color:#ff6347;">...</h1>
<h1 style="background-color:hsl(9, 100%, 64%);">...</h1>

<h1 style="background-color:rgba(255, 99, 71, 0.5);">...</h1>
<h1 style="background-color:hsla(9, 100%, 64%, 0.5);">...</h1>
```
### 2.2 CSS Backgrounds
The CSS background properties are used to define the background effects for elements. CSS background properties:
* background-color
* background-image
* background-repeat
* background-attachment
* background-position

1) Background Color
```css
body {
  background-color: lightblue;
}
h1 {
  background-color: green;
}
div {
  background-color: lightblue;
}
p {
  background-color: yellow;
}
```
2) Background Image
```css
body {
  background-image: url("paper.gif");
}
```
Background Image - Repeat Horizontally or Vertically  
By default, the background-image property repeats an image both horizontally and vertically.

Make background image repeat horizontally.
```css
body {
  background-image: url("gradient_bg.png");
  background-repeat: repeat-x;
}
```
Make background image repeat vertically.
```css
body {
  background-image: url("gradient_bg.png");
  background-repeat: repeat-y;
}
```
Background Image - Set position and no-repeat
```css
body {
  background-image: url("img_tree.png");
  background-repeat: no-repeat;   /* show the background image only once */
  background-position: right top; /* change the position of the image */
}
```
Background - Shorthand property
```css
body {
  background: #ffffff url("img_tree.png") no-repeat right top;
}
```
### 2.3 CSS Borders
Border Style  
The `border-style` property specifies what kind of border to display.

The following values are allowed:
* `dotted` - Defines a dotted border
* `dashed` - Defines a dashed border
* `solid` - Defines a solid border
* `double` - Defines a double border
* `groove` - Defines a 3D grooved border. The effect depends on the border-color value
* `ridge` - Defines a 3D ridged border. The effect depends on the border-color value
* `inset` - Defines a 3D inset border. The effect depends on the border-color value
* `outset` - Defines a 3D outset border. The effect depends on the border-color value
* `none` - Defines no border
* `hidden` - Defines a hidden border

Example
```css
p.dotted {border-style: dotted;}
p.dashed {border-style: dashed;}
p.solid {border-style: solid;}
p.double {border-style: double;}
p.groove {border-style: groove;}
p.ridge {border-style: ridge;}
p.inset {border-style: inset;}
p.outset {border-style: outset;}
p.none {border-style: none;}
p.hidden {border-style: hidden;}
p.mix {border-style: dotted dashed solid double;}
```

Border Width
```css
p.one {
  border-style: solid;
  border-width: 5px;
}

p.two {
  border-style: solid;
  border-width: medium;
}

p.three {
  border-style: solid;
  border-width: 2px 10px 4px 20px;
}
```

Border Color
```css
p.one {
  border-style: solid;
  border-color: red;
}

p.two {
  border-style: solid;
  border-color: green;
}

p.three {
  border-style: solid;
  border-color: red green blue yellow;
}
```
Border - Individual Sides  
In CSS, there are also properties for specifying each of the borders (`top, right, bottom, and left`):
```css
p {
  border-top-style: dotted;
  border-right-style: solid;
  border-bottom-style: dotted;
  border-left-style: solid;
}
```

Border - Shorthand Property
The `border` property is a shorthand property for the following individual border properties:
* border-width
* border-style (required)
* border-color

```css
p {
  border: 5px solid red;
}

/* Left border */
p {
  border-left: 6px solid red;
  background-color: lightgrey;
}

/* Bottom border */
p {
  border-bottom: 6px solid red;
  background-color: lightgrey;
}

/* Rounded Borders */
p {
  border: 2px solid red;
  border-radius: 5px;
}
```

### 2.4 CSS Margins

### 2.5 CSS Box Model
The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content. The image below illustrates the box model:
![image](/public/images/note/9613/box_model.png){:width="600px"}  
Explanation of the different parts:
* `Content` - The content of the box, where text and images appear
* `Padding` - Clears an area around the content. The padding is transparent
* `Border` - A border that goes around the padding and content
* `Margin` - Clears an area outside the border. The margin is transparent

Example
```css
div {
  width: 300px;
  border: 15px solid green;
  padding: 50px;
  margin: 20px;
}
```

### 2.9 CSS Layout - float and clear
The CSS `float` property specifies how an element should float. The CSS `clear` property specifies what elements can float beside the cleared element and on which side.

1) The float Property  
The float property is used for positioning and formatting content e.g. let an image float left to the text in a container. The float property can have one of the following values:
* `left` - The element floats to the left of its container
* `right`- The element floats to the right of its container
* `none` - The element does not float (will be displayed just where it occurs in the text). This is default
* `inherit` - The element inherits the float value of its parent

In its simplest use, the float property can be used to wrap text around images.

2) The clear Property
The `clear` property specifies what elements can float beside the cleared element and on which side. The clear property can have one of the following values:
* `none` - Allows floating elements on both sides. This is default
* `left` - No floating elements allowed on the left side
* `right` - No floating elements allowed on the right side
* `both` - No floating elements allowed on either the left or the right side
* `inherit` - The element inherits the clear value of its parent

**The most common way to use the clear property is after you have used a float property on an element.**
When clearing floats, you should match the clear to the float: If an element is floated to the left, then you should clear to the left. Your floated element will continue to float, but the cleared element will appear below it on the web page.

```html
<!DOCTYPE html>
<html>
<head>
<style>
.div3 {
  float: left;
  width: 100px;
  height: 50px;
  margin: 10px;
  border: 3px solid #73AD21;
}

.div4 {
  border: 1px solid red;
  clear: left;
}
</style>
</head>
<body>

<h2>With clear</h2>
<div class="div3">div3</div>
<div class="div4">div4 - Here, clear: left; moves div4 down below the floating div3. The value "left" clears elements floated to the left. You can also clear "right" and "both".</div>

</body>
</html>
```

The clearfix Hack
If an element is taller than the element containing it, and it is floated, it will "overflow" outside of its container. Then we can add `overflow: auto;` to the containing element to fix this problem:
```html
<!DOCTYPE html>
<html>
<head>
<style>
div {
  border: 3px solid #4CAF50;
  padding: 5px;
}

.clearfix {
  overflow: auto;
}

.img2 {
  float: right;
}
</style>
</head>
<body>

<p style="clear:right">Add a clearfix class with overflow: auto; to the containing element, to fix this problem:</p>

<div class="clearfix">
  <img class="img2" src="pineapple.jpg" alt="Pineapple" width="170" height="170">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum...
</div>

</body>
</html>
```


### 2.10 CSS Image Sprites
An `image sprite` is a collection of images put into a single image. A web page with many images can take a long time to load and generates multiple server requests. Using image sprites will `reduce the number of server requests` and save bandwidth.

```html
<!DOCTYPE html>
<html>
<head>
<style>
#home {
  width: 46px;
  height: 44px;
  background: url(img_navsprites.gif) 0 0;
}

#next {
  width: 43px;
  height: 44px;
  background: url(img_navsprites.gif) -91px 0;
}
</style>
</head>
<body>

<img id="home" src="img_trans.gif" width="1" height="1"><br><br>
<img id="next" src="img_trans.gif" width="1" height="1">

</body>
</html>
```

### 2.11 CSS Box Sizing
The CSS `box-sizing` property allows us to include the `padding` and `border` in an element's total width and height.
```html
<!DOCTYPE html>
<html>
<head>
<style>
.div1 {
  width: 300px;
  height: 100px;
  border: 1px solid blue;
}

.div2 {
  width: 300px;
  height: 100px;  
  padding: 50px;  /* div2 will be larger than div1 because of padding */
  border: 1px solid red;
}
</style>
</head>
<body>

<div class="div1">This div is smaller (width is 300px and height is 100px).</div>
<br>
<div class="div2">This div is bigger (width is also 300px and height is 100px).</div>

</body>
</html>
```
To make them appear in same size, set `box-sizing: border-box;` on an element padding and border are included in the width and height.
```html
<!DOCTYPE html>
<html>
<head>
<style>
.div1 {
  width: 300px;
  height: 100px;
  border: 1px solid blue;
  box-sizing: border-box; /* include padding and board */
}

.div2 {
  width: 300px;
  height: 100px;  
  padding: 50px;
  border: 1px solid red;
  box-sizing: border-box; /* include padding and board */
}
</style>
</head>
<body>

<div class="div1">Both divs are the same size now!</div>
<br>
<div class="div2">Hooray!</div>

</body>
</html>
```



## 3. Responsive Web Design
* Responsive web design makes your web page look good on all devices.
* Responsive web design uses only HTML and CSS.
* Responsive web design is not a program or a JavaScript.

It is called responsive web design when you use CSS and HTML to resize, hide, shrink, enlarge, or move the content to make it look good on any screen.

### 3.1 The Viewport
HTML5 introduced a method to let web designers take control over the viewport, through the <meta> tag.

You should include the following <meta> viewport element in all your web pages:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
* A `<meta>` viewport element gives the browser instructions on how to control the page's dimensions and scaling.
* The `width=device-width` part sets the width of the page to follow the screen-width of the device (which will vary depending on the device).
* The `initial-scale=1.0` part sets the initial zoom level when the page is first loaded by the browser.

### 3.2 Grid-View
Many web pages are based on a `grid-view`, which means that the page is divided into `columns`. Using a grid-view is very helpful when designing web pages. It makes it easier to place elements on the page. A responsive grid-view often has `12 columns`, and has a total width of `100%`, and will shrink and expand as you resize the browser window.

Building a Responsive Grid-View  
1) First ensure that all HTML elements have the `box-sizing` property set to `border-box`. This makes sure that the padding and border are included in the total width and height of the elements.
```css
* {
  box-sizing: border-box;
}
```
2) Create columns
```html
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
* {
  box-sizing: border-box;
}

.menu {
  width: 25%;
  float: left;
  padding: 15px;
  border: 1px solid red;
}

.main {
  width: 75%;
  float: left;
  padding: 15px;
  border: 1px solid red;
}
</style>
</head>
<body>

<div class="menu">left menu</div>

<div class="main">content</div>

</body>
</html>
```

12 columns-grid view
```css

/* The columns inside a row are all floating to the left, and are therefore taken out of the flow of the page, and other elements will be placed as if the columns do not exist. To prevent this, we will add a style that clears the flow. */
.row::after {
  content: "";
  clear: both;
  display: table;
}

/*  All these columns should be floating to the left, and have a padding of 15px */
[class*="col-"] {
  float: left;
  padding: 15px;
  border: 1px solid red;
}

.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}
```
Usage.
```html
<!-- Each row should be wrapped in a <div>. The number of columns inside a row should always add up to 12 -->
<div class="row">
  <div class="col-3">3</div>
  <div class="col-9">9</div>
</div>
<div class="row">
  <div class="col-12">12</div>
</div>
<div class="row">
  <div class="col-2">2</div>
  <div class="col-10">10</div>
</div>
```
### 3.3 Media Queries
Media query is a CSS technique introduced in CSS3. It uses the `@media` rule to include a block of CSS properties only if a certain condition is true.

If the browser window is 600px or smaller, the background color will be lightblue.
```css
@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

Always Design for Mobile First
```css
/* For mobile phones: */
[class*="col-"] {
  width: 100%;
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
  .col-1 {width: 8.33%;}
  .col-2 {width: 16.66%;}
  .col-3 {width: 25%;}
  .col-4 {width: 33.33%;}
  .col-5 {width: 41.66%;}
  .col-6 {width: 50%;}
  .col-7 {width: 58.33%;}
  .col-8 {width: 66.66%;}
  .col-9 {width: 75%;}
  .col-10 {width: 83.33%;}
  .col-11 {width: 91.66%;}
  .col-12 {width: 100%;}
}
```

Typical Device Breakpoints
```css
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) { }

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) { }

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) { }

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) { }

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) { }
```

Change Font Size With Media Queries
```css
/* If the screen size is 601px or more, set the font-size of <div> to 80px */
@media only screen and (min-width: 601px) {
  div.example {
    font-size: 80px;
  }
}

/* If the screen size is 600px or less, set the font-size of <div> to 30px */
@media only screen and (max-width: 600px) {
  div.example {
    font-size: 30px;
  }
}
```
### 3.4 Images
Different Images for Different Devices
```css
/* For width smaller than 400px: */
body {
  background-image: url('img_smallflower.jpg');
}

/* For width 400px and larger: */
@media only screen and (min-width: 400px) {
  body {
    background-image: url('img_flowers.jpg');
  }
}
```
HTML5 <picture> Element
```html
<picture>
  <source srcset="img_smallflower.jpg" media="(max-width: 400px)">
  <source srcset="img_flowers.jpg">
  <img src="img_flowers.jpg" alt="Flowers">
</picture>
```
* The `srcset` attribute is required, and defines the source of the image.
* The `media` attribute is optional, and accepts the media queries.
* You should also define an `<img>` element for browsers that do not support the `<picture>` element.

## 4. CSS Grid
The `CSS Grid Layout Module` offers a grid-based layout system, with rows and columns, making it easier to design web pages without having to use floats and positioning.

A Grid Layout must have a parent element with the `display` property set to `grid` or `inline-grid`. Direct child element(s) of the grid container automatically becomes grid items.

Create a 3x3 grid.
```html
<!DOCTYPE html>
<html>
<head>
<style>
.grid-container {
  display: grid; /* must set to `grid` or `inline-grid` */
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  padding: 10px;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>
</head>
<body>

<h1>The display Property:</h1>

<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>  
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>  
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>  
</div>

</body>
</html>
```

### 4.1 Properties
* Grid Columns - The vertical line of grid items are called columns.
* Grid Rows - The horizontal line of grid items are called rows.
* Grid Gaps - The space between each column/row are called gaps.

You can adjust the `gap` size by using one of the following properties:
* grid-column-gap
* grid-row-gap
* grid-gap

Grid Lines
* The line between columns are called column lines.
* The line between rows are called row lines.

Merge first and second columns in first row.
```css
/* Place a grid item at column line 1, and let it end on column line 3 */
.item1 {
  grid-column-start: 1;
  grid-column-end: 3;
}
```

Merge first and second rows in first column.
```css
/* Place a grid item at row line 1, and let it end on row line 3 */
.item1 {
  grid-row-start: 1;
  grid-row-end: 3;
}
```

## 1. Event Bubbling and Capturing

Event bubbling and capturing are two ways of event propagation in the HTML DOM API, when an event occurs in an element inside another element, and both elements have registered a handle for that event. The event propagation mode determines in which order the elements receive the event.
* With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.
* With capturing, the event is first captured by the outermost element and propagated to the inner elements.

Capturing is also called "trickling", which helps remember the propagation order:
```raw
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
* [CSS Introduction](https://www.w3schools.com/css/css_intro.asp)
* [What is event bubbling and capturing?](https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing)
* [Event delegation](https://javascript.info/event-delegation)
* [What's the difference between JavaScript event delegation, bubbling, and capturing?](https://gomakethings.com/whats-the-difference-between-javascript-event-delegation-bubbling-and-capturing/)
* [What’s the Difference Between Class & Prototypal Inheritance?](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)
