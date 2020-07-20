---
layout: tutorial
key: tutorial
title: "Building Course Player with SignalR and ASP.NET"
index: 8474
subcategory: react-app
date: 2016-03-15
tags: [SignalR, ASP.NET, jQuery]
---

> Build a course player with SignalR.

Build a realtime web application to play course recordings with [SignalR](https://www.asp.net/signalr), HTML5 Canvas and [jQuery](https://jquery.com/) based on ASP.NET MVC.

## 1. Course Player
A course player consists of three components: video, screenshot and whiteboard.
* Video is captured by a camera during the lecturing time. It is in mp4 format.
* Screenshot is captured from computer monitor shared by teachers. It contains handouts and materials for the course. Screenshot are actually images.
* Whiteboard is captured from special pens and brushes. Any operation on the board, such as writing, drawing or brushing is recorded.

Check the posting [Introduction of Course Player]({% link _tutorial/react-app/introduction-of-course-player.md %}) to learn the details.

## 2. Course Player Project
### 2.1 Creating New Projects
In Visual Studio, create a 'Web Application' project named `CoursePlayer.SignalR`, and create another 'Class' project named `CoursePlayer.Core`.

### 2.2 Core Project
Reuse the Course Player Core project, copy all files except the interface file 'IFileHelper' from 'Johnny.Portfolio.CoursePlayer.Core'.
![image](/assets/images/frontend/8474/coreproject.png){:width="350px"}
Project 'Johnny.Portfolio.CoursePlayer.Core' was created for the portfolio `Course Player Xamarin`. Check the posting [Building Course Player with Xamarin]({% link _tutorial/mobile/building-course-player-with-xamarin.md %})  for more details.

In `CourseApi.cs`, we define two methods. One is for fetching the data of screenshot, another is for fetching the data of whiteboard.
```c#
public static List<SSImage> GetScreenshotData(int second) { }
public static WBData GetWhiteboardData(int second) { }
```

When reading the data from course files, we need to decompress them first. Here, I'm using `SharpZipLib` library, visit https://github.com/icsharpcode/SharpZipLib for more details.
![image](/assets/images/frontend/8474/zipproject.png){:width="350px"}

### 2.3 Web Project
Open the web project, it looks as follows.
![image](/assets/images/frontend/8474/webproject.png){:width="350px"}
1) Install package `Microsoft.AspNet.SignalR` and its dependency through NuGet Package Manager. To enable SignalR in your application, create a class named Startup. Right click on `/App_Start` folder, choose 'New Item', then select Web->General->OWIN Startup class.
![image](/assets/images/frontend/8474/startupproject.png){:width="350px"}
![image](/assets/images/frontend/8474/startup.png){:width="800px"}
Update its content as follows.
```c#
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(CoursePlayer.SignalR.Startup))]

namespace CoursePlayer.SignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
```

