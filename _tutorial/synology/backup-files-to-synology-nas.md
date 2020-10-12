---
layout: tutorial
key: tutorial
title: "Best Way to Back Up Files with Synology NAS"
index: 9515
subcategory: synology
date: 2020-10-04
tags: [Backup, Synology]
---

> Back up photos, Git repos and important files with Synology NAS.

## 1. Backup Strategy
### 1.1 Photos
1) In Windows 10, copy photos from iPhone to portable HDD/SSD drive with USB cable.
![image](/assets/images/synology/9515/iphone-usb-drive.png)
* On macOS, iPhone is not recognized as a USB Flash Drive, but it is recognized on Windows.  

2) Sync photos from portable ssd drive to macOS.  
3) Use "Sync Folders" app sync files to Synology NAS, https://www.greenworldsoft.com/sync-folders-pro-help.php#Sync-modes. 
4) In Synology NAS, use "Cloud Sync" upload files to Baidu Cloud.

Total 4 File Copies:
* Portable ssd drive
* macOS (can remove some folders which won't be changed)
* Synology NAS
* Baidu Cloud

### 1.2 Docs Files
1) Maintain files on macOS, use "Goole Backup and Sync" sync to Google Drive, see https://www.google.com/intl/en-GB_ALL/drive/download/backup-and-sync/.  
2) In Synology NAS, create task in "Cloud Sync" to download files from Google Drive to NAS.  
3) In Synology NAS, create another task in "Cloud Sync" to upload files from NAS to Baidu Cloud.  

Total 4 File Copies:
* Mac
* Google Drive
* Synology NAS
* Baidu Cloud

### 1.3 GitHub Repos
1) In Synology NAS, create scheduled task with bash script to download all repositories from GitHub(archived zip).  
2) In Synology NAS, create task in "Cloud Sync" to upload files from NAS to Baidu Cloud.  

Total 3 File Copies:
* GitHub
* Synology NAS
* Baidu Cloud

### 1.4 Additional Backups
1) Compress some import files to a single package, manually upload to Synology NAS.
2) In Synology NAS, create task in "Cloud Sync" to upload files from NAS to Baidu Cloud.  

Total 2 File Copies:
* Synology NAS
* Baidu Cloud

## 2. Problem with the Zip File
### 2.1 Chinese Character in File Name
"unzip" does not work properly on macOS when file name contains Chinese characters. After the decompression, the file name is either empty or only has the underscore character. The decompression works properly for english characters.
![image](/assets/images/synology/9515/chinese-file-name.png)

If the same zip package is decompressed in windows 10, Chinese characters are properly displayed.
![image](/assets/images/synology/9515/correct-file-name.png)

If the same files are compressed in windows 10 with 7-Zip, the file name looks good and Chinese characters are properly displayed. `To throughly avoid this issue on macOS, we have to compress the files in Windows 10`. If you don't want to copy files between Windows and macOS, you can create a Windows virtual machine on macOS with VirtualBox. Then share a folder from macOS to Windows and compress the files in Windows.

## 3. References
