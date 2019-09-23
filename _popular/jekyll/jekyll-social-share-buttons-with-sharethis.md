---
layout: tutorial
key: popular
title: "Jekyll - Social Share Buttons with ShareThis"
index: 1618
subcategory: jekyll
date: 2017-08-20
tags: [ShareThis]
---

> Integrate ShareThis to Jekyll website.

## 1. ShareThis
The [ShareThis](https://www.sharethis.com/) button is an all-in-one widget that lets people share any content on the web with friends via e-mail, AIM, or text message.

## 2. Creating Share Buttons
### 2.1 Registration
Go to https://www.sharethis.com/ to create a new account.
### 2.2 Choose Button Type
ShareThis provides two types of share button, inline buttons and sticky buttons. I choose sticky button for this tutorial.
![image](/assets/images/jekyll/1618/buttontype.png)
### 2.3 Button Design
You can design the share buttons. Add or remove buttons based on your needs. Set the alignment, button labels, counts, etc.
![image](/assets/images/jekyll/1618/buttondesign.png)
### 2.4 Scripts
You will get the scripts.
![image](/assets/images/jekyll/1618/scripts.png)
Copy and add the scripts into `_includes/head.html`.
```html
<script type='text/javascript' src='//platform-api.sharethis.com/js/sharethis.js#property=5b595ccbf5aa6d001130cf95&product=sticky-share-buttons' async='async'></script>
```

## 4. Wrapping Up
We see the share buttons below the pagination bar.
![image](/assets/images/jekyll/1618/desktop_home.png)
![image](/assets/images/jekyll/1618/desktop_tutorial.png)
![image](/assets/images/jekyll/1618/desktop_201.png)
Share to facebook.
![image](/assets/images/jekyll/1618/sharing_facebook.png)
Share to twitter.
![image](/assets/images/jekyll/1618/sharing_twitter.png)
Share to linkedin.
![image](/assets/images/jekyll/1618/sharing_linkedin.png)
Access the website from mobile device.
![image](/assets/images/jekyll/1618/mobile_home.png){:width="400px"}  
![image](/assets/images/jekyll/1618/mobile_tutorial.png){:width="400px"}  
![image](/assets/images/jekyll/1618/mobile_201.png){:width="400px"}  

## 5. References:
* [ShareThis - Getting Share Buttons](https://platform.sharethis.com/sticky-share-buttons)
