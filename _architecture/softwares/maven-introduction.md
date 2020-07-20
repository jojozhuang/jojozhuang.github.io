---
layout: tutorial
key: architecture
title: "Maven - Introduction"
index: 3211
subcategory: softwares
date: 2018-08-10
tags: [Maven]
---

> Maven Overview.

## 1. Maven Overview
### 1.1 What is Maven?
Apache `Maven` is a software project management and comprehension tool. Based on the concept of a `project object model` (POM), Maven can manage a project's build, reporting and documentation from a central piece of information. Using maven we can build and manage any Java based project.

In case of multiple development teams environment, Maven can set-up the way to work as per standards in a very short time. As most of the project setups are simple and reusable, Maven makes life of developer easy while creating reports, checks, build and testing automation setups.

Maven provides developers ways to manage the following −
* Builds
* Documentation
* Reporting
* Dependencies
* SCMs
* Releases
* Distribution
* Mailing list

To summarize, Maven simplifies and standardizes the project build process. It handles compilation, distribution, documentation, team collaboration and other tasks seamlessly. Maven increases reusability and takes care of most of the build related tasks.

### 1.2 Objective
The primary goal of Maven is to provide developer with the following −
* A comprehensive model for projects, which is reusable, maintainable, and easier to comprehend.
* Plugins or tools that interact with this declarative model.

Maven project structure and contents are declared in an xml file, `pom.xml`, referred as Project Object Model (POM), which is the fundamental unit of the entire Maven system.
### 1.3 Convention over Configuration
Maven uses Convention over Configuration, which means developers are not required to create build process themselves.

Developers do not have to mention each and every configuration detail. Maven provides sensible default behavior for projects. When a Maven project is created, Maven creates default project structure. Developer is only required to place files accordingly and he/she need not to define any configuration in pom.xml.

As an example, following table shows the default values for project source code files, resource files and other configurations. Assuming, **${basedir}** denotes the project location −

 Item               | Default
--------------------|----------------------------------
 Source code        | ${basedir}/src/main/java
 Resources          | ${basedir}/src/main/resources
 Tests              | ${basedir}/src/test
 Complied byte code | ${basedir}/target
 Distributable JAR  | ${basedir}/target/classes

In order to build the project, Maven provides developers with options to mention life-cycle `goals` and project `dependencies` (that rely on Maven plugin capabilities and on its default conventions). Much of the project management and build related tasks are maintained by `Maven plugins`.
### 1.4 Java Project Structure
![image](/assets/images/architecture/3211/java-project-structure.png){:width="800px"}

## 2. POM
### 2.1 POM and pom.xml
`POM` stands for Project Object Model. It is fundamental unit of work in Maven. It is an XML file that resides in the base directory of the project as `pom.xml`.

The POM contains information about the project and various configuration detail used by Maven to build the project(s).

POM also contains the **goals** and **plugins**. While executing a task or goal, Maven looks for the POM in the current directory. It reads the POM, gets the needed configuration information, and then executes the goal. Some of the configuration that can be specified in the POM are following −
* project dependencies
* plugins
* goals
* build profiles
* project version
* developers
* mailing list

Before creating a POM, we should first decide the project **group** (`groupId`), its **name** (`artifactId`) and its version as these attributes help in uniquely identifying the project in repository.

### 2.2 POM Example
```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0" xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>

   <groupId>com.companyname.project-group</groupId>
   <artifactId>project</artifactId>
   <version>1.0</version>
</project>
```
It should be noted that there should be a single POM file for each project.
* All POM files require the **project** element and three mandatory fields: **groupId**, **artifactId**, **version**.
* Projects notation in repository is **groupId:artifactId:version**.
* Minimal requirements for a POM −

 No. | Node & Description
-----|-----------------------------
 1   | **Project root** <br/> This is project root tag. You need to specify the basic schema settings such as apache schema and w3.org specification.
 2   | **Model version** <br/> Model version should be 4.0.0.
 3   | **groupId** <br/> This is an Id of project's group. This is generally unique amongst an organization or a project. For example, a banking group com.company.bank has all bank related projects.
 4   | **artifactId** <br/> This is an Id of the project. This is generally name of the project. For example, consumer-banking. Along with the groupId, the artifactId defines the artifact's location within the repository.
 5   | **version** <br/>This is the version of the project. Along with the groupId, It is used within an artifact's repository to separate versions from each other. For example − <br/>**com.company.bank:consumer-banking:1.0** <br/> **com.company.bank:consumer-banking:1.1.**

