---
layout: tutorial
key: tutorial
title: "Installing Elasticsearch in Ubuntu"
index: 9709
subcategory: uncategorized
date: 2017-06-21
tags: [Elasticsearch]
---

> Installation of Elasticsearch.

## 1. Basic
### 1.1 What is Elastic Search?  
  * [https://www.elastic.co](https://www.elastic.co)  
  * [http://www.elasticsearchtutorial.com/](http://www.elasticsearchtutorial.com/)

### 1.2 Kibana, Elastic Cloud  
  * [https://www.elastic.co/products/kibana](https://www.elastic.co/products/kibana)

## 2. Installation
I'm using VirtualBox on my MacBook to install Ubuntu as virtual machine, so the host is Mac OSX and the guest is Ubuntu. All the Elasticsearch and its components are installed in Ubuntu.

### 2.1 Installing Java
  The version I used of JDK is 1.8.0_131.  
  * [Oracle JDK Downloads](http://www.oracle.com/technetwork/java/javase/downloads/index.html)  
  * [How to Install Oracle Java on Ubuntu Linux](http://www.wikihow.com/Install-Oracle-Java-on-Ubuntu-Linux)  

### 2.2 Installing Elasticsearch  
  1) Download Elasticsearch  
  Go to [https://www.elastic.co/downloads](https://www.elastic.co/downloads), click 'Download' for Elasticsearch, choose DEB version.  
  2) Install  
  In terminal, navigate to the folder which contains the downloaded file, run  

```raw
$ sudo dpkg -i elasticsearch-5.5.0.deb
```

  When finished, Elasticsearch is installed into /usr/share/elasticsearch/. And the configuration files are in /etc/elasticsearch.  
  You can edit /etc/elasticsearch/elasticsearch.yml for customization. If you cannot access /etc/elasticsearch, run

```raw
$ sudo chmod -R 755 /etc/elasticsearch
```

  3) Commands for ES  
```raw
$ sudo service elasticsearch start   //start elasticsearch  
$ sudo service elasticsearch status  //check status  
$ sudo service elasticsearch stop    //stop elasticsearch
```
  4) Start ES and test through curl

```bash
$ curl "http://localhost:9200"
```

  or open the link [http://localhost:9200](http://localhost:9200) in web browser.  
  Either way, you should see some json strings returned from ES.  
```json
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

### 2.2 Installing Kibana  
1) Download Kibana  
Go to [https://www.elastic.co/downloads](https://www.elastic.co/downloads), click 'Download' for Kibana, choose DEB 64-BIT version.  
2) Install  
In terminal, navigate to the folder which contains the downloaded file, run  
```raw
$ sudo dpkg -i kibana-5.5.0-amd64.deb  
```
3) Commands for Kibana
```raw
$ sudo service kibana start   //start kibana  
$ sudo service kibana status  //check status  
$ sudo service kibana stop    //stop kibana  
```
4) Kibana configuration - Change log file (Optional)  
a. Ceate log file and grant write permission, the log file is /var/log/kibana/log.
```raw
$ cd /var/log/
$ mkdir kibana
$ cd kibana
$ touch log
$ sudo chmod 777 log
```  

b. Specify a file where Kibana stores log output
```raw
$ sudo service kibana stop           //stop kibana  
$ sudo nano /etc/kibana/kibana.yml   //open the configuration file
  logging.dest: /var/log/kibana/log  //set new file path for the log file
$ sudo service kibana start          //restart kibana  
```
5) Kibana configuration - Remote access Kibana from host (Optional)  
a. Set Network connection for guest(Ubuntu)  
* [Accessing your Virtualbox Guest from your Host OS](https://2buntu.com/articles/1513/accessing-your-virtualbox-guest-from-your-host-os/)  

b. Set guest's IP address to server.host for kibana
```raw
$ ifconfig                          //find Ubuntu\'s IP address, eg 192.168.56.101, specified in DHCP server.
$ sudo service kibana stop          //stop kibana  
$ sudo nano /etc/kibana/kibana.yml  //open kibana configuration file
  server.host: 192.168.56.101       //set ip address to server.host
$ sudo service kibana start         //restart kibana  
```
c. Open link [http://192.168.56.101:5601/](http://192.168.56.101:5601/)in web browser in guest(Ubuntu), you should be able to see that kibana is working properly. Then, open the same link in host(Mac OSX), you should also be able to get the same kibana page.  

### 2.3 Installing Sense  
Sense was renamed to Console and it is already available on Kibana 5.\*. In Kibana, just click on Dev Tools.  

## 3. Reference
* [Installing and Running Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/guide/current/running-elasticsearch.html)  
* [How To Install and Configure Elasticsearch on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-elasticsearch-on-ubuntu-16-04)  
* [How to Open Ports in Ubuntu and CentOS using IPtables](https://www.rosehosting.com/blog/how-to-open-ports-in-ubuntu-and-centos-using-iptables/)  
