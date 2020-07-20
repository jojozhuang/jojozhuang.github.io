---
layout: tutorial
key: tutorial
title: "Jekyll - Pagination"
index: 8122
subcategory: jekyll
date: 2019-06-04
tags: [Pagination]
---

> Add pagination buttons for every page.

## 1. Pagination
Pagination provides convenience to user when he/she wants to navigate to other pages from the current page. In this posting, I will introduce how to implement a simple pagination function in Jekyll. I will create two buttons for each posting page to enable user to navigate to previous or next page.
## 2. Implementation
### 2.1 Create Include File for Pagination
Create a file `_include/pagination.html` with following content. Two buttons named `Previous` and `Next` are defined.
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
### 2.2 Include into Template File
Then, include it into template page `_layouts/tutorial.html`. The buttons are added to both top and bottom of the page.
{% raw %}
```html
...
{% include pagination.html %}
<hr>
<div class="post">
  {{ content }}
</div>
<hr>
{% include pagination.html %}
...
```
{% endraw %}
### 2.3 Demo
Open any posting page, we will see the buttons just below the title.
![image](/assets/images/jekyll/8122/button-top.png){:width="700px"}
And the same buttons in the bottom.
![image](/assets/images/jekyll/8122/button-bottom.png){:width="700px"}

## 3. Improvement
The above pagination based on the `date` of posts. The posts are sorted by `date`. Enhance it to support sorting by any field, eg. `index`.
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
The UI definition is almost same. The difference is that the previous and next links are based on index.

## 4. ShortCut Key
Add the following snippet into `_include/pagination.html`. Now user can click the arrow keys `<` and `>` to navigate to the previous posting and the next posting.
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

## 5. Reference
* [Creating previous and next links within a Jekyll Collection](http://stories.upthebuzzard.com/jekyll_notes/2017-02-19-prev-and-next-within-a-jekyll-collection.html)
* [Previous Next Links for Jekyll Collections](https://gist.github.com/budparr/3e637e575471401d01ec)
* [Jekyll Filters - Where and Group_By](https://blog.webjeda.com/jekyll-filters/)