2) Update `/Content/Site.css` to style the whole website.
```css
body {
    padding-top: 50px;
    padding-bottom: 20px;
}

/* Set padding to keep content from hitting the edges */
.body-content {
    padding-left: 15px;
    padding-right: 15px;
}

/* Set width on the form input elements since they're 100% wide by default */
input,
select,
textarea {
    max-width: 280px;
}

canvas {
    background: #fff;
    margin: 20px auto;
    border: 5px solid #E8E8E8;
    display: block;
}

table, th, td {
    /*border: 1px solid black;*/
    padding: 0px;
    margin: 0px;
}

canvas, video {
    margin: 0;
    padding: 0;
}
```
3) Disable bundling by commenting out the 'RegisterBundles()' method in `Global.asax`.
```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace CoursePlayer.SignalR
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //BundleConfig.RegisterBundles(BundleTable.Bundles); // comment out
        }
    }
}
```
4) Create a javascript in '/Scripts' folder named `player.js`.
```js
function playCourse(hub, playerHub, playstate, btnplay, processbar, currenttime, videoplayer, workingss, ss, workingwb, wb) {
    if (playstate == 'stopped') {
        hub.start().done(function () {
            playerHub.server.joinGroup($("#groupName").val());
            interval = setInterval(function () {
                processbar.slider("value", processbar.slider("value") + 1);
                currenttime.val(getReadableTimeText(processbar.slider("value")));
                playerHub.server.updateTime($("#groupName").val(), $("#processbar").slider("value"));
            }, 1000);
            btnplay.prop('value', 'Stop');
            playstate = "playing";
            if (videoplayer) {
                console.log('play video go')
                videoplayer.play();
            }
        });
    } else if (playstate == 'playing') {
        hub.stop($("#groupName").val());
        processbar.slider("value", 0);
        currenttime.val(getReadableTimeText(processbar.slider("value")));
        playstate = "stopped";
        // stop the interval
        clearInterval(interval);
        // clear screenshot and whiteboard
        clearScreenshot(workingss, ss);
        clearWhiteboard(workingwb, wb);
        btnplay.prop('value', 'Play');
        if (videoplayer) {
            videoplayer.currentTime(0);
            videoplayer.pause();
        }
    }
    return playstate;
}

function drawScreenshot(ssdata, workingss, ss) {
    var left, top, width, height = 0;
    var imageList = JSON.parse(ssdata);

    console.log(imageList.length);
    for (var i = 0; i < imageList.length; i++) {
        left = workingss.width() / 8 * imageList[i].Col;
        top = workingss.height() / 8 * imageList[i].Row;
        width = workingss.width() / 8;
        height = workingss.height() / 8;
        drawImageOnCanvas(workingss, left, top, width, height, "data:image/png;base64," + imageList[i].ImageStream);
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
    if (wbobj.WBLines) {
        for (var i = 0; i < wbobj.WBLines.length; i++) {
            var line = wbobj.WBLines[i];
            drawLine(ctxwb, getColor(line.Color), getWidth(line.Color), line.X0, line.Y0, line.X1, line.Y1, xRate, yRate);
        }
        var mywb = wb[0].getContext('2d');
        mywb.drawImage(workingwb[0], 0, 0);
    }
    if (wbobj.WBEvents) {
        var endMilliseconds = wbobj.Second * 1000 % 60000;
        for (var i = 0; i < endMilliseconds; i++) {
            for (var j = 0; j < wbobj.WBEvents.length; j++) {
                var event = wbobj.WBEvents[j];
                if (event && event.TimeStamp == i) {
                    if (event.X >= 0) {
                        if (!lastPoint) {
                            lastPoint = event;
                        } else {
                            drawLine(ctxwb, getColor(currentColor), currentWidth, lastPoint.X, lastPoint.Y, event.X, event.Y, xRate, yRate);
                            lastPoint = event;
                        }
                    } else {
                        switch (event.X) {
                            case -100: //Pen Up
                                currentColor = -8;
                                lastPoint = null;
                                break;
                            case -200: //Clear event
                                clearWhiteboard();
                                lastPoint = null;
                                break;
                            default:
                                currentColor = event.X;
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
Actually, this file is copied from the portfolio 'Course Player(Socket.IO)'.

5) Remove the auto generated About() and Contact() methods from `HomeController.cs`. And remove their views `About.cshtml` and `Contact.cshtml` in `/Views/Home/`. Update file `/Views/Home/Index.cshtml` as follows.
```html
@{
    ViewBag.Title = "Home";
}

<h2>Home</h2>
<h4>This is the demo page for SignalR</h4>
<ul>
  <li><a href="http://www.asp.net/signalr/overview/getting-started/tutorial-getting-started-with-signalr">Tutorial: Getting Started with SignalR 2</a></li>
  <li><a href="http://signalr.net/">http://signalr.net/</a></li>
  <li><a href="http://www.asp.net/signalr">SignalR on ASP.NET</a></li>
  <li><a href="https://jqueryui.com/slider/#rangemax">jQuery Slider Bar</a></li>
  <li><a href="http://videojs.com/">Javascript Video Controller</a></li>
</ul>

<ul>
    <li><a href="~/sliderbar.html">Jquery SliderBar Example</a></li>
    <li><a href="~/videojs.html">VideoJs Example</a></li>
