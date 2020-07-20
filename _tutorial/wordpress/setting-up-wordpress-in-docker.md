---
layout: tutorial
key: tutorial
title: "Setting up WordPress in Docker"
index: 8201
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
Navigate to the directory where the docker compose file locates, and run `docker-compose up -d` to create containers. Docker will start downloading the images and run containers with them.
```sh
$ docker-compose up -d
Creating network "jojozhuang-wordpress-docker_wpsite" with the default driver
Creating volume "jojozhuang-wordpress-docker_db_data" with default driver
Pulling db (mysql:5.7)...
5.7: Pulling from library/mysql
8559a31e96f4: Pull complete
d51ce1c2e575: Pull complete
c2344adc4858: Pull complete
fcf3ceff18fc: Pull complete
16da0c38dc5b: Pull complete
b905d1797e97: Pull complete
4b50d1c6b05c: Pull complete
d85174a87144: Pull complete
a4ad33703fa8: Pull complete
f7a5433ce20d: Pull complete
3dcd2a278b4a: Pull complete
Digest: sha256:32f9d9a069f7a735e28fd44ea944d53c61f990ba71460c5c183e610854ca4854
Status: Downloaded newer image for mysql:5.7
Pulling phpmyadmin (phpmyadmin/phpmyadmin:)...
latest: Pulling from phpmyadmin/phpmyadmin
afb6ec6fdc1c: Pull complete
3d895574014b: Pull complete
c309fdad6410: Pull complete
c201f6a5d6f9: Pull complete
e87f853892aa: Pull complete
998b2113b400: Pull complete
b3c0b4710d3b: Pull complete
031d21f0c70d: Pull complete
d06357e06110: Pull complete
8f23fed45284: Pull complete
f9d08c7d9248: Pull complete
18c5c4844124: Pull complete
14efef405562: Pull complete
7427627cf8b5: Pull complete
479dd014f61e: Pull complete
b3b40e90f791: Pull complete
c085166cfca7: Pull complete
cf705563e99a: Pull complete
Digest: sha256:9feb8ae9a1b33e652d77a60df1ec7bcd34d15b4ccb34352783fc5476aedec55a
Status: Downloaded newer image for phpmyadmin/phpmyadmin:latest
Pulling wordpress (wordpress:latest)...
latest: Pulling from library/wordpress
8559a31e96f4: Already exists
e0276193a084: Pull complete
eb2d00c10344: Pull complete
f54006e0dc29: Pull complete
e0d3d1244592: Pull complete
3a60f364b0c5: Pull complete
3e309988c00b: Pull complete
bff5c52c95f4: Pull complete
c9086065e896: Pull complete
f07bb8dcc770: Pull complete
7ad826bc3623: Pull complete
0f6a0743d973: Pull complete
43b190adf511: Pull complete
cc02e4c247ac: Pull complete
cd5c5e392dc3: Pull complete
a029df01fe2d: Pull complete
6c942bd52caf: Pull complete
804bbda23122: Pull complete
bb70a73ffdf7: Pull complete
bfb71f3becd7: Pull complete
de65ae4965eb: Pull complete
Digest: sha256:fca7ad7cd76171c61493c4a01f5e4362009235e89895273194fab8ef9757b4ee
Status: Downloaded newer image for wordpress:latest
Creating jojozhuang-wordpress-docker_db_1 ... done
Creating jojozhuang-wordpress-docker_wordpress_1  ... done
Creating jojozhuang-wordpress-docker_phpmyadmin_1 ... done
```
Run `docker images` to view the images.
```sh
$ docker images
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
wordpress               latest              24fd630a789d        3 days ago          540MB
mysql                   5.7                 9cfcce23593a        12 days ago         448MB
phpmyadmin/phpmyadmin   latest              6f9550cff175        2 weeks ago         469MB
```
Run `docker ps` to view the containers.
```sh
$ docker ps
CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS              PORTS                   NAMES
e7af63f8c5bb        phpmyadmin/phpmyadmin   "/docker-entrypoint.…"   6 minutes ago       Up 6 minutes        0.0.0.0:12003->80/tcp   jojozhuang-wordpress-docker_phpmyadmin_1
b84b1ee907b2        wordpress:latest        "docker-entrypoint.s…"   6 minutes ago       Up 6 minutes        0.0.0.0:12002->80/tcp   jojozhuang-wordpress-docker_wordpress_1
3667b775a320        mysql:5.7               "docker-entrypoint.s…"   6 minutes ago       Up 6 minutes        3306/tcp, 33060/tcp     jojozhuang-wordpress-docker_db_1
```
### 2.3 Workpress
Open browser, visit http://localhost:12002, it will navigate to the wordpress install page.

