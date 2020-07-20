---
layout: tutorial
key: tutorial
title: "Setting up .Net Development Environment on Mac"
index: 8531
subcategory: mobile
date: 2017-07-19
tags: [Visual Studio, NuGet]
---

> Install Visual Studio Community on Mac.

## 1. Introduction
* .NET Framework
* C#
* Visual Studio

## 2. What Can .Net Platform Do?
* Web Applications
* Desktop Applications
* Mobile Applications

## 3. Installing Visual Studio on Mac
Generally, we setup dotnet development environment on Windows. Now we can also setup it on Mac, and run .net applications on Mac.
### 3.1 Downloading Visual Studio Community Installer
Go to [https://www.visualstudio.com/vs/](https://www.visualstudio.com/vs/), switch macOS, select 'Community for Mac' to download.
### 3.2 Installing
After downloading, click the 'VisualStudioforMacInstaller.dmg' file. In the installer window, double click the install logo.
![image](/assets/images/mobile/8531/install_vs.png){:width="400px"}  
Accept the license, select the items, Install.
![image](/assets/images/mobile/8531/install_components.png){:width="800px"}  
The installer starts the download and install process of the selected items.
![image](/assets/images/mobile/8531/install_downloading.png){:width="800px"}  
Once the installation is finished, there will be a new logo named 'Visual Studio' in your desktop. Click on it to launch Visual Studio.
![image](/assets/images/mobile/8531/visualstudio_workspace.png)

## 4. Using Visual Studio
### 4.1 Project Template
There are several project templates are supported in Visual Studio for Mac.  
You can create Multiplatform mobile projects for iOS and Android which are based on [Xamarin](https://www.xamarin.com/).
![image](/assets/images/mobile/8531/project_multiplatform.png){:width="800px"}  
You can also create native iOS project with C#.
![image](/assets/images/mobile/8531/project_ios.png){:width="800px"}  
You can also create native Android project with C#.
![image](/assets/images/mobile/8531/project_android.png){:width="800px"}  
Further more, you are also able to create ASP.NET applications.
![image](/assets/images/mobile/8531/project_aspnet.png){:width="800px"}  
### 4.2 Creating Multiplatform Project
Click 'New Project' button in the welcome page or go to File->New Solution, select Multiplatform->App->Blank Native App(iOS, Android), Next.
![image](/assets/images/mobile/8531/newproject_native.png){:width="800px"}  
Give a name to your app and specify Organization Identifier, Next.
![image](/assets/images/mobile/8531/newproject_appname.png){:width="800px"}  
Specify the location where the source files will locate, Create.
![image](/assets/images/mobile/8531/newproject_location.png){:width="800px"}  
Three projects are created. 'Mobile' is a Portable .NET project. It can be shared to the Android project and the iOS project. You should put the common functions/classes in this project. 'Mobile.Droid' and 'Mobile.iOS' focus on UI, which are specific for Android and iOS.
![image](/assets/images/mobile/8531/newproject_finish.png)
### 4.3 Managing Packages with NuGet Package Manager
Select the 'Mobile.iOS' project. Then open NuGet Package Manager by choosing Project->Add NuGet Package.
![image](/assets/images/mobile/8531/package_add.png){:width="800px"}  
Search 'sqlite', select the package named 'sqlite-net-pcl', specify the version of this component if necessary and click 'Add Package'.
![image](/assets/images/mobile/8531/package_sqlite.png){:width="800px"}  
There will be a new file named 'package.config' added to the project. The packages and their dependencies are listed in this file. Notice that, new packages are installed into the Packages folder. Now you can use them in your project.
![image](/assets/images/mobile/8531/package_config.png)

## 5. References
* [Setup and Install Visual Studio for Mac](https://docs.microsoft.com/en-us/visualstudio/mac/installation)
* [Creating new Projects and Solutions](https://docs.microsoft.com/en-us/visualstudio/mac/create-new-projects)
* [Including a NuGet package in your project](https://docs.microsoft.com/en-us/visualstudio/mac/nuget-walkthrough)