### 2.3 Super POM
The `Super POM` is Maven’s default POM. All POMs inherit from a parent or default (despite explicitly defined or not). This base POM is known as the Super POM, and contains values inherited by default.

Maven use the effective POM (configuration from super pom plus project configuration) to execute relevant goal. It helps developers to specify minimum configuration detail in his/her pom.xml. Although configurations can be overridden easily.

An easy way to look at the default configurations of the super POM is by running the following command: **mvn help:effective-pom**.

## 3. Build Lifecycle
### 3.1 What is Build Lifecycle?
A Build Lifecycle is a well-defined sequence of phases, which define the order in which the goals are to be executed. Here phase represents a stage in life cycle. As an example, a typical Maven Build Lifecycle consists of the following sequence of phases.

 Phase            | Handles                    | Description
------------------|----------------------------|------------------------------------------------------------------------------------
prepare-resources | resource copying           | Resource copying can be customized in this phase.
validate          | Validating the information | Validates if the project is correct and if all necessary information is available.
compile           | compilation                | Source code compilation is done in this phase.
test              | Testing                    | Tests the compiled source code suitable for testing framework.
package           | packaging                  | This phase creates the JAR/WAR package as mentioned in the packaging in POM.xml.
install           | installation               | This phase installs the package in local/remote maven repository.
deploy            | Deploying                  | Copies the final package to the remote repository.

There are always `pre` and `post` phases to register `goals`, which must run prior to, or after a particular phase.

When Maven starts building a project, it steps through a defined sequence of phases and executes goals, which are registered with each phase.

Maven has the following three standard lifecycles −
* clean
* default(or build)
* site

A `goal` represents a specific task which contributes to the building and managing of a project. It may be bound to zero or more build phases. A goal not bound to any build phase could be executed outside of the build lifecycle by direct invocation.

The order of execution depends on the order in which the goal(s) and the build phase(s) are invoked. For example, consider the command below. The **clean** and **package** arguments are build phases while the **dependency:copy-dependencies** is a goal.
```raw
mvn clean dependency:copy-dependencies package
```
* Here the clean phase will be executed first, followed by the dependency:copy-dependencies goal, and finally package phase will be executed.

### 3.2 Clean Lifecycle
When we execute **mvn post-clean** command, Maven invokes the clean lifecycle consisting of the following phases.
* pre-clean
* clean
* post-clean

Maven clean goal (clean:clean) is bound to the clean phase in the clean lifecycle. Its **clean:cleangoal** deletes the output of a build by deleting the build directory. Thus, when **mvn clean** command executes, Maven deletes the **build** directory.

### 3.3 Default (or Build) Lifecycle
This is the primary life cycle of Maven and is used to build the application. It has the following 21 phases.

 No. | Lifecycle Phase & Description
-----|-----------------------------------------------------------------------------------------------------
 1   | **validate** <br/> Validates whether project is correct and all necessary information is available to complete the build process.
 2   | **initialize** <br/> Initializes build state, for example set properties.
 3   | **generate-sources** <br/> Generate any source code to be included in compilation phase.
 4   | **process-sources** <br/> Process the source code, for example, filter any value.
 5   | **generate-resources** <br/> Generate resources to be included in the package.
 6   | **process-resources** <br/> Copy and process the resources into the destination directory, ready for packaging phase.
 7   | **compile** <br/> Compile the source code of the project.
 8   | **process-classes** <br/> Post-process the generated files from compilation, for example to do bytecode enhancement/optimization on Java classes.
 9   | **generate-test-sources** <br/> Generate any test source code to be included in compilation phase.
 10  | **process-test-sources** <br/> Process the test source code, for example, filter any values.
 11  | **test-compile** <br/> Compile the test source code into the test destination directory.
 12  | **process-test-classes** <br/> Process the generated files from test code file compilation.
 13  | **test** <br/> Run tests using a suitable unit testing framework (Junit is one).
 14  | **prepare-package** <br/> Perform any operations necessary to prepare a package before the actual packaging.
 15  | **package** <br/> Take the compiled code and package it in its distributable format, such as a JAR, WAR, or EAR file.
 16  | **pre-integration-test** <br/> Perform actions required before integration tests are executed. For example, setting up the required environment.
 17  | **integration-test** <br/> Process and deploy the package if necessary into an environment where integration tests can be run.
 18  | **post-integration-test** <br/> Perform actions required after integration tests have been executed. For example, cleaning up the environment.
 19  | **verify** <br/> Run any check-ups to verify the package is valid and meets quality criteria.
 20  | **install** <br/> Install the package into the local repository, which can be used as a dependency in other projects locally.
 21  | **deploy** <br/> Copies the final package to the remote repository for sharing with other developers and projects.

