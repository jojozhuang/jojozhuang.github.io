---
layout: software
title: "Code Generator"
date: 2016-01-23
tags: Desktop App, Xslt+XML, Template
image: /assets/codegenerator/cg.png
subcateogry: dotnet
categories:
- portfolio
---

A Visual Studio look like desktop application. At the very beginning, i just thought it should be a collection of different tools which may help software developers for their coding work. Now, the main function for this tool is to generate codes based on database table definition and templates which are defined with Xslt.
![Code Generator](/assets/codegenerator/cg.png "Code Generator")  
To make it work, follow the below steps:  
1. In Server Explorer, create new server connection which connects to your SQL server instance.  
![servers](/assets/codegenerator/servers.png "servers")  
2. Create your template with Xslt  .
![template](/assets/codegenerator/template.png "template")  
3. Connect the server, expand the table, open the Single Genrator, you will see the table definition here.  
![single](/assets/codegenerator/single.png "single")  
4. Choose template and module, set namespaces, then click 'Generate' button and you will see the result immediately.  
![singleoutput](/assets/codegenerator/singleoutput.png "singleoutput")  
You can also generate codes for all tables at once by using the Task function - bulk generator.  
1. Create a new task in Task Explorer.  Choose multiple tables of your SQL server instance, select the templates, Save.
![taskconfig](/assets/codegenerator/taskconfig.png "taskconfig")  
2. Right click on the task name, click 'Start' option.  
![taskrun](/assets/codegenerator/taskrun.png "taskrun")  
3. During the execution, corresponding logs are been displayed in the Output window.
![taskout](/assets/codegenerator/taskout.png "taskout")  
4. Finally, you can find all of the files generated for the task in the working folder.
![taskoutfiles](/assets/codegenerator/taskoutfiles.png "taskoutfiles")  
You can get the source code from [Github](https://github.com/jojozhuang/Projects/tree/master/DeveloperAssistant/Src "Source Code").
