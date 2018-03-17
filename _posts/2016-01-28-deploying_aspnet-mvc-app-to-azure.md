---
layout: post
key: blog
title: "Deploying ASP.NET MVC Application to Azure"
date: 2016-01-28
tags: [Microsoft Azure, ASP.NET]
---

> This blog guides you how to deploy your ASP.NET/MVC application to Microsoft Azure Cloud Server with Azure SQL database, and how to connect Azure DB server from local machine.

There are totally 5 steps:  

* Create Web App in Azure.
* Create SQL Database and DB Server in Azure.
* Connect Azure DB from Local Machine.
* Set DB Connection String of Azure Web App.
*  Deploy Local Application to Azure.

## 1. Creating Web App in Azure  
### 1.1 Logging in Azure Portal  
* [https://portal.azure.com/](https://portal.azure.com/)  

### 1.2 Creating Resource Group  
![image1](/public/posts/2016-01-28/image1.png)  
### 1.3 Creating new Web APP  
![image2](/public/posts/2016-01-28/image2.png)  
![image3](/public/posts/2016-01-28/image3.png)  

## 2. Creating SQL Database in Azure  
### 2.1 Creating Database
New-&gt;Data+Storage-&gt;SQL Database(new database)  
![image4](/public/posts/2016-01-28/image4.png)  
Provide DB Name, resource group, … to create a new SQL DB.  
![image5](/public/posts/2016-01-28/image5.png)  
### 2.2 Creating a new Server  
![image6](/public/posts/2016-01-28/image6.png)  

## 3. Connecting Azure DB Server from Local Machine  
### 3.1 Finding the new created SQL server(not SQL database)  
![image7](/public/posts/2016-01-28/image7.png)  
### 3.2 Adding client IP to Azure SQL Server
Add client IP address(your local machine) to firewall list of Azure SQL server.  
![image8](/public/posts/2016-01-28/image8.png)  
### 3.3 Finding the connection string of the created database  
![image9](/public/posts/2016-01-28/image9.png)  
![image10](/public/posts/2016-01-28/image10.png)  
Note: The password is not provided in the connection string, you need to replace with your real password.  
### 3.4 Replacing the connection string in the web.config.  
![image11](/public/posts/2016-01-28/image11.png)  
### 3.5 Launching application from visual studio, it should work.  

## 4. Setting DB Connection String of Azure Web App  
### 4.1 Finding the new created web app.  
![image12](/public/posts/2016-01-28/image12.png)  
### 4.2 Application settings-&gt; Connection strings.  
Add new connection string with name and full connection string.  
![image13](/public/posts/2016-01-28/image13.png)  

## 5. Deploying Local Application to Azure.  
### 5.1 Starting to Publish
Visual Studio -&gt; Web Project -&gt; Publish...  
### 5.2 Profile
Choose Microsoft Azure App Service  
![image14](/public/posts/2016-01-28/image14.png)  
### 5.3 Connection
Provide the server address, site name, user and password.
![image15](/public/posts/2016-01-28/image15.png)  
### 5.4 Settings
Provide the connection string of Azure Database.  
![image16](/public/posts/2016-01-28/image16.png)  
### 5.5 After publish, open your Azure website.  
![image17](/public/posts/2016-01-28/image17.png)  

## 6. Document
* [Deploy ASP.NET Application to Azure]({% link /public/docs/deploy_to_azure_with_sqldb.pdf %})
