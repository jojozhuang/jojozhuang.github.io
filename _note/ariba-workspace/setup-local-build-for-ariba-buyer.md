---
layout: tutorial
key: note
title: "Setup Local Build for Ariba Buyer"
index: 9202
subcategory: ariba-workspace
date: 2020-06-05
tags: [Ariba, Local Build]
---

> Ariba Buyer Setup.

## 1. Buyer Build on MacOS(Catalina)
### 1.1 Files for Buyer
Create directory `ariba` under user's root directory, eg. /Users/i857285/ariba. Copy the following files from OneDrive.
* ez (tool for build)
* ezone (configure the build)
  - ezaliases.sh
  - ssp_git.xml
  - ez.ssp_git.buyer.overrides.xml
* software (all the required softwares)

### 1.2 Software Installation
* JDK 1.8 - [Download](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)
* ActiveState Perl 5.26 - [Download](https://www.activestate.com/products/perl/downloads/)
* Perforce(P4V and P4 Merge) - [Download](https://www.perforce.com/downloads/helix-visual-client-p4v)
* Apache Maven 3.5.3
* Apache Tomcat 6.0.13(for build)
* Apache Tomcat 9.0.27(for runtime)
* Git
* Nodejs (node, npm)
* Hana in Docker - [Download from Docker Hub](https://hub.docker.com/_/sap-hana-express-edition)
* DBeaver Community Version - [Download](https://dbeaver.io/)
* Intellij IDEA 2019.2(Import and Add Project)
* SoapUI(Dummy Soap Response)

Uncompress the zip files and copy them to `/opt`.
* apache-tomcat-6.0.13 (for build)
* apache-tomcat-9.0.27 (for runtime)
* apache-maven-3.5.3

### 1.3 Basic Setup
Create `.bashrc` in user's root directory, eg. /Users/i857285/.bashrc with the following content.
```sh
# /Users/i857285/.bashrc

export PATH=.:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

# JDK
export JDKROOT=/Library/Java/JavaVirtualMachines/jdk1.8.0_251.jdk/Contents/Home
export JAVA_HOME=$JDKROOT
export PATH=$JDKROOT:$PATH

# perl
export PATH=/usr/local/ActivePerl-5.26/bin:$PATH

# perforce
export P4USER=r.zhuang
export P4PORT=perforce.ariba.com:1666

# maven
export PATH=/opt/apache-maven-3.5.3/bin:$PATH

# tomcat
export TOMCAT_HOME=/opt/apache-tomcat-6.0.13

# nodejs
export PATH=/usr/local/bin/node:$PATH

# Used by ezenv
export TMPDIR=/tmp
export EZDIR=/Users/i857285/ariba/ez
export PATH=$EZDIR:$PATH
export ARIBA_EZ_ROOT=/Users/i857285/ariba

# EZ setup
if [ -r /Users/i857285/ariba/ezone/ezaliases.sh ]
then
  . /Users/i857285/ariba/ezone/ezaliases.sh
fi
```
Create `.bash_profile` with the following content.
```sh
# /Users/i857285/.bash_profile

if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi

if [ -f ~/.git-completion.bash ]; then
   source ~/.git-completion.bash
fi
```

Create `.zshrc` with the following content. `zsh` is the default shell in macOS Catalina.
```sh
# /Users/i857285/.zshrc
if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi
```

### 1.4 Hana Database
**Hana in VM(Mac)**  
Check wiki [SAP HANA for SSP/S4](https://wiki.ariba.com/pages/viewpage.action?pageId=77582113) and [SAP HANA Tutorial](https://developers.sap.com/topics/sap-hana-express.html).

1) Go to http://sap.com/sap-hana-express register, download manager.
2) Configuration
 * ip address: 10.48.61.64
 * hxeadm/password
 * Database password: same for hxeadm

3) Do you need configuration, Yes.  
4) Add VM ip address to Mac host file
```sh
sudo sh -c 'echo 10.48.61.64    hxehost >> /etc/hosts'
sudo sh -c 'echo 192.168.1.104    hxehost >> /etc/hosts'
```
5) Install `DBeaver`.  
6) Launch DBeaver, create two Hana DB users
```sql
CREATE USER ssp_hana_user1 PASSWORD Hanauser1 NO FORCE_FIRST_PASSWORD_CHANGE;
CREATE USER ssp_hana_user2 PASSWORD Hanauser2 NO FORCE_FIRST_PASSWORD_CHANGE;
```
7) Find port : 39015 for HXE DB.
```sql
SELECT database_name, port, sql_port, (port+2) http_port FROM sys_databases.m_services
```

Hana DB issue: Sometimes, the ip address of hana DB(in virtual machine) is changed after restart. Then we need to up the new ip address in Parameters.table.  
a) Find the new ip address(eg. 10.48.60.25) of hana db, update it in hosts.
```sh
sudo sh -c 'echo 10.48.60.25    hxehost >> /etc/hosts'
```
b) Search `AribaDBHostname` in Parameters.table and update its value to the new IP.  
c) Restart buyer.

**Hana in Docker**  
Wiki pages:
* [How to set up Buyer on Mac to use Docker + Hana](https://wiki.ariba.com/pages/viewpage.action?pageId=121803876)
* [Installing SAP HANA, express edition with Docker](https://developers.sap.com/tutorials/hxe-ua-install-using-docker.html)

1) Go to https://docs.docker.com/docker-for-mac/install/ to download the docker desktop and install it on mac.

2) Docker Preferences
* CPU: 8
* Memory: 16GB
* Disk image size: 200GB

3) Create account in [Docker Hub](https://hub.docker.com) and go to https://hub.docker.com/_/sap-hana-express-edition, copy the pull command.
```sh
docker pull store/saplabs/hanaexpress:2.00.045.00.20200121.1
```

4) Create file /Users/i857285/ariba/hana/hana_password.json
```json
{
  "master_password" : "HXEHana1"
}
```
5) Create docker container with the following command.
```sh
docker run -p 39013:39013 -p 39017:39017 -p 39041-39045:39041-39045 -p 1128-1129:1128-1129 -p 59013-59014:59013-59014 -v /Users/i857285/ariba/hana:/Users/i857285/ariba/hana:rw \
--ulimit nofile=1048576:1048576 \
--sysctl kernel.shmmax=1073741824 \
--sysctl net.ipv4.ip_local_port_range='40000 60999' \
--sysctl kernel.shmmni=524288 \
--sysctl kernel.shmall=8388608 \
--name buyer-hana \
store/saplabs/hanaexpress:2.00.045.00.20200121.1 \
--passwords-url file:///Users/i857285/ariba/hana/hana_password.json \
--agree-to-sap-license
```
* If you get file not found error, this may be caused by the access right on the file. Try to open the file in terminal to make sure it can be accessed by any editor, eg. Atom. Besides, try to delete the folder and password file and re-created them.

