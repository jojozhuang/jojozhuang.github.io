---
layout: post
key: blog
title: "Elastic Search"
date: 2017-06-21
categories:
- blog
---

> Notes for Elastic Search.

## 1. Basic
  * What is Elastic Search?
  * Elastic Cloud, Kibana

## 2. Install
  * Install Java in Ubuntu  
  [How to Install Oracle Java on Ubuntu Linux](http://www.wikihow.com/Install-Oracle-Java-on-Ubuntu-Linux)  
  * Install Elastic Search in Ubuntu  
  a) Go to [https://www.elastic.co/downloads](https://www.elastic.co/downloads), click 'Download' for Elasticsearch, choose DEB.  
  b) In terminal, navigate to the folder which contains the downloaded file, run  
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
  c) Command to start ES  
  ```
  sudo service elasticsearch start
  ```
  d) Command to check the status  
  ```
  sudo service elasticsearch status
  ```
  e) Command to stop ES  
  ```
  sudo service elasticsearch stop
  ```
  f) run in terminal
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
  * Install Kibana  
  a) Go to [https://www.elastic.co/downloads](https://www.elastic.co/downloads), click 'Download' for Kibana, choose DEB 64-BIT.  
  b) In terminal, navigate to the folder which contains the downloaded file, run  
  ```
  sudo dpkg -i kibana-5.5.0-amd64.deb  
  ```
  c) Commands for Kibana
  ```
  sudo service kibana start   //start kibana  
  sudo service kibana status  //check status  
  sudo service kibana stop    //stop kibana  
  ```
  d) Kibana configuration - Change log file  
  1. stop kibana  
  2. edit kibana configration file
  ```
  sudo nano /etc/kibana/kibana.yml
  ```
  set new file path for the log file
  ```
  logging.dest: /var/log/kibana/log  
  ```
  3. Ceate log file and grant write permission
  ```
  cd /var/log/
  mkdir kibana
  cd kibana
  touch log
  sudo chmod 777 log
  ```  
  4. start kibana  
  e) Kibana configuration - Remote access Kibana
  1. stop kibana  
  2. edit kibana configration file
  ```
  sudo nano /etc/kibana/kibana.yml
  ```
  set ip address to server.host
  ```
  server.host: 192.168.56.101
  ```
  3. access following address in guest and host.
  ```
  http://192.168.56.101:5601/
  ```
  * Install Sense  
  Sense was renamed to Console and it is already available on Kibana 5.\*. In Kibana, just click on Dev Tools.  

## 3. Use
  * Add Data
  * Get Data
  * Update Data
  * Delete Data
  * Search Data

## 3. Conclusion

## 4. Reference
[https://www.elastic.co](https://www.elastic.co)  
[https://blog.coding.net/blog/elastic-search](https://blog.coding.net/blog/elastic-search)  
[How To Install and Configure Elasticsearch on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-elasticsearch-on-ubuntu-16-04)  
[Installing and Running Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/guide/current/running-elasticsearch.html)  
[How to Open Ports in Ubuntu and CentOS using IPtables](https://www.rosehosting.com/blog/how-to-open-ports-in-ubuntu-and-centos-using-iptables/)  
