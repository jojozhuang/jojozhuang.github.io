---
layout: post
key: blog
title: "Tracking Changes with Blame View on GitHub"
date: 2018-09-01
subcategory: blog
tags: [GitHub]
---

> View entire change history of a file on GitHub.

## 1. Annotation/Blame
Most source-control systems allow users to view files in `annotated` or `blame` mode, in which each line or block of lines is identified by the revision and the user who last modified it.

## 2. Blame View on GitHub
On GitHub, we can view the line-by-line revision history for an entire file through the blame view. See the example below:
![image](/public/images/blog/2018-09-01/blame_example.png)

## 3. How To
Open any file in your GitHub Repository.
![image](/public/images/blog/2018-09-01/file.png)
Click the blank area at the left side of line numbers, a '...' button appears.
![image](/public/images/blog/2018-09-01/linebar.png)
Choose 'View git blame' option in the context menu.
![image](/public/images/blog/2018-09-01/contextmenu.png)
You will see the blame view.
![image](/public/images/blog/2018-09-01/blameview.png)

## 4. Reference
* [Tracking changes in a file](https://help.github.com/articles/tracking-changes-in-a-file/)
