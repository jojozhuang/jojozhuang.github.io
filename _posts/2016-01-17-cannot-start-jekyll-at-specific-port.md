---
layout: post
key: blog
title: "Cannot Start Jekyll at Specific Port"
date: 2016-01-17
tags: [Jekyll, Port]
---

> Handle error 'Address Already in Use' when starting Jekyll.

I've set up my [GitHub Page website](http://jojozhuang.github.io/) locally. It works as expected. But sometimes, I'm unable to start Jekyll. I keep getting the following error after running 'jekyll serve' command.
```sh
jekyll 3.5.2 | Error:  Address already in use - bind(2) for 127.0.0.1:4000
```
Port 4000 has already been occupied. To solve this issue, kill the process that is using this port.  
Find the process which is using port 4000.
```sh
$ sudo lsof -i :4000
```

Kill the process with its id.
```sh
$ sudo kill -9 <PID>
```
![MIME Type](/public/pics/2016-01-17/port.png){:width="700px"}  

Retry 'jekyll serve', the error 'Port Already in Use' is gone.

--------------
Similar problem - Port 4000 is occupied by NoMachine(nxd).
```sh
Johnny@Johnny-Mac:~$ sudo lsof -i :4000
COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
nxd     11199   nx    3u  IPv4 0x2fad2a11645a3de5      0t0  TCP *:terabase (LISTEN)
nxd     11199   nx    4u  IPv6 0x2fad2a115cded5bd      0t0  TCP *:terabase (LISTEN)
```
Killing the thread won't work, because NoMachine's nxd process will keep restarting, with a new PID. Either you have to change the port for your app. Or, change the service port for NoMachine. NoMachine->Preferences->Connection preferences.
![MIME Type](/public/pics/2016-01-17/nomachine_preferences.png){:width="700px"}  
![MIME Type](/public/pics/2016-01-17/nomachine_port.png){:width="700px"}  

References:
* [TCPServer Error: Address already in use - bind(2)](https://stackoverflow.com/questions/10261477/tcpserver-error-address-already-in-use-bind2)
