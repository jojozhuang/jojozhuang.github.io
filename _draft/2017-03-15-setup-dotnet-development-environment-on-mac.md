---
layout: post
key: blog
title: "Setup DotNet Development Environment on Mac[Draft]"
date: 2017-03-15
tags: [Xcode, Visual Studio Community for Mac]
---

> Install Visual Studio for Mac.

Install Xcode first.

Download Visual Studio Community Installer. Go to [https://www.visualstudio.com/vs/](https://www.visualstudio.com/vs/), switch MacOS, select 'Community for Mac' to download.
![MIME Type](/public/pics/2017-03-15/install_vs.png)  

----------------------------------------------------------------------------------------------------------------
SQL Client for Mac OS X that works with MS SQL Server [closed]
https://stackoverflow.com/questions/3452/sql-client-for-mac-os-x-that-works-with-ms-sql-server
https://sourceforge.net/projects/jtds/files/
Run SQL Developer
go to this menu item: Oracle SQL Developer/Preferences/Database/Third-party JDBC Drivers

----------------------------------------------------------------------------------------------------------------
Run the SQL Server 2017 container image with Docker
https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker
docker pull microsoft/mssql-server-linux
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Abc%123456789' -p 1401:1433 --name sql1 -d microsoft/mssql-server-linux
docker ps -a
docker logs <containerid>

start an interactive bash shell
docker exec -it sql1 "bash"

connect locally with sqlcmd
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Abc%123456789'

CREATE DATABASE TestDB
SELECT Name from sys.Databases
GO
