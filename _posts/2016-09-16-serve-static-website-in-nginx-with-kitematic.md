---
layout: post
key: blog
title: "Serve Static Website in Nginx with Kitematic"
date: 2016-09-16
tags: Docker, Kitematic, Nginx
categories:
- blog
---

> Guide how to serve the popular 2048 game website in Nginx with Kitematic.
* Download and run a web server container
* Explore the container’s website data natively on your Mac
* Use volumes to modify the website data

## 1. Prerequisite
If you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to my previous posting [Install Docker Toolbox and Kitematic on Mac](http://jojozhuang.github.io/blog/2016/09/15/install-docker-toolboxand-kitematic-on-mac/).

## 2. Run Nginx Web Server Container
### 2.1 Create Nginx Container
In Kitematic, Search 'nginx', Click on the 'CREATE' button of the hello-world-nginx image.
![MIME Type](/public/pics/2016-09-16/search.png)  
Kitematic will download (also known as pull the image) the kitematic/hello-world-nginx image from the Docker Hub  immediately.
![MIME Type](/public/pics/2016-09-16/download.png)  
Once it’s done downloading, Kitematic will then run a Docker Nginx container from this image. A tiny Nginx web server is started up, allowing it to serve website data to your Mac. You should see a quick preview of the example website that comes with the container.
![MIME Type](/public/pics/2016-09-16/running.png)  
Click on the preview button to see the result in your own browser.
![MIME Type](/public/pics/2016-09-16/preview.png)  
### 2.2 Set Volume
Switch to Settings tab and Volumes sub tab, click CHANGE button.
![MIME Type](/public/pics/2016-09-16/settings.png)  
Create a folder named 'kitematic-nginx' in your local machine.
![MIME Type](/public/pics/2016-09-16/createfolder.png)  
The folder in container and the folder in your local machine are now mapping to each other. Click Restart button or just switch to the Home tab, to restart the container.
![MIME Type](/public/pics/2016-09-16/volume.png)  
Go to the volume folder on your machine, there is one html file. This file is actually located in container. It is the index file shown in browser. Now, you can edit it to change the page content.
![MIME Type](/public/pics/2016-09-16/index.png)  
### 2.3 Edit File
Open this index.html in any editor, change the content as follows:
```html
<div style="color: #35393B; margin-top: 100px; text-align: center; font-family: HelveticaNeue-Light, sans-serif;">
  <img src="https://cloud.githubusercontent.com/assets/251292/5254757/a08a277c-7981-11e4-9ec0-d49934859400.png">
  <h2>Voil&agrave;! Your nginx container is running!</h2>
  <h2>Hello World, Kitematic!</h2>
  <div style="color: #838789;">
    <p>To edit files, double click the <strong>website_files</strong> folder in Kitematic and edit the <strong>index.html</strong> file.</p>
  </div>
</div>
```
Notice, we just add another h2 tag showing 'Hello World, Kitematic!' under the original one.

Refresh the home page in web browser, you see the impact.
![MIME Type](/public/pics/2016-09-16/newpreview.png)  
This is how volume works.
Kitematic can map Docker container volumes to directories on your Mac.

## 3. Serve Our Own Website
Now let’s try to serve a more interesting website. [Download the zipped files](https://github.com/gabrielecirulli/2048/archive/master.zip) for 2048, a popular (and addictive) web-based tile game. Extract this zip file into the folder you just opened:
![MIME Type](/public/pics/2016-09-16/2048.png)  

Refresh the page in web browser, you can play it now.
![MIME Type](/public/pics/2016-09-16/2048preview.png)  

## 4. References
* [Kitematic tutorial: Serve a static website with NGINX](https://docs.docker.com/kitematic/nginx-web-server/)
