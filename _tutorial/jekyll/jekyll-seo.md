---
layout: tutorial
key: tutorial
title: "Jekyll - SEO"
index: 8131
subcategory: jekyll
date: 2019-06-27
tags: [SEO, CDN, DNS]
---

> Optimize the website to improve the rankings.

## 1. SEO
Search engine optimization (`SEO`) is the process of increasing the quality and quantity of website traffic by increasing the visibility of a website or a web page to users of a web search engine.
### 1.1 robots.txt
Avoid web crawler to visit specific content, eg. /note.
```raw
User-agent: *
Disallow: /note/
```
### 1.2 RSS Feed
Edit /blog/atom.xml
```html
{%- raw -%}
---
layout: nil
type: blog
---

<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">

  <title>{{ site.blogtitle }}</title>
  <link href="{{ site.url }}/blog/atom.xml" rel="self"/>
  <link href="{{ site.url }}/blog"/>
  <updated>{{ site.time | date_to_xmlschema }}</updated>
  <id>{{ site.url }}</id>
  <author>
    <name>{{ site.author.name }}</name>
    <email>{{ site.author.email }}</email>
  </author>

  {% for post in site.posts %}
      <entry>
        <title>{{ post.title }}</title>
        <link href="{{ site.url }}{{ post.url }}"/>
        <updated>{{ post.date | date_to_xmlschema }}</updated>
        <id>{{ site.url }}{{ post.id }}</id>
        <content type="html">{{ post.content | xml_escape }}</content>
      </entry>
  {% endfor %}

</feed>
{% endraw %}
```
![image](/assets/images/jekyll/8131/rssfeed.png)
### 1.3 Sitemap
```xml
{%- raw -%}
---
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for page in site.pages %}
    {% if page.layout != nil and page.layout != 'feed' and page.url != '/note/' and page.url != '/index_note/' and page.url != '/index_tutorial/' and page.url != '/search/' and page.url != '/blog/atom.xml' and page.url != '/contact/'%}
      <url>
        <loc>http://jojozhuang.github.io{{ page.url | remove: 'index.html' }}</loc>
      </url>
    {% endif %}
  {% endfor %}

  {% assign portfolios = site.portfolio %}
  {% assign blogs = site.posts %}
  {% assign posts = portfolios | concat: blogs %}
  {% for post in posts %}
    <url>
      <loc>http://jojozhuang.github.io{{ post.url | remove: 'index.html' }}</loc>
    </url>
  {% endfor %}

</urlset>
{% endraw %}
```
![image](/assets/images/jekyll/8131/sitemap.png)

## 2. Caching with CDN
### 2.1 Create a new account in Cloudflare
Add a new site, note the two name servers
* miki.ns.cloudflare.com
* owen.ns.cloudflare.com

### 2.2 Update Name server in GoDaddy
Find your domain, click the three dot button, choose 'Manage DNS'.
![image](/assets/images/jekyll/8131/godaddy_mydomains.png)
Scroll down, see the Nameservers section, click 'Change' btton.
![image](/assets/images/jekyll/8131/godaddy_nameservers.png)
Select 'Custom' type and input two Cloudflare name servers.
![image](/assets/images/jekyll/8131/godaddy_changenameserver.png)
Done.
![image](/assets/images/jekyll/8131/godaddy_done.png)
You will receive an email from CloudFlare.
![image](/assets/images/jekyll/8131/cloudflare_notification.png)

## 3. Move Javascript Files to Bottom
Put javascript files to the bottom of the page can speed up the loading.

## 4. Reference
* [About robots.txt](https://www.robotstxt.org/robotstxt.html)
* [How to Use XML Sitemaps to Boost SEO](https://www.searchenginejournal.com/xml-sitemaps-seo/)
* [JEKYLL - GENERATING A SITEMAP.XML WITHOUT A PLUGIN](http://www.independent-software.com/generating-a-sitemap-xml-with-jekyll-without-a-plugin.html)
* [10 Must do Jekyll SEO optimizations](https://blog.webjeda.com/optimize-jekyll-seo/)
* [Free Secure Web: Jekyll & Github Pages & Cloudflare](https://martin.ankerl.com/2017/07/22/free-secure-web-jekyll-github-pages-cloudflare/)
* [How to Change Nameservers in GoDaddy?](https://www.webnots.com/how-to-change-nameservers-in-godaddy/)
* [How to Deploy Websites on Custom Domains using Cloudflare and Github Pages](https://medium.com/crowdbotics/annie-azana-how-to-deploy-websites-using-cloudflare-and-github-pages-c415c55fea36)
* [Fix Defer Parsing of Javascript Warning in WordPress Using Async](https://www.collectiveray.com/defer-parsing-of-javascript-wordpress-async)
* [Demo - Put Scripts at the Bottom](http://stevesouders.com/examples/rule-js-bottom.php)
* [Search engine optimization for GitHub Pages](https://help.github.com/en/articles/search-engine-optimization-for-github-pages)
