---
layout: post
key: blog
title: "Cannot open mp4 video file from localhost"
date: 2016-03-04
categories:
- blog
---

I'm building an ASP.NET MVC web application with Visual Studio 2015. When testing the app, the video file in the page cannot be played. If I copy the full path(eg. http://localhost:22962/204304/Video/lecture.mp4) to chrome, it can be accessed but not start to play, which means the file address is fine, but something wrong with other reasons.

After searching from the Intenet, I found the cause, the .mp4 MIME type is not configured in IIS. If you deployed your app to IIS, you should add .mp4 to MIME type list of your website. Save and restart IIS.
![MIME Type](/public/pics/iismime.png "MIME Type")
![Add New MIME Type](/public/pics/iismimeadd.png "Add New MIME Type")
If you are using Visual Studio which uses IIS Express for hosting and debugging, you can add mimeMap section to the web.config file.
```
<system.webServer>
  <staticContent>
    <mimeMap fileExtension=".mp4" mimeType="video/mp4" />
  </staticContent>
</system.webServer>
```
After the above configuration, the mp4 file can be played in web browser properly.