There are few important concepts related to Maven Lifecycles, which are worth to mention −
* When a phase is called via Maven command, for example **mvn compile**, only phases **up** to and including that phase will execute.
* Different maven goals will be bound to different phases of Maven lifecycle depending upon the type of packaging (JAR/WAR/EAR).

### 3.4 Site Lifecycle
Maven Site plugin is generally used to create fresh documentation to create reports, deploy site, etc. It has the following phases −
* pre-site
* site
* post-site
* site-deploy

## 4. Build Profile
### 4.1 What is Build Profile?
A `Build profile` is a set of configuration values, which can be used to set or override default values of Maven build. Using a build profile, you can customize build for different environments such as Production v/s Development environments.

Profiles are specified in pom.xml file using its activeProfiles/profiles elements and are triggered in variety of ways. Profiles modify the POM at build time, and are used to give parameters different target environments (for example, the path of the database server in the development, testing, and production environments).
### 4.2 Types of Build Profile
Build profiles are majorly of three types.

 Type        | Where it is defined
-------------|----------------------------------------------------------------------
 Per Project | Defined in the project POM file, pom.xml
 Per User    | Defined in Maven settings xml file (%USER_HOME%/.m2/settings.xml)
 Global      | Defined in Maven global settings xml file (%M2_HOME%/conf/settings.xml)

### 4.3 Profile Activation
A Maven Build Profile can be activated in various ways.
* Explicitly using command console input.
* Through maven settings.
* Based on environment variables (User/System variables).
* OS Settings (for example, Windows family).
* Present/missing files.

### 4.4 Profile Activation Examples
Let us assume the following directory structure of your project −
![image](/assets/images/architecture/3211/profile-activation.jpg)
Now, under **src/main/resources**, there are three environment specific files −

 No. | File Name & Description
 ----|-----------------------------
 1   | **env.properties** <br/> default configuration used if no profile is mentioned.
 2   | **env.test.properties** <br/>test configuration when test profile is used.
 3   | **env.prod.properties** <br/> production configuration when prod profile is used.

### 4.5 Explicit Profile Activation
In the following example, we will attach **maven-antrun-plugin:run goal** to test the phase. This will allow us to echo text messages for different profiles. We will be using pom.xml to define different profiles and will activate profile at command console using maven command.

```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0" xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>com.companyname.projectgroup</groupId>
   <artifactId>project</artifactId>
   <version>1.0</version>
   <profiles>
      <profile>
         <id>test</id>
         <build>
            <plugins>
               <plugin>
                  <groupId>org.apache.maven.plugins</groupId>
                  <artifactId>maven-antrun-plugin</artifactId>
                  <version>1.1</version>
                  <executions>
                     <execution>
                        <phase>test</phase>
                        <goals>
                           <goal>run</goal>
                        </goals>
                        <configuration>
                           <tasks>
                              <echo>Using env.test.properties</echo>
                              <copy file="src/main/resources/env.test.properties"
                                 tofile="${project.build.outputDirectory}
                                 /env.properties"/>
                           </tasks>
                        </configuration>
                     </execution>
                  </executions>
               </plugin>
            </plugins>
         </build>
      </profile>
   </profiles>
</project>
```
Execute the following mvn command. Pass the profile name as argument using -P option.
```raw
mvn test -Ptest
mvn test -Pnormal
mvn test -Pprod
```

## 5. Maven Repository
In Maven terminology, a repository is a directory where all the project jars, library jar, plugins or any other project specific artifacts are stored and can be used by Maven easily.

Maven repository are of three types. The following illustration will give an idea regarding these three types.
* local
* central
* remote

![image](/assets/images/architecture/3211/maven-repository.png){:width="500px"}

