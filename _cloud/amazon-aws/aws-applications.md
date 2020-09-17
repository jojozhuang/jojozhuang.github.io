---
layout: tutorial
key: cloud
title: "AWS-Applications"
index: 4179
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS,SQS,SNS]
---

> Using SQS and SNS for notification.

## 1. Amazon SQS
### 1.1 Amazon SQS
Amazon SQS is a web service that gives you access to a message queue that can be used to store messages while waiting for a computer to process them.

Amazon SQS is a distributed queue system that enables web service applications quickly and reliably queue messages that one component in the application generates to be consumed by another component. A queue is a temporary repository for messages that are awaiting processing.

Using Amazon SQS, you can decouple the components of an application so they run independently, easing message management between components. Any component of a distributed application can store messages in a fail-safe queue. Messages can contain up to 256 KB of text in any format. Any component can later retried the messages programmatically using the Amazon SQS API.

The queue acts as a buffer between the component producing and saving data, and the component receiving the data for processing. This means the queue resolves issues that arise if the producer is producing work faster than the consumer can process it, or if the producer or consumer are only intermittently connected to the network.

### 1.2 Queue Type
There are two types of Queue:
* Standard Queues (default)
* FIFO Queues

### 1.3 Standard Queue
Amazon SQS offers standard as the default queue type. A standard queue lets you have a nearly-unlimited number of transactions per second. Standard queues guarantee that a message is delivered at least once. However, occasionally (because of the highly-distributed architecture that allows high throughput), more than one copy of a message might be delivered out of order. Standard queues provide best-effort ordering which ensures that messages are generally delivered in the same order as they are sent.  
### 1.4 FIFO Queue
The FIFO queue complements the standard queue. The most important features of this queue type are FIFO (first-in-first-out) delivery and exactly-once processing: The order in which messages are sent and received is strictly preserved and a message is delivered once and remains available until a consumer processes and deletes it; duplicates are not introduced into the queue.

FIFO queues also support message groups that allow multiple ordered message groups within a single queue. FIFO queues are limited to 300 transactions per second (TPS), but have all the capabilities of standard queues.
### 1.5 Summary
* SQS is pull based, not pushed based.
* Messages are 256 KB in size.
* Messages can be kept in the queue from 1 minute to 14 days; the default retention period is 4 days.
* Standard order is not guaranteed and messages can be delivered more than once.
* FIFO order is strictly maintained and messages are delivered only once.
* Visibility Time Out is the amount of time that the message is invisible in the SQS queue after a reader picks up that message. Provided the job is processed before the visibility time out expires, the message will then be deleted from the queue. If the job is not processed within that time, the message will become visible again and another reader will process it. This could result in the same message being delivered twice.
* Visibility timeout maximum is 12 hours.
* SQS guarantees that your messages will be processed at least once.
* Amazon SQS long polling is a way to retrieve messages from your Amazon SQS queues. While the regular short polling returns immediately (even if the message queue being polled is empty), long polling doesn't return a response until a message arrives in the message queue, or the long poll times out.

## 2. Amazon SWF
### 2.1 SWF
Amazon Simple Workflow Service (Amazon SWF) is a web service that makes it easy to coordinate work across distributed application components. SWF enables applications for a range of use cases, including media processing, web application backends, business process workflows, and analytics pipelines, to be designed as a coordination of tasks.
### 2.2 SWF Tasks
Tasks represent invocations of various processing steps in an application which can be performed by executable code, web service calls, human actions, and scripts.
### 2.3 SWF vs SQS
* SQS has a retention period of up to 14 days; with SWF, workflow executions can last up to 1 year.
* Amazon SWF presents a task-oriented API, whereas Amazon SQS offers a message-oriented API.
* Amazon SWF ensures that a task is assigned only once and is never duplicated. With Amazon SQS, you need to handle duplicated messages and may also need to ensure that a message is processed only once.
* Amazon SWF keeps track of all the tasks and events in an application. With Amazon SQS, you need to implement your own application-level tracking, especially if your application uses multiple queues.

### 2.4 SWF Actors
* Workflow Starters - An application that can initiate (start) a workflow. Could be your e-commerce website following the placement of an order, or a mobile app searching for bus times.
* Deciders — Control the flow of activity tasks in a workflow execution. If something has finished (or failed) in a workflow, a Decider decides what to do next.
* Activity Workers - Carry out the activity tasks.

## 3. Amazon SNS
### 3.1 Amazon SNS
Amazon Simple Notification Service (Amazon SNS) is a web service that makes it easy to set up, operate, and send notifications from the cloud.

