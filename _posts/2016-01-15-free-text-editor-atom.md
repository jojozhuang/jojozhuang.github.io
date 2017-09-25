---
layout: post
key: blog
title: "Free Text Editor - Atom"
date: 2016-01-15
tags: [Atom]
---

> I use [Atom](https://atom.io/) to create blogs for this website. The main reason I choose Atom is because it is a cross-platform text editor. You can have the same user experience when using it on MacBook as well as on Linux.

## 1. What is Atom?
Atom is a free and open-source text editor with support for plug-ins. It is available on OS X, Windows, or Linux, a cross-platform editor! You can use Atom as generic text editor to edit MarkDown documents. You can also use it as IDE for software development. For example, it supports you to develop responsive website with AngularJS. The highlight feature in Atom makes easy for you to edit source code in different formats, like javascript, html, etc.
![MIME Type](/public/pics/2016-01-15/atom.png)  

## 2. Install Atom
Go to [https://atom.io/](https://atom.io/), download the proper installer of different versions. For Mac or Windows, just click the installer and follow the wizard to install it. For linux, run the following commands in terminal to install it.
```sh
sudo rpm -i atom_amd64.rpm  // for RedHat
sudo dpkg -i atom_amd64.deb // for Ubuntu
```

## 3. Plug-In System for Atom
There are lots of plug-ins available for Atom. They make Atom be more powerful.

## 3.1 Search and Install Plug-In
Atom->Preferences->Install, search package. Click 'Install' button of the package you want to install.
![MIME Type](/public/pics/2016-01-15/installplugin.png)  

## 3.2 Popular Plug-Ins
* Compare File  
[https://atom.io/packages/compare-files](https://atom.io/packages/compare-files)  
Select two files, then Command + Shift + P, search 'Compare', click command button, you will see the diff.
![MIME Type](/public/pics/2016-01-15/compare.png)  

* Minimap  
[https://atom.io/packages/minimap](https://atom.io/packages/minimap)  
After it is installed, you will see a small map at the right of the editor. This is useful when the document you are editing is very large and has many pages.
![MIME Type](/public/pics/2016-01-15/minimap.png)  

* MarkDown-Writter  
[https://atom.io/packages/markdown-writer](https://atom.io/packages/markdown-writer)  
Below steps show how to insert table into markdown document.  
1) Put the cursor to where you want to insert table, Command + Shift + P, search 'markdown writer: insert table'.  
![MIME Type](/public/pics/2016-01-15/tablekey.png)  
2) Specify the number for rows and columns.  
![MIME Type](/public/pics/2016-01-15/table64.png)  
3) Table is inserted to document. You can now add content into it.  
![MIME Type](/public/pics/2016-01-15/tablecreated.png)  
4) Table shown in html page.  
![MIME Type](/public/pics/2016-01-15/tablehtml.png)  

* Atom-Shortcuts  
[https://atom.io/packages/atom-shortcuts](https://atom.io/packages/atom-shortcuts)  
Click and hold Ctrl Key on Mac, you will see the common shortcuts.
The most important shortcut key is 'Command + Shift + P'(Toggle command palette).
![MIME Type](/public/pics/2016-01-15/shortcut.png)  

## 4. Work with MarkDown
## 4.1 MarkDown Syntax
Before trying to use MarkDown to edit documents, you should first get familiar with the MarkDown syntaxes.
Some syntax samples for [Github MarkDown](https://guides.github.com/features/mastering-markdown/).

## 4.2 MarkDown Preview in Atom
When using Atom, you can use the preview function before submitting the document.  
Right click on the file you are editing, choose MarkDown Preview at the top of context menu.
![MIME Type](/public/pics/2016-01-15/preview.png)  

## 5. References
* [https://atom.io/](https://atom.io/)
