---
layout: tutorial
key: tutorial
title: "Deploying ASP.NET MVC Application to IIS"
index: 9601
subcategory: asp-net
date: 2016-01-25
tags: [IIS, ASP.NET]
---

> Deploy ASP.NET application to local IIS web server.

There are totally 4 steps:  

* Install required components in IIS.
* Publish files to IIS: copy files to server and create website in IIS.
* Add Port Exception to Windows Firewall.
* Assign public IP Address to your website.

## 1. Installing required components in IIS
Control Panel-> Programs and Features  
![image1](/assets/images/asp-net/9501/image1.png)  
Select IIS(Internet Information Services)  
![image2](/assets/images/asp-net/9501/image2.png)  

## 2. Publishing files to IIS  
### 2.1 Starting to Publish
In Visual Studio, select project - &gt; Publish…  
![image3](/assets/images/asp-net/9501/image3.png)  
### 2.2 Creating a new profile  
![image4](/assets/images/asp-net/9501/image4.png)  
### 2.3 Connection
Configure server and website. Here we choose the default website.  
![image5](/assets/images/asp-net/9501/image5.png)  
### 2.4 Settings
Choose ‘Release’.  
![image6](/assets/images/asp-net/9501/image6.png)  
### 2.5 Preview
Check what files are to be deployed. Click 'Publish' button if no issue.
![image7](/assets/images/asp-net/9501/image7.png)  
Your web browser will be opened automatically to access your website.  
![image9](/assets/images/asp-net/9501/image9.png)  
### 2.6 Files in IIS After Publish
All of files for the published website are copied to ‘C:\\inetpub\\wwwroot\\CoursePlayer’.  
![image8](/assets/images/asp-net/9501/image8.png)  

## 3. Adding Port Exception to Firewall  
### 3.1 Opening Firewall
Control Panel -&gt; Windows Firewall  
### 3.2 Advanced setting
![image10](/assets/images/asp-net/9501/image10.png)  
### 3.3 Inbound Rules -&gt; New Rule…
![image11](/assets/images/asp-net/9501/image11.png)  
### 3.4 Rule Type  
![image12](/assets/images/asp-net/9501/image12.png)  
### 3.5 Protocol and Ports  
![image13](/assets/images/asp-net/9501/image13.png)  
### 3.6 Action  
![image14](/assets/images/asp-net/9501/image14.png)  
### 3.7 Profile  
![image15](/assets/images/asp-net/9501/image15.png)  
### 3.8 Name  
![image16](/assets/images/asp-net/9501/image16.png)  
After the above steps, your machine is exposed to the outside world.

## 4. Assigning Public IP address to your website.  
### 4.1 In IIS, add Binding to website  
![image17](/assets/images/asp-net/9501/image17.png)  
### 4.2 Setting IP Address and Port.
If you choose another port, you must add the port number to firewall exception, refer to step 3.  
![image18](/assets/images/asp-net/9501/image18.png)  
### 4.3 Accessing website with ip address, don’t miss the last slash.  
![image19](/assets/images/asp-net/9501/image19.png)  
### 4.4 Trying this address in another machine.  

## 5. Document
* [Deploy ASP.NET Application to local IIS]({% link /assets/docs/deploy_to_iis.pdf %})
