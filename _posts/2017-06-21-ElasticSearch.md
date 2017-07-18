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
  a) Go to https://www.elastic.co/downloads, click 'Download' for Elasticsearch, choose DEB.  
  b) In terminal, navigate to the folder which contains the downloaded file, run 'sudo dpkg -i elasticsearch-5.5.0.deb'. After that, Elasticsearch is installed in /usr/share/elasticsearch/. And the configuration files are in /etc/elasticsearch. Edit /etc/elasticsearch/elasticsearch.yml for customization. If you cannot go inside to the configuration folder, run 'sudo chmod -R 755 /etc/elasticsearch'.  
  c) run 'sudo service elasticsearch start' to start ES  
  d) run 'sudo service elasticsearch status' to check the status  
  e) run 'sudo service elasticsearch stop' to stop ES  
  f) run 'curl "http://localhost:9200"' in terminal or open the link "http://localhost:9200" in web browser, either you should see some json strings returned.  
  * Install Kibana  
  a) Go to https://www.elastic.co/downloads, click 'Download' for Kibana, choose DEB 64-BIT.  
  b) In terminal, navigate to the folder which contains the downloaded file, run 'sudo dpkg -i kibana-5.5.0-amd64.deb'.  
  c) run 'sudo service kibana start' to start kibana  
  d) run 'sudo service kibana status' to check the status  
  e) run 'sudo service kibana stop' to stop kibana  
  f) Kibana configuration - Change log file  
  stop kibana  
  sudo nano /etc/kibana/kibana.yml, set logging.dest: /var/log/kibana/log  
  go to /var/log/, mkdir kibana, cd kibana, touch log, sudo chmod 777 log  
  start kibana  
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
