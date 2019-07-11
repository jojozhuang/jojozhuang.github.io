---
layout: tutorial
key: popular
title: "Pagination for List View"
index: 1609
category: jekyll
breadcrumb: [Popular, Personal Website, GitHub Pages and Jekyll]
image: github-pages.png
date: 2018-07-09
postdate: 2019-06-04
tags: [Pagination]
---

> Add progress bar at top of every page.

## 1. Pagination in Jekyll
Create a include file `_include/pagination.html` and include it other pages.
{% raw %}
```raw
<ul class="pager">
  {% if page.previous.url %}
    <li><a class="btn btn-outline-primary" href="{{page.previous.url}}">Previous</a></li>
  {% else %}
    <li class="disable"><a class="btn btn-outline-primary disabled" href="{{page.previous.url}}">Previous</a></li>
  {% endif %}
  {% if page.next.url %}
    <li class="next"><a class="btn btn-outline-primary" href="{{page.next.url}}">Next</a></li>
  {% else %}
    <li class="next disable"><a class="btn btn-outline-primary disabled" href="{{page.next.url}}">Next</a></li>
  {% endif %}
</ul>
```
{% endraw %}
## 2. ShortCut Key
`<`: Previous Post, `>`: Next Post.
{% raw %}
```raw
<script>
document.body.onkeyup = function(e){
  if (e.keyCode == '37') { window.location = '{{prevurl}}'; }
  if (e.keyCode == '39') { window.location = '{{nexturl}}'; }
};
</script>
```
{% endraw %}
## 3. Improvement
The above pagination based on the `date` of posts. The posts are sorted by `date`. Enhance it to support sorting by any field, eg. 'index'.
{% raw %}
```raw
{% if page.collection %}
  {% assign posts = site[page.collection] | sort: 'index' %}
  {% for links in posts %}
    {% if links.title == page.title %}
      {% unless forloop.first %}
        {% assign prevurl = prev.url %}
      {% endunless %}
      {% unless forloop.last %}
        {% assign next = posts[forloop.index] %}
        {% assign nexturl = next.url %}
      {% endunless %}
    {% endif %}
    {% assign prev = links %}
  {% endfor %}

  <ul class="pager">
    {% if prevurl %}
      <li><a class="btn btn-outline-primary" href="{{prevurl}}">Previous</a></li>
    {% else %}
      <li class="disable"><a class="btn btn-outline-primary disabled" href="{{prevurl}}">Previous</a></li>
    {% endif %}
    {% if nexturl %}
      <li class="next"><a class="btn btn-outline-primary" href="{{nexturl}}">Next</a></li>
    {% else %}
      <li class="next disable"><a class="btn btn-outline-primary disabled" href="{{nexturl}}">Next</a></li>
    {% endif %}
  </ul>
{% endif %}
```
{% endraw %}

### 2.6 Test
Access any page, there is a green top bar below the navigation bar.
![image](/public/images/githubpages/909/progress_bar.png)

## 3. Reference
* [Creating previous and next links within a Jekyll Collection](http://stories.upthebuzzard.com/jekyll_notes/2017-02-19-prev-and-next-within-a-jekyll-collection.html)
* [Previous Next Links for Jekyll Collections](https://gist.github.com/budparr/3e637e575471401d01ec)
* [Jekyll Filters - Where and Group_By](https://blog.webjeda.com/jekyll-filters/)
