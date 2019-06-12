---
layout: tutorial
key: tutorial
title: "Deploying ASP.NET RESTful API to Azure"
index: 155
category: restful
image: restfulapi.png
date: 2016-07-05
postdate: 2018-07-31
tags: [Azure]
---

> Deploy the RESTful API built with ASP.NET Core to Azure.

## 1. ASP.NET Core Project
Download the project from Github.
```sh
git clone https://github.com/jojozhuang/restful-api-aspnet.git
```

## 2. Publish
Open this ASP.NET project in Microsoft Visual Studio, compile it. Then, right click on the project and choose 'Publish' -> 'Publish to Azure'.

After login with your Azure account, you should see the existing app services on Azure. Click the 'New' button.
![image](/public/images/frontend/155/app_services.png){:width="700px"}  
Set the App Name, Subscription and Resource Group, click 'Create' button.
![image](/public/images/frontend/155/create.png){:width="700px"}  
Visual Studio will start deploying the RESTful Api to Azure.
![image](/public/images/frontend/155/warn.png){:width="700px"}  
On the top of Visual Studio, you should see the deployment status.
![image](/public/images/frontend/155/deploying.png)  
And it shows 'Published' when it's done.
![image](/public/images/frontend/155/published.png)

## 3. Azure Portal
Log onto Azure Portal: https://portal.azure.com/. Go to App Services, we see the 'gamestore-api' service.
![image](/public/images/frontend/155/gamestore_api.png)
Click on it, then we see the URL for our api, https://gamestore-api.azurewebsites.net.
![image](/public/images/frontend/155/url.png)
Append 'api/products' to the URL(e.g. https://gamestore-api.azurewebsites.net/api/products), put it into web browser's address bar. The api works and returns correct products list.
![image](/public/images/frontend/155/test.png)  

## 4. References
* [Publish an ASP.NET Core app to Azure with Visual Studio](https://docs.microsoft.com/en-us/aspnet/core/tutorials/publish-to-azure-webapp-using-vs?view=aspnetcore-2.1)
