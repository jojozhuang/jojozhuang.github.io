---
layout: tutorial
key: tutorial
title: "Jekyll - Progress Bar"
index: 8121
subcategory: jekyll
date: 2019-06-04
tags: [Nanobar, Progress Bar]
---

> Show progress bar when page is loading.

## 1. Progress Bar
[Nanobar](http://nanobar.jacoborus.codes/) is a very lightweight progress bar which generates a highly customizable top bar.

## 2. Generate Top Bar
### 2.1 Download Nanobar
Download and extract the [latest release](https://github.com/jacoborus/nanobar/archive/master.zip). Unzip the package and copy the `nanobar.min.js` file your project or website folder, for example `/assets/js/nanobar.min.js`.
### 2.2 Include Nanobar
Edit `_layouts/default.html`, insert script tag and set src to the path of the minimized version nonabar.
```html
<script src="/assets/js/nanobar.min.js"></script>
```
### 2.3 Nanobar in Html
Edit `_layouts/default.html`, add nanobar below the navigation bar.
```html
...
<body>
  <nav class="navbar navbar-expand-lg bg-dark fixed-top navbar-dark navbar-custom">
   ...
  </nav>
  <div class="nanobar" id="top-progress-bar" style="position: fixed;">
    <div class="bar"></div>
  </div>
  ...
</body>
```
### 2.4 Customize Top Progress Bar
Add the following css for nanobar into `/assets/css/main.scss`.
```css
.nanobar .bar {
  margin-top: 56px;
  background: #1cc927;
}
```
### 2.5 Invoke the Progress
Create nanobar with javascript and assign it to div with classname `nanobar`. Notice, the progress is dummy. It is fixed with three steps.
```html
<!-- add dummy progress bar -->
<script>
  var options = {
    classname: 'nanobar',
    id: 'top-progress-bar'
  };
  var nanobar = new Nanobar(options);
  nanobar.go( 30 );
  nanobar.go( 76 );
  nanobar.go(100);
</script>
```
### 2.6 Test
Access any page, there is a green top bar below the navigation bar.
![image](/assets/images/jekyll/8113/progress_bar.png)

## 3. Reference
* [Adding Top Progress Bar to Websites](https://blog.webjeda.com/top-bar-website/)
* [Nanobar - A lightweight progress bar](http://nanobar.jacoborus.codes/)
* [Pro Sidebar Template with Bootstrap 4](https://bootsnipp.com/snippets/Q0dAX)
* [Navbar example](https://getbootstrap.com/docs/4.1/examples/navbar-static/?)
