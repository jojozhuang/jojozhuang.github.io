---
layout: tutorial
key: tutorial
title: "SSH into Synology NAS"
index: 9511
subcategory: synology
date: 2020-10-02
tags: [NAS, Synology, SSH]
---

> Login to Synology DSM with ssh.

## 1. Remote Connect to SSH
### 1.1 Enabling SSH Service
Go to DSM > Control Panel > Terminal & SNMP > Terminal, and tick Enable SSH service. Specify a different port number other than 22. For security, never use the default port 22.
![image](/assets/images/synology/9511/enable-ssh-service.png)
### 1.2 Log into Synology via SSH
Enter `ssh user@IP -p port` in terminal. Then enter the password of the user. For example, 'ssh johnny@192.168.0.2 -p 1022'.
![image](/assets/images/synology/9511/ssh-login.png)

## 2. References
* [How to login to DSM with root permission via SSH/Telnet](https://www.synology.com/en-global/knowledgebase/DSM/tutorial/General_Setup/How_to_login_to_DSM_with_root_permission_via_SSH_Telnet)
