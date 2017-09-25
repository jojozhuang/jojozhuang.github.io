---
layout: portfolio
key: portfolio
title: "Three-Tier CMS"
index: 15
tags: [BLL/DAL/Model, ASP.NET, C#]
image: /assets/threetiercms/thumbnail.png
excerpt: A Content Management System(CMS) built with classic ASP.NET Webform.
category: dotnet
---

> This web application is a backend content management system and built with classic ASP.NET webform in C# language.  

## 1. Login Page  
![login](/assets/threetiercms/login.png "login")
## 2. Administrator List Page
Other list pages have the same layout.  
![admin](/assets/threetiercms/adminlist.png "admin")  
Many flexible settings are provided by this CMS system.  
## 3. Menu Configuration
Top Menus and menu categories under them are configurable.  
![topmenu](/assets/threetiercms/menutop.png "topmenu")  
![menu config](/assets/threetiercms/menuconfig.png "menu config")
## 4. Access Control
Access permission to each menu can also be configured.  
![role permission](/assets/threetiercms/rolepermission.png "role permission")
## 5. Customize Favorite Menu
You can create a shortcut top menu which contains frequent used functions.  
![shortcut](/assets/threetiercms/shortcut.png "shortcut")
## 6. Globalization
Besides, this CMS application provides multilingual support. For example, you can change the value of GlobalizationCulture to 'zh-cn'(zh-cn for simplified Chinese, en-us for US English) in web.config.  
![localization](/assets/threetiercms/localization.png "localization")
After saving, reopen the login page and you will see the system default language(lable, button text, system message) is switched to Chinese.  
![login_cn](/assets/threetiercms/login_cn.png "login_cn")  
![adminlist_cn](/assets/threetiercms/adminlist_cn.png "adminlist_cn")  
![menu_cn](/assets/threetiercms/menu_cn.png "menu_cn")  

## 6. Development
Technically, the structure of this application is divided into 3 layers:
* User Interface(WebUI)
* Business Logic(BLL)
* Data Access(DAL)  

The high level layer calls the low layer to communicate and retrieve data. The Object Model(OM) contains objects definition. The object can be an administrator, a blog post or a piece of website settings.  
![Project Structure](/assets/threetiercms/3layer.png "Project Structure")  

## 7. Source Files
* [Source files of 3-Tier CMS on Github](https://github.com/jojozhuang/Portfolio/tree/master/ThreeTierCMS)
