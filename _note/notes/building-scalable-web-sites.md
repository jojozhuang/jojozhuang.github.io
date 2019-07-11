---
layout: tutorial
key: note
title: "Building Scalable Web Sites"
index: 9102
category: notes
breadcrumb: [Note, Work Space, Book Notes]
image: note.png
date: 2017-07-02
postdate: 2017-07-02
tags: [Scalable]
---

> Notes of Book: Building Scalable Web Sites

## 1. Introduction
aAcontinuous spectrum called the Web Applications Scale of Stupidity
```sh
OGF <---------- sanity ----------> OOP
```
* The spectrum runs from One Giant Function on the left through to Object-Oriented Programming on the right.
* As you move further right, you gain maintainability at the expense of flexibility.
* As you move left, you lose the maintainability but gain flexibility.
* As you move too far out to either edge, optimizing your application becomes harder, while architecture becomes easier.

### 1.2 NetWorking
The classic seven-layer OSI model has lately been replaced by the easier-to- understand four-layer TCP/IP model.
![image](/public/images/note/building-scalable-web-sites/tcpip_model.png){:width="800px"}  

## 2. Development Environments
The Three Rules
* Use source control.
* Have a one-step build.
* Track your bugs.

Work Environment
* development (may have personal development environments)
* staging
* production

Release Management
* Develop in branch, merge after development is finished.
* Keep everything in trunk, use feature toggle or parameter to control the release.

Issue Tracking: High-level categorization
* S1/High
* S2/Medium
* S3/Low

## 3. i18n, L10n, and Unicode4
Difference:
* `Internationalization` is adding to an application the ability to input, process, and output international text.
* `Localization` is the process of making a customized application available to a specific locale.

* globalization(g11n) -> i18n and L10n
* personalization (p13n) -> L10n only

Unicode, UTF-8,

Unicode Encodings:
* fixed-width encoding: UTF-32 and UCS2
* variable-length encoding: UTF-7, UTF-8, UTF-16

UTF-32: U+0000 to U+FFFFFFFF.
UCS2: U+0000 to U+FFFF

UTF-8 = ISO 10646


Code Points and Characters, Glyphs and Graphemes



## 9. Reference
* [Book of Building Scalable Web Sites](https://www.amazon.com/Building-Scalable-Web-Sites-Applications/dp/0596102356)
