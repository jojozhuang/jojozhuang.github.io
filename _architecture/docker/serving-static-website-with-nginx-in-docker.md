---
layout: tutorial
key: architecture
title: "Serving Static Website With Nginx In Docker"
index: 3521
subcategory: docker
date: 2017-10-18
tags: [Docker, Nginx]
---

> Introduce how to serve static files in Nginx with Kitematic.

## 1. Steps
Steps for serving static website in Nginx with Kitematic.
* Download and run a web server container
* Explore the container’s website data natively on your Mac
* Use volumes to modify the website data

## 2. Running Nginx Web Server Container
### 2.1 Creating Nginx Container
In Kitematic, Search 'nginx', Click on the CREATE button of the `hello-world-nginx` image.
![image](/assets/images/architecture/3521/search.png)  
Kitematic will download (also known as pull the image) the kitematic/hello-world-nginx image from the Docker Hub immediately.
![image](/assets/images/architecture/3521/download.png)  
Once it’s done, Kitematic will run a Docker Nginx container for this image. A tiny Nginx web server is started up, allowing it to serve website data to your Mac.
![image](/assets/images/architecture/3521/running.png)  
Click on the preview button to see the result in your own browser.
![image](/assets/images/architecture/3521/preview.png)  
### 2.2 Setting Volume
Switch to Settings->Volumes, click CHANGE button.
![image](/assets/images/architecture/3521/settings.png)  
Create a folder named `kitematic-nginx` in ~/Documents/.
![image](/assets/images/architecture/3521/createfolder.png){:width="650px"}  
The folder in container and the folder in your local machine are now mapping to each other. Click Restart button to restart the container.
![image](/assets/images/architecture/3521/volume.png)  
You will find one html file in your local volume folder. This file is actually located in the container. It is the home page of Nginx you saw in browser.
![image](/assets/images/architecture/3521/index.png){:width="650px"}  
### 2.3 Editing File
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
Notice, we just add another h2 tag showing `Hello World, Kitematic!` under the original one. Refresh the home page in web browser to see the change.
![image](/assets/images/architecture/3521/newpreview.png)  
This is how volume works.
Kitematic can map Docker container volumes to directories on your Mac.

## 3. Serving Our Own Website
Now let’s try to serve a more interesting website. [Download the zipped files](https://github.com/gabrielecirulli/2048/archive/master.zip) for 2048, a popular (and addictive) web-based tile game. Extract this zip file into your local volume folder.
![image](/assets/images/architecture/3521/2048files.png){:width="650px"}  

Refresh the page in web browser, you can play the game now. Cool!
![image](/assets/images/architecture/3521/2048.png){:width="700px"}  

## 4. References
* [Kitematic tutorial: Serve a static website with NGINX](https://docs.docker.com/kitematic/nginx-web-server/)
