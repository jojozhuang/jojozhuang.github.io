---
layout: tutorial
key: note
title: "Behavior Questions - Amazon"
index: 9662
subcategory: interview-behavior
date: 2016-03-04
tags: [Behavior, STAR Method]
---

> Behavior Questions

## 1. Questions -> Examples

No. | Questions                    | Examples
----|------------------------------|----------------------------------------
1   | Miss deadline/Tight deadline | [Tax API feature](#31-tax-api-feature), [P1 Performance Issue](#32-p1-performance-issue)
2   | Challenging task/complex problem | [P1 Performance Issue](#32-p1-performance-issue), [GTS China Localization](#33-gts-china-localization), [Course player](#34-course-player)
3   | Most interesting project/brand-new technique | [Course player](#34-course-player)
4   | Disagree with your manager   | [Email Attachment](#36-email-attachment)
5   | Conflict with your teammates | [Accounting Determination Rules](#38-accounting-determination-rules)
6   | Act as leader                | [GTS China Localization](#33-gts-china-localization), [Online Video Sharing](#35-online-video-sharing)
7   | A good team player           | [Search Customization](#310-search-customization)
8   | Help teammates               | [Accounting Defaulting](#37-accounting-defaulting)
9   | Customer                     | [JPMC Data Fix](#39-jpmc-data-fix), [Accounting Determination Rules](#38-accounting-determination-rules)
10  | Second chance to improve     | [Online Video Sharing](#35-online-video-sharing), [Email Attachment](#36-email-attachment), [Tax API feature](#31-tax-api-feature)
11  | Biggest mistake              | Data corruption on IR because of Data Fix

## 2. Examples -> Questions

No. | Examples                                                             | Questions
----|----------------------------------------------------------------------|----------------------------------------
1   | [Tax API feature](#31-tax-api-feature)                               | Miss deadline/Tight deadline/Second chance to improve
2   | [P1 Performance Issue](#32-p1-performance-issue)                     | Complex/Challenging/Dive deeper
3   | [GTS China Localization](#33-gts-china-localization)                 | Act as leader, Challenging task.
4   | [Course player(DePaul)](#34-course-player)                           | Interesting project/brand-new technique
5   | [Online Video Sharing(DePaul)](#35-online-video-sharing)             | Second chance to improve/Act as leader
6   | [Email Attachment](#36-email-attachment)                             | Disagree with manager
7   | [Accounting Defaulting](#37-accounting-defaulting)                   | Team player/help teammate   
8   | [Accounting Determination Rules](#38-accounting-determination-rules) | Conflict with your teammates
9   | [JPMC Data Fix](#39-jpmc-data-fix)                                   | Challenging task
10  | [Search Customization](#310-search-customization)                    | Team player

## 3. Example Details
### 3.1 Tax API Feature
For questions like, Miss deadline? Tight deadline? System integration?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | Previously, Ariba Buyer developed its own tax engine to calculate the tax on invoice. ***Background of tax/commodity code/ship to, etc.*** We call it native tax engine. All master data for tax calculation need to be maintained in Ariba Buyer. The more customers we have, the more challenges we have to face. We introduced the third-party tax provider to help us on the tax calculation. ***Background of external tax engine.*** Call tax API(SOAP, Web Service) to get the tax. **Miss deadline because of P1 issue.**
Task      | Figure out how the native tax engine works. Analyze the changes required for the new tax API. ***Automatic call, manual call.***
Action    | Discussed with Product Manager and partner(Tax Provider) to see what information is required for tax api to calculate tax. Analyze the gap, to se what needs to be enhanced. ***Functionalities, exception handling, retry mechanism, etc.***
Result    | Finished all of the functional modules, make sure the main process flow is working properly. Feature toggle, parameter control. **Monthly release vs Weekly release**, error message, logging, Junit, etc can be postponed to weekly release.

Second chance to improve?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | See above ***Background of tax api.*** **Native Tax Engine vs External Tax API**. `Issues`: 1.Error message is not clear to end user, whether the error happened at Ariba side or tax api side. 2. Connection is not stable, delay or no response. 3. Data is lost at messaging layer.
Task      | Refine description of error. Error tolerance design.
Action    | Add prefix to the error message to indicate where the error happens. Add retry mechanism. Save soap request and response to database, not only to file system.
Result    |

### 3.2 P1 Performance Issue
For questions like, Challenging task? Complex problem?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | A customer reported a P1 performance issue(**Custom field**). The issue is that the end user has to wait for 2 or 3 minutes after submitting the invoice. Normally, it only takes few seconds. The customer can hardly use the system. The issue couldn’t be reproduced locally. ***Background of customization/customized field, etc.*** After analyzing the logs, I identify the bottle neck, getInvalidFields method, validation before submission. However, I couldn’t find out which field caused this issue from the existing log.  
Task      | Identify the root cause, provide the solution to solve the performance issue.  
Action    | I added new logging function(summary and detail level) to track how much time is spent during validation. I used **Splunk** to search these logs from production environment. Export to csv file and filter, clear the data, sort them by time in descending order. Finally, found the root cause. The customer configured two custom fields at invoice line level. ***Background of header level/line level, etc.*** But actually, they should be defined at header level according to their business logic.  
Result    | Suggest the customer to move these two custom fields to header level and the problem is solved.

### 3.3 GTS China Localization
For questions like, Act as leader? Challenging task?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | Acted as team architect to lead the development team. Worked on the localization for SAP GTS. ***Background of GTS, Import, Export, Compliance management, Customs management, etc.*** The localization is specifically for **Processing Trade** in China. Run the project in scrum mode.
Task      | One challenge was I need to take training from German colleague in the morning and gave the same training to other team members in the afternoon. Another challenge, I have to learn some business knowledge about global trade, import, export.
Action    | Took the training from Principle Engineer, repeated the stories to my team members. Wrote the knowledge training document to summarize what’ve learned, collected questions. Visited customer with product manager to collect requirements. Took notes, went through the procedure with teammates, brain storming, **Gap Analysis**, decide development task, prioritize them, make plan, **high level and detailed design**. Assign task, implementation, **confirm with customer with POC**. Keep continuous improvement.
Result    | Finished the development before the deadline. Learned how to collect requirements, prioritize them and make decision, how to plan, how to design. Wrote many documents, which is helpful for new enhancement and maintenance.

### 3.4 Course Player
For questions like, Most interesting project? Brand-new technique?

 Section  | Description
----------|------------------------------------------------------------------------------------------
Situation | ***DePaul course online system, etc.*** The students uses web browser, mobile apps to watch recordings. **Course Player=Video+Screenshot+Whiteboard**. For development team, the challenge is how to maintain these players developed with different tech stacks. Redundant codes for same function.
Task      | Investigate **cross-platform mobile app solutions**, **Xamarin, PhoneGap(Cordova) and HTML5 Canvas**, compare them with `native` development. Build prototypes to evaluate the feasibility of building cross-platform mobile app with one single technique. Estimate development and maintenance cost.
Action    | Read source code(Objective C) of existing iOS app. Took training of these new technologies through internet, online courses. Designed and built 3 prototypes with **Xamarin(iOS+Android), PhoneGap(Cordova), HTML5(WebSocket, React, Node.js)**. Complete the investigation report with the pros and cons of each approach.
Result    | Finished the task successfully within 6 weeks. Demonstrate the prototypes and share the investigation result to director and other team members. This research report has a significant influence on the director's final decision.

* [Xamarin Research Document]({% link /assets/docs/xamarin_research.pdf %})

 Feature | Native | Xamarin
-----------|------------------------|------------------------------------------------------------------
Development Community|Matured mobile platform with plenty of materials/documents.|Lack of resources, like, books, third-party libraries, etc.
Features/Functionalities|Can get the entire features/functionalities provided by the SDK.|Some of the native features are not supported very well(eg. Auto layout).
Third-Party Library|Fully supported|Needs some extra effort to achieve the same purpose.
Coding|Pure native codes|Hybrid of Mono, iOS and Android
Debugging|Comfortable with Xcode, Android Studio|Comfortable with Visual Studio
Deployment|Standard procedure|A little more extra work required.
Extendibility|Easy to add new features|In most cases, it is possible to add new feature, but need do some researching work first.
`Reusable`|Low|High, if more platforms are required. Besides, the shared library can be enhanced to support web application.
`Effort in Development phase`|High|Low, if more platforms are required
`Effort in maintenance phase`|High|Low, especially when the bug is not relevant with UI.
Required Developers|2 (1 for iOS, 1 for Android)|3 (1 for Xamarin shared library, 1 for iOS UI, 1 for Android UI)
Developer’s Qualification|Platform specified knowledge|Cross-platform knowledge, Xamarin platform, plus C#, Mono
License Fee(Per Year)|iOS $99; Android free|iOS developer account $99; Xamarin iOS: $999; Xamarin Android: $999
Potential Risk|None|Uncertainty of Xamarin’s future.

### 3.5 Online Video Sharing
For questions like, improve the project if given a second chance? Act as leader/key person?

 Section  | Description
----------|------------------------------------------------------------------------------------------
Situation | ***Background DePaul, CDM and Game Programming, etc.*** Teachers who teach **game programming and digital media** need an online application to share videos. **share level: public, internal, private(copy right)**. Teachers share video in a class or self defined group, students who receive the link can view the video. **Video Sharing Website=React + RESTful API(ASP.NET MVC - Web API)**. Two developers, I was responsible for the entire framework and the backend.
Task      | Function Design, Database Design, Implementation with C# for RESTful API.
Action    | Visited the director and some teachers to collect requirements. Design some main functions - login, upload, delete video, play, create topic, share topic. Design database - roles, users, permissions, courses, videos, topics. Create prototype with another developer. Demonstrated the POC to teachers to collect feedbacks for improvement, eg. **Copy from previous semester, expiration date, UI**.
Result    | Completed the design and implemented the POC. Redefine some functions. **Why second chance?** Implement it with the concept of cloud computing, develop a **cloud-based application**. Object storage for video, metadata storage for database, load balancing for web server(API), CDN, CI/CD, Scale, etc. AWS, including `S3 bucket, CloudFront, Elastic Transcoder(Convert Formats), RTMP for Media Streaming`(replace JW player streaming server).


### 3.6 Email Attachment
For questions like, disagree with manager?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | In Ariba Buyer system, we have a feature called **email notification**. It sends out emails to stakeholders if invoice is created or updated. Customer requests to include attachments in the email. I planned to let the end user decide whether to receive attachments. But my manager wanted to enable this feature for all users, so they can receive attachments without changing their **notification preferences**. I was worried about the network traffic and the performance impact to mail server, since **attachments have much larger size than simple plaint texts**. More network bandwidth is required to transfer these attachments.
Task      | Enable the attachment feature without overloading the mail server.
Actions   | I investigated the performance locally and contacted the Ops team to confirm if any customer reported similar issue for email notification. And ops mentioned it did happened previously. Some emails are stuck in the mail server, and users have to wait for a longer time to receive the email notifications. The Ops team has to add more servers to handle this issue.
Result    | I reported my findings to my manager and she agreed to not activate the feature by default and add parameter to safeguard it. If performance issue occurs, we can turn off this **feature or parameter**. No issue has been reported since this feature was released.

Second chance to improve? Monolithic architecture vs Micro-services architecture.

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | See above ***Background of Email Notification and Email Attachment.***. `Issues`: 1.A monolith system is often deployed all at once, both frontend and backend code together, regardless of what is changed. 2. Not easy to scale. 3. Impact the performance of main function. 4. Maintained by different team.
Task      | Convert Monolithic architecture vs Micro-services architecture.
Action    | Create RFC or RESTful services, MessageQueue, Load balancing, CI/CD, etc.
Result    |

### 3.7 Accounting Defaulting
For questions like, helped other teammates?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | There are many **accounting defaulting** issues in our JIRA queue. This is because of the complex business logic and the triggers in our system. ***Introduction of triggers…*** The difficulty is that the value of field is updated for several times in a single event. I had worked on several issues before. But my colleague didn’t have much experience with it.
Task      | Mentor him to figure out the root cause and provide a proper fix without causing regression.
Actions   | Introduced what is accounting defaulting and how it works, **scenarios, CEME master data, parameters, etc**. Shared my experience, the issues I worked before and how I solved them. Best practice, where is the entry points and where to set breakpoint. Find a proper case and compare it with the broken one to find the difference. Teach but not give the answer – do it yourself. Compare logs.
Result    | He analyzed and reproduced the issue locally. Then figured out the root cause by himself. After discussing with me about his findings, finally he came up with a solution.

### 3.8 Accounting Determination Rules
For questions like, conflicts with your teammates? Customer Obsession?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | ***Background of Accounting Defaulting Accounting Determination Rules(ADR), limitation of ADR.*** There was a time that I had a debate with our support colleague about **Enhancement or Bug**. The support team reported a Go Live Block issue on the behalf of customer. Some accounting fields are not defaulted correctly from PO. After investigating, I found it is not a bug, instead, it should be a function gap. We should treat it as new feature and follow the enhancement process. We should not follow the maintenance process, as we need more time to make it work. But the support didn’t agree, he mentioned that the deadline for go live is approaching, the customer cannot wait.
Task      | Solve the issue regardless it’s a bug or an enhancement.
Action    | After discussing with the support and confirmed with my manager, I agreed to enhance the ADR feature and fix the issue. The support also agreed to follow the enhancement process later and submit the enhancement request.
Result    | Provided a fix to solve the customer issue. Followed the enhancement process afterwards. In any situation, we should always keep commitment to our customer.

### 3.9 JPMC Data Fix
For questions like, tough issue?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | ***Background: Use Javascript to fix data in production.*** Sometimes in production, the data on invoice or payment documents is incorrect because of code bugs, wrong configuration, mis-operations by users. In this case, we need to correct them. But we can’t modify them directly at database level. We need to add audit log to record this change. Some changes are complex not only one field. Can’t restart server with deploying new java codes. Instead, use javascript(**Rihno**) to call native java code. I worked on a very tough customer ticket for **2 weeks, 16 hours every day**. There are lots of data issues in this customer’s system. At very beginning, this customer reported that the **Purchase Unit is not defaulted** correctly on invoice for some company codes.
Task      | Fix all data issues reported by customer.
Action    | Quickly fixed the reported issue with **DF script**, but customer returned back and reported more other data issues. Created more DF scripts to fix all the these issues. Followed the internal workflow, cooperated with support and ops team to find the issue and deliver DF fix. Created **RCA(root cause analysis)** tickets for each issue.
Result    | After providing over 10 scripts, all data issues are fixed. Finally, created a generic **DF javascript template** for data fix, including **exception handling, delay, retry, batch commit**. It reduces the development cost and the review effort, saves time for both supports and devs. Improve the team’s productivity. Escalate the issue to manager team, the consultant team should test thoroughly for each function before go-live.

### 3.10 Search Customization
For questions like, you are a good team player?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | ***Background: How to search code with Opengrok, difficulty with searching customization in production.*** We lack of the tools to show us how customers are using our system. Previously, we had ask ops team to manually run some scripts to download customization from production server to local, then we search the keyword in the text file. Whenever some system behaviors are changed, we need to analyze the impact to avoid regression.
Task      | Provide a solution to get latest customization from production environment.
Action    | Run the script to download customization. Import them into **Opengrok**, which is hosted in **Docker**.
Result    | Public the service to all team members. Ask the RC team to automate the whole process.

### 3.11 Data corruption on IR because of Data Fix(TBD)
For questions like, failure? lesson learned?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | ***Background: Use Javascript to fix data in production.*** Sometimes in production, the data on invoice or payment documents is incorrect because of code bugs, wrong configuration, mis-operations by users. In this case, we need to correct them. But we can’t modify them directly at database level. We need to add audit log to record this change. Some changes are complex not only one field. Can’t restart server with deploying new java codes. Instead, use javascript(**Rihno**) to call native java code.
Task      | Working on a data fix to correct accounting values on invoice reconciliation documents.
Action    | Wrong script to cause more errors. The plus “+” character is missing for the where condition. Since there was no warning or compile error in javascript, no way to find this issue. Have to write another script to correct more documents.
Result    | What I learned is to be careful when using javascript for such critical operation. Updated the coding style to remind every developer be aware of this. Added plus character into the check list for code review. Print out the query when testing locally to double check it is correct.

### 3.12 Currency rate issue( short-term value vs long-term value?)
IR gets resubmitted on approval even though no changes are made to the IR
Fix the issue at application level not platform level.  New rate is used when two money objects are added.

Ad hoc plants/ shipto data is created everytime supplier submits Online/ CXML invoice

## 4. Generic BQ
### 4.1 Tell me about yourself.
*	My name is Rong Zhuang. Full-stack developer, over 10 years’ experience of software development, currently working at SAP Ariba in Palo Alto, California. Our company has its own cloud platform, which supports suppliers and buyers to sell and purchase goods globally. Our team is responsible for the core invoicing function of Procure-to-Pay system. We use linux, java, github and some web technologies.
*	Before coming to the US, I have 10 years’ software development experience in China. I worked at Infosys for 2 years and at SAP for 5 years. I have the bachelor’s degree of computer science and I got my master degree of computer science from DePaul University in Chicago in 2016.
*	I’m familiar with the entire Software Development Life Cycle, including requirement collection, design, coding, testing, deployment, etc. I participated many development projects and built up several applications with different technologies on different platforms, like Java, Node.js, .NET and SAP. I’m a big fan of open source and proficient in web development. I have hands-on experience of many javascript frameworks, like react, angular, node.js. I’m familiar with both front-end and back-end development.

### 4.2	What are your strengths and weaknesses?
**Strength:**
*	Know lots of different technologies with hands-on experience, always have big picture.
*	Strong passion for learning new technologies, fast learner.
*	Work independently, good at quick prototyping.
*	Good at documentation, willing to share knowledge/experience/ideas with others.
*	Be passionate about software development.

**Weakness:**  
* Dive deep too early. Sometimes I spend too much effort on the details at the beginning. For example, in the real world, it’s not possible to get all detailed requirements for a new feature. Lack of requirement or changing requirement is very common.
* Improvement: Now, I learn to finish the high-level design first, then move on to the brief detailed design. Meanwhile, I start working on a prototype with core functions, so that I can demonstrate it to others for further discussion. POC(Prove of Concept) is good at avoiding ambiguity.

### 4.3	What are you looking for in this new job?
I have always been concerned about cloud services, cross-platform solutions and front-end technologies, Big data and AI. I keep learning and practice these knowledges. I’m looking for a position where I can grow and continue to exercise those skills. I’m always very motivated by being able to see the impact of my work on other people.
### 4.4	Why Amazon? Why are you planning to leave the current position?
Two aspects.
* First of all, from company perspective, Amazon is one of the most famous tech giants. It’s the world’s largest online retailing and clouding service company with a strong focus on customer experience. I really believe the vision that making Amazon the Earth’s most customer-centric company more than anyone and I wanted to be a part of it. This is the reason and motivation driving me to join Amazon. Besides, hundreds of thousands of talented engineers are working passionately here, building innovative and large-scale system. Therefore, this is a place where I can learn a lot, and use my skills and experience to bring value to Amazon.
* From my personal perspective, I am interested in developing new large-scaling applications. There are many opportunities in Amazon and I would be excited to work on the challenging tasks. It’s attractive to me that people in Amazon can have the opportunity to impact millions and billions global users. I’d like to be one of them. This is a great place for me to work and to grow. I am passionate about new technologies. Even though I have over 10 years development experience, I still keep learning and practicing new knowledge. I believe my experience and skills will benefit your team.

### 4.5 What are the fields you are interested in?
Big Data, AI, Cloud service.

Matrix

Common questions | Cross-platform mobile | GTS China Location | JPMC Data Fix
-----------------|-----------------------|--------------------|-------------------------------------
Most Challenging | Totally new to mobile development | Need to learn lots of business knowledge, Arch, lead team | Limited time, tough issue.
What You Learned | iOS, Andriod, phoneGap, Xamarin | General import and export process in EU and China, how to enhance an existing system. Evaluate tasks, assign to team mates, control deadline. | How to fix data for a running application.
Most Interesting | phoneGap and Xamarin | Developer is not only a tech geek, but also need to know business. | Data fix template
Hardest Bug  | Limitation of phoneGap | complicated business logic and code implementation | Unexpected error
Enjoyed Most | Learned many ways to develop mobile app |Learn customers how use our product. | Learn how to call java with javascript.
Conflicts with Teammates | aaa | I did the work for another developer.

## 5. Amazon Leadership Principles

 No | Leadership Principles                | Description
----|--------------------------------------|-------------------------------------------
1   |`Customer Obsession`                  | Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust. Although leaders pay attention to competitors, they obsess over customers.
2   |`Ownership`                           | Leaders are owners. They think long term and don’t sacrifice long-term value for short-term results. They act on behalf of the entire company, beyond just their own team. They never say “that’s not my job".
3   | `Invent and Simplify`                | Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere, and are not limited by “not invented here". As we do new things, we accept that we may be misunderstood for long periods of time.
4   | `Are right, A Lot`                   | Leaders are right a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.
5   | `Learn and Be Curious`               | Leaders are never done learning and always seek to improve themselves. They are curious about new possibilities and act to explore them.
6   | `Hire and Develop the Best`          | Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent, and willingly move them throughout the organization. Leaders develop leaders and take seriously their role in coaching others. We work on behalf of our people to invent mechanisms for development like Career Choice.
7   | `Insist on the Highest Standards`    | Leaders have relentlessly high standards - many people may think these standards are unreasonably high. Leaders are continually raising the bar and driving their teams to deliver high quality products, services and processes. Leaders ensure that defects do not get sent down the line and that problems are fixed so they stay fixed.
8   | `Think Big`                          | Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction that inspires results. They think differently and look around corners for ways to serve customers.
9   | `Bias for Action`                    | Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking.
10  | `Frugality`                          | Accomplish more with less. Constraints breed resourcefulness, self-sufficiency and invention. There are no extra points for growing headcount, budget size or fixed expense.
11  | `Earn Trust`                         | Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical, even when doing so is awkward or embarrassing. Leaders do not believe their or their team’s body odor smells of perfume. They benchmark themselves and their teams against the best.
12  | `Dive Deep`                          | Leaders operate at all levels, stay connected to the details, audit frequently, and are skeptical when metrics and anecdote differ. No task is beneath them.
13  | `Have Backbone; Disagree and Commit` | Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Leaders have conviction and are tenacious. They do not compromise for the sake of social cohesion. Once a decision is determined, they commit wholly.
14  | `Deliver Results`                    | Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion. Despite setbacks, they rise to the occasion and never settle.

Short Version.

 No. | Leadership Principles              | Key Points
-----|------------------------------------|--------------------------
1    | customer obsession                 | 注重用户体验，围绕用户需求设计/实现产品
2    | ownership                          | 对每个project要负责，考虑长远，每个任务不仅仅是任务，更是职业. 从公司角度来说，没有什么这个组那个组，可以做啥
3    | invent and simplify                | 总是想新的方法来结局问题，不满足于现有的解决方案（有时候新的方法会受到长期的误解）
4    | are right, a lot                   | Leader总是从不同思路去想，选一个最好的=> 经常是对的
5    | learn and be curious               | 喜欢不断学习，追求提高自我
6    | hire and develop the best:         | 愿意帮助（优秀的）同事
7    | insist on the highest standards    | 坚持高标准，保质量的解决办法，并追求及时解决问题，不拖拉
8    | think big                          | 目标要定得高/广泛寻求为客户服务的方式
9    | bias for action                    | 尽快行动的同时，分析/规避风险 快很重要
10   | frugality                          | 以有限的资源完成更多的事情，不盲目增加成本
11   | earn trust                         | 总是以高标准要求自己和团队，自己的错误敢于担当 => 赢得manager/同事/客户的的信任
12   | dive deep                          | 注意所有层次细节，根据metric给出正确feedback
13   | have backbone, disagree and commit | 有义务表达自己的意见，一旦大家作出决定，就要全身心的致力于实现目标(commit)
14   | deliver results                    | 按时完成任务，注意deadline; 对于关键的point要（更）right quality, time平衡，遇到困难，要尽量高输出

## 6. This Position
Job Description: How to create Big Data environments, work with Amazon DynamoDB, Amazon Redshift, Amazon QuickSight, Amazon Athena, and Amazon Kinesis, and leverage best practices to design Big Data environments for security and cost-effectiveness, see https://aws.amazon.com/training/course-descriptions/bigdata/.

Amazon EMR is a service that uses Apache Spark and Hadoop, open-source frameworks, to quickly & cost-effectively process and analyze vast amounts of data.
* https://aws.amazon.com/emr/
* https://aws.amazon.com/products/
* https://aws.amazon.com/codedeploy/
* https://aws.amazon.com/codepipeline/

1)	Technologies (Cache, MessageQueue, Container, etc)
2)	Products on the market, (Redis, Kafka, Docker, etc)
3)	How to setup dev, testing, production on cloud

## 7. Q&A:
* Which team are you working in? Main tasks? Development/Deployment/DevOps?
* Tech stack?
* What is the biggest challenge?
* Working style, scrum, communication, stakeholder
* Career path, architect? manager?
* Can I have a mentor at any time?
* What technologies are heavily used?
* What tools are self developed?
*	What do you do in the work day?

## 8. Other BQs
* Tell me about a time when you were faced with a problem that had a number of possible solutions. What was the problem and how did you determine the course of action? What was the outcome of that choice?  
**Video sharing (Node.js, Springboot, ASP.net MVC).**
* When did you take a risk, make a mistake, or fail? How did you respond, and how did you grow from that experience?  
**Tax API, integration issues. Provide fix and release with hotfix. Never trust the external system, error handling as more as possible.**
* Describe a time you took the lead on a project.
**GTS china localization. Online Video sharing.**
* What did you do when you needed to motivate a group of individuals or promote collaboration on a particular project?
**Act as leader, not boss. Work at the frontline. Take the hardest tasks**
* How have you leveraged data to develop a strategy?

## 9. System Design
### 9.1 Elevator
### 9.2 Find Command/File System
```java
class File {
    String name = "";
    boolean isFile = false;
    HashMap<String, File> files = new HashMap<>();
    String content = "";
}
```
* [Design In-Memory File System](https://leetcode.com/articles/design-in-memory-file-system/)
* [Amazon Onsite - Linux Find Command](https://leetcode.com/discuss/interview-question/369272/Amazon-or-Onsite-or-Linux-Find-Command)

### 9.3 Email Notification System
MessageQueue, Decouple,
AWS SQS(Simple Queue Service):
* Standard Queues - a messsage is delivered at least once. Occasionally more than one copy of message might be delivered out of order.
* FIFO Queues - FIFO delivery and exactly-once processing.

AWS SNS(Simple Notification Service):
* Provides `topic`s for high-throughput, push-based, many-to-many messaging
* Send to Amazon SQS queues, AWS Lambda functions, any `HTTP endpoint`.
* Send notifications to end users using mobile push, `SMS`(text message and email).

SQS vs SNS:
* SNS - Push
* SQS - Poll

## 9. Referennces
* [Leadership Principles](https://www.amazon.jobs/en/principles)
* [Software development topics](https://www.amazon.jobs/en/landing_pages/in-software-development-topics)
* [In-person interview](https://www.amazon.jobs/en/landing_pages/in-person-interview)
* [Navbar hides initial content when jumping to in-page anchor](https://github.com/twbs/bootstrap/issues/1768)
