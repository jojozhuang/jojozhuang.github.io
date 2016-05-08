---
layout: post
key: blog
title: "Cannot open mp4 video file from localhost"
date: 2016-03-04
categories:
- blog
---

I'm building an ASP.NET MVC web application with Visual Studio 2015. When testing the app, there is a page which contains a video file doesn't work, the mp4 video is not played. If I copy the full path(eg. http://localhost:22962/204304/Video/lecture.mp4) of the video to Chrome's address bar, it can be accessed but without being played. That means the file url is correct, but something wrong because of other reasons.

After searching from the Intenet, I found the cause, the .mp4 MIME type is not configured in IIS. If you deployed your app to IIS, you should add .mp4 to MIME type list of your website. Restart IIS after saving the type.
![MIME Type](/public/pics/iismime.png "MIME Type")
![Add New MIME Type](/public/pics/iismimeadd.png "Add New MIME Type")

In addition, if you are using Visual Studio which takes IIS Express for hosting and debugging, you can add mimeMap section to the web.config file of your website project.

```
<system.webServer>
  <staticContent>
    <mimeMap fileExtension=".mp4" mimeType="video/mp4" />
  </staticContent>
</system.webServer>
```

After the above configuration, the mp4 file can be played in web browser properly.
