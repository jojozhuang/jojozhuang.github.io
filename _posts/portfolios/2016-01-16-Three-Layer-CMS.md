---
layout: software
title: "3-Layer CMS"
date: 2016-01-16
tags: ASP.NET, C#, Configurable
image: /assets/threelayercms/thumbnail.png
shortdesc: A Content Management System(CMS) built with classic ASP.NET webform.
subcateogry: dotnet
categories:
- portfolio
---

This web application is a backend content management system and built with classic ASP.NET webform in C# language.  
1. Login Page  
![login](/assets/threelayercms/login.png "login")
2. Administrator List Page. Other list pages have the same layout.  
![admin](/assets/threelayercms/adminlist.png "admin")  
Many flexible settings are provided by this CMS system.  
3. Top Menus and menu categories under them are configurable.  
![topmenu](/assets/threelayercms/menutop.png "topmenu")  
![menu config](/assets/threelayercms/menuconfig.png "menu config")
4. Access permission to each menu can also be configured.  
![role permission](/assets/threelayercms/rolepermission.png "role permission")
5. You can create a shortcut top menu which contains frequent used functions.  
![shortcut](/assets/threelayercms/shortcut.png "shortcut")
6. Besides, this CMS application provides multilingual support. For example, you can change the value of GlobalizationCulture to 'zh-cn'(zh-cn for simplified Chinese, en-us for US English) in web.config.  
![localization](/assets/threelayercms/localization.png "localization")
After saving, reopen the login page and you will see the system default language(lable, button text, system message) is switched to Chinese.  
![login_cn](/assets/threelayercms/login_cn.png "login_cn")  
![adminlist_cn](/assets/threelayercms/adminlist_cn.png "adminlist_cn")  
![menu_cn](/assets/threelayercms/menu_cn.png "menu_cn")  

Technically, the structure of this application is divided into 3 layers: User Interface(WebUI), Business Logic(BLL) and Data Access(DAL). The high level layer calls the low layer to communicate and retrieve data. The Object Model(OM) contains objects definition. The object can be an administrator, a blog post or a piece of website settings.  
![Project Structure](/assets/threelayercms/3layer.png "Project Structure")  
You can get the source code from [Github](https://github.com/jojozhuang/Projects/tree/master/CMSWeb/Src "Source Code").