</ul>
```

Update the layout file `/Views/Shared/_Layout.cshtml` as follows.
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - Demo of SignalR</title>
    <link href="~/Content/Site.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script src="~/Scripts/modernizr-2.6.2.js"></script>
    <script type="text/javascript" src="~/scripts/player.js"></script>
    <style type="text/css">
        .playercontainer {
            background-color: #99CCFF;
            border: thick solid #808080;
        }
    </style>
    <!--Script references. -->
    <!--Reference the jQuery library. -->
    <script src="~/Scripts/jquery-1.10.2.min.js"></script>
    <script src="~/Scripts/bootstrap.min.js"></script>
    <!--Reference the SignalR library. -->
    <script src="~/Scripts/jquery.signalR-2.2.2.min.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <script src="signalr/hubs"></script>
    <script src="~/Scripts/jquery.event.drag-2.2.js"></script>
    <!--jquery slider bar-->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

</head>
<body>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                @Html.ActionLink("Home", "Index", "Home", new { area = "" }, new { @class = "navbar-brand" })
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li>@Html.ActionLink("Dummy Player", "Index", "DummyPlayer", routeValues: null, htmlAttributes: null)</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container body-content">
        @RenderBody()
        <hr />
        <footer>
            <p>&copy; @DateTime.Now.Year - My ASP.NET Application</p>
        </footer>
    </div>

</body>
</html>
```

6) Create a controller named `DummyPlayerController`.
```c#
using System.Web.Mvc;

namespace CoursePlayer.SignalR.Controllers
{
    public class DummyPlayerController : Controller
    {
        // GET: Dummy Player
        public ActionResult Index()
        {
            return View();
        }
    }
}
```
Create view for this controller in folder `/Views/DummyPlayer` with the name `Index.cshtml`.
```html

@{
    ViewBag.Title = "Dummy Player";
}

<h2>Course</h2>
<div class="playercontainer">
    <table style="width:100%;" align="center">
        <tr>
            <td align="left"><label for="currenttime">Current Time:</label><input type="text" id="currenttime" readonly style="border:0; color:#f6931f; font-weight:bold;"></td>
            <td colspan="2" align="right"><input type="button" id="btnplay" value="Play" /></td>
            <td align="right"><label for="total">Total Time:</label><input type="text" id="total" readonly style="border:0; color:#f6931f; font-weight:bold;"></td>
        </tr>
        <tr><td colspan="4"><div id="processbar" style="margin-top:10px"></div></td></tr>
        <tr><td colspan="2" align="left"><canvas id="playerss" width="500" height="300" style="margin-top:10px"></canvas></td><td colspan="2" align="right"><canvas id="playerwb" width="500" height="300" style="margin-top:10px"></canvas></td></tr>
    </table>
    <input type="hidden" id="groupName" value="grpjohnny" />
    <canvas id="workingss" style="display:none" width="500" height="300"></canvas>
    <canvas id="workingwb" style="display:none" width="500" height="300"></canvas>
</div>

<style type="text/css">
    #draw {
        border: 1px solid #AAA;
        background: #EEE;
    }
</style>
<!--Add script to update the page and send messages.-->
<script type="text/javascript">
    $(function () {
        $("#groupName").val("johnnygrp" + Math.floor((Math.random() * 1000) + 1));
        var hub = $.connection.hub;
        // Declare a proxy to reference the hub.
        var playerHub = $.connection.playerHub;
        console.log(playerHub);
        //draw screenshot      
        playerHub.client.broadcastDrawScreenshot = function (ssdata) {
            //console.log("ssdata:" + ssdata)
            drawScreenshot(ssdata, $('#workingss'), $('#playerss'));
        };
        playerHub.client.broadcastDrawWhiteboard = function (wbdata) {
            //console.log("wbdata:" + wbdata)
            drawWhiteboard(wbdata, $('#workingwb'), $('#playerwb'));
        };
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
        $("#btnplay").click(function () {
            playstate = playCourse(hub, playerHub, playstate, $("#btnplay"), $("#processbar"), $("#currenttime"), null, $('#workingss'), $('#playerss'), $('#workingwb'), $('#playerwb'));
        });
    });
</script>
```
7) Include folder `/204304` to the project. This folder contains all of the data files for screenshot and whiteboard of one course recording.
![image](/assets/images/frontend/8474/recordingfiles.png){:width="350px"}
8) Create a model class `ScreenImage` in folder `/Models` with following content.
```c#
namespace CoursePlayer.SignalR.Models
{
    public class ScreenImage
    {
        public int Row { get; set; }
        public int Col { get; set; }
        public string ImageStream { get; set; }

    }
}
```

