---
layout: tutorial
key: tutorial
title: "Tricks in ASP.NET MVC"
index: 9605
subcategory: asp-net
date: 2016-03-19
tags: [ASP.NET MVC]
---

> Some tricks of ASP.NET MVC.

## 1. ASP.NET MVC
ASP.NET MVC is a great framework for developing MVC web applications. However, there are some tricky "bugs" you may encounter.

### 1.1 Action url is changed to another address when using Ajax.BeginForm.  
In the BeginForm, I set the routeValue to 'api/Product/'. The form should be submitted to 'http://localhost:2737/api/Product'.
![image1](/assets/images/asp-net/9505/image1.png)  
However, it doesn't work as expected. In the debug tool of chrome, I found it sent request to 'http://localhost:2737/Product?Length=12'. Weird...  
In Element viewer of the debug tool, you can see the action is 'Product?Length=12'.
![image2](/assets/images/asp-net/9505/image2.png)  
This issue occurs when I add some htmlAttributes(new { @class = "form-horizontal" }) to the Ajax.BeginForm. No clue why the attribute setting affects the action url.

To solve this issue, you have to declare a route object to wrap the url (eg. new { controller = "api/Product/" }) instead of using 'api/product' directrly.

```
 @using (Ajax.BeginForm("", new { controller = "api/Product/" }, new AjaxOptions { HttpMethod = "Post" }))
```
![image3](/assets/images/asp-net/9505/image3.png)  

### 1.2 Error message in ValidationSummary is not cleared after validation passed.  
Generally, ValidationSummary displays error message when there is any invalid input. However, there is one issue that error messages are still there even if all inputs are valid. This issue occurs when using Ajax.BeginForm and Html.ValidationSummary together. In my page, I use Ajax to send out request and update the page content after clicking the 'save' button. There is no navigation in the submit event. We are always in the same page.  
![image4](/assets/images/asp-net/9505/image4.png)

To solve the issue, we need to manually clear the content in ValidationSummary.  
First, add an handler for OnSuccess event in AjaxOptions of Ajax.BeginForm.
![image5](/assets/images/asp-net/9505/image5.png)
Then, in the handler function, reset the content of validation-summary-errors.

```
$('.validation-summary-errors ul').children().remove();
```

![image6](/assets/images/asp-net/9505/image6.png)  
Pay attention to the jQuery selector where I specify 'ul'. You have to keep ul tag in the validation-summary-errors div, otherwise, the validation summary won't show message again if there is some errors for the next round validation check.  

![image7](/assets/images/asp-net/9505/image7.png)  

After the above two changes, test it. Now, validation-summary-errors works as expected. After click the 'save' button, it shows errors if there is invalid input. And, after successfully sends out the form request, the error messages are removed.
