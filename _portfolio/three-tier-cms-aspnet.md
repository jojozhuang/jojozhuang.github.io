---
layout: portfolio
key: portfolio
title: "Three-Tier CMS"
index: 15
tags: [ASP.NET, C#]
image: /assets/threetiercmsaspnet/thumbnail.png
excerpt: A Content Management System(CMS) built with ASP.NET in C#.
category: dotnet
---

> This web application is a content management system, built with classic ASP.NET webform in C# language.  

## 1. Login Page  
![image](/assets/threetiercmsaspnet/login.png)
## 2. Administrator List Page
Other list pages have the same layout.  
![image](/assets/threetiercmsaspnet/adminlist.png)  
Many flexible settings are provided by this CMS system.  
## 3. Menu Configuration
Top Menus and menu categories under them are configurable.  
![image](/assets/threetiercmsaspnet/topmenu.png)  
![image](/assets/threetiercmsaspnet/topmenubinding.png)
## 4. Access Control
Access permission to each menu can also be configured.  
![image](/assets/threetiercmsaspnet/rolepermission.png)
## 5. Add Article
![image](/assets/threetiercmsaspnet/addarticle.png)

## 6. Development
Technically, the structure of this application is divided into 3 layers:
* User Interface(WebUI)
* Business Logic(BLL)
* Data Access(DAL)  

The high level layer calls the low layer to communicate and retrieve data. The Object Model(OM) contains objects definition. The object can be an administrator or a blog posting.
![image](/assets/threetiercmsaspnet/project.png)  

## 7. Source Files
* [Source files of Three-Tier CMS on Github](https://github.com/jojozhuang/Portfolio/tree/master/ThreeTierCMS/Src)
