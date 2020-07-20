---
layout: tutorial
key: tutorial
title: "Deploying Text Compare Angular App to Docker"
index: 8372
subcategory: angular-app
date: 2018-07-28
tags: [Angular, Docker]
---

> Introduce how to deploy angular application to Docker.

## 1. Angular Project
I will use the angular project 'Text Compare' and deploy it to Docker container.
### 1.1 Download
```raw
git clone https://github.com/jojozhuang/text-compare-angular.git
cd text-compare-angular
```
### 1.2 Installing Packages
Install package rimraf and cross-env.
```raw
npm install rimraf --save
npm install cross-env --save-dev
```
### 1.3 Build Command
Create a new build command `build:aot:prod` in 'package.json'. We will use AOT mode.
```javascript
"scripts": {
  ...

  "build": "ng build --prod",
  "build:aot:prod": "rimraf dist compiled && cross-env BUILD_AOT=1 SOURCE_MAP=0 ng build --prod",

  ...
},
```
### 1.4 Nginx
Create nginx custom configuration file named 'nginx-cutomer.conf' in folder 'config' with the following content.
```raw
server {
  listen 80;

  gzip on;
  gzip_http_version 1.1;
  gzip_disable      "MSIE [1-6]\.";
  gzip_min_length   1100;
  gzip_vary         on;
  gzip_proxied      expired no-cache no-store private auth;
  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_comp_level   5;

  root /usr/share/nginx/html;

  location / {
    index index.html index.htm;
    try_files $uri $uri/ /index.html =404;
  }
}
```

## 2. Docker
### 2.1 Docker File
Create a file named 'Dockerfile'.
```dockerfile
# Usage:
#
#    Build image:
#    docker build -t text-compare .
#
#    Run image (on localhost:8080):
#    docker run --name text-compare -p 8080:80 text-compare
#
#    Run image as virtual host (read more: https://github.com/jwilder/nginx-proxy):
#    docker run -e VIRTUAL_HOST=text-compare.your-domain.com --name text-compare text-compare

# Stage 1, based on Node.js, to build and compile Angular

FROM node:9.4.0-alpine as builder

COPY package.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm run build:aot:prod

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:1.13.12-alpine

COPY ./config/nginx-custom.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
```
The following points need to be noted about the above code.
* Use the 'alpine' version of nodejs and nginx which occupy less disk space.

### 2.2 Docker Image
Open docker terminal, go to main project folder. Run the following command:
```raw
docker build -t text-compare .
```
It will take two or three minutes to build the image. Nodejs and Nginx have been downloaded to local docker virtual machine. New image 'text-compare' has been created successfully.
![image](/assets/images/frontend/8372/dockerimages.png){:width="700px"}  
* If you don't see the image or the new image has no name and tag set, there must be some errors during the build. Check and rebuild the image.

## 3. Running and Testing
Run the image in container.
```raw
docker run --name text-compare -p 8080:80 text-compare &
```
Open web browser, access http://192.168.99.100:8080.
![image](/assets/images/frontend/8372/home.png)
Click the 'Text Compare' menu.
![image](/assets/images/frontend/8372/textcompare.png)
Try to input some texts in the two input boxes and click 'Find Difference' button. You should be able to see the difference.
![image](/assets/images/frontend/8372/typescript.png)

## 4. Reference
* [Docker File Sample](https://github.com/gdi2290/angular-starter#install-docker)
* [What are Docker \<none\>:\<none\> images?](https://www.projectatomic.io/blog/2015/07/what-are-docker-none-none-images/)
