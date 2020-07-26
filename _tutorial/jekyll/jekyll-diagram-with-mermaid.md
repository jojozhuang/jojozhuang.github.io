---
layout: tutorial
key: tutorial
title: "Jekyll - Diagram with Mermaid"
index: 8127
subcategory: jekyll
date: 2018-09-15
tags: [Mermaid, Diagram]
mermaid: true
---

> Use Mermaid in Markdown to draw diagrams.

## 1. Mermaid
[Mermaid](https://mermaidjs.github.io/) a simple markdown-like script language for generating charts from text via javascript.
### 1.1 Using Mermaid in Web Page
Read tutorial [Generating Diagrams and Flowcharts with Mermaid]({% link _tutorial/uncategorized/generating-diagrams-and-flowcharts-with-mermaid.md %}) to learn how to use Mermaid in web page.
### 1.2 Using Mermaid in Markdown
You can use Jekyll plugin [jekyll-mermaid](https://github.com/jasonbellamy/jekyll-mermaid) to create diagrams and flowcharts with markdown in your local Jekyll. For example, define a flowchart with 4 nodes as follows.
~~~markdown
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
~~~
It looks like this.
<div class="mermaid">
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</div>
However, this plugin is `not` officially supported by GitHub Pages. The above markdown diagram definition won't work if you push it to GitHub Pages.
### 1.3 GitHub Pages
 Unfortunately, GitHub Pages currently doesn't support Mermaid, see the [issue](https://github.com/github/markup/issues/533). The workaround is to use html tag directly in markdown file. Instead of using the `code block`, we can wrap the diagram definition into a `<div>` tag. The following definition of a flowchart works in GitHub Pages.
~~~markdown
<div class="mermaid">
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
</div>
~~~
The following sections will introduce the details of how to generate diagram in markdown and let it work in GitHub Pages as well.

## 2. Using Mermaid in Jekyll
### 2.1 Page Template
Create a file named with `mermaid.html` in `_include` directory as follows:
```html
<script type="text/javascript"
  src="https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js">
</script>
<script>
$(document).ready(function() {
    mermaid.initialize({
        theme: 'forest'
    });
});
</script>
```
* Go to https://unpkg.com/mermaid to search the latest version or specific version.
* Go to https://github.com/knsv/mermaid/tree/master/src/themes to check available `themes`.

Update file `_inlude/head.html`, include the above template file if `page.mermaid` is true.
```javascript
{%- raw -%}
{% if page.mermaid %}
  {% include mermaid.html %}
{% endif %}
{% endraw %}
```

### 2.2 Creating Diagram Definition in Markdown Page
In order to use Mermaid in markdown page, it must have a variable `mermaid` and set its value to `true`. For example, the following example is a markdown page using mermaid.
~~~markdown
---
layout: post
key: blog
title: "Generating Diagrams with Mermaid in Markdown"
date: 2018-09-15
tags: [Mermaid]
mermaid: true
---
~~~
1) Example One:
~~~markdown
<div class="mermaid">
graph LR
    A --- B
    B-->C[Happy]
    B-->D(Sad);
</div>
~~~
<div class="mermaid">
graph LR
    A --- B
    B-->C[Happy]
    B-->D(Sad);
</div>
2) Example Two:
~~~markdown
<div class="mermaid">
    graph TD
      B[peace]
      B-->C[fa:fa-ban forbidden]
      B-->D(fa:fa-spinner);
      B-->E(fa:fa-camera-retro perhaps?);
</div>
~~~
<div class="mermaid">
    graph TD
      B[peace]
      B-->C[fa:fa-ban forbidden]
      B-->D(fa:fa-spinner);
      B-->E(fa:fa-camera-retro perhaps?);
</div>

## 3. References
* [Mermaid Documentation](https://mermaidjs.github.io/)
* [Mermaid Live Editor](https://mermaidjs.github.io/mermaid-live-editor/)
* [Mermaid on GitHub](https://github.com/knsv/mermaid)
* [Embed Mermaid Charts in Jekyll without Plugin](http://kkpattern.github.io/2015/05/15/Embed-Chart-in-Jekyll.html)
* [Adding Jekyll plugins to a GitHub Pages site](https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site/)
