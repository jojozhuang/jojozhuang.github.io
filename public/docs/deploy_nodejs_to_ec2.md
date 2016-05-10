Deploy Node.js app to Amazon EC2

> This blog guides you how to deploy your Node.js application to Amazon EC2.
>
> There are mainly 5 steps:

-   Create EC2 Instance

-   Use Putty to Connect EC2 Remote Server

-   Setup Node.js environment in EC2 Instance

-   Create simple node app and start Node server

-   Deploy Local Node.js application to EC2 Instance

1.  Create EC2 Instance

    1.  Login to Amazon EC2

        <http://aws.amazon.com/ec2/>

        Sign up ‘Amazons free micro instance of EC2’ if you have no AWS Account yet.

    2.  Create Instance

        <img src="./media/image1.png" width="584" height="524" />

        <img src="./media/image2.png" width="624" height="256" />

        <img src="./media/image3.png" width="624" height="259" />

        Finally, review and launch.

        After the instance is generated, create security group.

        <img src="./media/image4.png" width="624" height="294" />

    3.  Create Key Pair

        <img src="./media/image5.png" width="624" height="410" />

        Down load the private key to local machine, eg. nodeonec2.pem.

2.  Use Putty to Connect EC2 Remote Server

    1.  User PUTTYGEN.EXE to convert key

        <img src="./media/image6.png" width="416" height="402" />

        <img src="./media/image7.png" width="536" height="377" />

        <img src="./media/image8.png" width="429" height="416" />

        After save, nodeonec2.ppk is generated.

    2.  Configure PUTTY.EXE

        In session, provide IP address(The public ip of your EC2 instance) and session name.

        <img src="./media/image9.png" width="389" height="374" />

        The IP is the Public IP of your EC2 instance. It is only available when the instance is running.

        <img src="./media/image10.png" width="624" height="293" />

        Connection-&gt;Data, add user, always ‘ec2-user’.

        <img src="./media/image11.png" width="374" height="359" />

        Connection -&gt;SSH -&gt;Auth, load the private key ppk file.

        <img src="./media/image12.png" width="389" height="374" />

        Back to session, save the configuration.

    3.  Connect to EC2 remote server

        Choose the newly created session, double click it or click the ‘Open’ button.

        <img src="./media/image13.png" width="399" height="384" />

        <img src="./media/image14.png" width="557" height="349" />

        Note, the IP address here is internal IP. When using putty to connect EC2 remote server, make sure launch the instance first. You have to change the IP in putty every time if you reboot the instance. The Public IP address of the EC2 instance changes to different value once it restarts.

3.  Setup Node.js environment in EC2 Instance

    1.  Update your EC2 Amazon Linux

        sudo yum update

    2.  Install GCC

        sudo yum install gcc-c++ make

        sudo yum install openssl-devel

    3.  Install Node.js

        sudo yum install git

        git clone git://github.com/nodejs/node

        cd node

        ./configure

        make //it may take long time to compile

        sudo make install

    4.  Add node folder to secure\_path

        sudo su

        nano /etc/sudoers

        append :/usr/local/bin to the end of secure\_path

        <img src="./media/image15.png" width="499" height="313" />

    5.  Install npm

        git clone <https://github.com/npm/npm>

        cd npm

        sudo make install

4.  Create simple node app and start Node server

    1.  Create folder ‘site’

        mkdir site

    2.  Create file ‘server.js’

        nano server.js

        append the following content to the file, save and exit.

| var http = require('http');                              
                                                           
 function onRequest(request, response) {                   
                                                           
 console.log("A user made a request" + request.url);       
                                                           
 response.writeHead(200, {"Context-Type": "text/plain"});  
                                                           
 response.write("Here is your response");                  
                                                           
 response.end();                                           
                                                           
 }                                                         
                                                           
 http.createServer(onRequest).listen(8080);                
                                                           
 console.log("The server is running at 80...");            |
|----------------------------------------------------------|

<img src="./media/image16.png" width="536" height="336" />

1.  Redirect port

    You cannot make node server listen to port 80. Run the following command to redirect requests from port 80 of EC2 server to port 8080 of our Node server.

iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8080

1.  Start our Node server

    <img src="./media/image17.png" width="542" height="340" />

2.  Open web browser, access the site with public IP.

    <img src="./media/image18.png" width="497" height="269" />

    <img src="./media/image19.png" width="503" height="315" />

<!-- -->

1.  Deploy Local Node.js application to EC2 Instance

    1.  Install CyberDuck

        <https://cyberduck.io/?l=en>

    2.  Launch CyberDuck and Upload

        <img src="./media/image20.png" width="545" height="376" />

        <img src="./media/image21.png" width="530" height="366" />

        <img src="./media/image22.png" width="429" height="227" />

        Select the folder, make sure delete all files in ‘node\_modules’ folder.

        <img src="./media/image23.png" width="510" height="352" />

        <img src="./media/image24.png" width="414" height="424" />

        <img src="./media/image25.png" width="414" height="424" />

        Refresh the folder in putty, the new folder exits.

        <img src="./media/image26.png" width="560" height="351" />

    3.  Go into the folder

        npm install

        npm start

    4.  Open Chrome, Firefox, on different device.

        This node project is a drawing application. It uses Socket.IO to broadcast the changes from one client to other clients.

        The first user opens it in chrome, waits others to join and draws something later.

        <img src="./media/image27.png" width="624" height="346" />

        The second user opens it in Firefox. The same painting as the first user draws.

        <img src="./media/image28.png" width="624" height="342" />

        The third user open it on iPad.

        <img src="./media/image29.png" width="624" height="467" />

        The forth user opens it on iPhone.

        <img src="./media/image30.png" width="335" height="595" />

2.  Useful command in linux

| **Command**         | **Description**                                 |
|---------------------|-------------------------------------------------|
| ls                  | Show files/directories under the current folder |
| sudo su             | Switch to root user                             |
| sudo su -- ec2-user | Switch to ec2-user                              |
| nano filename       | Open/Create file with nano                      |
| mkdir foldername    | Create folder                                   |
| sudo make uninstall | Uninstall, go to the folder and run it.         |

1.  Reference

    How I Got Node.js Running On A Linux Micro Instance Using Amazon EC2

    <http://www.bennadel.com/blog/2321-how-i-got-node-js-running-on-a-linux-micro-instance-using-amazon-ec2.htm>

    How to install & setup Node.js on Amazon EC2 – complete guide

    <http://iconof.com/blog/how-to-install-setup-node-js-on-amazon-aws-ec2-complete-guide/>

    Setup Node.Js Enviroment on Amazon EC2 linux

    <http://adndevblog.typepad.com/cloud_and_mobile/2014/12/setup-nodejs-enviroment-on-amazon-ec2-linux-1.html>

    <https://docs.npmjs.com/misc/removing-npm>

2.  Issues

    1.  Remove npm

        Sometime, there is something wrong with npm, it doesn’t work.

        <img src="./media/image31.png" width="521" height="326" />

        You need to uninstall and install again.

        sudo npm uninstall npm -g

        If it doesn’t work, go the ‘npm’ folder, run:

        sudo make uninstall