6) After container is created successfully, we can restart it with the following command.
```sh
docker restart buyer-hana -t 180
```
7) We can also inspect the container.
```sh
docker exec -it buyer-hana bash
```

8) Create DB User  
Launch DBeaver, create new connection to connect Hana databse.
* Host: localhost
* Port: 39017
* Username: system
* Password: HXEHana1

Run following sql to create two DB users for local build.
```sql
CREATE USER ssp_git_user1 PASSWORD Hanauser1 NO FORCE_FIRST_PASSWORD_CHANGE;
CREATE USER ssp_git_user2 PASSWORD Hanauser2 NO FORCE_FIRST_PASSWORD_CHANGE;
```
Use the following sql to delete user.
```sql
/* delete user and all objects with it */
DROP USER ssp_git_user1 CASCADE;
```
For hana in docker, its port is fixed, which is `39017`.

9) Add DB info into ez configuration file
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ez>
  <data>
    <global>
      ...
      <replace string="@@WORKSPACE@@" value="ssp_git"/>
      <replace string="@@DBHostname@@" value="localhost"/>
      <replace string="@@DBServer@@" value="HXE"/>
      <replace string="@@AribaDBType@@" value="hana"/>
      <replace string="@@AribaDBJDBCDriverType@@" value="hana"/>
      <replace string="@@AribaDBPort@@" value="39017"/>
      <replace string="@@AribaDBUserName0@@" value="ssp_git_user1"/>
      <replace string="@@AribaDBUserPassword0@@" value="Hanauser1"/>
      <replace string="@@AribaDBUserName1@@" value="ssp_git_user2"/>
      <replace string="@@AribaDBUserPassword1@@" value="Hanauser1"/>
      ...
    </global>
  </data>
</ez>
```

### 1.5 Creating New Build
1) EZ configuration file  
The EZ configuration files for Buyer are located in http://development.ariba.com/ez/downstream. Download the latest ez configuration file if necessary, eg. http://development.ariba.com/ez/downstream/ssp_gdev_hana.xml.

Update ez config file, eg. `ssp_git.xml`. Replace the value of `WORKSPACE` with the workspace name you like, eg ssp_git. Go to https://rc.ariba.com/cgi-bin/build-info?product=buyer to find a new label and replace the value of `LABEL` with it.
```xml
<replace string="@@LABEL@@" value="SSP.2020.gDev-6266"/>
<replace string="@@WORKSPACE@@" value="ssp_git"/>  <!-- Can override on command line with -workspace name. -->
```
Update ez override file, `ez.ssp_git.buyer.overrides.xml`.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ez>
 <data>
    <global>
      <!-- You could override the value for one or more replace or define elements. -->
      <replace string="@@WORKSPACE@@" value="ssp_git"/>
      <replace string="@@LABEL@@" value="SSP.2020.gDev-6266"/>

<!--
      <replace string="@@SSPHTTP@@" value="http"/>
      <replace string="@@LOCALHOSTNAME@@" value="127.0.0.1"/>
      <replace string="@@SSPTOMCATPORT@@" value="443"/>-->

      <!-- hana database -->
      <replace string="@@DBHostname@@" value="localhost"/>
      <replace string="@@DBServer@@" value="HXE"/>
      <replace string="@@AribaDBType@@" value="hana"/>
      <replace string="@@AribaDBJDBCDriverType@@" value="hana"/>
      <replace string="@@AribaDBPort@@" value="39017"/>
      <replace string="@@AribaDBUserName0@@" value="ssp_git_user1"/>
      <replace string="@@AribaDBUserPassword0@@" value="Hanauser1"/>
      <replace string="@@AribaDBUserName1@@" value="ssp_git_user2"/>
      <replace string="@@AribaDBUserPassword1@@" value="Hanauser2"/>

      <!--remote arches -->
      <replace string="@@ARCHESSERVICE@@" value="svcscdev3ows.sc1-lab1.ariba.com"/>
      <replace string="@@ARCHESPORT@@" value="443"/>

      <!-- Enable EmailApproval -->
      <replace string="@@EMAILAPPROVALENABLED@@" value="true"/>
      <replace string="@@EMAILAPPROVALMAILTOLINK@@" value="true"/>
      <replace string="@@NOTIFICATIONFROMADDRESS@@" value="r.zhuang@sap.com"/>
      <replace string="@@SMTPDOMAINNAME@@" value="sap.com"/>
      <replace string="@@SMTPSERVERNAME@@" value="mail.sap.corp"/>

      <!-- AN IDs -->
      <replace string="@@ANSERVICE@@"            value="svcdev6.ariba.com"/>
      <replace string="@@ANBUYERID_p2pPsoft@@"   value="AN02004936421"/>
      <replace string="@@ANBUYERID_p2pSap@@"     value="AN02005268257"/>
      <replace string="@@ANBUYERID_p2pSg@@"      value="AN02005252797"/>
      <replace string="@@ANBUYERID_apcAippSap@@" value="AN02004936423"/>

      <!-- JVM debugging port -->
      <environment name="EZSTART_JDWP_OPTIONS" value="address=6455,suspend=n"/>

      <!-- JVM memory settings -->
      <replace string="@@JAVAMEMORYMAX@@" value="4096m"/>
      <replace string="@@JAVAMEMORYMIN@@" value="2048m"/>
    </global>
    <!-- You could override the entire content template for one or more files by name. -->
 </data>
 <!-- You could override the entire action section, but it is not recommended. -->
</ez>
```
2) Create new workspace  
Open new terminal and run. A new folder should be created at ~/ariba/ssp_git.
```sh
cd ~
ez -xml ariba/ezone/ssp_git.xml -run 1
```
3) Build the new workspace  
Open another terminal and run the following commands in sequence.
* `ez.ssp_git`   - source the new workspace
* `ezenv`        - check ez environment variables(Optional)
* `ez -info`     - list ez build steps
* `ez -run 1-16` - run steps from 1 to 16

