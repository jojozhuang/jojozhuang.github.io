---
layout: post
key: blog
title: "Deploy Node.js Application to Amazon EC2"
date: 2016-03-16
tags: EC2, Node.js, Putty, CyberDuck
categories:
- blog
---

> Node.js application can be hosted by various web servers, Apache, IIS, Nginx, etc. In this post, I introduce how to deploy Node.js application to Amazon Cloud Server, EC2.

There are mainly 5 steps:  

* Create EC2 Instance
* Use Putty to Connect EC2 Remote Server
* Setup Node.js environment in EC2 Instance
* Create simple node app and start Node server
* Deploy Local Node.js application to EC2 Instance

## 1. Create EC2 Instance  
### 1.1 Login to Amazon EC2  
Sign up ‘Amazons free micro instance of EC2’ if you have no AWS Account yet.  
* [http://aws.amazon.com/ec2/](http://aws.amazon.com/ec2/)  

### 1.2 Create Instance  
![image1](/public/pics/2016-03-16/image1.png)  
![image2](/public/pics/2016-03-16/image2.png)  
![image3](/public/pics/2016-03-16/image3.png)  
Finally, review and launch.  
After the instance is generated, create security group.  
![image4](/public/pics/2016-03-16/image4.png)  
### 1.3 Create Key Pair  
![image5](/public/pics/2016-03-16/image5.png)  
Download the private key to local machine, eg. nodeonec2.pem.  

## 2. Use Putty to Connect EC2 Remote Server  
### 2.1 User PUTTYGEN.EXE to convert key  
![image6](/public/pics/2016-03-16/image6.png)  
![image7](/public/pics/2016-03-16/image7.png)  
![image8](/public/pics/2016-03-16/image8.png)  
After save, nodeonec2.ppk is generated.  
### 2.2 Configure PUTTY.EXE  
In session, provide IP address(The public ip of your EC2 instance) and session name.  
![image9](/public/pics/2016-03-16/image9.png)  
The IP is the Public IP of your EC2 instance. It is only available when the instance is running.  
![image10](/public/pics/2016-03-16/image10.png)  
Connection-&gt;Data, add user, always ‘ec2-user’.  
![image11](/public/pics/2016-03-16/image11.png)  
Connection -&gt;SSH -&gt;Auth, load the private key ppk file.
![image12](/public/pics/2016-03-16/image12.png)  
Back to session, save the configuration.  
### 2.3 Connect to EC2 remote server  
Choose the newly created session, double click it or click the ‘Open’ button.
![image13](/public/pics/2016-03-16/image13.png)  
![image14](/public/pics/2016-03-16/image14.png)  
Note, the IP address here is internal IP. When using putty to connect EC2 remote server, make sure launch the instance first. You have to change the IP in putty every time if you reboot the instance. The Public IP address of the EC2 instance changes to different value once it restarts.

## 3.  Setup Node.js environment in EC2 Instance
### 3.1 Update your EC2 Amazon Linux  

```sh
sudo yum update
```

### 3.2 Install GCC  

```sh
sudo yum install gcc-c++ make
sudo yum install openssl-devel
```

### 3.3 Install Node.js

```sh
sudo yum install git
git clone git://github.com/nodejs/node
cd node
./configure
make //it may take long time to compile
sudo make install
```

### 3.4 Add node folder to secure\_path  

```sh
sudo su
nano /etc/sudoers
```

Append :/usr/local/bin to the end of secure\_path  
![image15](/public/pics/2016-03-16/image15.png)  
### 3.5 Install npm  

```sh
git clone https://github.com/npm/npm
cd npm
sudo make install
```

## 4. Create simple node app and start Node server  
### 4.1 Create folder ‘site’  

```sh
mkdir site
```

### 4.2 Create file ‘server.js’

```sh
nano server.js
```

Apend the following content to the file, save and exit.

```javascript
var http = require('http');

function onRequest(request, response) {
  console.log("A user made a request" + request.url);
  response.writeHead(200, {"Context-Type": "text/plain"});
  response.write("Here is your response");
  response.end();
}

http.createServer(onRequest).listen(8080);
console.log("The server is running at 80...");
```

![image16](/public/pics/2016-03-16/image16.png)  
### 4.3 Redirect Port  
You cannot make node server listen to port 80. Run the following command to redirect requests from port 80 of EC2 server to port 8080 of our Node server. You must execute it in root role. And it needs to be reset each time your EC2 instnace is restarted.

```sh
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8080
```

### 4.4  Start Node Server  
![image17](/public/pics/2016-03-16/image17.png)  
### 4.5  Open web browser, access the site with public IP.  
![image18](/public/pics/2016-03-16/image18.png)  
![image19](/public/pics/2016-03-16/image19.png)  

## 5. Deploy Local Node.js application to EC2 Instance  
### 5.1 Install CyberDuck  
* [https://cyberduck.io/?l=en](https://cyberduck.io/?l=en)  

### 5.2 Launch CyberDuck and Upload
![image20](/public/pics/2016-03-16/image20.png)  
![image21](/public/pics/2016-03-16/image21.png)  
![image22](/public/pics/2016-03-16/image22.png)  
Select the folder, make sure delete all files in ‘node\_modules’ folder.  
![image23](/public/pics/2016-03-16/image23.png)  
![image24](/public/pics/2016-03-16/image24.png)  
![image25](/public/pics/2016-03-16/image25.png)  
Refresh the folder in putty, the new folder exits.  
![image26](/public/pics/2016-03-16/image26.png)  
### 5.3 Go into the folder, run the node application  

```sh
npm install
npm start
```

### 5.4 Test the Node.js Application
This Node.js project is a drawing application. It uses Socket.IO to broadcast the changes from one client to other clients.  
1) The first user opens it in Chrome, waits others to join and draws something later.  
![image27](/public/pics/2016-03-16/image27.png)  
2) The second user opens it in Firefox. The same painting as the first user draws.  
![image28](/public/pics/2016-03-16/image28.png)  
3) The third user open it on iPad.  
![image29](/public/pics/2016-03-16/image29.png)  
4) The forth user opens it on iPhone.  
![image30](/public/pics/2016-03-16/image30.png)  
Until now, the application is running properly.

