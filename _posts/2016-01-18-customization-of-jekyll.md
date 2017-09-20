---
layout: post
key: blog
title: "Customization of Jekyll"
date: 2016-01-18
tags: Jekyll
categories: blog
---

> Configure Jekyll for my personal website hosted on GitHub Pages.

## 1. Code Snippet Highlighting
When insert codes to markdown, you can specify the programming language of the code. For example:
````
```java
java code
```
````

There is only a grey rectangle around the codes, no highlighting.
![MIME Type](/public/pics/2016-01-18/withouthighlight.png)  

Edit \_config.yml, add following lines.
```
markdown: kramdown
highlighter: rouge
```
Create css file, for example, [highlight.css]({% link /public/css/highlight.css %}).

And include highlight css file to the page.
```html
<link href="/public/css/highlight.css" rel="stylesheet" />
```
Refresh the page. The highlighting is working now.
![MIME Type](/public/pics/2016-01-18/javahighlight.png)  

## 2. Links
In Markdown, we can create links as follows:
````
```
[My Website](http://jojozhuang.github.io/)
```
````
Here is the result: [My Website](http://jojozhuang.github.io/).

In Jekyll, you can use `link` tag to create link for a post, a page, collection item, or file.
````
```
```
````
Notice, {{ site.baseurl }} is optional. It depends on whether you want to preface the page URL with the baseurl value.

## 3. Post Excerpt
1) post.excerpt
Each post automatically takes the first block of text, from the beginning of the content to the first occurrence of excerpt_separator, and sets it as the post.excerpt. To include a little hint about the post’s content, you can add the first paragraph of each of your posts.
```
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
```
2) Customized excerpt(short description)
If you don’t like the automatically-generated post excerpt, it can be explicitly overridden by adding an excerpt value to your post’s YAML Front Matter. Alternatively, you can choose to define a custom excerpt_separator in the post’s YAML front matter:
```
---
excerpt_separator: <!--more-->
---

Excerpt
<!--more-->
Out-of-excerpt
```
Pass the `| strip_html` filter to remove any html tags in the output.

## 3. Collection
Use `Collection` to create similar pages.  
Edit \_config.yml, add following lines.
```
collections:
  themes:
    output: true
```
Create new folder named '\_themes' in root directory.
Create two files in this new folder.
Create new file in root directory.
```
layout: default
title: Jekyll Themes
---
{% for themes in site.themes %}


<a href="{{ themes.url | prepend: site.baseurl }}">
        <h2>{{ themes.title }}</h2>
</a>

<p class="post-excerpt">{{ themes.description | truncate: 160 }}</p>

{% endfor %}
```
Open browser, access /themes/

## 4. References
* [Official Jekyll Document](https://jekyllrb.com/docs/home/)
* [Post excerpts](https://jekyllrb.com/docs/posts/#post-excerpts)
* [Links](https://jekyllrb.com/docs/templates/#links)
* [3 Easy Steps To Implement Jekyll Collections!](https://blog.webjeda.com/jekyll-collections/)
