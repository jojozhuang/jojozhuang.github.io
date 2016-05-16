---
layout: post
key: blog
title: "Tricks in ASP.NET MVC"
date: 2016-03-19
categories:
- blog
---

> ASP.NET MVC is a great framework for developing MVC web applications. However, there are some tricky "bugs" you may encounter.

1. Action url is changed to another address when using Ajax.BeginForm.  
In the BeginForm, I set the routeValue to 'api/Product/'. The form will be submitted to 'http://localhost:2737/api/Product'.
![image1](/public/pics/2016-03-16/image1.png)  
However, it doesn't work as expected, it debug tool of chrome, I found it sends request to 'http://localhost:2737/Product?Length=12'. Weird...  
When open the element viewer of the debug tool, I found the action url is 'Product?Length=12'.
![image2](/public/pics/2016-03-16/image2.png)  
This issue occurs when I add some htmlAttributes(new { @class = "form-horizontal" }) to the Ajax.BeginForm.

To solve this issue, you have to declare the route value with the new keyword.
eg. new { controller = "api/Product/" }

```
 @using (Ajax.BeginForm("", new { controller = "api/Product/" }, new AjaxOptions { HttpMethod = "Post" }))
```
![image3](/public/pics/2016-03-16/image3.png)  
2. Error message in ValidationSummary is not cleared after validation passed. This issue occurs when using Ajax.BeginForm and Html.ValidationSummary together. The current page is not redirected to another page, instead, we use Ajax to update the page content after clicking the save button.
![image4](/public/pics/2016-03-16/image4.png)
ValidationSummary will display error message when there is any invalid data. However, even if there is no validation error, the last error message still there after request is sent out.

To solve the issue, we need to manually clear the conent in ValidationSummary.
First, add an handler for OnSuccess event in AjaxOptions of Ajax.BeginForm.
![image5](/public/pics/2016-03-16/image5.png)
Then, in the handler function, delete the content.

```
$('.validation-summary-errors ul').children().remove();
```

![image6](/public/pics/2016-03-16/image6.png)  
Pay attention to the jQuery selector, I specify the 'ul'. You have to keep ul tag in the validation-summary-errors div, otherwise, the validation summary won't show message again if there is some errors for the next round validation.  

![image6](/public/pics/2016-03-16/image6.png)  
