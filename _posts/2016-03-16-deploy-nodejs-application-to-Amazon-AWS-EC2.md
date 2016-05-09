---
layout: post
key: blog
title: "Deploy NodeJs Application to Amazon AWS-EC2"
date: 2016-03-07
categories:
- blog
---

NodeJs application can be hosted by various web servers, Apache, IIS, Nginx, etc. In the post, I introduce how to deploy NodeJs application to Amazon Cloud Server, EC2.

Deploy Nodejs app to AWS EC2
1. Create AWS Account
* Sign Up Amazons free micro instance of EC2
* Create Instance
![EC2 Instance](/public/pics/ec2instance.png)  
* Create Key Pair
2. Use Putty to Login EC2
![Putty](/public/pics/ec2putty.png)  
* User PUTTYGEN.EXE to convert key
* Configure PUTTY.EXE
3. Setup EC2 Instance
![EC2 Remote](/public/pics/ec2remote.png)
* Update your EC2 Amazon Linux
* Install GCC
* Install Node.js
* Add node folder to secure_path
* Install npm
4. Create NodeJs Application
* Create folder ‘site’
* Create file ‘server.js’
* Redirect port 8080 to 80
* Start our Node server
* Open browser, access the site with public ip.
5. Deploy Local Node Project to EC2
* Install [CyberDuck](https://cyberduck.io/?l=en)
* Launch CyberDuck and Upload files to EC2
![CyberDuck](/public/pics/ec2cyberduck.png)
* In EC2, go into the folder, run npm install, npm start
* Open Chrome, Firefox, on different device.
![EC2 App](/public/pics/socketiopaint1.png)
6. Useful command in linux
Command	| Description
------------ | -------------
ls | Show files/directories under the current folder
sudo su	| Switch to root user
sudo su -- ec2-user | Switch to ec2-user
nano filenam | Open/Create file with nano
mkdir foldername | Create folder
sudo make uninstall | Uninstall, go to the folder and run it.

7. Reference
* [How I Got Node.js Running On A Linux Micro Instance Using Amazon EC2](http://www.bennadel.com/blog/2321-how-i-got-node-js-running-on-a-linux-micro-instance-using-amazon-ec2.htm)
* [How to install & setup Node.js on Amazon EC2 – complete guide](http://iconof.com/blog/how-to-install-setup-node-js-on-amazon-aws-ec2-complete-guide/)
* [Setup Node.Js Enviroment on Amazon EC2 linux](http://adndevblog.typepad.com/cloud_and_mobile/2014/12/setup-nodejs-enviroment-on-amazon-ec2-linux-1.html)
* [Uninstall npm](https://docs.npmjs.com/misc/removing-npm)

8.	Issues
* Remove npm
Sometime, there is something wrong with npm, it doesn’t work.

You need to uninstall and install again.  
```
sudo npm uninstall npm -g
```
It doesn’t work, go the ‘npm’ folder, run:  
```
sudo make uninstall
```