Create folder named `/SignalR`, then create class named `PlayerHub`. This hub class read data for the course and send back to client.
```c#
using CoursePlayer.Core;
using CoursePlayer.Core.Models;
using CoursePlayer.SignalR.Models;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace CoursePlayer.SignalR
{
    public class PlayerHub : Hub
    {
        public void JoinGroup(string groupName)
        {
            Groups.Add(Context.ConnectionId, groupName);
        }

        public void UpdateTime(string group, string second)
        {
            int currenttime = Convert.ToInt32(second);
            List<SSImage> images = CourseApi.GetScreenshotData(currenttime);
            List<ScreenImage> list = new List<ScreenImage>();

            // convert image from byte[] to base64 string.
            foreach (SSImage item in images)
            {
                if (item.Image == null)
                {
                    continue;
                }
                list.Add(new ScreenImage { Row = item.Row, Col = item.Col, ImageStream = Convert.ToBase64String(item.Image) });
            }
            JavaScriptSerializer jss = new JavaScriptSerializer();
            Clients.Group(group).broadcastDrawScreenshot(jss.Serialize(list));

            WBData wbData = CourseApi.GetWhiteboardData(currenttime);
            JavaScriptSerializer jss2 = new JavaScriptSerializer();
            Clients.Group(group).broadcastDrawWhiteboard(jss2.Serialize(wbData));
        }
    }
}
```
### 2.4 Running and Testing
Start the web project. Home page contains some useful information related to SignalR.
![image](/assets/images/frontend/8474/homepage.png)
Switch to 'Dummy Player'. On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The left one is for screenshot and the right one is for whiteboard.
![image](/assets/images/frontend/8474/dummyhomepage.png)
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/assets/images/frontend/8474/dummyplay.png)
You can drag the slider bar to move forward or backward.
![image](/assets/images/frontend/8474/dummydrag.png)

## 3. Enhancement with Video Player
Enhance the dummy player by replacing the slider bar with video player.
### 3.1 Reference for Video Control
Add the referencse of the video player into layout file `/Views/Shared/_Layout.cshtml`.
```html
<!--http://videojs.com/-->
<link href="http://vjs.zencdn.net/5.0.2/video-js.css" rel="stylesheet">
<script src="http://vjs.zencdn.net/ie8/1.1.0/videojs-ie8.min.js"></script>
<script src="http://vjs.zencdn.net/5.0.2/video.js"></script>
```
### 3.2 Controller and View
Create a new controller named `CoursePlayerController`.
```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CoursePlayer.SignalR.Controllers
{
    public class CoursePlayerController : Controller
    {
        // GET: CoursePlayer
        public ActionResult Index()
        {
            return View();
        }
    }
}
```
Create view for this controller in folder `/Views/CoursePlayer` with the name `Index.cshtml`.
```html

@{
    ViewBag.Title = "Course";
}

<h2>Course Player</h2>
<div class="chatcontainer">
    <table width="100%">
        <tr>
            <td><label for="currenttime">Current Time:</label><input type="text" id="currenttime" readonly style="border:0; color:#f6931f; font-weight:bold;"></td>
            <td><input type="button" id="btnplay" value="Play" /></td>
            <td align="right"><label for="total">Total Time:</label><input type="text" id="total" readonly style="border:0; color:#f6931f; font-weight:bold;"></td>
        </tr>
        <tr>
            <td colspan="3"><div id="processbar" style="margin-top:10px"></div></td>
        </tr>
    </table>
    <table width="100%" style="margin-top:20px">
        <tr>
            <td rowspan="2" width="50%">
                <video id="videoplayer" class="video-js vjs-default-skin" controls preload="none" width="530" height="690" data-setup="{}">
                    <source src="http://localhost:22962/lecture.mp4" type="video/mp4">
                    <track kind="captions" src="../shared/example-captions.vtt" srclang="en" label="English"></track>
                    <!-- Tracks need an ending tag thanks to IE9 -->
                    <track kind="subtitles" src="../shared/example-captions.vtt" srclang="en" label="English"></track>
                    <!-- Tracks need an ending tag thanks to IE9 -->
                    <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
                </video>
            </td>
            <td width="50%"><canvas id="playerss" width="500" height="330"></canvas></td>
        </tr>
        <tr>
            <td><canvas id="playerwb" width="500" height="330"></canvas></td>
        </tr>
    </table>
    <input type="hidden" id="groupName" value="grpjohnny" />
    <canvas id="workingss" style="display:none" width="500" height="300"></canvas>
    <canvas id="workingwb" style="display:none" width="500" height="300"></canvas>
</div>

<style type="text/css">
    #draw {
        border: 1px solid #AAA;
        background: #EEE;
    }
</style>

<!--Add script to update the page and send messages.-->
<script type="text/javascript">
    $(function () {
        $("#groupName").val("johnnygrp" + Math.floor((Math.random() * 1000) + 1));
        var videoplayer = videojs('videoplayer');
        var hub = $.connection.hub;
        // Declare a proxy to reference the hub.
        var playerHub = $.connection.playerHub;
        console.log(playerHub);
        //draw screenshot
        playerHub.client.broadcastDrawScreenshot = function (ssdata) {
            //console.log("ssdata:" + ssdata)
            drawScreenshot(ssdata, $('#workingss'), $('#playerss'));
        };
        playerHub.client.broadcastDrawWhiteboard = function (wbdata) {
            //console.log("wbdata:" + wbdata)
            drawWhiteboard(wbdata, $('#workingwb'), $('#playerwb'));
        };
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
                //videoplayer.currentTime(ui.value);
            }
        });
        $("#currenttime").val(getReadableTimeText($("#processbar").slider("value")));
        $("#total").val(getReadableTimeText(4 * 60 * 60 - 30 * 60));

        // play course and emit time to server
        var playstate = "stopped";
        $("#btnplay").click(function () {
            playstate = playCourse(hub, playerHub, playstate, $("#btnplay"), $("#processbar"), $("#currenttime"), videoplayer, $('#workingss'), $('#playerss'), $('#workingwb'), $('#playerwb'));
        });
    });
</script>
```
Add link for this new view in layout file.
```html
<div class="navbar-collapse collapse">
    <ul class="nav navbar-nav">
        <li>@Html.ActionLink("Dummy Player", "Index", "DummyPlayer", routeValues: null, htmlAttributes: null)</li>
        <li>@Html.ActionLink("Course Player", "Index", "CoursePlayer", routeValues: null, htmlAttributes: null)</li>
    </ul>
</div>
```
### 3.3 Final Project Structure
![image](/assets/images/frontend/8474/projectstructure.png){:width="350px"}
Notice, folder `/204304` contains the data files for screenshot and whiteboard.

