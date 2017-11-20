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

> This web application is a content management system(CMS), built with classic ASP.NET webform in C# language. SQL Server is used for data persistence.

## 1. Function Features
* Login with captcha
* Uniform page for 'List' Page and 'Add' Page
* Mass Edit on list page
* Many flexible settings are provided, menu control, access control, etc.
* Dynamic Access Control with Role and Permission Bindings
* WYSIWYG html editor
* Globalization, multilingual is supported.

## 2. Technical Features
* C\#, ASP.NET
* SQL Server for persistence
* Three tiers: WebUI/BLL/DAL

## 3. UI Pages
### 3.1 Login Page
Using captcha for login page makes the website more secure, it effectively blocks spam bots.
![image](/assets/threetiercmsaspnet/login.png)
### 3.2 Administrator List
In list view, we can view all of the items, and add/edit/delete item. Other list pages have the similar layout.
![image](/assets/threetiercmsaspnet/adminlist.png)  
### 3.3 Menu Configuration
Define top menus and their default pages.
![image](/assets/threetiercmsaspnet/topmenu.png)  
Top Menus and menu categories are dynamically bound.
![image](/assets/threetiercmsaspnet/topmenubinding.png)
### 3.4 Access Control
Access permission to each menu can also be configured for different roles.
![image](/assets/threetiercmsaspnet/rolepermission.png)
### 3.5 WYSIWYG Editor
You can use WYSIWYG(what you see is what you get) html editor for creating new articles.
![image](/assets/threetiercmsaspnet/addarticle.png)

## 4. Three Tiers
The structure of this application is divided into 3 layers:
* User Interface(WebUI)
* Business Logic(BLL)
* Data Access(DAL)  

The high level layer calls the low layer to communicate and retrieve data. The Object Model(OM) contains objects definition. The object can be an administrator or a blog posting.
![image](/assets/threetiercmsaspnet/project.png)  

## 5. Source Files
* [Source files of Three-Tier CMS on Github](https://github.com/jojozhuang/Portfolio/tree/master/ThreeTierCMS/Src)
