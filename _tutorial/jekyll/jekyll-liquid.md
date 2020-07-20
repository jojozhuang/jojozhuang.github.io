---
layout: tutorial
key: tutorial
title: "Jekyll - Liquid"
index: 8111
subcategory: jekyll
date: 2016-01-19
tags: [Jekyll, Liquid]
---

> Useful tricks of Liquid, which are used in Jekyll.

## 1. Liquid
Jekyll uses the `Liquid` templating language to process templates.

Generally in Liquid you output content using two curly braces e.g. `{%- raw -%}{{ variable }}{% endraw %}` and perform logic statements by surrounding them in a curly brace percentage sign e.g. `{%- raw -%}{% if statement %}{% endraw %}`. To learn more about Liquid, check out the [official Liquid Documentation](https://shopify.github.io/liquid/).

## 1. Comment
Allows you to leave un-rendered code inside a Liquid template. Any text within the opening and closing comment blocks will not be output, and any Liquid code within will not be executed.  
Input:  
```
{%- raw -%}
Anything you put between {% comment %} and {% endcomment %} tags
is turned into a comment.
{% endraw %}
```
Output:  
```
Anything you put between  tags
is turned into a comment.
```

## 2. Raw
Raw temporarily disables tag processing. This is useful for generating content (eg, Mustache, Handlebars) which uses conflicting syntax.  
Input:  
<div class="highlighter-rouge"><pre class="highlight"><code>&#123;&#37; raw &#37;&#125;
  In Handlebars, {% raw %} {{ this }} {% endraw %}will be HTML-escaped, but {% raw %}{{{ that }}}{% endraw %} will not.
&#123;&#37; endraw &#37;&#125;
</code></pre>
</div>
Output:  
```
  In Handlebars, {% raw %} {{ this }} {% endraw %}will be HTML-escaped, but {% raw %}{{{ that }}}{% endraw %} will not.
```

## 3. forloop.first
Returns `true` if it's the first iteration of the for loop. Returns `false` if it is not the first iteration.
```html
{%- raw -%}
{% for product in collections.frontpage.products %}
    {% if forloop.first == true %}
        First time through!
    {% else %}
        Not the first time.
    {% endif %}
{% endfor %}
{% endraw %}
```

## 4. Blank Line
Input:
```html
{%- raw -%}
{% assign my_variable = "tomato" %}
{{ my_variable }}
{% endraw %}
```
Output:
```

tomato
```
Notice, one blank line above the desired output.

Add dash `-` to the input:
```html
{%- raw -%}
{%- assign my_variable = "tomato" -%}
{{ my_variable }}
{% endraw %}
```
Output:
```
tomato
```

## 5. Iteration
`for`
```html
{%- raw -%}
{% for product in collection.products %}
  {{ product.title }}
{% endfor %}
{% endraw %}
```

`limit`  
Limits the loop to the specified number of iterations.  
Input:
```html
{%- raw -%}
<!-- if array = [1,2,3,4,5,6] -->
{% for item in array limit:2 %}
  {{ item }}
{% endfor %}
{% endraw %}
```
Output:
```
1 2
```

## 6. References
* [Liquid](https://shopify.github.io/liquid/)
* [Whitespace control](https://shopify.github.io/liquid/basics/whitespace/)
* [The forloop object](https://help.shopify.com/themes/liquid/objects/for-loops)