4) Fix the error in ez build  
In Mac Catalina, you will see the following error related to `AP810` and the build process is stopped at `ez -run mkconfig`.
```sh
[INFO] buyer-uitest-e2e 1450.2-beta750 .................... SUCCESS [  3.436 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 16:09 min
[INFO] Finished at: 2020-06-07T15:26:33-07:00
[INFO] ------------------------------------------------------------------------
info   : compile Buyer  done
#######################################################################################
info   : Executing setupTomcat6:  Restart from here via  ez -run setupTomcat6+
Picked up JAVA_TOOL_OPTIONS: -Dfile.encoding=UTF8
info   : The version of tomcat you are using is 6
info   : Executing generateConfigFiles:  Restart from here via  ez -run generateConfigFiles+
info: Generating /Users/i857285/ariba/ssp_git/roots/config/PersonalAppInfo.xml ...
info: Generating /Users/i857285/ariba/ssp_git/roots/config/PersonalParameters.table ...
info: Generating /Users/i857285/ariba/ssp_git/roots/config/PersonalRealmEnablement.table ...
info: Generating /Users/i857285/ariba/ssp_git/roots/catalina/conf/catalina.properties ...
info: Generating /Users/i857285/ariba/ssp_git/roots/catalina/conf/server.xml ...
info: Generating /Users/i857285/ariba/ssp_git/roots/catalina/conf/tomcat-users.xml ...
info: Generating /Users/i857285/ariba/ssp_git/roots/catalina/conf/web.xml ...
info: Generating /Users/i857285/ariba/ssp_git/roots/catalina/temp/.dummy.xml ...
info: Generating /Users/i857285/ariba/ssp_git/roots/config/deployer.properties ...
info   : My Folderpath of DevelopmentParameters.table is ond/Buyer/main
info   : My dpdir is /Users/i857285/ariba/ssp_git/ariba/ond/Buyer/main
info   : configuration files created in /Users/i857285/ariba/ssp_git/roots/config
info   : Executing mkconfig:  Restart from here via  ez -run mkconfig+
/Users/i857285/ariba/ssp_git/ariba/shared/bin/../../shared/bin/devperl: line 42: /Users/i857285/ariba/ssp_git/ariba/shared/bin/../../shared/bin/Darwin/getcwd: Bad CPU type in executable
devperl: could not find perl at /perl/AP810
devperl: please p4 sync //ariba/3rdParty/perl/AP810/common/... //ariba/3rdParty/perl/AP810/Darwin/...
ERROR  : action 12: mkconfig was not a success (returned 256). Exiting
Details
  - location of your ezconfig file:     [/Users/i857285/ariba/ezone/ssp_git.xml]
  - location of generated legacy files: [/Users/i857285/ariba/ssp_git/roots/config]
  - location of your devhere:           [/Users/i857285/ariba/ssp_git/roots/devhere.sh]


You can try again with either of these commands:

ez -run mkconfig+
ez -retry
```
To fix the above issue, you can manually edit the files as follows.
```sh
# backup file
mv /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind.old
# create new file
vi /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind
# put content into file
find .
# assign proper rights
chmod 755 /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind

# backup file
mv /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd.old
# create new file
vi /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd
# put content into file
pwd
# assign proper rights
chmod 755 /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd

# edit file
atom /Users/i857285/ariba/ssp_git/ariba/shared/bin/devperl

# modify the line PerlRoot variable as below
PerlRoot="/Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810"

# unlink perl bin
unlink /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/Darwin/bin/Darwin
# link perl bin
ln -s /usr/local/ActivePerl-5.26/bin /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/Darwin/bin/Darwin
# unlick perl lib
unlink /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/Darwin/lib/Darwin
# link perl lib
ln -s /usr/local/ActivePerl-5.26/lib /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/Darwin/lib/Darwin
```
Or you can run the shell script `fixbuild.sh`. Notice `ssp_git` is the workspace name, and `fix_build` is the function to fix all issues.
```sh
source ariba/ezone/fixbuild.sh ssp_git
fix_build
> run fix_fastfind
> /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind
> mv /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind.old
> touch /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind
> echo 'find .' >> /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind
> chmod 755 /Users/i857285/ariba/ssp_git/roots/install/shared/bin/Darwin/fastfind
> run fix_getcwd
> /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd
> mv /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd.old
> touch /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd
> echo 'pwd' >> /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd
> chmod 755 /Users/i857285/ariba/ssp_git/ariba/shared/bin/Darwin/getcwd
> run fix_devperl
> /Users/i857285/ariba/ssp_git/ariba/shared/bin/devperl
> replace PerlRoot=$ThirdRoot/$SrcLocation to PerlRoot=/Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810
> run fix_link
> unlink /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/Darwin/bin/Darwin
> ln -s /usr/local/ActivePerl-5.26/bin /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/Darwin/bin/Darwin
> unlink /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/Darwin/lib/Darwin
> ln -s /usr/local/ActivePerl-5.26/bin/../lib /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/Darwin/lib/Darwin
```
Then, restart the build.
```sh
ez -run mkconfig+
```
### 1.6 Tomcat 9 Issue after the build
After steps `initdb` and `enablerealms` are finished, the build process will be stopped again at step `startserver`.
```sh
Name "URI::OVERLOAD" used only once: possible typo at /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/common/lib/overload.pm line 13.
Name "File::Temp::OVERLOAD" used only once: possible typo at /Users/i857285/ariba/ssp_git/ariba/3rdParty/perl/AP810/common/lib/overload.pm line 13.
Scalar value @args[...] better written as $args[...] at /Users/i857285/ariba/ssp_git/roots/install/lib/perl/Ariba/Tomcat/ServerStart.pm line 69.
-Dcatalina.base=/Users/i857285/ariba/ssp_git/roots/catalina-Dcatalina.home=/opt/apache-tomcat-6.0.13-Djava.io.tmpdir=/Users/i857285/ariba/ssp_git/roots/catalina/temp-Djava.endorsed.dirs=/Users/i857285/ariba/ssp_git/roots/install/classes/endorsed:/opt/apache-tomcat-6.0.13/common/endorsed-DAriba.CommandLineArgs=-nodeName buyerserver1"my" variable $xmlDecl masks earlier declaration in same scope at /Users/i857285/ariba/ssp_git/roots/install/lib/perl/Ariba/Config/Base.pm line 1268.
Picked up JAVA_TOOL_OPTIONS: -Dfile.encoding=UTF8
Java HotSpot(TM) 64-Bit Server VM warning: ignoring option MaxPermSize=256m; support was removed in 8.0
java.lang.NoClassDefFoundError: org/apache/tomcat/util/file/ConfigurationSource
	at java.lang.Class.getDeclaredConstructors0(Native Method)
	at java.lang.Class.privateGetDeclaredConstructors(Class.java:2671)
	at java.lang.Class.getConstructor0(Class.java:3075)
	at java.lang.Class.newInstance(Class.java:412)
	at org.apache.catalina.startup.Bootstrap.init(Bootstrap.java:218)
	at org.apache.catalina.startup.Bootstrap.main(Bootstrap.java:390)
Caused by: java.lang.ClassNotFoundException: org.apache.tomcat.util.file.ConfigurationSource
	at java.net.URLClassLoader.findClass(URLClassLoader.java:382)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:418)
	at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:355)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:351)
	... 6 more
```
This is because we use `tomcat 6 to build buyer`, but we need to use `tomcat 9 to run buyer`. Follow the steps below to continue the process.  
1) Modify /ssp_git/roots/install/classes/classpath.txt, add the following entries to include all tomcat/lib jars.
 i.e add two entries
