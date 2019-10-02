---
layout: tutorial
key: tutorial
title: "AWS-Serverless-10-Draft"
index: 3811
subcategory: amazon-aws
date: 2019-09-16
tags: [VPC]
draft: true
---

> Amazon AWS Tutorial

## 10. Serverless
### 10.1 Lambda Concepts
History of cloud: Data center->IAAS->PAAS->Containers->Serverless.
![image](/assets/images/note/9551/10-1-lambda-1.png)
Lamda.
![image](/assets/images/note/9551/10-1-lambda-2.png)
![image](/assets/images/note/9551/10-1-lambda-3.png)
![image](/assets/images/note/9551/10-1-lambda-4.png)
Lamda usage cases.
![image](/assets/images/note/9551/10-1-lambda-5.png)
![image](/assets/images/note/9551/10-1-lambda-6.png)
Traditional vs. Serverless Architecture
![image](/assets/images/note/9551/10-1-lambda-7.png)
What languages does lamda support?
![image](/assets/images/note/9551/10-1-lambda-8.png)
How lamda is priced?
![image](/assets/images/note/9551/10-1-lambda-9.png)
Why lamda is cool?
![image](/assets/images/note/9551/10-1-lambda-10.png)
Lamda exam tips.
![image](/assets/images/note/9551/10-1-lambda-exam-tips-1.png)
![image](/assets/images/note/9551/10-1-lambda-exam-tips-2.png)
### 10.2 Let's Build A Serverless Webpage
![image](/assets/images/note/9551/10-2-build-serverless-1.png)
Services->Compute->Lambda, create a function.
![image](/assets/images/note/9551/10-2-build-serverless-2.png)
Set name, choose python 3.6 for runtime.
![image](/assets/images/note/9551/10-2-build-serverless-3.png)
Create a new role and select 'Simple microservice permissions' policy template, Create Function.
![image](/assets/images/note/9551/10-2-build-serverless-4.png)
Lambda function is created.
![image](/assets/images/note/9551/10-2-build-serverless-5.png)
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
![image](/assets/images/note/9551/10-2-build-serverless-6.png)
Scroll down and set the description.
![image](/assets/images/note/9551/10-2-build-serverless-7.png)
Scroll up, select the 'API Gateway' trigger.
![image](/assets/images/note/9551/10-2-build-serverless-8.png)
Create a new api and select AWS IAM as the security mechanism. Click add and save.
![image](/assets/images/note/9551/10-2-build-serverless-9.png)
The API Gateway trigger is created.
![image](/assets/images/note/9551/10-2-build-serverless-10.png)
Hit the name of the gateway "MyFirstLambdaFunction-API".
![image](/assets/images/note/9551/10-2-build-serverless-11.png)
Delete the existing ANY method and create a new get method.
![image](/assets/images/note/9551/10-2-build-serverless-12.png)
Then deploy this api.
![image](/assets/images/note/9551/10-2-build-serverless-13.png)
Expand the get method, click the invoke url. It should return "Johnny", which is defined in the python script.
![image](/assets/images/note/9551/10-2-build-serverless-14.png)

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
![image](/assets/images/note/9551/10-2-build-serverless-15.png)
Notice the bucket is not public.
![image](/assets/images/note/9551/10-2-build-serverless-16.png)
Select the bucket, click "Edit public access settings", clear all checks, save.
![image](/assets/images/note/9551/10-2-build-serverless-17.png)
Switch to Properties tab, choose "Static website hosting".
![image](/assets/images/note/9551/10-2-build-serverless-18.png)
Choose the "Use this bucket to host a website" option, set the index document and error document.
![image](/assets/images/note/9551/10-2-build-serverless-19.png)
error.html.
```html
<html><body><h1>There has been an error!</h1></body></html>
```
Bucket hosting is setup.
![image](/assets/images/note/9551/10-2-build-serverless-20.png)
Upload the two html files into the bucket and make them public.
![image](/assets/images/note/9551/10-2-build-serverless-21.png)
Access the link of index.html in web browser. We should see the page.
![image](/assets/images/note/9551/10-2-build-serverless-22.png)
Click on the button, the title will be changed.
![image](/assets/images/note/9551/10-2-build-serverless-23.png)
Further more, you can bind your domain name to the s3 bucket by creating an A Record.
![image](/assets/images/note/9551/10-2-build-serverless-24.png)
Now, when we visit the domain, it shows the same content.
![image](/assets/images/note/9551/10-2-build-serverless-25.png)
* Wait for a while if you see a blank page as dns takes some time to work.

Architecture of Lambda.
![image](/assets/images/note/9551/10-3-serverless-diagram.png)
### 10.3 Let's Build An Alexa Skill
TODO lab: Alexa.
### 10.4 Summary
![image](/assets/images/note/9551/10-4-lamda-summary-1.png)
![image](/assets/images/note/9551/10-4-lamda-summary-2.png)
![image](/assets/images/note/9551/10-4-lamda-summary-3.png)
### 10.5 Serverless Quiz
![image](/assets/images/note/9551/10-5-serverless-quiz-1.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-2.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-3.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-4.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-5.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-6.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-7.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-8.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-9.png)


## 9. References
