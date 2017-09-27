---
layout: post
key: blog
title: "Data Persistence with JPA & Eclipselink"
date: 2016-02-21
tags: [JPA, Eclipse, Eclipselink, ORM, Hibernate, Mysql]
---

> Use JPA and Eclipselink to persistent data into database.

## 1. JPA, JPA Provider, Eclipselink, Hibernate
### 1.1 JPA
JPA stands for JAVA Persistence API. JPA is a collection of classes and methods to persistently store the vast amounts of data into a database.

### 1.2 JPA Providers
JPA is an open source API, therefore various enterprise vendors such as Oracle, Redhat, Eclipse, etc. provide new products by adding the JPA persistence flavor in them. Some of these products include:
Hibernate, Eclipselink, Toplink, Spring Data JPA, etc.

### 1.3 EclipseLink
EclipseLink is the open source Eclipse Persistence Services Project from the Eclipse Foundation. EclipseLink is the default JPA provider implemented by oracle.

### 1.4 Hibernate
Hibernate is a high-performance Object/Relational persistence and query service. Hibernate not only takes care of the mapping from Java classes to database tables (and from Java data types to SQL data types), but also provides data query and retrieval facilities.

### 1.5 Difference Between JPA and Hibernate
JPA define guidelines to implement the Object Relational Mapping (ORM) and there is no underlying code for the implementation. Where as, Hibernate is the actual implementation of JPA guidelines.

## 2. Prerequisites
Development environment has been setup. JDK, Eclipse and Tomcat are all installed. Otherwise, refer to [Setup Java Development Environment]({% link _posts/2016-02-10-setup-java-development-environment.md %}) to setup your development environment.

In addition, if you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to my previous posting [Install Docker Toolbox and Kitematic on Mac]({% link _posts/2016-09-15-install-docker-toolbox-and-kitematic-on-mac.md %}).

## 3. Install Eclipselink in Eclipse
In Eclipse, File -> New -> 'JPA Project', Name: JPATutorial, and select 'Java SE 8' for target runtime, click Next.  
![MIME Type](/public/pics/2016-02-21/jpaproject.png)  
Click on download library (if you do not have the library) in the user library section:
![MIME Type](/public/pics/2016-02-21/jpafacet.png)  
Select the latest version of Eclipselink library and click Next.
![MIME Type](/public/pics/2016-02-21/eclipselink.png)  
Accept the terms of license and click Finish to start downloading.
![MIME Type](/public/pics/2016-02-21/downloading.png)  
After downloading, click Finish.
![MIME Type](/public/pics/2016-02-21/finish.png)  
Finally you get the project file in the Package Explorer in Eclipse IDE. Expand all files, you will get the folder and file hierarchy as follows:
![MIME Type](/public/pics/2016-02-21/projectstructure.png)  

## 4. Adding MySQL Connector to Project
To access Mysql database, we need mysql connector jar.
Go to https://dev.mysql.com/downloads/connector/j/5.1.html, download Mysql Connector/J.
![MIME Type](/public/pics/2016-09-12/mysqlconnectordownload.png)  
Unzip it, and copy mysql-connector-java-5.1.44-bin.jar to /JPATutorial/lib/  
Go to Project properties -> Java Build Path by right click on it. You will get a dialog box as follows: Click on Add External Jars.
![MIME Type](/public/pics/2016-02-21/mysqlconnector.png)  

## 5. Setup Mysql Database
We use docker to host our mysql database server.
### 5.1 Create Dockerfile
Create docker file with the following content.
```sh
#Create Mysql Image for JPA Tutorial
FROM mysql
MAINTAINER jojozhuang@gmail.com

ENV MYSQL_ROOT_PASSWORD jpa
ADD jpa_backup.sql /docker-entrypoint-initdb.d // create database when container is started.

EXPOSE 3306
```
This docker file is already created, which is located in /JPATutorial/docker/.
Besides, notice that we add jpa_backup.sql file into /docker-entrypoint-initdb.d, which means the sql inside jpa_backup.sql will be executed when mysql container is started. There is only one line sql script, just create a database named 'jpadb'.
```sql
CREATE DATABASE  IF NOT EXISTS `jpadb`
```

### 5.2 Create Image with Dockerfile
In terminal, navigate to /JPATutorial/docker/, run command.
```sh
docker build -t jpa-mysql:0.1 .
```
Check images with following command.
```sh
docker images
```
![MIME Type](/public/pics/2016-02-21/dockerimage.png)  

### 5.3 Run Mysql Container With The New Image
In terminal, run command.
```sh
docker run --detach --name=jpamysql --publish 11020:3306 jpa-mysql:0.1
```
You will see that mysql container is running now. And note the ip address and port. We will use them to configure the database connection in eclipse.
![MIME Type](/public/pics/2016-02-21/kitematic.png)  

## 6. Making Changes to JPA Project
### 6.1 Configure Persistence.xml
In eclipse, open Persistence.xml of JPATutorial, switch to source view. Edit it as follows:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.1" xmlns="http://xmlns.jcp.org/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd">
    <persistence-unit name="JPATutorial">
        <class>com.jojostudio.jpatutorial.entity.Employee</class>

        <properties>
           <property name="javax.persistence.jdbc.url" value="jdbc:mysql://192.168.99.100:11020/jpadb"/>
           <property name="javax.persistence.jdbc.user" value="root"/>
           <property name="javax.persistence.jdbc.password" value="jpa"/>
           <property name="javax.persistence.jdbc.driver" value="com.mysql.jdbc.Driver"/>
           <property name="eclipselink.logging.level" value="FINE"/>
           <property name="eclipselink.ddl-generation" value="create-tables"/>
        </properties>
    </persistence-unit>
