---
layout: tutorial
key: tutorial
title: "Deploying Spring Boot RESTful API to Heroku"
index: 8623
subcategory: restful-api
date: 2018-08-05
tags: [Spring Boot, Heroku]
---

> Deploy the RESTful API built with Spring Boot to Heroku.

## 1. Heroku
[Heroku](https://www.heroku.com/) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
### 1.1 Sign Up
Go to https://signup.heroku.com/ create a free Heroku account.
### 1.2 Installing Heroku CLI
Go to https://devcenter.heroku.com/articles/heroku-cli#download-and-install to download proper installer.
### 1.3 Getting Started
First, read the official tutorial [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) to get familiar with the basic functions of Heroku. Below are some of the highlights from the tutorial.  
1) Log into Heroku
```raw
$ heroku login
Enter your Heroku credentials.
Email: csgeek@mail.com
Password: **********
```
2) Create Heroku App
```raw
$ heroku create                 // no name, a random name will be assigned to the app
$ heroku create gamestore-api   // create app with the given name
```
3) View logs
```raw
$ heroku logs --tail
```
4) Scale the app
```raw
$ heroku ps //check how many dynos are running
$ heroku ps:scale web=0 // scale down
$ heroku ps:scale web=1 // scale up
```
5) Run the app locally
```raw
$ heroku local web // same as 'npm start'
```
6) Heroku Console
```raw
$ heroku run bash
Running bash on ⬢ gamestore-api... up, run.4976 (Free)
~ $ ls
LICENSE.md	README.md	pom.xml		src		target
```
* Type 'exit' to quit the console.

## 2. Deployment
### 2.1 Source Code
Clone Spring Boot Project from Github.
```raw
$ git clone https://github.com/jojozhuang/restful-api-springboot.git
$ cd restful-api-springboot
```
### 2.2 Setting API Url
Edit '/src/main/resources/application.properties', replace empty string with the remote api url for 'site.api-url'.
```raw
...

## Site Configuration Properties, set "" by default.
site.api-url="https://gamestore-api.herokuapp.com/"
```
* Note: When I tried to use 'RequestContext' to get the base API Url, it works fine locally. It returns 'http://localhost:8080/'. However, it won't work if I deploy this Spring Boot rest api on Heroku. The URL returned by Heroku contains Heroku's internal host address and port number, see below sample url of the uploaded image. This address is not accessible for the front-end web app.
```raw
https://59cd2cb3-bfd1-4ae2-a266-982aaa55f7d0.prvt.dyno.rt.heroku.com:35113/images/636690875005430000_wiiu_fightingpad.jpg
```

### 2.3 Creating App on Heroku
```raw
$ heroku create gamestore-api
```
* When creating an app, a git remote (called heroku) is also created and associated with the local git repository.

### 2.4 Pushing files to Heroku
```raw
$ git push heroku master
Counting objects: 40, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (34/34), done.
Writing objects: 100% (40/40), 255.86 KiB | 18.28 MiB/s, done.
Total 40 (delta 2), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Java app detected
remote: -----> Installing JDK 1.8... done
remote: -----> Installing Maven 3.3.9... done
remote: -----> Executing: mvn -DskipTests clean dependency:list install
remote:        [INFO] Scanning for projects...
remote:        [INFO] Downloading: https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-starter-parent/1.5.6.RELEASE/spring-boot-starter-parent-1.5.6.RELEASE.pom
remote:        [INFO] Downloaded: https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-starter-parent/1.5.6.RELEASE/spring-boot-starter-parent-1.5.6.RELEASE.pom (8 KB at 14.3 KB/sec)
remote:        [INFO] Downloading: https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-dependencies/1.5.6.RELEASE/spring-boot-dependencies-1.5.6.RELEASE.pom
remote:        [INFO] Downloaded: https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-dependencies/1.5.6.RELEASE/spring-boot-dependencies-1.5.6.RELEASE.pom (91 KB at 2516.5 KB/sec)
remote:        [INFO] Downloading: https://repo.maven.apache.org/maven2/com/fasterxml/jackson/jackson-bom/2.8.9/jackson-bom-2.8.9.pom
remote:        [INFO] Downloaded: https://repo.maven.apache.org/maven2/com/fasterxml/jackson/jackson-bom/2.8.9/jackson-bom-2.8.9.pom (11 KB at 635.5 KB/sec)
remote:        [INFO] Downloading: https://repo.maven.apache.org/maven2/com/fasterxml/jackson/jackson-parent/2.8/jackson-parent-2.8.pom
remote:        [INFO] Downloaded: https://repo.maven.apache.org/maven2/com/fasterxml/jackson/jackson-parent/2.8/jackson-parent-2.8.pom (8 KB at 598.9 KB/sec)
remote:        [INFO] Downloading: https://repo.maven.apache.org/maven2/com/fasterxml/oss-parent/27/oss-parent-27.pom
remote:        [INFO] Downloaded: https://repo.maven.apache.org/maven2/classworlds/classworlds/1.1-alpha-2/classworlds-1.1-alpha-2.jar (37 KB at 3330.6 KB/sec)
...
...
...
remote:        [INFO] Downloaded: https://repo.maven.apache.org/maven2/commons-codec/commons-codec/1.6/commons-codec-1.6.jar (228 KB at 5828.6 KB/sec)
remote:        [INFO] Downloaded: https://repo.maven.apache.org/maven2/org/apache/maven/shared/maven-shared-utils/0.4/maven-shared-utils-0.4.jar (152 KB at 3795.2 KB/sec)
remote:        [INFO] Downloaded: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-utils/3.0.15/plexus-utils-3.0.15.jar (234 KB at 4762.3 KB/sec)
remote:        [INFO] Installing /tmp/build_f7df79e7776a207c3e14041b2230106c/target/app.jar to /app/tmp/cache/.m2/repository/johnny/tutorial/RestfulSpringBoot/0.0.1-SNAPSHOT/RestfulSpringBoot-0.0.1-SNAPSHOT.jar
remote:        [INFO] Installing /tmp/build_f7df79e7776a207c3e14041b2230106c/pom.xml to /app/tmp/cache/.m2/repository/johnny/tutorial/RestfulSpringBoot/0.0.1-SNAPSHOT/RestfulSpringBoot-0.0.1-SNAPSHOT.pom
remote:        [INFO] ------------------------------------------------------------------------
remote:        [INFO] BUILD SUCCESS
remote:        [INFO] ------------------------------------------------------------------------
remote:        [INFO] Total time: 17.173 s
remote:        [INFO] Finished at: 2018-08-05T17:21:14+00:00
remote:        [INFO] Final Memory: 36M/188M
remote:        [INFO] ------------------------------------------------------------------------
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 76.9M
remote: -----> Launching...
remote:        Released v3
remote:        https://gamestore-api.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/gamestore-api.git
 * [new branch]      master -> master
```
The deployment is finished.

If you changed the app name or you are deploying new changes. You need to re-connect your git repository to Heroku app.
```raw
$ git remote rm heroku
$ heroku git:remote -a gamestore-api
```

## 3. Testing
Open web browser, access 'https://gamestore-api.herokuapp.com/api/products'. The API is working now.
![image](/assets/images/backend/8623/api.png)
It returns some products in JSON format. Notice, the image URL contains the correct API server address.
![image](/assets/images/backend/8623/json.png)

## 4. References
* [Deploying Spring Boot Applications to Heroku](https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku)
* [Deploy your Spring Boot project on the cloud for FREE](https://medium.com/@ryanyuliu/deploy-your-spring-boot-project-properly-for-free-66ae38012698)
