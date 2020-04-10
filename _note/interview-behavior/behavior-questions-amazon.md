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

No. | Questions       | Examples
----|-----------------|----------------------------------------
1   | Tight deadline  | [Tax API feature](#31-tax-api-feature) vs P1 performance issue
2   | Biggest mistake  | Data corruption on IR because of Data Fix
3   | Challenging task/complex problem | P1 Performance issue/GTS china localization/Course player
4   | Most interesting project/brand-new technique | Course player(React + Socket.io), html5 canvas
4   | Help teammates              | Accounting defaulting function issue  
5   | Disagree with your manager  | Email attachment feature
6   | Conflict with your teammates  |  Enhancement or Bug
7   | Second chance to improve  | Tax API (ambiguous error message, retry mechanism)
8   | a good team player  |  Opengrok for code and customization
9   | Act as leader  |  GTS china localization
10  | Customer  | JPMC Year-end accounting Data Fix

## 2. Examples -> Questions

No. | Examples                  | Questions
----|---------------------------|----------------------------------------
1   | Tax API feature           | Tight deadline/Second chance to improve(ambiguous error message, retry mechanism)
2   | Email attachment feature  | Disagree with manager
3   | P1 Performance issue(Custom field) | Complex problem/Performance issue/Challenging issue
4   | GTS china localization    | Challenging task  |  
5   | Course player             | Interesting project/brand-new technique
6   | JPMC Year-end accounting Data Fix  | Challenging task
4   | Accounting defaulting function issue           | Team player/help teammate   
6   | Enhancement or Bug  |  Conflict with your teammates
8   | Opengrok for code and customization  |  team sprit
2   | Biggest mistake  | Data corruption on IR because of Data Fix
10  |   |  

## 3. Example Details
### 3.1 Tax API Feature(Ariba)
For questions like, System integration? Tight deadline?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | Previously, Ariba Buyer developed its own tax engine to calculate the tax on invoice. ***Background of tax/commodity code/ship to, etc.*** We call it native tax engine. All master data for tax calculation need to be maintained in Ariba Buyer. The more customers we have, the more challenges we have to face. We introduced the third-party tax provider to help us on the tax calculation. ***Background of external tax engine.*** Call tax API to get the tax.
Task      | Figure out how the native tax engine works. Analyze the changes required for the new tax API. ***Automatic call, manual call.***
Action    | Discussed with Product Manager and partner(Tax Provider) to see what information is required for tax api to calculate tax. ***Functionalities, error message, exception handling, retry mechanism, logging, Junit etc.***
Result    | Finished all of the functions, the main process flow is completed. Feature toggle, parameter control.

### 3.2 P1 Performance Issue(Custom Field)
For questions like, Challenging task? Complex problem?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | A customer reported a P1 performance issue(Custom field). The issue is that the end user has to wait for 2 or 3 minutes after submitting the invoice. Normally, it only takes few seconds. The customer can hardly use the system. The issue couldn’t be reproduced locally. ***Background of customization/customized field, etc.*** After analyzing the logs, I identify the bottle neck, getInvalidFields method, validation before submission. However, I couldn’t find out which field caused this issue from the existing log.  
Task      | Identify the root cause, provide the solution to solve the performance issue.  
Action    | I added new logging function(summary and detail level) to track how much time is spent during validation. I used **Splunk** to search these logs from production environment. Export to csv file and filter, clear the data, sort them by time in descending order. Finally, found the root cause. The customer configured two custom fields at invoice line level. ***Background of header level/line level, etc.*** But actually, they should be defined at header level according to their business logic.  
Result    | Suggest the customer to move these two custom fields to header level and the problem is solved.

### 3.3 GTS Localization for China
For questions like, Act as leader? Challenging task?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | Acted as team architect to lead the development team. Worked on the localization for SAP GTS. ***Background of GTS, Import, Export, Compliance management, Customs management, etc.*** The localization is specifically for **Processing Trade** in China. Run the project in scrum mode.
Task      | One challenge was I need to take training from German colleague in the morning and gave the same training to other team members in the afternoon. Another challenge, I have to learn some business knowledge about global trade, import, export.
Action    | Took the training from Principle Engineer, repeated the stories to my team members. Wrote the knowledge training document to summarize what’ve learned, collected questions. Visited customer with product manager to collect requirements. Took notes, went through the procedure with teammates, brain storming, **Gap Analysis**, decide development task, prioritize them, make plan, **high level and detailed design**. Assign task, implementation, **confirm with customer with POC**. Keep continuous improvement.
Result    | Finished the development before the deadline. Learned how to collect requirements, prioritize them and make decision, how to plan, how to design. Wrote many documents, which is helpful for new enhancement and maintenance.

### 3.4 Cross-platform Course Player
For questions like, Most interesting project? Brand-new technique?

Cross-platform mobile solution, Xamarin + PhoneGap + Html5

 Section  | Description
----------|------------------------------------------------------------------------------------------
Situation | ***DePaul course online system, etc.*** The students uses web browser, mobile apps to watch recordings. For development team, the challenge is how to maintain these players developed with different tech stack.
Task      | Investigate cross-platform mobile app solutions. Get the overview about these new technologies, development and maintenance costs. Demonstration of the investigation result.
Action    | Learn mobile development through internet, online courses. Designed and built 3 prototypes with **HTML5, PhoneGap and Xamarin**. Evaluated the feasibility of cross-platform mobile app development, wrote the investigation report with detailing the pros and cons of each approach.
Result    | Finish the task in 6 weeks. Demonstrate the prototypes and share the investigation result to director and other team members.

### 3.5 Email attachment feature at Ariba
For questions like, disagree with manager?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | In Ariba Buyer system, we have a feature called email notification. It sends out emails to stakeholders if invoice is created or updated. I worked on the new feature which enables system to include attachments in the email. I planned to let the end user decide whether to receive attachments. But my manager wanted to enable this feature by default, so user can receive attachments without changing their preferences. I was worried about the network traffic and the performance impact to mail server, since attachments have much larger size than simple plaint text emails. More network bandwidth is required to transfer these attachments.
Task      | Enable the attachment feature without overloading the mail server.
Actions   | I investigated the performance locally and contacted the Ops team to confirm if any customer reported similar issue when using our cloud applications. And ops mentioned that there is such issue previously. Many emails are stuck in the mail server, and they have to add more servers to handle emails.
Result    | I reported my findings to my manager and she agreed to not activate the feature by default and add feature toggle to safeguard it. If performance issue occurs, we can turn off this feature. No issue reported after this feature is released.

### 3.6 Accounting defaulting function issue, Trigger Problems.
For questions like, helped other teammates?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | There are many accounting defaulting issues in our JIRA queue. This is because of the complex business logic and the triggers in our system. Introduction of triggers… The difficulty is that the value of field is updated for several times in a single event. I had worked on several issues before. But my colleague didn’t have much experience about it.
Task      | Mentor him to figure out the root cause and provide a proper fix without cauing regression.
Actions   | Introduced what is accounting defaulting and how it works, scenarios, relevant master data, parameters, etc. Shared my experience, the issues I worked before and how I solved them. Best practice, where is the entry points and where to set breakpoint. Find a proper case and compare it with the broken one to find the difference. Teach but not give the answer – do it yourself. Compare logs.
Result    | He analyzed and reproduced the issue locally. Then figured out the root cause by himself. After discussing with me about his findings, finally he came up a solution.

### 3.7 JPMC Year-end accounting Data Fix
For questions like, tough customer?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | I worked on a very tough customer ticket for 2 weeks, 16 hours every day. There are lots of data issues in this customer’s system.
Task      | Fix data issues.
Action    | Created several specific DF scripts to fix all the blocking issues. After providing over 10 scripts to fix all the issues for this customer, remove the Go live block. Misconfiguration.
Result    | Finally, created a generic javascript template for data fix. It reduces the development cost and the review effort, saves time for both supports and devs. Improve the team’s productivity. Escalate the issue to manager team, the consultant team and implementation should test thoroughly for each function.

### 3.8 Trigger Tax API Call for BP - Enhancement or Bug
For questions like, conflicts with your teammates, tough customer?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | There was a time that I had a debate with our support colleague. The support team reported a Go Live Block issue on the behalf of customer. After investigating, I found it is not a bug, instead, it should be a function gap. We should treat it as new feature and follow the enhancement process. We should not follow the maintenance process, as we need more time to make it work. But the support didn’t agree, he mentioned that the deadline for go live is approaching, the customer cannot wait.
Task      | Solve the issue regardless it’s a bug or an enhancement.
Action    | After discussing with the support and confirmed with my manager, I agreed to fix the issue first. The support also agreed to follow the enhancement process later and submit all required documents.
Result    | Provide a fix to solve the customer issue. Followed the enhancement proces afterwards. In any situation, we should always keep commitment to our customer.

### 3.9 Data corruption on IR because of Data Fix
For questions like, failure? lesson learned?

Section   | Description
----------|------------------------------------------------------------------------------------------
Situation | ***Background: Use Javascript to fix data in production.*** Sometimes in production, the data on invoice or payment documents is incorrect because of code bugs, wrong configuration, mis-operations by users. In this case, we need to correct them. But we can’t modify them directly at database level. We need to add audit log to record this change. Some changes are complex not only one field. Can’t restart server with deploying new java codes. Instead, use javascript(**Rihno**) to call native java code.
Task      | Working on a data fix to correct accounting values on invoice reconciliation documents.
Action    | Wrong script to cause more errors. The plus “+” character is missing for the where condition. Since there was no warning or compile error in javascript, no way to find this issue. Have to write another script to correct more documents.
Result    | What I learned is to be careful when using javascript for such critical operation. Updated the coding style to remind every developer be aware of this. Added plus character into the check list for code review. Print out the query when testing locally to double check it is correct.

### 3.10 Tax API(second chance to improve?)
For the tax api feature, customers are not using it. We received some issues from them.
•	Error message is not clear, happened at buyer or tax provider side?
•	Connection is not stable. Invoice was created with error. It has to be fixed manually.
•	Data is lost at messaging layer.

Solutions:
•	Add prefix to the error message to indicate who is responsible for the error.
•	Add retry mechanism.
•	Save logs to database, not only to file system.

### 3.11 Opengrok(Tell me a time when you were a good team player?)
Build tools: Opengrok for searching parameter and customizations.
Javascript template for DF to improve productivity.
I joined almost all of the code review. Discuss the code logic and impact to the existing system. Share my opinion and suggestions. For me, I also learned a lot.

### 3.12 Currency rate issue( short-term value vs long-term value?)
Fix the issue at application level not platform level.  New rate is used when two money objects are added.

## 4. Generic BQ
### 4.1 Tell me about yourself.
*	My name is Rong Zhuang. Full-stack developer, over 10 years’ experience of software development, currently working at SAP Ariba in Palo Alto, California. Our company has its own cloud platform, which supports suppliers and buyers to sell and purchase goods globally. Our team is responsible for the core invoicing function of Procure-to-Pay system. We use linux, java, github and some web technologies.
*	Before coming to the US, I have 10 years’ software development experience in China. I worked at Infosys for 2 years and at SAP for 5 years. I have the bachelor’s degree of computer science and I got my master degree of computer science from DePaul University in Chicago in 2016.
*	I’m familiar with the entire Software Development Life Cycle, including requirement collection, design, coding, testing, deployment, etc. I participated many development projects and built up several applications with different technologies on different platforms, like Java, Node.js, .NET and SAP. I’m a big fan of open source and proficient in web development. I have hands-on experience of many javascript frameworks, like react, angular, node.js. I’m familiar with both front-end and back-end development. I’m interested in developing new applications with popular open source tools and frameworks.

### 4.2	What are your strengths and weaknesses?
Strength:
*	Know lots of different technologies with hands-on experience, always have big picture.
*	Strong passion for learning new technologies, fast learner.
*	Work independently, good at quick prototyping.
*	Good at documentation, willing to share knowledge/experience/ideas with others.
*	Be passionate about software development.

Weakness: I like perfection and always want to make my work perfect. Sometimes I spend too much effort on the details at the beginning. For example, in the real world, it’s not possible to get all detailed requirements for a new feature. Lack of requirement or changing requirement is very normal. Improvement - Now, I learn to finish the high-level design first, then move on to the brief detailed design. Meanwhile, I start working on a prototype with core functions, so that I can demonstrate it to others for further discussion. Prototype is good at avoiding ambiguity.
### 4.3	What are you looking for in this new job?
I have always been concerned about cloud services, cross-platform solutions and front-end technologies, Big data and AI. I keep learning and practice these knowledges. I’m looking for a position where I can grow and continue to exercise those skills. I’m always very motivated by being able to see the impact of my work on other people.
### 4.4	Why Amazon? Why are you planning to leave the current position?
Two aspects.
* First of all, from company perspective, Facebook is one of the most famous tech giants. It’s the world’s largest social networking site. It has huge number of users and Facebook reduce the distance between people. Facebook has engineer culture. Every employee can have a mentor at any time to have a chance to know different people, to learn different culture and knowledges. Employee can switch to another team through the Hack-A-Month program. So there is no worry for employee to grow.
* From my perspective, I like programming, especially for new features. However, my current position has not many opportunities. Meanwhile, I want to learn more techniques and skills. I would be excited to work on the challenging tasks. I’m always very motivated by being able to see the impact of my work on other people. It’s attractive to me that people in Facebook can have the opportunity to impact millions and billions global users. I’d like to be one of them.

•	Firstly, Amazon is a top internet retailing and clouding service company with a strong focus on customer experience. I really believe the vision that making Amazon the Earth’s most customer-centric company more than anyone and I wanted to be a part of it. This is the reason and motivation driving me to join Amazon. Besides, hundreds of thousands of talented engineers are working passionately here, building innovative and large-scale system. Therefore, this is a place where I can learn a lot, and use my skills and experience to bring value to Amazon.
•	Secondly, from my personal perspective, I am interested in developing new applications. However, there are not many opportunities for my current position. I’m very interested in this backend engineer position from Wing and I would be very excited to work on these challenging tasks. Being able to see the impact of my work on others always gives me a lot of motivation. I am passionate about new technologies. Even though I have over 10 years development experience, I still keep learning and practicing new knowledge. I believe my experience and skills will benefit your team.
•	Why Google? Why are you planning to leave the current position?
•	From my perspective, I like programming, especially for new features. However, my current position has not many opportunities. Meanwhile, I want to learn more techniques and skills. I would be excited to work on the challenging tasks. I’m always very motivated by being able to see the impact of my work on other people. It’s attractive to me that people in Google can have the opportunity to impact millions and billions global users. I’d like to be one of them.
•	Why Lyft?
•	Lyft is a famous ride-sharing service company. It changes the way how people transport and it helps the city to reduce the number of cars. With fewer cars on the road and less pollution in the air, we have better living environment. What Lyft is doing will have a direct impact on people's lives. Lyft is applying most exciting technologies to improve the transportation experience. This is a great place for me to work and to grow. Meanwhile, I have many years’ experience of software development. I will use my skills and experiences to bring value to Lyft.
•	Why LinkedIn?
•	LinkedIn is the most famous online professional network. It connects the world’s professionals to make them more productive and successful. And it changes companies’ recruiting workflow, simple and efficient. LinkedIn is applying most exciting technologies to improve the job seeking and hiring experience. This is a great place for me to work and to grow. I have many years’ experience of software development. I will use my skills and experiences to bring value to LinkedIn.

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

Tips:
1.	What are you looking for a new job?
Good answer, looking new opportunities to grow, to learn more. Learn about the company first. like your company culture. Never complain your current company, talk about positive things.
Key Points of this question:
a.	how much you know about the company
b.	did you do research
c.	do you have a deep understanding of this position
d.	your goal.
Create a Tracking Sheet.
e.	Check https://techcrunch.com/ to get tech stack of companies.

## 4. Amazon Leadership Principles

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





how to create Big Data environments, work with Amazon DynamoDB, Amazon Redshift, Amazon QuickSight, Amazon Athena, and Amazon Kinesis, and leverage best practices to design Big Data environments for security and cost-effectiveness.
https://aws.amazon.com/training/course-descriptions/bigdata/
Amazon EMR is a service that uses Apache Spark and Hadoop, open-source frameworks, to quickly & cost-effectively process and analyze vast amounts of data.
https://aws.amazon.com/emr/
https://aws.amazon.com/products/
https://aws.amazon.com/codedeploy/
https://aws.amazon.com/codepipeline/
1)	Technologies (Cache, MessageQueue, Container, etc)
2)	Products on the market, (Redis, Kafka, Docker, etc)
3)	How to setup dev, testing, production on cloud
Q&A:
1.	Which team are you working in? Main tasks? Development/Deployment/DevOps?
2.	Tech stack?
3.	What is the biggest challenge?
4.	Working style, scrum, communication, stakeholder
5.	Career path, architect? manager?
6.	Can I have a mentor at any time?
7.	What technologies are heavily used?
8.	What tools are self developed?
9.	What do you do in the work day?
•	Tell me about a time when you were faced with a problem that had a number of possible solutions. What was the problem and how did you determine the course of action? What was the outcome of that choice?
•	When did you take a risk, make a mistake, or fail? How did you respond, and how did you grow from that experience?
•	Describe a time you took the lead on a project.
•	What did you do when you needed to motivate a group of individuals or promote collaboration on a particular project?
•	How have you leveraged data to develop a strategy?



## 2. Referennces
* [Leadership Principles](https://www.amazon.jobs/en/principles)
* [Software development topics](https://www.amazon.jobs/en/landing_pages/in-software-development-topics)
* [In-person interview](https://www.amazon.jobs/en/landing_pages/in-person-interview)
* [Navbar hides initial content when jumping to in-page anchor](https://github.com/twbs/bootstrap/issues/1768)