It provides developers with a highly scalable, flexible, and cost-effective capability to publish messages from an application and immediately deliver them to subscribers or other applications.
### 3.2 SOS Integration
Besides pushing cloud notifications directly to mobile devices, Amazon SNS can also deliver notifications by SMS text message or email to Amazon Simple Queue Service (SQS) queues, or to any HTTP endpoint.
### 3.3 Topics
SNS allows you to group multiple recipients using topics. A topic is an "access point" for allowing recipients to dynamically subscribe for identical copies of the same notification.

One topic can support deliveries to multiple endpoint types for example, you can group together i0S, Android and SMS recipients. When you publish once to a topic, SNS delivers appropriately formatted copies of your message to each subscriber.
### 3.4 SNS Availability
To prevent messages from being lost, all messages published to Amazon SNS are stored redundantly across multiple availability zones.
### 3.5 SNS Benefits
* Instantaneous, push-based delivery (no polling)
* Simple APIs and easy integration with applications
* Flexible message delivery over multiple transport protocols
* Inexpensive, pay-as-you-go model with no up-front costs
* Web-based AWS Management Console offers the simplicity of a point-and-click interface

### 3.6 SNS vs SQS
* Both Messaging Services in AWS
* SNS - Push
* SQS - Polls (Pulls)

## 4. Elastic Transcoder
### 4.1 Elastic Transcoder
What Is Elastic Transcoder?   
* Media Transcoder in the cloud.
* Convert media files from their original source format in to different formats that will play on smartphones, tablets, PCs, etc.
* Provides transcoding presets for popular output formats, which means that you don't need to guess about which settings work best on particular devices.
* Pay based on the minutes that you transcode and the resolution at which you transcode.

![image](/assets/images/cloud/4179/elastic-transcoder.jpg)
Just remember that Elastic Transcoder is a media transcoder in the cloud. It converts media files from their original source format in to different formats that will play on smartphones, tablets, PCs, etc.

## 5. API Gateway
### 5.1 What Is API Gateway?
Amazon API Gateway is a fully managed service that makes it easy for developers to publish, maintain, monitor, and secure APIs at any scale.

With a few clicks in the AWS Management Console, you can create an API that acts as a "front door" for applications to access data, business logic, or functionality from your back-end services, such as applications running on Amazon Elastic Compute Cloud (Amazon EC2), code running on AWS Lambda, or any web application.
### 5.2 How API Gateway works?
![image](/assets/images/cloud/4179/api-gateway.png)
### 5.3 API Gateway Options
What Can API Gateway Do?   
* Expose HTTPS endpoints to define a RESTful API
* Serverless-ly connect to services like Lambda & DynamoDB
* Send each API endpoint to a different target
* Run efficiently with low cost
* Scale effortlessly
* Track and control usage by API key
* Throttle requests to prevent attacks
* Connect to CloudWatch to log all requests for monitoring
* Maintain multiple versions of your API

### 5.4 API Gateway Configuration
How to Configure API Gateway?
* Define an API (container)
* Define Resources and nested Resources (URL paths)
* For each Resource:
  - Select supported HTTP methods (verbs)
  - Set security
  - Choose target (such as EC2, Lambda, DynamoDB, etc.)
  - Set request and response transformations

### 5.5 API Gateway Deployment
How to Deploy API Gateway?
* Deploy API to a stage:
  - Uses API Gateway domain, by default
  - Can use custom domain
  - Now supports AWS Certificate Manager: free SSL/TLS certs

### 5.6 API Gateway Caching
You can enable API caching in Amazon API Gateway to cache your endpoint's response. With caching, you can reduce the number of calls made to your endpoint and also improve the latency of the requests to your API. When you enable caching for a stage, API Gateway caches responses from your endpoint for a specified time-to-live (TTL) period, in seconds. API Gateway then responds to the request by looking up the endpoint response from the cache instead of making a request to your endpoint.
### 5.7 Same Origin Policy
In computing, the same-origin policy is an important concept in the web application security model. Under the policy, a web browser permits scripts contained in a first web page to access data in a second web page, but only if both web pages have the same origin.

This is done to prevent Cross-Site Scripting (`XSS`) attacks.
* Enforced by web browsers.
* Ignored by tools like PostMan and curl.

### 5.8 CORS
CORS is one way the server at the other end (not the client code in the browser) can relax the same-origin policy.

Cross-origin resource sharing (`CORS`) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served.

CORS In Action:
* Browser makes an HTTP OPTIONS call for a URL (OPTIONS is an HTTP method like GET, PUT, and POST)
* Server returns a response that says: "These other domains are approved to GET this URL."
* Error - "Origin policy cannot be read at the remote resource?" You need to enable CORS on API Gateway.

### 5.9 Summary
* Remember what API Gateway is at a high level
* API Gateway has caching capabilities to increase performance
* API Gateway is low cost and scales automatically
* You can throttle API Gateway to prevent attacks
* You can log results to CloudWatch
* If you are using Javascript/AJAX that uses multiple domains with API Gateway, ensure that you have enabled CORS on API Gateway
* CORS is enforced by the client

