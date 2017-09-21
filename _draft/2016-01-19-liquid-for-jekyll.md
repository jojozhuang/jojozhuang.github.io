---
layout: post
key: blog
title: "Liquid for Jekyll"
date: 2016-01-19
tags: Jekyll, Liquid
categories: blog
---

> Unable to run Jekyll at port 4000.

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
* [Liquid](https://shopify.github.io/liquid/)
* [Whitespace control](https://shopify.github.io/liquid/basics/whitespace/)
