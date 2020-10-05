---
layout: tutorial
key: tutorial
title: "Video Is Not Loaded Properly From IIS Localhost"
index: 9604
subcategory: asp-net
date: 2016-03-04
tags: [IIS, MIME Type]
---

> Fix the issue that video can't be loaded.

## 1. Issue
I'm building a web application with ASP.NET MVC in Visual Studio 2015. When testing the app, I found one page can't load a video file. Web browser is unable to play the mp4 video. If I copy the video URL(eg. http://localhost:22962/204304/Video/lecture.mp4) to Chrome's address bar, it can be accessed but without being played. That means the URL is correct, but somehow there is another cause which stops the video from being played.

After Google searching, I found the cause--the .mp4 MIME type is not configured in IIS. If your app needs to deal with mp4 files, you should make sure `.mp4` is in the MIME type list of IIS website. Create one if it doesn't exist.   
![image](/assets/images/asp-net/9504/iismime.png)  
![Add New MIME Type](/assets/images/asp-net/9504/iismimeadd.png)  
You need to restart IIS after changing the configuration.  

In addition, if you are using Visual Studio which takes IIS Express for hosting and debugging, you can add mimeMap section to the web.config file of your website project.

```xml
<system.webServer>
  <staticContent>
    <mimeMap fileExtension=".mp4" mimeType="video/mp4" />
  </staticContent>
</system.webServer>
```

After the above configuration, the mp4 file can be played in web browser properly.