</persistence>
```
### 6.2 Creating Entity
Create a package named ‘com.jojostudio.jpatutorial.entity’, under ‘src’ (Source) package.
![MIME Type](/public/pics/2016-02-21/package.png)
Create a class named Employee.java under given package as follows:
```java
package com.jojostudio.jpatutorial.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private int eid;
    private String ename;
    private double salary;
    private String deg;

    public Employee(int eid, String ename, double salary, String deg) {
       super( );
       this.eid = eid;
       this.ename = ename;
       this.salary = salary;
       this.deg = deg;
    }

    public Employee( ) {
       super();
    }

    public int getEid( ) {
        return eid;
    }

    public void setEid(int eid) {
       this.eid = eid;
    }

    public String getEname( ) {
       return ename;
    }

    public void setEname(String ename) {
       this.ename = ename;
    }

    public double getSalary( ) {
       return salary;
    }

    public void setSalary(double salary) {
       this.salary = salary;
    }

    public String getDeg( ) {
       return deg;
    }

    public void setDeg(String deg) {
       this.deg = deg;
    }

    @Override
    public String toString() {
       return "Employee [eid=" + eid + ", ename=" + ename + ", salary=" + salary + ", deg=" + deg + "]";
    }
}
```
### 6.2 Creating Persistence Operations
Create another package named ‘com.jojostudio.jpatutorial.service’, under ‘src’ (source) package.  
Create 'CreateEmployee.java'
```java
package com.jojostudio.jpatutorial.service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.jojostudio.jpatutorial.entity.Employee;

public class CreateEmployee {
    public static void main(String[] args) {

        EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("JPATutorial");

        EntityManager entitymanager = emfactory.createEntityManager();
        entitymanager.getTransaction().begin();

        Employee employee = new Employee();
        employee.setEid(1001);
        employee.setEname("Johnny");
        employee.setSalary(40000);
        employee.setDeg("Technical Manager");

        entitymanager.persist(employee);
        entitymanager.getTransaction().commit();

        entitymanager.close();
        emfactory.close();
    }
}
```
Create 'UpdateEmployee.java'
```java
package com.jojostudio.jpatutorial.service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.jojostudio.jpatutorial.entity.Employee;

public class UpdateEmployee {
    public static void main(String[] args) {
        EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("JPATutorial");

        EntityManager entitymanager = emfactory.createEntityManager();
        entitymanager.getTransaction().begin();
        Employee employee = entitymanager.find(Employee.class, 1001);

        // before update
        System.out.println(employee);
        employee.setSalary(86000);
        entitymanager.getTransaction().commit();

        // after update
        System.out.println(employee);
        entitymanager.close();
        emfactory.close();
    }
}
```
Create 'FindEmployee.java'
```java
package com.jojostudio.jpatutorial.service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.jojostudio.jpatutorial.entity.Employee;

public class FindEmployee {
    public static void main(String[] args) {

        EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("JPATutorial");
        EntityManager entitymanager = emfactory.createEntityManager();
        Employee employee = entitymanager.find(Employee.class, 1001);

        System.out.println("employee ID = " + employee.getEid());
        System.out.println("employee NAME = " + employee.getEname());
        System.out.println("employee SALARY = " + employee.getSalary());
        System.out.println("employee DESIGNATION = " + employee.getDeg());
    }
}
```
Create 'DeleteEmployee.java'
```java
package com.jojostudio.jpatutorial.service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.jojostudio.jpatutorial.entity.Employee;

public class DeleteEmployee {
    public static void main(String[] args) {

        EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("JPATutorial");
        EntityManager entitymanager = emfactory.createEntityManager();
        entitymanager.getTransaction().begin();

        Employee employee = entitymanager.find(Employee.class, 1001);
        entitymanager.remove(employee);
        entitymanager.getTransaction().commit();
        entitymanager.close();
        emfactory.close();
    }
}
```

## 7. Testing
### 7.1 Run CreateEmployee Method
Right click on CreateEmployee.java file -> Run AS -> Java Application. You will get notifications from Eclipselink library on the console panel of eclipse IDE.
### 7.2 Connect Mysql With MysqlWorkbench
Add New Connection in MysqlWorkbench and open the connection.
![MIME Type](/public/pics/2016-02-21/workbench.png)
### 7.3 Checking Data
Run sql query to find all rows in the Employee table.
```sql
SELECT * FROM jpadb.EMPLOYEE;
```
We see the row for new employee is there.
![MIME Type](/public/pics/2016-02-21/datacreated.png)

Test updating, finding and deleting with the same approach. Data should always get updated properly in mysql.

## 8. Other Topics
* JPQL
* Entity Relationships
* Criteria API

## 9. Source Files
* [Source files of JPA Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/JPATutorial)

## 10. Reference
* [JPA Tutorial](https://www.tutorialspoint.com/jpa/index.htm)
* [EclipseLink](http://www.eclipse.org/eclipselink/)
* [What's the difference between JPA and Hibernate?](https://stackoverflow.com/questions/9881611/whats-the-difference-between-jpa-and-hibernate)