```raw
/opt/apache-tomcat-9.0.27/lib/*
classes/commons-fileupload-1.4.jar
```
Or you can run the following script.
```sh
source ariba/ezone/fixbuild.sh ssp_git
fix_classpath
```
2) Check that ServerLifecycleListener and GlobalResourcesLifecycleListener are disabled. Comment out following lines in /ssp_git/roots/catalina/conf/server.xml.
```xml
<!-- /ssp_git/roots/catalina/conf/server.xml  -->
<!--
<Listener className="org.apache.catalina.mbeans.ServerLifecycleListener" debug="0"/>
<Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" debug="0"/>
-->
```
* If you are using the latest [ez configuration file](http://development.ariba.com/ez/downstream/ssp_gdev_hana.xml), these two lines are already commented out.

3) Check that file `catalina.properties` exists in /ssp_git/roots/catalina/conf with the following content.
```sh
tomcat.util.scan.StandardJarScanFilter.jarsToSkip=*
```
4) Check that file `tomcat-users.xml` exists in /ssp_git/roots/catalina/conf with the following content.
```xml
<?xml version='1.0' encoding='utf-8'?>
<tomcat-users>
</tomcat-users>
```
* If you are using the latest [ez configuration file](http://development.ariba.com/ez/downstream/ssp_gdev_hana.xml), these two files `catalina.properties` and `tomcat-users.xml` are already created properly.

5) Edit /ssp_git/roots/install/config/asmshared/AppInfo.xml, change `InternalURL` and `IncomingHttpServerURL` with ip address `127.0.0.1`.
```xml
<Instance isCDS="true" name="Buyer">
    <Param name="InternalURL" value="http://127.0.0.1:8050"/>
    <Param name="Type" value="Buyer"/>
    <Param name="Version" value="14s2"/>
    <Param name="ContextRoot" value="Buyer"/>
    <Param name="CXMLServletName" value="cxmlchannel"/>
    <Param name="IncomingHttpServerURL" value="http://127.0.0.1:8050"/>
    <Param name="AuthIds" value="base,IntegratedRealm:base"/>
</Instance>
```
Switch to tomcat 9 and start server.
```sh
export TOMCAT_HOME='/opt/apache-tomcat-9.0.27'
ezstart
```
6) You may get the following error and local buyer is not started.
```sh
java.lang.NoClassDefFoundError: org/apache/tomcat/util/buf/EncodedSolidusHandling
	at org.apache.catalina.connector.Connector.<init>(Connector.java:272)
	at org.apache.catalina.startup.ConnectorCreateRule.begin(ConnectorCreateRule.java:64)
	at org.apache.tomcat.util.digester.Digester.startElement(Digester.java:1200)
	at org.apache.xerces.parsers.AbstractSAXParser.startElement(Unknown Source)
	at org.apache.xerces.parsers.AbstractXMLDocumentParser.emptyElement(Unknown Source)
	at org.apache.xerces.impl.XMLDocumentFragmentScannerImpl.scanStartElement(Unknown Source)
	at org.apache.xerces.impl.XMLDocumentFragmentScannerImpl$FragmentContentDispatcher.dispatch(Unknown Source)
	at org.apache.xerces.impl.XMLDocumentFragmentScannerImpl.scanDocument(Unknown Source)
	at org.apache.xerces.parsers.XML11Configuration.parse(Unknown Source)
	at org.apache.xerces.parsers.XML11Configuration.parse(Unknown Source)
	at org.apache.xerces.parsers.XMLParser.parse(Unknown Source)
	at org.apache.xerces.parsers.AbstractSAXParser.parse(Unknown Source)
	at org.apache.xerces.jaxp.SAXParserImpl$JAXPSAXParser.parse(Unknown Source)
	at org.apache.tomcat.util.digester.Digester.parse(Digester.java:1458)
	at org.apache.catalina.startup.Catalina.load(Catalina.java:566)
	at org.apache.catalina.startup.Catalina.load(Catalina.java:607)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.apache.catalina.startup.Bootstrap.load(Bootstrap.java:304)
	at org.apache.catalina.startup.Bootstrap.main(Bootstrap.java:474)
Caused by: java.lang.ClassNotFoundException: org.apache.tomcat.util.buf.EncodedSolidusHandling
	at java.net.URLClassLoader.findClass(URLClassLoader.java:382)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:418)
	at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:355)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:351)
	... 22 more
unable to start the node buyerserver1.
ERROR  : action 16: startserver was not a success (returned 256). Exiting
Details
  - location of your ezconfig file:     [/Users/i857285/ariba/ezone/ssp_git.xml]
  - location of generated legacy files: [/Users/i857285/ariba/ssp_git/roots/config]
  - location of your devhere:           [/Users/i857285/ariba/ssp_git/roots/devhere.sh]


You can try again with either of these commands:

ez -run startserver
ez -retry
```
To fix the issue, you need to delete and copy some files.  
1) delete /ssp_git/roots/install/classes/patches/tomcat-servlet-api-9.0.35.jar    
2) Copy the following files from **$TOMCAT_HOME/lib** to **/ssp_git/roots/install/classes**
* annotations-api.jar
* catalina.jar
* jasper.jar
* jsp-api.jar
* servlet-api.jar
* tomcat-coyote.jar

