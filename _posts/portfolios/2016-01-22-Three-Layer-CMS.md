---
layout: software
title: "Three Layer CMS"
date: 2016-01-22
tags: ASP.NET, 3 Layer, Multilingual Support, Authorization, Configuration
image: /assets/threelayercms/adminlist.png
shortdesc: A Content Management System(CMS) built with classic ASP.NET webform application.
subcateogry: dotnet
categories:
- portfolio
---

This is a ASP.NET web application, the main functions are divided into 3 layers: User Interface(WebUI), Business Logic(BLL) and Data Access(DAL). The top level layer calls the lower layer to communicate and retrieve data. The Object Model(OM) defines various objects, which may represents an administrator, a blog post or a website settings.  
![Project Structure](/assets/threelayercms/3layer.png "Project Structure")  
Login Page  
![login](/assets/threelayercms/login.png "login")  
Administrator List Page  
![admin](/assets/threelayercms/adminlist.png "admin")  
You can configure many settings for this application, like:  
1. You can create different Top Menus and add menu categories under it.  
![topmenu](/assets/threelayercms/menutop.png "topmenu")  
![menu config](/assets/threelayercms/menuconfig.png "menu config")  
2. You can set access permission for each menu  
![role permission](/assets/threelayercms/rolepermission.png "role permission")  
3. You can create a shortcut top menu which contains the functions used frequently.  
![shortcut](/assets/threelayercms/shortcut.png "shortcut")  
4. This CMS(Content Management System) also support multilingual  
Change the value of GlobalizationCulture in web.config, zh-cn for simplified Chinese, en-us for US English.  
![localization](/assets/threelayercms/localization.png "localization")  
After the changing, reopen the login page and see what changes.  
![login_cn](/assets/threelayercms/login_cn.png "login_cn")  
![adminlist_cn](/assets/threelayercms/adminlist_cn.png "adminlist_cn")  
![menu_cn](/assets/threelayercms/menu_cn.png "menu_cn")  
You can get the source code from [Github](https://github.com/jojozhuang/Projects/tree/master/CMSWeb/Src "Source Code").
