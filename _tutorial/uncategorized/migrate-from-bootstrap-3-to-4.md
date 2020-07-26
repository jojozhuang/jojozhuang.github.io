---
layout: tutorial
key: tutorial
title: "Migrate from Bootstrap 3 to 4 - Draft"
index: 9727
subcategory: uncategorized
date: 2019-05-11
tags: [Bootstrap]
draft: true
---

> Upgrade bootstrap from 3 to 4 for jojozhuang.github.io.

## 1. Difference between 3 and 4

## 2. Migration
### 2.1 Git Branch
I create a [new branch ](https://github.com/jojozhuang/jojozhuang.github.io/tree/bootstrap-4) for this migration.
The pull request is [here](https://github.com/jojozhuang/jojozhuang.github.io/pull/1/commits).
```raw
git checkout -b bootstrap-4
```
### 2.2 References for CSS and JS
Add css and js reference of Bootstrap 4 to index page.
```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
```
```html
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
```
### 2.3 Navigation Bar
### 2.4 Highlight
### 2.5 Icon
Use font awesome to replace Glyphicons.

## 3. References
* [Bootstrap 4 - Introduction](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [Migrating to v4 - Official Tutorial](https://getbootstrap.com/docs/4.0/migration/)
* [Bootstrap 4 - Components](https://getbootstrap.com/docs/4.0/components/badge/)
* [Upgrade to Bootstrap 4 - Diff between 3 and 4](http://upgrade-bootstrap.bootply.com/)
* [Bootstrap 4 Tutorial](https://www.w3schools.com/bootstrap4/default.asp)
* [Font Awesome](https://www.w3schools.com/icons/fontawesome_icons_intro.asp)
