---
layout: tutorial
key: tutorial
title: "Jekyll - Performance Optimization"
index: 8132
subcategory: jekyll
date: 2019-06-28
tags: [Performance]
---

> Performance.

## 1. Use Cookie-Free Domains
Why Use Cookie-Free Domains?

Although cookies are very useful in some cases, in other cases - such as the delivery of static content, they can hinder performance. When a browser makes a request for a static asset such as an image or CSS file, there is no need for it to also send a cookie to the server. This only creates additional network traffic and since the files are static (they do not change) the server has no use for the added cookie.

When you use cookie-free domains you are able to separate the content that doesn’t require cookies from the content that does. This helps improve your site’s performance by eliminating unneeded network traffic.

Testing

![image](/assets/images/jekyll/8132/imagesize_before.png)

## 2. Cache Header
Create netlify.toml
```toml
[build]
  command = "jekyll build"
  publish = "_site/"

[[headers]]
  for = "/assets/images/*"
  [headers.values]
    Cache-Control = "public, s-max-age=604800"
[[headers]]
  for = "/assets/css/*.css"
  [headers.values]
    Cache-Control = "public, s-max-age=604800"
[[headers]]
  for = "/assets/js/*.js"
  [headers.values]
    Cache-Control = "public, s-max-age=604800"
```

## 3. Reference
* [Free Secure Web: Jekyll & Github Pages & Cloudflare](https://martin.ankerl.com/2017/07/22/free-secure-web-jekyll-github-pages-cloudflare/)
* [How to Deploy Websites on Custom Domains using Cloudflare and Github Pages](https://medium.com/crowdbotics/annie-azana-how-to-deploy-websites-using-cloudflare-and-github-pages-c415c55fea36)
* [Fix Defer Parsing of Javascript Warning in WordPress Using Async](https://www.collectiveray.com/defer-parsing-of-javascript-wordpress-async)
* [Demo - Put Scripts at the Bottom](http://stevesouders.com/examples/rule-js-bottom.php)
* [Search engine optimization for GitHub Pages](https://help.github.com/en/articles/search-engine-optimization-for-github-pages)
* [The netlify.toml File](https://www.netlify.com/docs/netlify-toml-reference/)
* [How To Use Cookie-Free Domains](https://www.keycdn.com/support/how-to-use-cookie-free-domains)
* [Front End Optimization - 9 Tips to Improve Web Performance](https://www.keycdn.com/blog/front-end-optimization)
