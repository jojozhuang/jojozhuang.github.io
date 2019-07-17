---
layout: tutorial
key: note
title: "Security"
index: 9511
subcategory: design-knowledge
date: 2019-01-25
tags: [Security]
---

> Security

## 1. Security
Security is a broad topic.  Unless you have considerable experience, a security background, or are applying for a position that requires knowledge of security, you probably won't need to know more than the basics:

* Encrypt in transit and at rest.
* Sanitize all user inputs or any input parameters exposed to user to prevent [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) and [SQL injection](https://en.wikipedia.org/wiki/SQL_injection).
* Use parameterized queries to prevent SQL injection.
* Use the principle of [least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).

## 2. Password
### 2.1 Hashing, Salt, Pepper, Bcrypt
* [Password Hashing, Salts, Peppers](https://www.youtube.com/watch?v=--tnZMuoK3E)
* [Passwords & hash functions (Simply Explained)](https://www.youtube.com/watch?v=cczlpiiu42M)
* [How Dropbox securely stores your passwords](https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/)

## 3. Reference
* [Security guide for developers](https://github.com/FallibleInc/security-guide-for-developers)
* [OWASP top ten](https://www.owasp.org/index.php/OWASP_Top_Ten_Cheat_Sheet)
