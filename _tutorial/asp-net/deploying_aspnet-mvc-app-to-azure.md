---
layout: tutorial
key: tutorial
title: "Deploying ASP.NET MVC Application to Azure"
index: 9602
subcategory: asp-net
date: 2016-01-28
tags: [Microsoft Azure, ASP.NET]
---

> Deploy ASP.NET application to Microsoft Azure with Azure SQL database.

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
![image1](/assets/images/asp-net/9502/image1.png)  
### 1.3 Creating new Web APP  
![image2](/assets/images/asp-net/9502/image2.png)  
![image3](/assets/images/asp-net/9502/image3.png)  

## 2. Creating SQL Database in Azure  
### 2.1 Creating Database
New-&gt;Data+Storage-&gt;SQL Database(new database)  
![image4](/assets/images/asp-net/9502/image4.png)  
Provide DB Name, resource group, … to create a new SQL DB.  
![image5](/assets/images/asp-net/9502/image5.png)  
### 2.2 Creating a new Server  
![image6](/assets/images/asp-net/9502/image6.png)  

## 3. Connecting Azure DB Server from Local Machine  
### 3.1 Finding the new created SQL server(not SQL database)  
![image7](/assets/images/asp-net/9502/image7.png)  
### 3.2 Adding client IP to Azure SQL Server
Add client IP address(your local machine) to firewall list of Azure SQL server.  
![image8](/assets/images/asp-net/9502/image8.png)  
### 3.3 Finding the connection string of the created database  
![image9](/assets/images/asp-net/9502/image9.png)  
![image10](/assets/images/asp-net/9502/image10.png)  
Note: The password is not provided in the connection string, you need to replace with your real password.  
### 3.4 Replacing the connection string in the web.config.  
![image11](/assets/images/asp-net/9502/image11.png)  
### 3.5 Launching application from visual studio, it should work.  

## 4. Setting DB Connection String of Azure Web App  
### 4.1 Finding the new created web app.  
![image12](/assets/images/asp-net/9502/image12.png)  
### 4.2 Application settings-&gt; Connection strings.  
Add new connection string with name and full connection string.  
![image13](/assets/images/asp-net/9502/image13.png)  

## 5. Deploying Local Application to Azure.  
### 5.1 Starting to Publish
Visual Studio -&gt; Web Project -&gt; Publish...  
### 5.2 Profile
Choose Microsoft Azure App Service  
![image14](/assets/images/asp-net/9502/image14.png)  
### 5.3 Connection
Provide the server address, site name, user and password.
![image15](/assets/images/asp-net/9502/image15.png)  
### 5.4 Settings
Provide the connection string of Azure Database.  
![image16](/assets/images/asp-net/9502/image16.png)  
### 5.5 After publish, open your Azure website.  
![image17](/assets/images/asp-net/9502/image17.png)  

## 6. Document
* [Deploy ASP.NET Application to Azure]({% link /assets/docs/deploy_to_azure_with_sqldb.pdf %})