### 5.1 Local Repository
Maven local repository is a folder location on your machine. It gets created when you run any maven command for the first time.

Maven local repository keeps your project's all dependencies (library jars, plugin jars etc.). When you run a Maven build, then Maven automatically downloads all the dependency jars into the local repository. It helps to avoid references to dependencies stored on remote machine every time a project is build.

Maven local repository by default get created by Maven in %USER_HOME% directory. To override the default location, mention another path in Maven settings.xml file available at %M2_HOME%\conf directory.
```xml
<settings xmlns = "http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
   <localRepository>/user/johnny/MyLocalRepository</localRepository>
</settings>
```
* When you run Maven command, Maven will download dependencies to your custom path.

### 5.2 Central Repository
Maven central repository is repository provided by Maven community. It contains a large number of commonly used libraries.

When Maven does not find any dependency in local repository, it starts searching in central repository using following URL − https://repo1.maven.org/maven2/

Key concepts of Central repository are as follows −
* This repository is managed by Maven community.
* It is not required to be configured.
* It requires internet access to be searched.

To browse the content of central maven repository, maven community has provided a URL − https://search.maven.org/#browse. Using this library, a developer can search all the available libraries in central repository.

### 5.3 Remote Repository
Sometimes, Maven does not find a mentioned dependency in central repository as well. It then stops the build process and output error message to console. To prevent such situation, Maven provides concept of Remote Repository, which is developer's own custom repository containing required libraries or other project jars.

For example, using below mentioned POM.xml, Maven will download dependency (not available in central repository) from Remote Repositories mentioned in the same pom.xml.
```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>com.companyname.projectgroup</groupId>
   <artifactId>project</artifactId>
   <version>1.0</version>
   <dependencies>
      <dependency>
         <groupId>com.companyname.common-lib</groupId>
         <artifactId>common-lib</artifactId>
         <version>1.0.0</version>
      </dependency>
   <dependencies>
   <repositories>
      <repository>
         <id>companyname.lib1</id>
         <url>http://download.companyname.org/maven2/lib1</url>
      </repository>
      <repository>
         <id>companyname.lib2</id>
         <url>http://download.companyname.org/maven2/lib2</url>
      </repository>
   </repositories>
</project>
```
### 5.4 Maven Dependency Search Sequence
When we execute Maven build commands, Maven starts looking for dependency libraries in the following sequence −
* Step 1 − Search dependency in local repository, if not found, move to step 2 else perform the further processing.
* Step 2 − Search dependency in central repository, if not found and remote repository/repositories is/are mentioned then move to step 4. Else it is downloaded to local repository for future reference.
* Step 3 − If a remote repository has not been mentioned, Maven simply stops the processing and throws error (Unable to find dependency).
* Step 4 − Search dependency in remote repository or repositories, if found then it is downloaded to local repository for future reference. Otherwise, Maven stops processing and throws error (Unable to find dependency).

![image](/assets/images/architecture/3211/search-sequence.png){:width="600px"}

## 6. Maven Plugins
### 6.1 What are Maven Plugins?
Maven is actually a plugin execution framework where every task is actually done by plugins. Maven Plugins are generally used to −
* create jar file
* create war file
* compile code files
* unit testing of code
* create project documentation
* create project reports

A plugin generally provides a set of goals, which can be executed using the following syntax −
```raw
mvn [plugin-name]:[goal-name]
```
For example, a Java project can be compiled with the maven-compiler-plugin's compile-goal by running the following command.
```raw
mvn compiler:compile
```
### 6.2 Plugin Types
Maven provided the following two types of Plugins −

 No. | Type & Description
 ----|----------------------------------------------------------------------------------------------------------------------
 1   | **Build plugins** <br/>They execute during the build process and should be configured in the <build/> element of pom.xml.
 2   | **Reporting plugins** <br/> They execute during the site generation process and they should be configured in the <reporting/> element of the pom.xml.

Following is the list of few common plugins −

 No. | Plugin    | Description
-----|-----------|-------------------------------------------
 1   | clean     | Cleans up target after the build. Deletes the target directory.
 2   | compiler  | Compiles Java source files.
 3   | surefire  | Runs the JUnit unit tests. Creates test reports.
 4   | jar       | Builds a JAR file from the current project.
 5   | war       | Builds a WAR file from the current project.
 6   | javadoc   | Generates Javadoc for the project.
 7   | antrun    | Runs a set of ant tasks from any phase mentioned of the build.

