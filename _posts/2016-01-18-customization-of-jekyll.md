---
layout: post
key: blog
title: "Customization of Jekyll"
date: 2016-01-18
tags: Jekyll
categories: blog
---

> Several useful approaches used to customize Jekyll for my personal website hosted on GitHub Pages.

## 1. Pagination
Add the following codes to post.html, which is the template of posting.
```html
{%- raw -%}
<ul class="pager">
  {% if page.previous.url %}
      <li class="previous"><a href="{{page.previous.url}}">Previous</a></li>
  {% else %}
      <li class="previous disabled"><a href="#">Previous</a></li>
  {% endif %}
  {% if page.next.url %}
      <li class="next"><a href="{{page.next.url}}">Next</a></li>
  {% else %}
      <li class="next disabled"><a href="#">Next</a></li>
  {% endif %}
</ul>
{% endraw %}
```
Previous and Next buttons are added to the posting. Now, you can click on either of them to navigate to another posting.

## 2. Code Snippet Highlighting
When insert codes to markdown, you can specify the programming language of the code. For example:
````
```java
java code
```
````

Be default, there is only a grey rectangle as background, no highlighting on the codes. See the below screenshot.
![MIME Type](/public/pics/2016-01-18/withouthighlight.png)  

To enable the highlighting, you need to edit \_config.yml file which is located in the root directory of the website, add following lines.
```
markdown: kramdown
highlighter: rouge
```
Then, create css file, for example, [highlight.css]({% link /public/css/highlight.css %}). And include this css file to the page.
```html
<link href="/public/css/highlight.css" rel="stylesheet" />
```
Refresh the page. The highlighting is working now.
![MIME Type](/public/pics/2016-01-18/javahighlight.png)  

## 2. Links
In Markdown, we can create hyperlinks to the pages of our own website or external website with the following codes:
````
```
[My Website](http://jojozhuang.github.io/)
```
````
Here is the result after Markdown file is converted to web page: [My Website](http://jojozhuang.github.io/).

The problem of this approach is the url is hard-coded. Suppose we rename our internal page or the external URL is obsolete, then this link would be unreachable, which means it becomes 'dead'. It is impossible for you to know if all your hyperlinks are alive.

The good news is, in Jekyll, you can use `link` tag to create hyperlink for a post, a page, collection item, or file.
```
{%- raw -%}
[Link to a document]({{ site.baseurl }}{% link _collection/name-of-document.md %})
[Link to a post]({{ site.baseurl }}{% link _posts/2016-07-26-name-of-post.md %})
[Link to a page]({{ site.baseurl }}{% link news/index.html %})
[Link to a file]({{ site.baseurl }}{% link /assets/files/doc.pdf %})
{% endraw %}
```
Notice, `{%- raw -%}{{ site.baseurl }}{% endraw %}` is optional. It depends on whether you want to preface the page URL with the baseurl value.

## 3. Post Excerpt
1) post.excerpt
Each post automatically takes the first block of text, from the beginning of the content to the first occurrence of excerpt_separator, and sets it as the post.excerpt. To include a little hint about the post’s content, you can add the first paragraph of each of your posts.
```
{%- raw -%}
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
{% endraw %}
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

## looping-in-liquid
{% if forloop.first %}grid1{% endif %}
reversed

## Whitespace
{% assign my_variable = "tomato" %}
{{ my_variable }}
{%- assign my_variable = "tomato" -%}
{{ my_variable }}

## Comment
```
Anything you put between {% comment %} and {% endcomment %} tags
is turned into a comment.
```
```
Anything you put between  tags
is turned into a comment.
```

Raw
{% raw %}
  In Handlebars, {{ this }} will be HTML-escaped, but
  {{{ that }}} will not.
{% endraw %}
In Handlebars, {{ this }} will be HTML-escaped, but {{{ that }}} will not.


iteration
limits
limit

Limits the loop to the specified number of iterations.

Input

<!-- if array = [1,2,3,4,5,6] -->
{% for item in array limit:2 %}
  {{ item }}
{% endfor %}

Output
1 2


## 4. References
* [Official Jekyll Document](https://jekyllrb.com/docs/home/)
* [Post excerpts](https://jekyllrb.com/docs/posts/#post-excerpts)
* [Links](https://jekyllrb.com/docs/templates/#links)
* [3 Easy Steps To Implement Jekyll Collections!](https://blog.webjeda.com/jekyll-collections/)
* [Liquid](https://shopify.github.io/liquid/)
* [Whitespace control](https://shopify.github.io/liquid/basics/whitespace/)
* [Get Pagination working in Jekyll Collection in Github pages](http://anjesh.github.io/2015/01/25/collection-pagination-working-github-pages/)
