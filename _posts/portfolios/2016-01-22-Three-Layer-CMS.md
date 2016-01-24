---
layout: software
title: "Three Layer CMS"
date: 2016-01-22
tags: ASP.NET, 3 Layer, Multilingual Support, Authorization, Configuration
categories:
- portfolio
---

<p>This is a ASP.NET web application, the main functions are divided into 3 layers: User Interface(WebUI), Business Logic(BLL) and Data Access(DAL). The top level layer calls the lower layer to communicate and retrieve data. The Object Model(OM) defines various objects, which may represents an administrator, a blog post or a website settings.
![Project Structure](/assets/3layercms/3layer.png "Project Structure")
Login Page
![login](/assets/3layercms/login.png "login")
Administrator List Page
![admin](/assets/3layercms/adminlist.png "admin")
You can configure many settings for this application, like:
1. You can create different Top Menus and add menu categories under it.
![topmenu](/assets/3layercms/menutop.png "topmenu")
![menu config](/assets/3layercms/menuconfig.png "menu config")
2. You can set access permission for each menu
![role permission](/assets/3layercms/rolepermission.png "role permission")
3. You can create a shortcut top menu which contains the functions used frequently.
![shortcut](/assets/3layercms/shortcut.png "shortcut")
4. This CMS(Content Management System) also support multilingual
Change the value of GlobalizationCulture in web.config, zh-cn for simplified Chinese, en-us for US English.
![localization](/assets/3layercms/localization.png "localization")
After the changing, reopen the login page and see what changes.
![login_cn](/assets/3layercms/login_cn.png "login_cn")
![adminlist_cn](/assets/3layercms/adminlist_cn.png "adminlist_cn")
![menu_cn](/assets/3layercms/menu_cn.png "menu_cn")
</p>