Select language.
![image](/assets/images/wordpress/8201/wordpress_installation.png)
Configure the basic information for the website and setup admin account.
![image](/assets/images/wordpress/8201/wordpress_welcome.png)
Success.
![image](/assets/images/wordpress/8201/wordpress_setup_success.png)
Use the admin account to login.
![image](/assets/images/wordpress/8201/login.png)
Admin dashboard.
![image](/assets/images/wordpress/8201/admin_dashboard.png)
Click "Johnny's Webiste"->Visit Site, or visit http://localhost:12002 directly.
![image](/assets/images/wordpress/8201/homepage.png)

### 2.4 phpMyAdmin
Visit http://localhost:12003 to open phpMyAdmin.
![image](/assets/images/wordpress/8201/phpmyadmin_login.png)
In the admin page, you can view the database for workpress.
![image](/assets/images/wordpress/8201/phpmyadmin_admin.png)

## 3. Basic Settings
### 3.1 Permalink
Go to Settings -> Permalinks, choose "Post Namme".
![image](/assets/images/wordpress/8201/permalink_postname.png)

### 3.2 Plugins
Go to Plugins->Add New, search `Starter Template`. This plugin provides lots of free website templates.
![image](/assets/images/wordpress/8201/plugins-search.png)
Choose the first plugin "Starter Templates", install and activate it.
![image](/assets/images/wordpress/8201/plugin-install-activate.png)
Go to Appearance->Starter Template, select `Elementor` as page builder.
![image](/assets/images/wordpress/8201/starter-page-builder.png)
Search and choose your favorite template.
![image](/assets/images/wordpress/8201/starter_search_template.png)
Import Complete Site.
![image](/assets/images/wordpress/8201/starter_import_site.png)
Keep the default settings, click "Import" button.
![image](/assets/images/wordpress/8201/starter_import_options.png)
Wait until the import is completed.
![image](/assets/images/wordpress/8201/starter_import_progress.png)
Then, visit http://localhost:12002. The appearance of the website is total different.
![image](/assets/images/wordpress/8201/homepage_new.png)
Click "Customize" on the top to switch to "Customize" mode. It's easy to edit the page.
![image](/assets/images/wordpress/8201/page_customize.png)
If you make any change, click the "Publish" button publish the site.

### 3.3 Relative Path of Media Files
```sh
# absolute url
define( 'WP_CONTENT_URL', 'http://example/blog/wp-content');
# relative url
define( 'WP_CONTENT_URL', '/wp-content');
```
* [Relative URLs in WordPress](https://stackoverflow.com/questions/17187437/relative-urls-in-wordpress)

Plugins for Media Library.
* Media Library Folders for WordPress - generate thumbnails
* FileBird Lite - view/add media in directory view

Plugin for Markdown
* WP Githuber MD

Migrate all data.
* All-in-One WP Migration
* All-in-One WP Migration File Extension

Classic Editor

FileBird Lite - Media Library in folder
Media Library Folders for WordPress - generate thumbnails

Add From Server - import images to media libary which are uploaded through ftp

Ultimate Category Excluder - exclude category in menu,



## 4. References
* [WordPress on Docker Hub](https://hub.docker.com/_/wordpress/)
* [MySQL on Docker Hub](https://hub.docker.com/_/mysql)
* [Official phpMyAdmin Docker image](https://hub.docker.com/r/phpmyadmin/phpmyadmin)
* [Quick Wordpress Setup With Docker on Youtube](https://www.youtube.com/watch?v=pYhLEV-sRpY)
* [How To Make a WordPress Website - For Beginners](https://www.youtube.com/watch?v=8AZ8GqW5iak&t=239s)
* [Docker Named Volumes](https://www.youtube.com/watch?v=7OYOJG5dHC8)