```sh
cd /opt/apache-tomcat-9.0.27/lib
cp annotations-api.jar ~/ariba/ssp_git/roots/install/classes/annotations-api.jar
cp catalina.jar ~/ariba/ssp_git/roots/install/classes/catalina.jar
cp jasper.jar ~/ariba/ssp_git/roots/install/classes/jasper.jar
cp jsp-api.jar ~/ariba/ssp_git/roots/install/classes/jsp-api.jar
cp servlet-api.jar ~/ariba/ssp_git/roots/install/classes/servlet-api.jar
cp tomcat-coyote.jar ~/ariba/ssp_git/roots/install/classes/tomcat-coyote.jar
```
* See wiki [EZ build setup with Tomcat 9](https://wiki.ariba.com/pages/viewpage.action?pageId=108531774) for more details.

Or you can just run the following script.
```sh
source ariba/ezone/fixbuild.sh ssp_git
fix_libfiles
> run fix_libfiles
> rm '/Users/i857285/ariba/ssp_git/roots/install/classes/patches/tomcat-servlet-api-9.0.35.jar'
> cp '/opt/apache-tomcat-9.0.27/lib/annotations-api.jar' '/Users/i857285/ariba/ssp_git/roots/install/classes/annotations-api.jar'
> cp '/opt/apache-tomcat-9.0.27/lib/catalina.jar' '/Users/i857285/ariba/ssp_git/roots/install/classes/catalina.jar'
> cp '/opt/apache-tomcat-9.0.27/lib/jasper.jar' '/Users/i857285/ariba/ssp_git/roots/install/classes/jasper.jar'
> cp '/opt/apache-tomcat-9.0.27/lib/jsp-api.jar' '/Users/i857285/ariba/ssp_git/roots/install/classes/jsp-api.jar'
> cp '/opt/apache-tomcat-9.0.27/lib/servlet-api.jar' '/Users/i857285/ariba/ssp_git/roots/install/classes/servlet-api.jar'
> cp '/opt/apache-tomcat-9.0.27/lib/tomcat-coyote.jar' '/Users/i857285/ariba/ssp_git/roots/install/classes/tomcat-coyote.jar'
```
Restart the server and it should be launched successfully.
```sh
ezstart
```
### 1.7 Setup Remote Arches
To use catalog items, we need to setup arches for buyer. We can use remote arches service without setting up arches locally. Even if we work at home, we are still able to setup remote arches, see wiki [Local Buyer with remote Arches](https://wiki.ariba.com/display/ENGPRJ/Local+Buyer+with+remote+Arches+-+reindex+on+VPN).

1) F5->View Details, find the client IP, eg. 10.50.12.230.

2) Update the IP address for buyer instance in /ssp_git/roots/install/config/asmshared/AppInfo.xml. And make sure the url for Arches instance are pointing to dev3 arches service.
```xml
<Instance isCDS="true" name="Buyer">
	<Param name="InternalURL" value="http://10.50.12.230:8050"/>
	<Param name="Type" value="Buyer"/>
	<Param name="Version" value="14s2"/>
	<Param name="ContextRoot" value="Buyer"/>
	<Param name="CXMLServletName" value="cxmlchannel"/>
	<Param name="IncomingHttpServerURL" value="http://10.50.12.230:8050"/>
	<Param name="AuthIds" value="base,IntegratedRealm:base"/>
</Instance>
<Instance name="Arches">
	<Param name="InternalURL" value="https://svcscdev3ows.sc1-lab1.ariba.com:443"/>
	<Param name="CXMLServletName" value="cxmlchannel"/>
	<Param name="Type" value="Arches"/>
	<Param name="Version" value="Arches"/>
	<Param name="IncomingHttpServerURL" value="https://svcscdev3ows.sc1-lab1.ariba.com:443"/>
	<Param name="ContextRoot" value="Arches"/>
</Instance>
```
Restart server, arches indexing will start automatically. Check the status of indexing in https://svcscdev3ows.sc1-lab1.ariba.com/Arches/inspector/indexerjobs/, search your name alias, eg. r.zhuang.
If you can’t visit buyer with the new ip address, change back the ip address to 127.0.0.1. The client ip address is only for indexing.

### 1.8 EZ build with Label(Tag)
1) Get new source files for buyer.
```sh
cd /ssp_git/ariba/ond/Buyer/
git checkout ssp-newbuild #Create a new buyer branch and checkout to this branch.
git fetch # get the latest history, including the tags.
```
2) Go to rc.ariba.com, find the latest label, eg. SSP.2020.gDev-5074.  
3) Get new source files for the label.  
```sh
git checkout tags/SSP.2020.gDev-5074 -b SSP.2020.gDev-5074
git pull origin dev #(optional)
```
4) Get new source files for platform, similar steps as buyer.
```sh
cd /ssp_git/ariba/ond/platform/
git checkout platform-newbuild
git fetch # get the latest history, including the tags.
git checkout tags/SSP.2020.gDev-5074 -b SSP.2020.gDev-5074
git pull origin dev #(optional)
```
5) Build all of them
```sh
ez -info
ez -run compilePlatform+
```

### 1.9 Rebuild with New Label
Suppose you've already had build locally, it is easy to 'upgrade' to new labels.  
1) Shutdown existing buyer service, quit any terminal window for buyer instance, close IDE, etc.  
2) Rename build folder 'ssp_git' to other names.  
3) Update the override file for ez configuration, eg. ez.ssp_git.buyer.overrides.xml, replace `LABEL` with new label.
```xml
<replace string="@@LABEL@@" value="SSP.2020.gDev-6268"/>
```
4) Open new terminal, create new workspace with following command.
```sh
ez -xml ariba/ezone/ssp_git.xml -run 1
```
5) Open another terminal window, run the build.
```sh
ez.ssp_git
ezenv
ez -info
ez -run 1-16
```
6) Run the following script when build process is stopped at step `mkconfig`.
```sh
source ariba/ezone/fixbuild.sh ssp_git
fix_build
ez -run mkconfig+
```
7) Run the following script when build process is stopped at step `startserver`.
```sh
source ariba/ezone/fixbuild.sh ssp_git
fix_classpath
fix_libfiles
export TOMCAT_HOME='/opt/apache-tomcat-9.0.27'
```
And edit /ssp_git/roots/install/config/asmshared/AppInfo.xml, change `InternalURL` and `IncomingHttpServerURL` with ip address `127.0.0.1`.
```xml
<Instance isCDS="true" name="Buyer">
    <Param name="InternalURL" value="http://127.0.0.1:8050"/>
    <Param name="Type" value="Buyer"/>
    <Param name="Version" value="14s2"/>
    <Param name="ContextRoot" value="Buyer"/>
    <Param name="CXMLServletName" value="cxmlchannel"/>
    <Param name="IncomingHttpServerURL" value="http://127.0.0.1:8050"/>
    <Param name="AuthIds" value="base,IntegratedRealm:base"/>
</Instance>
```
Restart build.
```sh
ezstart
```
8) Stop the service, find the client IP of VPN, update the IP address for buyer instance in /ssp_git/roots/install/config/asmshared/AppInfo.xml. And make sure the url for Arches instance are pointing to dev3 arches service.
```xml
<Instance isCDS="true" name="Buyer">
	<Param name="InternalURL" value="http://10.50.12.230:8050"/>
	<Param name="Type" value="Buyer"/>
	<Param name="Version" value="14s2"/>
	<Param name="ContextRoot" value="Buyer"/>
	<Param name="CXMLServletName" value="cxmlchannel"/>
	<Param name="IncomingHttpServerURL" value="http://10.50.12.230:8050"/>
	<Param name="AuthIds" value="base,IntegratedRealm:base"/>
</Instance>
<Instance name="Arches">
	<Param name="InternalURL" value="https://svcscdev3ows.sc1-lab1.ariba.com:443"/>
	<Param name="CXMLServletName" value="cxmlchannel"/>
	<Param name="Type" value="Arches"/>
	<Param name="Version" value="Arches"/>
	<Param name="IncomingHttpServerURL" value="https://svcscdev3ows.sc1-lab1.ariba.com:443"/>
	<Param name="ContextRoot" value="Arches"/>
</Instance>
```
Restart server, check the status of arhces indexing in https://svcscdev3ows.sc1-lab1.ariba.com/Arches/inspector/indexerjobs/.  
9) After indexing is done, stop buyer and change client ip address back to `127.0.0.1` for buyer instance and restart buyer.
10) Set user.email int buyer repository to override the global value.
```sh
git config --list  
cd ~/ariba/ssp_git/ariba/ond/Buyer
git config user.name "Rong Zhuang"
git config user.email "r.zhuang@sap.com"
```

