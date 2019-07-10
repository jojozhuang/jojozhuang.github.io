---
layout: tutorial
key: popular
title: "Adding Share Buttons with ShareThis"
index: JK908
category: jekyll
breadcrumb: [Popular, Personal Website, GitHub Pages and Jekyll]
image: github-pages.png
date: 2018-07-08
postdate: 2017-08-20
tags: [ShareThis]
---

> Create share buttons for the most popular social medias.

## 1. ShareThis
The [ShareThis](https://www.sharethis.com/) button is an all-in-one widget that lets people share any content on the web with friends via e-mail, AIM, or text message.

## 2. Creating Share Buttons
### 2.1 Registration
Go to https://www.sharethis.com/ to create a new account.
### 2.2 Choose Button Type
ShareThis provides two types of share button, inline buttons and sticky buttons. I choose sticky button for this tutorial.
![image](/public/images/githubpages/908/buttontype.png)
### 2.3 Button Design
You can design the share buttons. Add or remove buttons based on your needs. Set the alignment, button labels, counts, etc.
![image](/public/images/githubpages/908/buttondesign.png)
### 2.4 Scripts
You will get the scripts.
![image](/public/images/githubpages/908/scripts.png)
Copy and add the scripts into `_includes/head.html`.
```html
<script type='text/javascript' src='//platform-api.sharethis.com/js/sharethis.js#property=5b595ccbf5aa6d001130cf95&product=sticky-share-buttons' async='async'></script>
```

## 4. Wrapping Up
We see the share buttons below the pagination bar.
![image](/public/images/githubpages/908/desktop_home.png)
![image](/public/images/githubpages/908/desktop_tutorial.png)
![image](/public/images/githubpages/908/desktop_201.png)
Share to facebook.
![image](/public/images/githubpages/908/sharing_facebook.png)
Share to twitter.
![image](/public/images/githubpages/908/sharing_twitter.png)
Share to linkedin.
![image](/public/images/githubpages/908/sharing_linkedin.png)
Access the website from mobile device.
![image](/public/images/githubpages/908/mobile_home.png){:width="400px"}  
![image](/public/images/githubpages/908/mobile_tutorial.png){:width="400px"}  
![image](/public/images/githubpages/908/mobile_201.png){:width="400px"}  

## 5. References:
* [ShareThis - Getting Share Buttons](https://platform.sharethis.com/sticky-share-buttons)
