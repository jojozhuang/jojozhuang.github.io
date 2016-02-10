---
layout: software
key: portfolio
title: "Code Generator"
date: 2016-01-18
tags: C#, Windows Form, XSLT+XML
image: /assets/codegenerator/thumbnail.png
shortdesc: A desktop application for code generation based on database schema and templates.
subcateogry: dotnet
categories:
- portfolio
---

A Visual Studio style desktop application used for software development assistant. The main function for this tool is to generate codes based on database schema and templates. The table definition from the database schema is converted to XML. And the templates are defined with XSLT. Then, these XML and XSLT files are combined and transformed to code(C#, java, etc), HTML or other format files.
![Code Generator](/assets/codegenerator/cg.png "Code Generator")
Follow the below steps to make it work.  
1. In Server Explorer, create new connection to SQL Server instance or database.  
![servers](/assets/codegenerator/servers.png "servers")
2. Create templates with XSLT.
![template](/assets/codegenerator/template.png "template")
3. Connect server to retrieve tables, open the 'Single Generator'. The details of the table are shown here.  
![single](/assets/codegenerator/single.png "single")
4. Choose template, set namespaces, then click 'Generate' button and the result is displayed immediately.  
![singleoutput](/assets/codegenerator/singleoutput.png "singleoutput")  
Use the batch function to generate codes for all tables at once.  
1. Create a new task in Task Explorer. Choose target tables and templates, save it.
![taskconfig](/assets/codegenerator/taskconfig.png "taskconfig")
2. Right click on the task name, click 'Start' option.  
![taskrun](/assets/codegenerator/taskrun.png "taskrun")
The real-time logs are displayed in the Output window.
![taskout](/assets/codegenerator/taskout.png "taskout")
3. Finally, all files are generated in the working folder.
![taskoutfiles](/assets/codegenerator/taskoutfiles.png "taskoutfiles")  
You can get the source code from [Github](https://github.com/jojozhuang/Projects/tree/master/DeveloperAssistant/Src "Source Code").