## 6. Kinesis
### 6.1 What Is Streaming Data?
Streaming Data is data that is generated continuously by thousands of data sources, which typically send in the data records simultaneously, and in small sizes (order of Kilobytes.)
* Purchases from online stores (eg. amazon.com)
* Stock Prices
* Game data (as the gamer plays)
* Social network data
* Geospatial data (eg. uber.com)
* IoT sensor data

### 6.2 What Is Kinesis?
Amazon Kinesis is a platform on AWS to send your streaming data to other AWS applications. Kinesis makes it easy to load and analyze streaming data, and also providing the ability for you to build your own custom applications for you business needs.
### 6.3 Types of Kinesis
3 Different Types of Kinesis:
* Kinesis Streams
* Kinesis Firehose
* Kinesis Analytics

### 6.4 Kinesis Streaming
![image](/assets/images/cloud/4179/kinesis-streaming.png)

Kinesis Streams Consist Of Shards:
* 5 transactions per second for reads, up to a maximum total data read rate of 2 MB per second and up to 1,000 records per second for writes, up to a maximum total data write rate of 1 MB per second (including partition keys.)
* The data capacity of your stream is a function of the number of shards that you specify for the stream. The total capacity of the stream is the sum of the capacities of its shards.

### 6.5 Kinesis Firehose
Data can be exported to S3, Redfhift or ElasticSearch.
![image](/assets/images/cloud/4179/kinesis-firehose.png)

### 6.6 Kinesis Analytics
Amazon Kinesis Data Analytics is the easiest way to transform and analyze streaming data in real time with Apache Flink. Apache Flink is an open source framework and engine for processing data streams. Amazon Kinesis Data Analytics reduces the complexity of building, managing, and integrating Apache Flink applications with other AWS services.

Amazon Kinesis Data Analytics takes care of everything required to run streaming applications continuously, and scales automatically to match the volume and throughput of your incoming data. With Amazon Kinesis Data Analytics, there are no servers to manage, no minimum fee or setup cost, and you only pay for the resources your streaming applications consume.
![image](/assets/images/cloud/4179/kinesis-analytics.png)

## 7. Amazon Cognito
### 7.1 Identity Federation
Web Identity Federation lets you give your users access to AWS resources after they have successfully authenticated with a web-based identity provider like Amazon, Facebook, or Google. Following successful authentication, the user receives an authentication code from the Web ID provider, which they can trade for temporary AWS security credentials.
### 7.2 Amazon Cognito
Amazon Cognito provides Web Identity Federation with the following features:
* Sign-up and sign-in to your apps
* Access for guest users
* Acts as an Identity Broker between your application and Web ID providers, so you don't need to write any additional code.
* Synchronizes user data for multiple devices
* Recommended for all mobile applications AWS services.

### 7.3 Cognito Use case
Cognito brokers between the app and Facebook or Google to provide temporary credentials which map to an IAM role allowing access to the required resources.

No need for the application to embed or store AWS credentials locally on the device and it gives users a seamless experience across all mobile devices.
![image](/assets/images/cloud/4179/cognito-use-case.png)
### 7.4 Cognito User Pools
User Pools are user directories used to manage sign-up and sign-in functionality for mobile and web applications. Users can sign-in directly to the User Pool, or using Facebook, Amazon, or Google. Cognito acts as an Identity Broker between the identity provider and AWS. Successful authentication generates a JSON Web token (JWTs).
### 7.5 Cognito Identity Pools
Identity Pools enable provide temporary AWS credentials to access AWS services like S3 or DynamoDB.

How they work?
![image](/assets/images/cloud/4179/cognito-identity-pools.png)
### 7.6 Cognito Synchronization
Cognito tracks the association between user identity and the various different devices they sign-in from. In order to provide a seamless user experience for your application, Cognito uses Push Synchronization to push updates and synchronize user data across multiple devices. Cognito uses SNS to send a notification to all the devices associated with a given user identity whenever data stored in the cloud changes.

How Synchronization works?
![image](/assets/images/cloud/4179/cognito-sync.png)
### 7.7 Summary
* Federation allows users to authenticate with a Web Identity Provider (Google, Facebook, Amazon)
* The user authenticates first with the Web ID Provider and receives an authentication token, which is exchanged for temporary AWS credentials allowing them to assume an IAM role.
* Cognito is an Identity Broker which handles interaction between your applications and the Web ID provider (You don't need to write your own code to do this.)
* User pool is user based. It handles things like user registration, authentication, and account recovery.
* Identity pools authorize access to your AWS resources.

## 8. References
* [Amazon Elastic Transcoder](https://aws.amazon.com/elastictranscoder/)
* [Amazon Kinesis](https://aws.amazon.com/kinesis/)
* [Amazon Kinesis Data Streams Terminology and Concepts](https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html)
