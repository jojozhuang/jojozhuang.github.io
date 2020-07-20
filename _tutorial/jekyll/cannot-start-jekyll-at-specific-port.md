---
layout: tutorial
key: tutorial
title: "Cannot Start Jekyll at Specific Port"
index: 8105
subcategory: jekyll
date: 2016-01-17
tags: [Jekyll, Port]
---

> Handle error 'Address Already in Use' when starting Jekyll.

## 1. Issue of 'Address Already in Use'
I've set up my [GitHub Page website](http://jojozhuang.github.io/) locally. It works as expected. But sometimes, I'm unable to start Jekyll. I keep getting the following error after running 'jekyll serve' command.
```raw
jekyll 3.5.2 | Error:  Address already in use - bind(2) for 127.0.0.1:4000
```
Port 4000 has already been occupied. To solve this issue, kill the process that is using this port.  
Find the process which is using port 4000.
```raw
$ sudo lsof -i :4000
```

Kill the process with its id.
```raw
$ sudo kill -9 <PID>
```
![image](/assets/images/jekyll/8105/port.png){:width="700px"}  

Retry 'jekyll serve', the error 'Port Already in Use' is gone.

## 2. NoMachine Process
Similar problem - Port 4000 is occupied by NoMachine(nxd).
```raw
Johnny@Johnny-Mac:~$ sudo lsof -i :4000
COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
nxd     11199   nx    3u  IPv4 0x2fad2a11645a3de5      0t0  TCP *:terabase (LISTEN)
nxd     11199   nx    4u  IPv6 0x2fad2a115cded5bd      0t0  TCP *:terabase (LISTEN)
```
Killing the thread won't work, because NoMachine's nxd process will keep restarting, with a new PID. Either you have to change the port for your app. Or, change the service port for NoMachine. NoMachine->Preferences->Connection preferences.
![image](/assets/images/jekyll/8105/nomachine_preferences.png){:width="700px"}  
![image](/assets/images/jekyll/8105/nomachine_port.png){:width="700px"}  

We can also shutdown NoMachine and disable the automatic start at next boot via command line.

On Linux:
```raw
sudo /etc/NX/nxserver --shutdown
sudo /etc/NX/nxserver --startmode manual
```
On Mac:
```raw
sudo /etc/NX/nxserver --shutdown
sudo /etc/NX/nxserver --startmode manual
```
On Windows:
Open the CMD console as administrator and move to the bin folder under the NoMachine installation directory and run:
```raw
nxserver --shutdown
nxserver --startmode manual
```

## 3. References
* [TCPServer Error: Address already in use - bind(2)](https://stackoverflow.com/questions/10261477/tcpserver-error-address-already-in-use-bind2)
* [Disabling the automatic start-up of NoMachine at boot time](https://www.nomachine.com/AR04L00800)
