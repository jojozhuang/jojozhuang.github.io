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
docker cp ShoeStore5.db mssql:/ShoeStore5.bak
docker cp mycontainer:/foo.txt foo.txt

https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-migrate-restore-database
RESTORE DATABASE ShoeStore5
FROM DISK = '/ShoeStore5.bak'
WITH MOVE 'ShoeStore5' TO '/var/opt/mssql/data/ShoeStore5.mdf',
MOVE 'ShoeStore5_Log' TO '/var/opt/mssql/data/ShoeStore5_Log.ldf'
GO

USE master ;  
GO  
DROP DATABASE ShoeStore5;  
GO

RESTORE DATABASE ShoeStore5
FROM DISK = '/var/opt/mssql/backup/ShoeStore5.bak'
WITH MOVE 'ShoeStore5' TO '/var/opt/mssql/data/ShoeStore5.mdf',
MOVE 'ShoeStore5_Log' TO '/var/opt/mssql/data/ShoeStore5_Log.ldf'
GO

RESTORE DATABASE ShoeStore5 FROM DISK = '/ShoeStore5.bak' WITH MOVE 'ShoeStore5' TO '/var/opt/mssql/data/ShoeStore5.mdf', MOVE 'ShoeStore5_Log' TO '/var/opt/mssql/data/ShoeStore5_Log.ldf'
GO

<add name="EFDbContext" connectionString="server=192.168.99.100,1401;database=ShoeStore5;uid=sa;pwd=Abc%123456789;MultipleActiveResultSets=true;" providerName="System.Data.SqlClient" />
