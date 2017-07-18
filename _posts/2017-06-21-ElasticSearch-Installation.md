---
layout: post
key: blog
title: "Elastic Search (Installation)"
date: 2017-06-21
categories:
- blog
---

> Notes for Elastic Search.

## 1. Basic
  * What is Elastic Search?
  [https://www.elastic.co](https://www.elastic.co)  
  * Kibana, Elastic Cloud
  [https://www.elastic.co/products/kibana](https://www.elastic.co/products/kibana)
## 2. Installation
I will use virtual box to install Ubuntu virtual machine, then install Elasticsearch and other components on Ubuntu.
### 2.1 Install Java in Ubuntu  
  [How to Install Oracle Java on Ubuntu Linux](http://www.wikihow.com/Install-Oracle-Java-on-Ubuntu-Linux)  
### 2.2 Install Elastic Search in Ubuntu  
  * Download Elasticsearch
  Go to [https://www.elastic.co/downloads](https://www.elastic.co/downloads), click 'Download' for Elasticsearch, choose DEB.  
  * Install  
  In terminal, navigate to the folder which contains the downloaded file, run  
  ```
  sudo dpkg -i elasticsearch-5.5.0.deb
  ```
  After that, Elasticsearch is installed in  
  ```
  /usr/share/elasticsearch/
  ```
  And the configuration files are in  
  ```
  /etc/elasticsearch
  ```
  Edit /etc/elasticsearch/elasticsearch.yml for customization. If you cannot go inside to the configuration folder, run
  ```
  sudo chmod -R 755 /etc/elasticsearch
  ```
  *  Commands for ES  
  ```
  sudo service elasticsearch start   //start elasticsearch  
  sudo service elasticsearch status  //check status  
  sudo service elasticsearch stop    //stop elasticsearch
  ```
  * Start ES and test whether it is working
  ```
  curl "http://localhost:9200"
  ```
  or open the link in web browser,
  ```
  http://localhost:9200
  ```
  either you should see some json strings returned.  
  ```
  {
    "name" : "kYY1YjJ",
    "cluster_name" : "elasticsearch",
    "cluster_uuid" : "aTe5itS9S_WCp348J78oaA",
    "version" : {
      "number" : "5.5.0",
      "build_hash" : "260387d",
      "build_date" : "2017-06-30T23:16:05.735Z",
      "build_snapshot" : false,
      "lucene_version" : "6.6.0"
    },
    "tagline" : "You Know, for Search"
  }
  ```
### 2.2 Install Kibana  
  * Download Kibana
  Go to [https://www.elastic.co/downloads](https://www.elastic.co/downloads), click 'Download' for Kibana, choose DEB 64-BIT.  
  * Install  
  In terminal, navigate to the folder which contains the downloaded file, run  
  ```
  sudo dpkg -i kibana-5.5.0-amd64.deb  
  ```
  * Commands for Kibana
  ```
  sudo service kibana start   //start kibana  
  sudo service kibana status  //check status  
  sudo service kibana stop    //stop kibana  
  ```
  * Kibana configuration - Change log file (Optional)  
  a) Ceate log file and grant write permission, /var/log/kibana/log
  ```
  cd /var/log/
  mkdir kibana
  cd kibana
  touch log
  sudo chmod 777 log
  ```  
  b) Change logging.dest to direct it to new path
  ```
  sudo service kibana stop  //stop kibana  
  sudo nano /etc/kibana/kibana.yml  //open the configuration file
  logging.dest: /var/log/kibana/log  //set new file path for the log file
  sudo service kibana start   //restart kibana  
  ```
  * Kibana configuration - Remote access Kibana from host (Optional)  
  a) Set Network connection for guest(Ubuntu)
  [Accessing your Virtualbox Guest from your Host OS](https://2buntu.com/articles/1513/accessing-your-virtualbox-guest-from-your-host-os/)
  b) Set guest's IP address to server.host for kibana
  ```
  sudo service kibana stop  //stop kibana  
  sudo nano /etc/kibana/kibana.yml
  server.host: 192.168.56.101  //set ip address to server.host
  sudo service kibana start   //restart kibana  
  ```
  c) access following address in guest and host. You should be able to see kibana properly.
  ```
  http://192.168.56.101:5601/
  ```
  * Install Sense  
  Sense was renamed to Console and it is already available on Kibana 5.\*. In Kibana, just click on Dev Tools.  

## 3. Reference
[https://blog.coding.net/blog/elastic-search](https://blog.coding.net/blog/elastic-search)  
[How To Install and Configure Elasticsearch on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-elasticsearch-on-ubuntu-16-04)  
[Installing and Running Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/guide/current/running-elasticsearch.html)  
[How to Open Ports in Ubuntu and CentOS using IPtables](https://www.rosehosting.com/blog/how-to-open-ports-in-ubuntu-and-centos-using-iptables/)  
