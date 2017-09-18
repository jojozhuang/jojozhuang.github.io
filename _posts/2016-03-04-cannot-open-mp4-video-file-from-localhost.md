---
layout: post
key: blog
title: "Cannot open mp4 video file from localhost"
date: 2016-03-04
tags: IIS, MIME
categories: blog
---

I'm building a web application with ASP.NET MVC in Visual Studio 2015. When testing the app locally, there is a page which contains a video file doesn't work. Web browser is unable to play the mp4 video. If I copy the video URL(eg. http://localhost:22962/204304/Video/lecture.mp4) to Chrome's address bar, it can be accessed but without being played. That means the video URL is correct, there must be other reasons.

After searching on Internet, I found the cause--the .mp4 MIME type is not configured in IIS. If your app needs to deal with mp4 files, you should make sure .mp4 MIME type is in the IIS website. Create one if it doesn't exist.   
![MIME Type](/public/pics/2016-03-04/iismime.png)  
![Add New MIME Type](/public/pics/2016-03-04/iismimeadd.png)  
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