## 7. Snapshots
A large software application generally consists of multiple modules and it is common scenario where multiple teams are working on different modules of same application. For example, consider a team is working on the front end of the application as app-ui project (app-ui.jar:1.0) and they are using data-service project (data-service.jar:1.0).

Now it may happen that team working on data-service is undergoing bug fixing or enhancements at rapid pace and they are releasing the library to remote repository almost every other day.

Now if data-service team uploads a new version every other day, then following problems will arise −
* data-service team should tell app-ui team every time when they have released an updated code.
* app-ui team required to update their pom.xml regularly to get the updated version.

To handle such kind of situation, SNAPSHOT concept comes into play.

### 7.1 What is SNAPSHOT?
SNAPSHOT is a special version that indicates a current development copy. Unlike regular versions, Maven checks for a new SNAPSHOT version in a remote repository for every build.

Now data-service team will release SNAPSHOT of its updated code every time to repository, say data-service: 1.0-SNAPSHOT, replacing an older SNAPSHOT jar.

### 7.2 Snapshot vs Version
In case of Version, if Maven once downloaded the mentioned version, say data-service:1.0, it will never try to download a newer 1.0 available in repository. To download the updated code, data-service version is be upgraded to 1.1.

In case of SNAPSHOT, Maven will automatically fetch the **latest SNAPSHOT** (data-service:1.0-SNAPSHOT) every time app-ui team build their project.

### 7.3 Example
app-ui project is using 1.0-SNAPSHOT of data-service.
```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>app-ui</groupId>
   <artifactId>app-ui</artifactId>
   <version>1.0</version>
   <packaging>jar</packaging>
   <name>health</name>
   <url>http://maven.apache.org</url>
   <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
   <dependencies>
      <dependency>
      <groupId>data-service</groupId>
         <artifactId>data-service</artifactId>
         <version>1.0-SNAPSHOT</version>
         <scope>test</scope>
      </dependency>
   </dependencies>
</project>
```
data-service project is releasing 1.0-SNAPSHOT for every minor change.
```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>data-service</groupId>
   <artifactId>data-service</artifactId>
   <version>1.0-SNAPSHOT</version>
   <packaging>jar</packaging>
   <name>health</name>
   <url>http://maven.apache.org</url>
   <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
</project>
```
Although, in case of SNAPSHOT, Maven automatically fetches the latest SNAPSHOT on daily basis, you can force maven to download latest snapshot build using -U switch to any maven command.
```raw
mvn clean package -U
```

## 8. Manage Dependencies
One of the core features of Maven is Dependency Management. Managing dependencies is a difficult task once we've to deal with multi-module projects (consisting of hundreds of modules/sub-projects). Maven provides a high degree of control to manage such scenarios.

### 8.1 Transitive Dependencies Discovery
It is pretty often a case, when a library, say A, depends upon other library, say B. In case another project C wants to use A, then that project requires to use library B too.

Maven helps to avoid such requirements to discover all the libraries required. Maven does so by reading project files (pom.xml) of dependencies, figure out their dependencies and so on.

We only need to define direct dependency in each project pom. Maven handles the rest automatically.

With transitive dependencies, the graph of included libraries can quickly grow to a large extent. Cases can arise when there are duplicate libraries. Maven provides few features to control extent of transitive dependencies.

 No. | Feature | Description
-----|---------|--------------------------------------------------------------------
 1   | Dependency mediation |Determines what version of a dependency is to be used when multiple versions of an artifact are encountered. If two dependency versions are at the same depth in the dependency tree, the first declared dependency will be used.
 2   | Dependency management | Directly specify the versions of artifacts to be used when they are encountered in transitive dependencies. For an example project C can include B as a dependency in its dependency Management section and directly control which version of B is to be used when it is ever referenced.
 3   | Dependency scope | Includes dependencies as per the current stage of the build.
 4   | Excluded dependencies | Any transitive dependency can be excluded using "exclusion" element. As example, A depends upon B and B depends upon C, then A can mark C as excluded.
 5   | Optional dependencies | Any transitive dependency can be marked as optional using "optional" element. As example, A depends upon B and B depends upon C. Now B marked C as optional. Then A will not use C.

