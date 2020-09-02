---
layout: tutorial
key: cloud
title: "AWS-Serverless"
index: 4112
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Serverless, Lambda]
---

> Build serverless applications.

## 1. Amazon Lambda
### 1.1 Serverless Concept
History of cloud: Data center->IaaS->PaaS->Containers->Serverless.
![image](/assets/images/cloud/4112/history-of-cloud.jpg)
### 1.2 Amazon Lambda
AWS Lambda is a compute service where you can upload your code and create a Lambda function. AWE Lambda takes care of provisioning and managing the servers that you use to run the code. You don't have to worry about operating systems, patching, scaling, etc.

Lambda Is The Ultimate Abstraction Layer:
* Data Centers
* Hardware
* Assembly Code/Protocols
* High Level Languages
* Operating Systems
* Application Layer/AWS APIs
* AWS Lambda

You can use Lambda in the following ways:
* As an event-driven compute service where AWS Lambda runs your code in response to events. These events could be changes to data in an Amazon S3 bucket or an Amazon DynamoDB table.
* As a compute service to run your code in response to HTTP requests using Amazon API Gateway or API calls made using AWS SDKs.

Lambda usage cases.
![image](/assets/images/cloud/4112/aws-lambda.jpg)
Traditional vs. Serverless Architecture
![image](/assets/images/cloud/4112/traditional-vs-serverless.jpeg)

What Languages Does Lambda Support?
* Node.js
* Java
* Python
* C#
* Go
* PowerShell

How lamda is priced?

Lambda Pricing
How Is Lambda Priced
* Number Of Requests
  - First 1 million requests are free. $0.20 per 1 million requests thereafter.
* Duration
  - Duration is calculated from the time your code begins executing until it returns or otherwise terminates, rounded up to the nearest 100ms. The price depends on the amount of memory you allocate to your function. You are charged $0.00001667 for every GB-second used.

Why Is Lambda Cool?
* NO SERVERS!
* Continuous Scaling
* Super super super cheap!

### 1.3 Summary
* Lambda scales out (not up) automatically
* Lambda functions are independent, 1 event =1 function
* Lambda is serverless
* Know what services are serverless!
* Lambda functions can trigger other lambda functions, 1 event can = x functions if functions trigger other functions
* Architectures can get extremely complicated, AWS X-ray allows you to debug what is happening
* Lambda can do things globally, you can use it to back up S3 buckets to other S3 buckets etc
* Know your triggers

## 2. Lab - Build A Serverless Website
### 2.1 Overview
![image](/assets/images/cloud/4112/10-2-build-serverless-1.png)
Services->Compute->Lambda, create a function.
![image](/assets/images/cloud/4112/10-2-build-serverless-2.png)
Set name, choose python 3.6 for runtime.
![image](/assets/images/cloud/4112/10-2-build-serverless-3.png)
Create a new role and select 'Simple microservice permissions' policy template, Create Function.
![image](/assets/images/cloud/4112/10-2-build-serverless-4.png)
Lambda function is created.
![image](/assets/images/cloud/4112/10-2-build-serverless-5.png)
Scroll down and copy the python code to the function code editor, save the change.
```python
def lambda_handler(event, context):
    print("In lambda handler")

    resp = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "body": "Johnny"
    }

    return resp
```
![image](/assets/images/cloud/4112/10-2-build-serverless-6.png)
Scroll down and set the description.
![image](/assets/images/cloud/4112/10-2-build-serverless-7.png)
Scroll up, select the 'API Gateway' trigger.
![image](/assets/images/cloud/4112/10-2-build-serverless-8.png)
Create a new api and select AWS IAM as the security mechanism. Click add and save.
![image](/assets/images/cloud/4112/10-2-build-serverless-9.png)
The API Gateway trigger is created.
![image](/assets/images/cloud/4112/10-2-build-serverless-10.png)
Hit the name of the gateway "MyFirstLambdaFunction-API".
![image](/assets/images/cloud/4112/10-2-build-serverless-11.png)
Delete the existing ANY method and create a new get method.
![image](/assets/images/cloud/4112/10-2-build-serverless-12.png)
Then deploy this api.
![image](/assets/images/cloud/4112/10-2-build-serverless-13.png)
Expand the get method, click the invoke url. It should return "Johnny", which is defined in the python script.
![image](/assets/images/cloud/4112/10-2-build-serverless-14.png)

Now, our lambda function is working. We will create a web page to call this function.

Replace YOUR-API-GATEWAY-LINK-HERE with the invoke URL in the index.html.
```html
<html>
<script>

function myFunction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("my-demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "YOUR-API-GATEWAY-LINK-HERE", true);
    xhttp.send();

}

</script>
<body><div align="center"><br><br><br><br>
<h1>Hello <span id="my-demo">Cloud Gurus!</span></h1>
<button onclick="myFunction()">Click me</button><br>
<img src="https://s3.amazonaws.com/acloudguru-opsworkslab-donotdelete/ACG_Austin.JPG"></div>
</body>
</html>
```
Create a s3 bucket.
![image](/assets/images/cloud/4112/10-2-build-serverless-15.png)
Notice the bucket is not public.
![image](/assets/images/cloud/4112/10-2-build-serverless-16.png)
Select the bucket, click "Edit public access settings", clear all checks, save.
![image](/assets/images/cloud/4112/10-2-build-serverless-17.png)
Switch to Properties tab, choose "Static website hosting".
![image](/assets/images/cloud/4112/10-2-build-serverless-18.png)
Choose the "Use this bucket to host a website" option, set the index document and error document.
![image](/assets/images/cloud/4112/10-2-build-serverless-19.png)
error.html.
```html
<html><body><h1>There has been an error!</h1></body></html>
```
Bucket hosting is setup.
![image](/assets/images/cloud/4112/10-2-build-serverless-20.png)
Upload the two html files into the bucket and make them public.
![image](/assets/images/cloud/4112/10-2-build-serverless-21.png)
Access the link of index.html in web browser. We should see the page.
![image](/assets/images/cloud/4112/10-2-build-serverless-22.png)
Click on the button, the title will be changed.
![image](/assets/images/cloud/4112/10-2-build-serverless-23.png)
Further more, you can bind your domain name to the s3 bucket by creating an A Record.
![image](/assets/images/cloud/4112/10-2-build-serverless-24.png)
Now, when we visit the domain, it shows the same content.
![image](/assets/images/cloud/4112/10-2-build-serverless-25.png)
* Wait for a while if you see a blank page as dns takes some time to work.

Architecture of Lambda.
![image](/assets/images/cloud/4112/10-3-serverless-diagram.png)

## 3. References
* [AWS Lambda](https://aws.amazon.com/lambda/)