## 2. Buyer Build on Windows with WSL
### 2.1 Preparation
Wiki pages:
* [SSP, S4 development environment on Windows](https://wiki.ariba.com/display/~I816361/2018/06/08/SSP%2C+S4+development+environment+on+Windows)
* [Running EZ builds on Red Hat and Mac](https://wiki.ariba.com/display/ENGKB/Running+EZ+builds+on+Red+Hat+and+Mac#RunningEZbuildsonRedHat-GitHub)
* [ES - EZ tool for Buyer/S4 Maven Github code compilation](https://wiki.ariba.com/pages/viewpage.action?pageId=81042257)

Run the following command each time when you open new WSL terminal.
```sh
sudo service binfmt-support start
source ~/.bashrc
p4 login
```

Change default user for WSL, Open CMD, and run.
```sh
ubuntu config --default-user i857285
```

Install WSL in Windows 10
* [Windows Subsystem for Linux Installation Guide for Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

### 2.2 Setup in WSL
1) Update & upgrade your distro's packages
```sh
sudo apt update && sudo apt upgrade
sudo apt install unzip
```
2) install nfs client, or you will get error unknown filesystem type `nfs`, see http://www.linuxask.com/questions/mount-unknown-filesystem-type-nfs.
```sh
sudo apt-get install nfs-common
```
3) support 32-bit executables
```sh
a) sudo dpkg --add-architecture i386
b) sudo apt update
c) sudo apt install libc6:i386 libstdc++6:i386 libstdc++5:i386 multiarch-support
d) sudo apt install qemu-user-static
e) sudo update-binfmts --install i386 /usr/bin/qemu-i386-static --magic '\x7fELF\x01\x01\x01\x03\x00\x00\x00\x00\x00\x00\x00\x00\x03\x00\x03\x00\x01\x00\x00\x00' --mask '\xff\xff\xff\xff\xff\xff\xff\xfc\xff\xff\xff\xff\xff\xff\xff\xff\xf8\xff\xff\xff\xff\xff\xff\xff'
f) sudo service binfmt-support start
g) YOU HAVE TO RUN (f) EVERYTIME YOU OPEN A NEW UBUNTU SHELL
```

4) Perforce p4, not visual version
Check the [installation document](https://www.perforce.com/manuals/p4sag/Content/P4SAG/install.linux.packages.install.html).

**For APT (Ubuntu)**  
a) Add the Perforce packaging key to your APT keyring.
```sh
wget -qO - https://package.perforce.com/perforce.pubkey | sudo apt-key add -
```
b) Add the Perforce repository to your APT configuration.  
Create a file called /etc/apt/sources.list.d/perforce.list with the following line:
```sh
deb http://package.perforce.com/apt/ubuntu {distro} release
```
Where {distro} is replaced by one of the following: precise, trusty, xenial or bionic.

c) Run
```sh
apt-get update
```
d) Install the package by running
```sh
sudo apt-get install helix-p4d
```
5) jdk
```sh
wget --no-cookies --no-check-certificate --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u161-b12/2f38c3b165be4555a1fa6e98c45e0808/jdk-8u161-linux-x64.tar.gz
-O jdk-8-linux-x64.tar.gz
```
6) Change the timezone to PST(Reference: https://help.ubuntu.com/community/UbuntuTime)
* a) run 'sudo dpkg-reconfigure tzdata'
* b) Follow the directions in the terminal.
* c) The timezone info is saved in /etc/timezone eg. US/Pacific
* d) show time: date "+%H:%M:%S   %d/%m/%y"

7) GitHub SSO with token
In ubuntu sub system(not windows), Create file ~/.git-credentials with following content.
```sh
https://user:xxxx@github.wdf.sap.corp
```
Then, run command. Run this after reopen ubuntu system.
```sh
git config credential.helper store
```
See details:
* [SSO Enablement for GitHub.wdf.sap.corp](https://github.wdf.sap.corp/pages/github/sso-enablement)
* [git-credential-store](https://git-scm.com/docs/git-credential-store)

### 2.3 Hana on Windows
Go through wiki [SAP HANA for SSP/S4](https://wiki.ariba.com/pages/viewpage.action?pageId=77582113) and check Getting_Started_HANAexpress_VM.pdf, which can be downloaded along with hana express.

1) Install VMVare from SAP software center.  
2) Download hana express.   
3) Load hana virtual machine file(ova) into VMVare. Follow the steps mentioned in the "Getting started hana express" document.  
4) Note down the VM ip address: 10.48.104.242.  
5) hxehost login = hxeadm, default password = HXEHana1.  
6) Hana should be setup successfully.  
7) Add ip address  into C:\Windows\System32\drivers\etc\hosts.
```raw
# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost
    10.48.104.242   hxehost
```
8) Go to https://dbeaver.io/download/ download and install dbeaver. And download ngdbc.jar. Create new connection with ip address=10.48.104.242, port = 39015, user name=system, password='xxx'.  
9) Run following sql to create two db users for local build.
```sql
CREATE USER ssp_hana_user1 PASSWORD Hanauser1 NO FORCE_FIRST_PASSWORD_CHANGE;
CREATE USER ssp_hana_user2 PASSWORD Hanauser2 NO FORCE_FIRST_PASSWORD_CHANGE;
```
10)Update Hana Db connection info in ez override file.
```xml
	<replace string="@@DBHostname@@" value="10.48.104.242"/>
	<replace string="@@DBServer@@" value="HXE"/>
	<replace string="@@AribaDBType@@" value="hana"/>
	<replace string="@@AribaDBJDBCDriverType@@" value="hana"/>
	<replace string="@@AribaDBPort@@" value="39015"/>
	<replace string="@@AribaDBUserName0@@" value="ssp_hana_user1"/>
	<replace string="@@AribaDBUserPassword0@@" value="Hanauser1"/>
	<replace string="@@AribaDBUserName1@@" value="ssp_hana_user2"/>
	<replace string="@@AribaDBUserPassword1@@" value="Hanauser2"/>
```
11) Start ez build as usual.

