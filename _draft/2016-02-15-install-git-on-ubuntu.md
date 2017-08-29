---
layout: post
key: blog
title: "Install Git on Ubuntu"
date: 2016-02-15
tags: GitHub, SourceTree
categories:
- blog
---

> Create Responsive Website with AngularJS.

sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -f

sudo apt-get install git
sudo git --version

sudo apt-get install npm
sudo npm -version

sudo apt-get install nodejs
sudo nodejs --version

mkdir Project
cd Project
git clone https://github.com/angular/quickstart Demo

cd Demo
npm install

Launch Atom, open folder /Demo, edit file /Demo/src/app/app.component.ts, change Angular to Rong

In Demo folder, run
sudo npm install –save-dev lite-server
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm start
Access following url in web browser.
http://localhost:3000

Deploying nginx on Ubuntu
sudo apt-get update
sudo apt-get update
sudo apt-get install nginx

ps -ef | grep ngigx
sudo chmod 777 /var/www/html

copy folder node_modules from /Project/Demo/ into /var/wwww/html/
copy all files and folders from /Project/Demo/src/ to /var/wwww/html/
Access following url in web browser.
http://localhost/index.html

http://www.geeksforgeeks.org/how-to-install-configure-and-use-git-on-ubuntu/
