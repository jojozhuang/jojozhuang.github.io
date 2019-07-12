---
layout: tutorial
key: popular
title: "Customizing HTML Table with Markdown"
index: 1616
category: jekyll
breadcrumb: [Popular, Personal Website, GitHub Pages and Jekyll]
image: github-pages.png
date: 2018-07-14
postdate: 2019-07-01
tags: [Table, Markdown]
---

> Display mathematical notation in web pages with MathJax.

## 1. Striped Rows in Table
Define a table in markdown as follows.
```raw
Access Modifiers        | private | default | protected | public
------------------------|---------|---------|-----------|--------
Inside Class            | Y       | Y       | Y         | Y
Same Package Class      | N       | Y       | Y         | Y
Same Package Sub-Class  | N       | Y       | Y         | Y
Other Package Class     | N       | N       | N         | Y
Other Package Sub-Class | N       | N       | Y         | Y
```
The table in html looks like this.
![image](/public/images/githubpages/914/table_markdown.png)

If we want to add class to html table, we can append class to the table in markdown, see sample below. Class `table-striped` is defined in Bootstrap 4, which is used to add zebra-stripes to a table.
```raw
Access Modifiers        | private | default | protected | public
------------------------|---------|---------|-----------|--------
Inside Class            | Y       | Y       | Y         | Y
Same Package Class      | N       | Y       | Y         | Y
Same Package Sub-Class  | N       | Y       | Y         | Y
Other Package Class     | N       | N       | N         | Y
Other Package Sub-Class | N       | N       | Y         | Y
{: .table-striped }
```
Once the table is generated in html, it looks like this.
```html
<table class="table-striped">
  <thead>
    <tr>
      <th>Access Modifiers</th>
      <th>private</th>
      <th>default</th>
      <th>protected</th>
      <th>public</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Inside Class</td>
      <td>Y</td>
      <td>Y</td>
      <td>Y</td>
      <td>Y</td>
    </tr>
    <tr>
      <td>Same Package Class</td>
      <td>N</td>
      <td>Y</td>
      <td>Y</td>
      <td>Y</td>
    </tr>
    <tr>
      <td>Same Package Sub-Class</td>
      <td>N</td>
      <td>Y</td>
      <td>Y</td>
      <td>Y</td>
    </tr>
    <tr>
      <td>Other Package Class</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>Y</td>
    </tr>
    <tr>
      <td>Other Package Sub-Class</td>
      <td>N</td>
      <td>N</td>
      <td>Y</td>
      <td>Y</td>
    </tr>
  </tbody>
</table>
```
Now, the table has striped rows.
![image](/public/images/githubpages/914/table_striped.png)

## 2. Responsive Tables
If table has many columns, some of them may be cut off in small screen.
![image](/public/images/githubpages/914/table_partial.png){:width="450px"}
One solution is to create a responsive table. We can embed the table into a div, which has the class `table-responsive-sm`. Class table-responsive-sm is defined in Bootstrap 4 for creating responsive tables.
```raw
<div class="table-responsive-sm" markdown="block">  

Access Modifiers        | private | default | protected | public
------------------------|---------|---------|-----------|--------
Inside Class            | Y       | Y       | Y         | Y
Same Package Class      | N       | Y       | Y         | Y
Same Package Sub-Class  | N       | Y       | Y         | Y
Other Package Class     | N       | N       | N         | Y
Other Package Sub-Class | N       | N       | Y         | Y
{: .table-striped }

</div>
```
Once the table is generated in html, it looks like this.
```html
<div class="table-responsive-sm">

  <table class="table-striped">
    <thead>
      <tr>
        <th>Access Modifiers</th>
        <th>private</th>
        <th>default</th>
        <th>protected</th>
        <th>public</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Inside Class</td>
        <td>Y</td>
        <td>Y</td>
        <td>Y</td>
        <td>Y</td>
      </tr>
      <tr>
        <td>Same Package Class</td>
        <td>N</td>
        <td>Y</td>
        <td>Y</td>
        <td>Y</td>
      </tr>
      <tr>
        <td>Same Package Sub-Class</td>
        <td>N</td>
        <td>Y</td>
        <td>Y</td>
        <td>Y</td>
      </tr>
      <tr>
        <td>Other Package Class</td>
        <td>N</td>
        <td>N</td>
        <td>N</td>
        <td>Y</td>
      </tr>
      <tr>
        <td>Other Package Sub-Class</td>
        <td>N</td>
        <td>N</td>
        <td>Y</td>
        <td>Y</td>
      </tr>
    </tbody>
  </table>

</div>
```
One horizontal scrollbar is added to the table on screen.
![image](/public/images/githubpages/914/table_scroll.png){:width="450px"}

## 3. References
* [Adding a class to a table in markdown](https://gist.github.com/tamouse/4204dddabb6b072b0242)
* [Is there a way to overflow a markdown table using HTML?](https://stackoverflow.com/questions/41076390/is-there-a-way-to-overflow-a-markdown-table-using-html)
* [Bootstrap 4 Tables](https://www.w3schools.com/bootstrap4/bootstrap_tables.asp)
