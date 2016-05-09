---
layout: post
key: blog
title: "Deploy ASP.NET/MVC Application to IIS"
date: 2016-01-25
categories:
- blog
---

> This blog guides you how to deploy your ASP.NET/MVC application to IIS web server. And make it public to internet.

There are totally 4 steps:
* Install required components in IIS.
* Publish files to IIS: copy files to server and create website in IIS.
* Add Port Exception to Windows Firewall.
* Assign public IP Address to your website.

## 1. Install required components in IIS**
Control Panel-> Programs and Features  
![imag1](/public/pics/2016-01-25/image1.png)  
Select IIS(Internet Information Services)  
![image2](/public/pics/2016-01-25/image2.png)  

**2.Publish files to IIS**

    2.1  In Visual Studio, select project - &gt; Publish…

        <img src="/public/pics/2016-01-25/image3.png" width="269" height="393" />

    2.2  Create a new profile

        <img src="/public/pics/2016-01-25/image4.png" width="414" height="327" />

    2.3  Connection, configure server and website. Here we choose the default website.

        <img src="/public/pics/2016-01-25/image5.png" width="415" height="328" />

    2.4  Settings, choose ‘Release’.

        <img src="/public/pics/2016-01-25/image6.png" width="415" height="328" />

    2.5  Preview, check what files are to be deployed.

        <img src="/public/pics/2016-01-25/image7.png" width="425" height="336" />

    2.6  After publish, all of files are copied to ‘C:\\inetpub\\wwwroot\\CoursePlayer’.

        <img src="/public/pics/2016-01-25/image8.png" width="517" height="261" />

        Your web browser is opened automatically and accesses your website.

        <img src="/public/pics/2016-01-25/image9.png" width="439" height="301" />

##  3.  **Add Port Exception to Firewall**

    3.1  Control Panel -&gt; Windows Firewall

    3.2  Advanced setting

        <img src="/public/pics/2016-01-25/image10.png" width="532" height="283" />

    3.3  Inbound Rules -&gt; New Rule…

        <img src="/public/pics/2016-01-25/image11.png" width="576" height="245" />

    3.4  Rule Type

        <img src="/public/pics/2016-01-25/image12.png" width="408" height="332" />

    3.5  Protocol and Ports

        <img src="/public/pics/2016-01-25/image13.png" width="421" height="342" />

    3.6  Action

        <img src="/public/pics/2016-01-25/image14.png" width="418" height="340" />

    3.7  Profile

        <img src="/public/pics/2016-01-25/image15.png" width="439" height="357" />

    3.8  Name

        <img src="/public/pics/2016-01-25/image16.png" width="439" height="357" />

        After the above steps, your machine is exposed to the outside world.

4.  **Assign Public IP address to your website.**

    4.1  In IIS, add Binding to web site

        <img src="/public/pics/2016-01-25/image17.png" width="547" height="365" />

    4.2  Set IP Address and Port.

        If you choose another port, you must add the port number to firewall exception, refer to step 3.

        <img src="/public/pics/2016-01-25/image18.png" width="550" height="367" />

    4.3  Access website with ip address, don’t miss the last slash.

        <http://140.192.34.30/courseplayer>

        <img src="/public/pics/2016-01-25/image19.png" width="494" height="357" />

    4.4  Try this address in another machine.

You can download the document from [my github](http://jojozhuang.github.io/public/docs/deploy_to_iis.pdf)