### 3.4 Running and Testing
Start the web project and switch to 'Course Player'. On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The upper one is for screenshot and the lower one is for whiteboard. And there is a video player at the left side.
![image](/assets/images/frontend/8474/playerhomepage.png)
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/assets/images/frontend/8474/playing.png)
You can drag the slider bar to move forward or backward.
![image13](/assets/images/frontend/8474/drag.png)  

## 4. Conclusion  
### 4.1 Easy to Implement  
If you are familiar with C\# and ASP.NET, it is really easy to develop such real time online application. Of course, you need write some javascript code to use SignalR at the client side.  
### 4.2 Low Bandwidth Consumption  
Communication occurs only when necessary. Unlike traditional web application, WebSocket makes the web application react at real time. This improve the user experience at client side and the system performance at server side.  
### 4.3 Cross-platform(For customers/students)  
This player is web based, the only required tool on client’s machine to watch the recording is a web browser(eg. Google Chrome). Besides, this course player is based on HTML5, so it can be accessed in different web browsers and on different platforms. No need to install extra plugin in web browser, such as flash player or Silverlight.  
### 4.4 Cross-platform(For developer)  
For developer, since this WebSocket based player is a cross-platform application, it is a better solution than other platform specific solutions. Compared with the Flash player and Silverlight player, this SignalR player is simple and easy to maintain, since there is only one copy of the code.  
### 4.5 Reusable  
The core module(CoursePlayer.Core) of this application is shared with [Xamarin Course Player]({% link _project/course-player-xamarin.md %}), which is another portfolio of mine. That is a cross-platform solution for mobile development.
![image](/assets/images/frontend/8474/coreproject.png){:width="350px"}

This means, we have the cross-platform solution for developing applications by only using C\#.  
* First, use Xamarin to develop mobile apps for iOS and Android platform.  
* Second, use ASP.NET and SignalR to develop web application for different web browsers and platforms.  
* Technically, the core module can be shared and reused by mobile and web application, even more, it can be shared with winform applications.  
* Two parts cannot be reused, one is the UI, web(html) and mobile(native UI) are obviously different. And another is file operation, reading/writing file on windows/ios/linux platform varies apparently. However, the business logics are same, which can be reused.  

## 5. Source Files
* [Source files of Course Player(SignalR) on Github](https://github.com/jojozhuang/course-player-signalr)

## 6. References
* [jQuery Slider](https://jqueryui.com/slider/)
* [Video Player Control](http://videojs.com/)