## 6. Useful command in linux  

| **Command**         | **Description**                                 |
|---------------------|-------------------------------------------------|
| ls                  | Show files/directories under the current folder |
| sudo su             | Switch to root user                             |
| sudo su -- ec2-user | Switch to ec2-user                              |
| nano filename       | Open/Create file with nano                      |
| mkdir foldername    | Create folder                                   |
| sudo make uninstall | Uninstall, go to the folder and run it.         |

## 7. Reference
* [How I Got Node.js Running On A Linux Micro Instance Using Amazon EC2](http://www.bennadel.com/blog/2321-how-i-got-node-js-running-on-a-linux-micro-instance-using-amazon-ec2.htm)
* [How to install & setup Node.js on Amazon EC2 – complete guide](http://iconof.com/blog/how-to-install-setup-node-js-on-amazon-aws-ec2-complete-guide/)
* [Setup Node.Js Enviroment on Amazon EC2 linux](http://adndevblog.typepad.com/cloud_and_mobile/2014/12/setup-nodejs-enviroment-on-amazon-ec2-linux-1.html)
* [Uninstall npm](https://docs.npmjs.com/misc/removing-npm)

## 8. Issues
### 8.1 Remove npm  
Sometime, npm itself doesn’t work properly.  
![image31](/public/pics/2016-03-16/image31.png)  
Then we have to uninstall and install it again.

```sh
sudo npm uninstall npm -g
```

If it doesn’t work, go the ‘npm’ folder, run:  

```sh
sudo make uninstall
```

## 9. Document
* [Deploy Node.js Application to Amazon EC2](http://jojozhuang.github.io/public/docs/deploy_nodejs_to_ec2.pdf)