Later, if ip address is changed.  
a) Update the new ip address in C:\Windows\System32\drivers\etc\hosts.  
b) Search AribaDBHostname in Parameters.table and update its value to latest IP.  

### 2.4 Errors in Windows
1) Could not download Node.js.
```sh
Could not download Node.js: Got error code 403 from the server.
```
Go to the settings.xml of your Maven /opt/aparch-maven/conf, remove the section <proxies>. (It should contain 2 proxies, one for http and another for https)

```sh
sudo mount -t nfs subzero.ariba.com:/vol/vol6/export/home/rc /home/rc
mount.nfs: No such device
mount -o anon subzero.ariba.com:\vol\vol6\export\home\rc G:

>mount -o anon \\10.162.176.51\vol\vol6\export\home\rc G
```
2) Command 'gnu' not found
```sh
gnu initdb -loadmeta
Command 'gnu' not found, did you mean:
```
Run 'ez -info' to see where is the shared/bin folder. Use "./gnu initdb -loadmeta" or.
```sh
/ariba/ssp_git/ariba/shared/bin/gnu initdb -loadmeta
```
3) git push error
```sh
server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none
```
Disable ssl verification, see this [issue on stackoverflow](https://stackoverflow.com/questions/21181231/server-certificate-verification-failed-cafile-etc-ssl-certs-ca-certificates-c).
```sh
git config --global http.sslverify false
```
* [Enable sudo without password in Ubuntu/Debian](https://phpraxis.wordpress.com/2016/09/27/enable-sudo-without-password-in-ubuntudebian/)

Create softlink.
```sh
sudo ln -s /mnt/d/ariba /ariba
sudo unlink /arba
```
4) thumbnail, x11 windows server.
* [How can i install xfonts-… packages?](https://askubuntu.com/questions/613190/how-can-i-install-xfonts-packages)
* [X11 - DISPLAY (environment variable)](https://gerardnico.com/ssh/x11/display)

a) Update apt-get
```sh
sudo add-apt-repository "deb http://archive.canonical.com/ $(lsb_release -sc) partner"
sudo apt-get update
```
b) install xvfb (x11)
```sh
sudo apt-get install -y xvfb
```
c) check if xvfb is running
```sh
ps -ef | grep Xvfb
i857285   6314  5135  0 14:58 tty3     00:00:00 grep --color=auto Xvfb
```
d) Start Xvfb on a specific display port and background the process
e) Tell the terminal session to use the display port
```sh
Xvfb :99 &
export DISPLAY=:99
```
f) check status
```sh
ps -ef|grep Xvfb
i857285    934   912  0 16:46 tty3     00:00:00 Xvfb :99
i857285    978   912  0 16:48 tty3     00:00:00 grep --color=auto Xvfb
```
5) Create new realms
```sh
/ariba/ssp_git/ariba/shared/bin/gnu addandinitrealms -add 2 -skipinitdb -basedomainvariant vsap
/ariba/ssp_git/ariba/shared/bin/gnu addandinitrealms -finishinitdb
```
Switch Tomcat.
```sh
export TOMCAT_HOME='/opt/apache-tomcat-6.0.53'
export TOMCAT_HOME='/opt/apache-tomcat-9.0.29'
```

6) Location of WSL in Windows 10
```sh
C:\Users\i857285\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc
```
7) No IP address for hana after hxe is launched.  
Go to VMware->Edit->virtual Network Editor, add bridge connection, by following the steps mentioned in Getting_Started_HANAexpress_VM.pdf

## 3. More about Buyer Build
### 3.1 Increase Java Memory Maximum
Set the value of `JavaMemoryMax` in parameter table.
```sh
cd /ssp_hana/root/install/config/  
sudo chown $USER Parameters.table  
gedit Parameters.table  
```
Search ‘JavaMemoryMax’, change from 512m to 4096m, save the file and restart the build.

### 3.2 Enable Email Notification
Check wiki [Receive email notifications generated by Downstream Invoicing](https://wiki.ariba.com/display/ENGDPTS/How+to+receive+email+notifications+generated+by+AN%27s+Junits+and+Downstream+Invoicing).

Make sure in the application you have this parameter enabled: `Application.Base.EmailApprovalEnabled`.

Then, edit parameter table as follows.
```sh
cd /ariba/ssp_git/root/install/config/
sudo chown $USER Parameters.table
gedit Parameters.table
```
Remove:
* AribaSystemAppUserEmailAddress = "nobody@ansmtp.lab1.ariba.com";
* SenderEmailAddress = "nobody@ansmtp.lab1.ariba.com";

Change:
* EmailApprovalReplyTo = "approval@<yourMachineName>.ariba.com"; (like approval@10.48.105.101.ariba.com)
* NotificationFromAddress = "notificationAdmin@your.admins.domain";
* AdministratorEmailAddress = "admin@your.admins.domain";
* EmailApprovalReplyTo = "approval@<yourMachineName>.ariba.com";
* SMTPDomainName = "sap.com";
* SMTPServerNameList = "(mail.sap.corp)";
* SMTPAddressRedirect = "";

If the above does not work, try to set NotificationFromAddress with your own email address. And you can debug `ApprovableNotification.reallySendEmail()` if necessary.
* NotificationFromAddress = "r.zhuang@sap.com";

**Other issues related to email notification**  
1) Disable black email list.  
Go to BlacklistedEmailAddressServiceImpl.areAllrecipientsblacklisted(), make it always return false.  
2) Check if durable email has been generated.  
```sql
select * from DurableEmail where TimeCreated > Date('2019-08-01 14:00:00 PDT') order by TimeCreated DESC
```
If not, debug DurableEmail.createDurableEmail(), line 342.  
3) Email Attachment.
* ApprovableNotification.reallySendEmail()
* FileMimeAttachment.java
* AribaEmailSender.addAllAttachments()
* DurableEmail.addAttachmentsToEmail()  

4) DB level
```sql
/* delete all durable emails */
delete FROM SSP_GIT_USER1.DURABLEEMAILTAB
/* search messge by ir or invoice’s baseid */
Select * from SSP_GIT_USER1.LONGSTRINGELEMENTTAB WHERE ROOTID = 'AAAeADUSUbx'
```