### 8.2 Dependency Scope
Transitive Dependencies Discovery can be restricted using various Dependency Scope as mentioned below.

 No. | Scope    | Description
-----|----------|-------------------------------------------------------------------------------------------------
 1   | compile  | This scope indicates that dependency is available in classpath of project. It is default scope.
 2   | provided | This scope indicates that dependency is to be provided by JDK or web-Server/Container at runtime.
 3   | runtime  | This scope indicates that dependency is not required for compilation, but is required during execution.
 4   | test     | This scope indicates that the dependency is only available for the test compilation and execution phases.
 5   | system   | This scope indicates that you have to provide the system path.
 6   | import   | This scope is only used when dependency is of type pom. This scope indicates that the specified POM should be replaced with the dependencies in that POM's \<dependencyManagement\> section.

### 8.3 Dependency Management
Usually, we have a set of project under a common project. In such case, we can create a common pom having all the common dependencies and then make this pom, the parent of sub-project's poms. Following example will help you understand this concept.

![image](/assets/images/architecture/3211/dependency-graph.jpg){:width="600px"}

Following are the detail of the above dependency graph −
* App-UI-WAR depends upon App-Core-lib and App-Data-lib.
* Root is parent of App-Core-lib and App-Data-lib.
* Root defines Lib1, lib2, Lib3 as dependencies in its dependency section.

### 8.4 Example
App-UI-WAR
```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>com.companyname.groupname</groupId>
   <artifactId>App-UI-WAR</artifactId>
   <version>1.0</version>
   <packaging>war</packaging>
   <dependencies>
      <dependency>
         <groupId>com.companyname.groupname</groupId>
         <artifactId>App-Core-lib</artifactId>
         <version>1.0</version>
      </dependency>
   </dependencies>  
   <dependencies>
      <dependency>
         <groupId>com.companyname.groupname</groupId>
         <artifactId>App-Data-lib</artifactId>
         <version>1.0</version>
      </dependency>
   </dependencies>  
</project>
```
App-Core-lib
```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <parent>
      <artifactId>Root</artifactId>
      <groupId>com.companyname.groupname</groupId>
      <version>1.0</version>
   </parent>
   <modelVersion>4.0.0</modelVersion>
   <groupId>com.companyname.groupname</groupId>
   <artifactId>App-Core-lib</artifactId>
   <version>1.0</version>
   <packaging>jar</packaging>
</project>
```
App-Data-lib
```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <parent>
      <artifactId>Root</artifactId>
      <groupId>com.companyname.groupname</groupId>
      <version>1.0</version>
   </parent>
   <modelVersion>4.0.0</modelVersion>
   <groupId>com.companyname.groupname</groupId>
   <artifactId>App-Data-lib</artifactId>
   <version>1.0</version>   
   <packaging>jar</packaging>
</project>
```
Root
```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>com.companyname.groupname</groupId>
   <artifactId>Root</artifactId>
   <version>1.0</version>
   <packaging>pom</packaging>
   <dependencies>
      <dependency>
         <groupId>com.companyname.groupname1</groupId>
         <artifactId>Lib1</artifactId>
         <version>1.0</version>
      </dependency>
   </dependencies>  
   <dependencies>
      <dependency>
         <groupId>com.companyname.groupname2</groupId>
         <artifactId>Lib2</artifactId>
         <version>2.1</version>
      </dependency>
   </dependencies>  
   <dependencies>
      <dependency>
         <groupId>com.companyname.groupname3</groupId>
         <artifactId>Lib3</artifactId>
         <version>1.1</version>
      </dependency>
   </dependencies>  
</project>
```

Now when we build App-UI-WAR project, Maven will discover all the dependencies by traversing the dependency graph and build the application.

From above example, we can learn the following key concepts −
* Common dependencies can be placed at single place using concept of parent pom. Dependencies of **App-Data-lib** and **App-Core-lib** project are listed in **Root** project (See the packaging type of Root. It is pom).
* There is no need to specify Lib1, lib2, Lib3 as dependency in App-UI-WAR. Maven use the **Transitive Dependency Mechanism** to manage such detail.

## 9. References
* [Maven Overview](https://www.tutorialspoint.com/maven/maven_overview.htm)
* [Maven Tutorial](http://tutorials.jenkov.com/maven/maven-tutorial.html)
