---
layout: tutorial
key: popular
title: "Setting up WordPress in Docker"
index: 1801
subcategory: wordpress
date: 2020-06-20
tags: [WordPress, Docker]
---

> Setup WordPress in Docker on macOS.

## 1. What is WordPress?
[WordPress](https://wordpress.com/) is a free and open-source content management system (CMS) written in PHP and paired with a MySQL or MariaDB database. Features include a plugin architecture and a template system, referred to within WordPress as Themes.

## 2. Installing WordPress in Docker
### 2.1 Docker Compose
Create docker compose file with three services.
* Database: MySQL
* Database Admin: phpMyAdmin
* WordPress

```yaml
# docker-compose.yaml
version: '3.7'

services:
  # Database
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    networks:
      - wpsite
  # phpmyadmin
  phpmyadmin:
    depends_on:
      - db
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - '12003:80'
    environment:
      PMA_HOST: db
      MYSQL_ROOT_PASSWORD: password
    networks:
      - wpsite
  # Wordpress
  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - '12002:80'
    restart: always
    volumes: ['./:/var/www/html']
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
    networks:
      - wpsite
networks:
  wpsite:
volumes:
  db_data:
```
### 2.2 Run Container
Navigate to the directory where the docker compose file locates, and run.
```sh
docker-compose up -d
```
Open browser, visit home page http://localhost:12002.
![image](/assets/images/wordpress/1801/homepage.png)
Admin dashboard.
![image](/assets/images/wordpress/1801/admin_dashboard.png)

## 3. Basic Settings
* Permalink - Settings -> Permalinks

## 4. References
* [WordPress on Docker Hub](https://hub.docker.com/_/wordpress/)
* [MySQL on Docker Hub](https://hub.docker.com/_/mysql)
* [Official phpMyAdmin Docker image](https://hub.docker.com/r/phpmyadmin/phpmyadmin)
* [Quick Wordpress Setup With Docker on Youtube](https://www.youtube.com/watch?v=pYhLEV-sRpY)
* [How To Make a WordPress Website - For Beginners](https://www.youtube.com/watch?v=8AZ8GqW5iak&t=239s)