### 3.3 Enable Realm Encryption
Run the following command and wait for about 5 minutes.
```sh
gnu encryptionoptin -realmName p2pTeSg -mode optin
```
Check if realm encryption is enabled.
* Go to inspector, choose realm, select for cluster root "ariba.base.core.RealmProfile".
* Verify that IsEncryptionEnabled = true for the realm.

Check wiki [Encryption Feature - Knowledge Tansfer](https://wiki.ariba.com/display/ENGPRJ/Encryption+Feature+-+Knowledge+Tansfer) for more details.

If parameter `Application.Approvable.EncryptAttachments` is turned on, uploading file through UI will fail. Below is the error we can find in the log.
```raw
Wed Jun 06 14:12:19 PDT 2018 (T33:prealm_3:ghalas:PasswordAdapter1:o76khr:buyerserver1) (approvable:WARN) [ID9361]:
Failed to encrypt the attachment-3.pdf encrypt version-1 Exception-Illegal key size
```
Solution:
* Go to [Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files 8](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html) to download Java Cryptography Extension (JCE). Make sure you are downloading the proper version. Here we need JCE for java 8.
* Extract `local_policy.jar` and `US_export_policy.jar` from the downloaded package and copy them to `$JAVA_HOME/jre/lib/security`. If you are using ezstart, your JAVA_HOME is in your build, for example /ariba/ssp_dev/ariba/3rdParty/jdk/Darwin/1.8.0. Restart your application at last, the error should be gone.

### 3.4 Check if Realm Encryption is enabled
Check wiki [Encryption Feature - Knowledge Tansfer](https://wiki.ariba.com/display/ENGPRJ/Encryption+Feature+-+Knowledge+Tansfer) and [MCL for Customers Opting for Encryption](https://wiki.ariba.com/display/ENGDPTS/MCL+for+Customers+Opting+for+Encryption).

Run AQL.
```sql
select * from RealmProfile
Where Name.PrimaryString='Canonical Realm: apcAippSap'
```
Check if ‘IsEncrypted’ is true, note down the Id, eg 14.
```sql
select * from PerTenantEncryptionKeyMeta
where RealmId=14
select * from EncryptionConfiguration
where RealmId=14
```
If both query return entry from PerTenantEncryptionKeyMeta and EncryptionConfiguration, then encryption is enabled in this realm.

### 3.5 The location of attachments in buyer build
```sh
# local
/ariba/ssp_git/root/install/realms/realm_3/transactionData/attachments/ns2018/05/11
# server
/home/svcdev9/buyer/realms/realm_1/transactionData/attachments/ns2018/05/14
```

### 3.6 Setup parent child realm
Wiki Pages:
* [Steps to create a Parent child configuration in Buyer build Skip to end of metadata](https://wiki.ariba.com/display/ENGKB/Steps+to+create+a+Parent+child+configuration+in+Buyer+build)
* [Adding More Realms to SSP/S4](https://wiki.ariba.com/pages/viewpage.action?pageId=99902837)
* [Add Realms and Create Test Sites in local build](https://wiki.ariba.com/display/~I079013/Add+Realms+and+Create+Test+Sites+in+local+build)

1) Stop server, create two new realms for sap variant.
```sh
gnu addandinitrealms -add 2 -skipinitdb -basedomainvariant vsap
gnu addandinitrealms -finishinitdb
```
2) Start server, go to service manager, you should see new realms are created.

3) Setup Parent realm  
a) Click on realm which you want it to be Parent realm say ‘realm_5’ and select option “Edit Site Profile”.  
b) On the top, select the option “Is Parent realm” and check that box. Fill-in information for "Customer Site Name"  (for ex: p2pTeSap-Tiers-P or any name you would like).  
c) Fill in other details for required fields (* fields) and press Ok.  
d) The realm configuration is done, but its status is ‘Assigned’. Click on the "Assigned" linked from the list of realm names, and choose ‘Enable’ option.  

4) Setup Child realm  
a) Click on realm which you want it to be Child realm say ‘realm_6’ and select option “Edit Site Profile”.  
b) On the top, don’t select the option “Is Parent realm”. Instead, select the parent realm created before for the field “Parent Realm ID”.  
c) Fill-in information for "Customer Site Name" (eg. p2pTeSap-Tiers-C or any name you would like).  
d) Set “SN Network Business Application System ID” to the preferred child realm name say “Child1”.  
e) Fill in other details for required fields (* fields) and press Ok.  
f) The realm configuration is done, it is in loading status, wait until the status is changed to “Assigned”.  
g) Click on the "Assigned" linked from the list of realm names, and choose ‘Enable Customer Site’ option.  

5) Import master data.  
a) Administer the parent realm and go to "Site Manager"->"Data Import/Export"->"Import Initial Data".  
b) Import the zip file found in your directory: {install}/internal/demo/vsap/zips/merp-walkthrough.zip (Note: "{install}" is the install directory of your ssp build, example "/ariba/ssp_sp/root/install" and "vsap" is for sap variant. Choose the appropriate variant folder for other variants).  
c) The above Import should be successful.  

## 4. GitHub SSO
Config user name, email and remote url.
```sh
git config --list  
git config user.name "Rong Zhuang"
git config user.email "r.zhuang@sap.com"
git config remote.origin.url "https://github.wdf.sap.corp/Ariba-Ond/Buyer.git"
```

Generate new ssh key, check https://help.github.com/articles/connecting-to-github-with-ssh/.
```sh
$ ssh-keygen -t rsa -b 4096 -C "r.zhuang@sap.com"
```
When you're prompted to "Enter a file in which to save the key," press Enter. This accepts the default file location.
```sh
> Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
```

Create key.
```sh
git remote set-url origin git@github.com:jojozhuang/text-compare-angular.git

ssh-keygen -t rsa -b 4096 -C "jojozhuang@gmail.com"
mv jojozhuang_github_rsa ~/.ssh
mv jojozhuang_github_rsa.pub ~/.ssh

open ~/.ssh/config
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa

Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/jojozhuang_github_rsa

ssh-add -K ~/.ssh/jojozhuang_github_rsa

pbcopy < ~/.ssh/jojozhuang_github_rsa.pub

```

## 5. Intellij IDEA
### 5.1 Disable 'import \*'
Go to Preferences > Editor > Code Style > Java > Imports >
* set "Class count to use import with '\*'" = 9999
* set "Names count to use static import with '\*'" = 9999

## 6. Setup
### 6.1 Create new realm
Go to /WORKSPACE/root/install/config/, open file `RealmEnablement.table`, copy and create a new realm.

Stop build, run.
```sh
gnu addandinitrealms -add 1
gnu enablerealms
```

## 7. References
* [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
