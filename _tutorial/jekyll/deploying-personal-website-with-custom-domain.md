---
layout: tutorial
key: tutorial
title: "Deploying Personal Website with Custom Domain"
index: 8142
subcategory: jekyll
date: 2019-06-21
tags: [Custom Domain]
---

> Setup personal website with Github page and custom domain.

## 1. Setup website in github page
Refer this post [Creating and Hosting a Personal Site on GitHub](http://jmcglone.com/guides/github-pages/) to create a repository on github and publish it to GitHub Pages.

For demo purpose, I will use the repository of my personal website, see https://github.com/jojozhuang/jojozhuang.github.io.

## 2. Register domain from Godaddy
Visit https://www.godaddy.com, register account and search domains.
![image](/assets/images/jekyll/8142/godaddy_searchdomain.png)
Add the domain you're interested into shopping cart, and prepare to pay for it.
![image](/assets/images/jekyll/8142/godaddy_cart.png)
After you finish the payment, congratulations, you own the domain!
![image](/assets/images/jekyll/8142/godaddy_domain.png)

## 3. Setup DNS
Now, it's time to setup DNS for your new domain. Add `A` record to point the new domain(eg. jojozhuang.github.io) to a specific IP. The below four IP addresses are for GitHub Pages.
* 185.199.108.153
* 185.199.109.153
* 185.199.110.153
* 185.199.111.153

In addition, add `CNAME` record to point the new domain(eg. jojozhuang.github.io) to the existing github page domain(eg. jojozhuang.github.io).
![image](/assets/images/jekyll/8142/godaddy_adddns.png)

## 4. Enable Custom Domain and SSL on GitHub
Go to the github repository. In Settings, input the custom domain and check 'Enforce HTTPS'.
![image](/assets/images/jekyll/8142/custom_domain.png){:width="700px"}

The settings on GitHub and GoDaddy will be activated after a while. Visit the website with new domain [jojozhuang.github.io](jojozhuang.github.io). Notice that the url always starts with `https`.
![image](/assets/images/jekyll/8142/rongzhuang_home.png)
Portfolio page.
![image](/assets/images/jekyll/8142/rongzhuang_portfolio.png)

## 5. Reference
* [How to Configure GoDaddy Custom Domains with GitHub Pages](https://medium.com/@supriyakankure/how-to-add-a-custom-domain-to-your-github-page-with-godaddy-84495781143e)
* [Custom domains on GitHub Pages gain support for HTTPS](https://github.blog/2018-05-01-github-pages-custom-domains-https/)
