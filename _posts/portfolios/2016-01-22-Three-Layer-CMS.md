---
layout: software
title: "Three Layer CMS"
date: 2016-01-22
tags: ASP.NET, 3 Layer, Multilingual Support, Authorization, Configuration
categories:
- portfolio
---

<p>This is a ASP.NET web application, the main functions are divided into 3 layers: User Interface(WebUI), Business Logic(BLL) and Data Access(DAL). The top level layer calls the lower layer to communicate and retrieve data. The Object Model(OM) defines various objects, which may represents an administrator, a blog post or a website settings.
<img src="/assets/3layercms/3layer.png" alt="Project Structure" title="Project Structure" />
Login Page
<img src="/assets/3layercms/login.png" alt="login" title="login" />
Administrator List Page
<img src="/assets/3layercms/adminlist.png" alt="admin" title="admin" />
You can configure many settings for this application, like:
1. You can create different Top Menus and add menu categories under it.
<img src="/assets/3layercms/menutop.png" alt="topmenu" title="topmenu" />
<img src="/assets/3layercms/menuconfig.png" alt="menu config" title="menu config" />
2. You can set access permission for each menu
<img src="/assets/3layercms/rolepermission.png" alt="role permission" title="role permission" />
3. You can create a shortcut top menu which contains the functions used frequently.
<img src="/assets/3layercms/shortcut.png" alt="shortcut" title="shortcut" />
4. This CMS(Content Management System) also support multilingual
Change the value of GlobalizationCulture in web.config, zh-cn for simplified Chinese, en-us for US English.
<img src="/assets/3layercms/localization.png" alt="localization" title="localization" />
After the changing, reopen the login page and see what changes.
<img src="/assets/3layercms/login_cn.png" alt="login<em>cn" title="login_cn" />
<img src="/assets/3layercms/adminlist_cn.png" alt="adminlist</em>cn" title="adminlist_cn" />
<img src="/assets/3layercms/menu_cn.png" alt="menu_cn" title="menu_cn" />
</p>
