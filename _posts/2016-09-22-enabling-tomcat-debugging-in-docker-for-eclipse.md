---
layout: post
key: blog
title: "Enabling Tomcat Debugging in Docker for Eclipse"
date: 2016-09-22
tags: [Docker, Debugging, Eclipse, Tomcat]
---

> Tutorial for how to setup remote debugging in Eclipse for tomcat in Docker.

## 1. Introduction
After deploying the JSP application to Tomcat container, which is mentioned in the last posting [Serve JSP Application With Tomcat In Docker]({% link _posts/2016-09-20-serving-jsp-application-with-tomcat-in-docker.md %}), our Game Store is now hosted in tomcat container. Be aware of the following facts:
* Source files are located on host machine, and copied to tomcat webapps folder through volume.
* Tomcat container is serving the gamestore application.
* Mysql container is used to store data.
* Tomcat container connects Mysql container to read/write data. They are hosted in the same docker machine with same IP address but different port.

![MIME Type](/public/pics/2016-09-22/devenv.png)  

Now, one question is how to debug this application, which is deployed in Tomcat container. Actually, Tomcat supports remote debugging, the following steps introduce how to enable debugging in Eclipse.

## 2. Setting up Tomcat Container
## 2.1 Remote Debugging in Tomcat
In general, tomcat can be configured to allow a program such as eclipse to connect remotely using JPDA and see debugging information. To configure tomcat to allow remote debugging, start tomcat using the catalina startup script (from your tomcat home) instead of the normal startup script like so (tomcat must be stopped before you can change over):
```sh
$ export JPDA_ADDRESS=8000
$ export JPDA_TRANSPORT=dt_socket
$ bin/catalina.sh jpda run
```
### 2.2 Creating Tomcat Container with Enabling Remote Debugging
Manually create Tomcat container with Remote Debugging enabled. In docker terminal, run the following command.
```sh
$ docker run --name=gstomcat -d -v ~/Documents/gstomcat:/usr/local/tomcat/webapps/gamestore -p 31020:8080 -p 8000:8000 -e JPDA_ADDRESS=8000 tomcat catalina.sh jpda run
```
Compare with the similar command used in the last post, we append '-p 8000:8000 -e JPDA_ADDRESS=8000 tomcat catalina.sh jpda run' to the end.  
Let's take a moment to examine this command in detail:
* --name=gstomcat names the container so we can refer to it more easily.
* -d detaches the process and runs in the background. Otherwise, we would just be watching an empty Tomcat prompt and wouldn't be able to use this terminal until we killed Tomcat.
* -v ~/Documents/gstomcat:/usr/local/tomcat/webapps/gamestore Sets up a bindmount volume that links the /usr/local/tomcat/webapps/gamestore directory from inside the Tomcat container to the ~/Documents/gstomcat directory on the host machine. Docker uses a : to split the host's path from the container path, and the host path always comes first.
* -p 31020:8080 sets up a port forward. The Tomcat container is listening on port 8080 by default. This flag maps the container's port 8080 to port 31020 on the host system.
* tomcat specifies that the container should be built from the tomcat image
* -p 8000:8000 sets up another port for debugging purpose. So Eclipse can connect to tomcat container to get debugging information through this port.
* -e JPDA_ADDRESS=8000 setups the environment variable, just like executing 'export JPDA_ADDRESS=8000' in terminal.
* catalina.sh jpda run, tells the container to launch tomcat with this command.

Switch to Kitematic, the new container is running with JPDA_ADDRESS configured to 8000.
![MIME Type](/public/pics/2016-09-22/portenv.png)  
Apart from port 31020, port 8000 for debugging is exposed to host machine as well.
![MIME Type](/public/pics/2016-09-22/debugport.png)  
To access the website, we still use port 31020. Port 8000 is only for debugging.
![MIME Type](/public/pics/2016-09-22/preview.png)  

## 3. Setting up Debugging in Eclipse
### 3.1 Creating Remote Java Application
In Eclipse, create new remote Java Application. Set host with tomcat container's IP address, and port 8000.
![MIME Type](/public/pics/2016-09-22/debugconfig.png)  
### 3.2 Setting Breakpoint
Find file account_login.jsp under WebContent, set breakpoint for login method.
![MIME Type](/public/pics/2016-09-22/breakpoint.png)  
### 3.3 Enabling Debugging
Switch to debug view, enable debugging. If you don't see the Debug view, Windows->Perspective->Customize Perspective->Check the Debug option.
![MIME Type](/public/pics/2016-09-22/enabledebug.png)  
Then, you will see some Daemon Thread are listed in debug view.
![MIME Type](/public/pics/2016-09-22/afterdebug.png)  

## 4. Triggering the Breakpoint
### 4.1 Accessing Game Store Website
Access the following URL in web browser. Then, click the Login link on the top right of the page.
* [http://192.168.99.100:31020/gamestore/index.jsp](http://192.168.99.100:31020/gamestore/index.jsp)

Type 'customer' for user name, type 'customer' for password, and click Login button.
![MIME Type](/public/pics/2016-09-22/login.png)  
Switch to Eclipse, the breakpoint is activated. The remote debugging function is working now.
![MIME Type](/public/pics/2016-09-22/breakpointdt.png)  

## 5. Source Files
* [Source files for Game Store Mysql on GitHub](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreMysql)

## 6. References
* [Setting Up Tomcat For Remote Debugging](https://confluence.sakaiproject.org/display/BOOT/Setting+Up+Tomcat+For+Remote+Debugging)
* [Tomcat debugging in Docker](https://www.dontpanicblog.co.uk/2017/03/12/tomcat-debugging-in-docker/)
* [Tutorial: Debugging Java Applications in Docker](https://github.com/docker/labs/tree/master/developer-tools/java-debugging)
