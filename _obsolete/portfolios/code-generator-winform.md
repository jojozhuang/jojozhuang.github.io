---
layout: portfolio
key: portfolio
title: "Code Generator(C#)"
index: 260
tags: [C#, Windows Form, XSLT+XML]
image: /assets/images/portfolio/codegeneratorwinform/thumbnail.png
excerpt: A desktop application for generating code based on database schema and templates.
category: dotnet
---

> A desktop application for generating code based on database schema and templates.

## 1. Function
This is a Visual Studio style desktop application used to assistant software development. The core function for this tool is to generate codes based on database schema and templates. The table definition from the database schema is converted to XML. And the templates are defined with XSLT. Then, these XML and XSLT files are combined and transformed to code(C#, java, etc), HTML or other format files.
## 2. Main Screen
![Code Generator](/assets/images/portfolio/codegeneratorwinform/cg.png "Code Generator")
## 3. Steps to Generate Codes
### 3.1 Create Connection to Database
In Server Explorer, create new connection to SQL Server instance or database.  
![servers](/assets/images/portfolio/codegeneratorwinform/servers.png "servers")
### 3.2 Create templates with XSLT.
![template](/assets/images/portfolio/codegeneratorwinform/template.png "template")
### 3.3 Get Table Schema
Connect server to retrieve tables, open the 'Single Generator'. The details of the table are shown here.  
![single](/assets/images/portfolio/codegeneratorwinform/single.png "single")
### 3.4 Generate Codes
Choose template, set namespaces, then click 'Generate' button and the result is displayed immediately.  
![singleoutput](/assets/images/portfolio/codegeneratorwinform/singleoutput.png "singleoutput")  
## 4. Batch Generation
Use the batch function to generate codes for all tables at once.  
### 4.1 Create Task
Create a new task in Task Explorer. Choose target tables and templates, save it.
![taskconfig](/assets/images/portfolio/codegeneratorwinform/taskconfig.png "taskconfig")
### 4.2 Start Task
Right click on the task name, click 'Start' option.  
![taskrun](/assets/images/portfolio/codegeneratorwinform/taskrun.png "taskrun")
The real-time logs are displayed in the Output window.
![taskout](/assets/images/portfolio/codegeneratorwinform/taskout.png "taskout")
### 4.3 Check the Outputs
Finally, all files are generated in the working folder.
![taskoutfiles](/assets/images/portfolio/codegeneratorwinform/taskoutfiles.png "taskoutfiles")  

## 5. Source Files
* [Source files of Code Generator on Github](https://github.com/jojozhuang/code-generator-winform)
