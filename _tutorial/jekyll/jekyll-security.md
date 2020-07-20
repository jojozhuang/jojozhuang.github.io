---
layout: tutorial
key: tutorial
title: "Jekyll - Security"
index: 8133
subcategory: jekyll
date: 2019-06-29
tags: [Security]
---

> Scan website security vulnerabilities and fix them.

## 1. Website Headers
### 1.1 Websites
I have my personal website hosted on two domains, [jojozhuang.github.io](https://jojozhuang.github.io) and [jojozhuang.netlify.com](https://jojozhuang.netlify.com). The first one is hosted on [GitHub Pages](https://pages.github.com/), while the second one is hosted on [Netlify](https://www.netlify.com/). These two websites are powered by [Jekyll](https://jekyllrb.com/) and all their contents are totally static. Actually, they are using the same code base.The source codes are managed on GitHub in repository [https://github.com/jojozhuang/jojozhuang.github.io](https://github.com/jojozhuang/jojozhuang.github.io). Both sites are CI/CD with GitHub. If there is any change submitted to this repository, GitHub Pages and Netlify will compile and deploy the website automatically.
### 1.2 Header Security
Visit [securityheaders.com](https://securityheaders.com) and scan headers for site https://jojozhuang.github.io.
![image](/assets/images/jekyll/8133/header_githubpages.png)
All the checks on header are failed. If we scan site https://jojozhuang.netlify.com, same result will be returned.
### 1.3 Resolution
To fix these security issues, we need to make some change at server side. However, there is no way to do that on GitHub Pages, but it can be done on Netlify. PS: This is one of the reasons why I migrated this static website from GitHub Pages to Netlify.

In the root directory of repository, create a file named `netlify.toml` with the following content. Ignore the `build` section and `cache-control` settings as of now.
```toml
[build]
  command = "jekyll build"
  publish = "_site/"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Content-Security-Policy = "form-action https:"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=2592000"
    Feature-Policy = "vibrate 'none'; geolocation 'none'; midi 'none'; notifications 'none'; push 'none'; sync-xhr 'none'; microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; speaker 'none'; vibrate 'none'; fullscreen 'none'; payment 'none'"
    #  Multi-key header rules are expressed with multi-line strings
    cache-control = '''
      public,
      s-max-age=604800'''
```
Submit this file, wait for a while to let Netlify deploy the change. Once this file is deployed, run the scan for https://jojozhuang.netlify.com. This time, we can see all tests for header security are passed.
![image](/assets/images/jekyll/8133/header_netlify_fixed.png)

## 2. SSL

## 7. Reference
* [How to Configure Better Web Site Security with Cloudflare and Netlify](https://developer.okta.com/blog/2019/04/11/site-security-cloudflare-netlify)
* [12 Online Free Tools to Scan Website Security Vulnerabilities & Malware](https://geekflare.com/online-scan-website-security-vulnerabilities/)
* [The netlify.toml File](https://www.netlify.com/docs/netlify-toml-reference/)
