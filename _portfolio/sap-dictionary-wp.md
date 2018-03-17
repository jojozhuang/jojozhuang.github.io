---
layout: portfolio
key: portfolio
title: "SAP Dictionary(WP)"
index: 60
tags: [Windows Phone, C#]
image: /public/portfolio/sapdictionarywp/thumbnail.png
excerpt: A WP App for searching SAP & ERP related words, built in C#.
category: mobileaa
---

> A WP App for searching SAP & ERP related words, built in C#.

## 1. Function
You can use it as a dictionary to search word from SAP area. Three options:  
* Glossary: Index by Alphabets
* Search: Search with input text
* 3-Character Classic: Search abbreviation word

Two languages are supported, English and German. There is a light-weight dictionary installed in the phone along with the app. This local dictionary contains partial data, and is stored in [SQLite3](https://www.sqlite.org/) database. Besides, there is a web server(built with ASP.Net) which provides service to feed full dictionary data. In case no result is matched from the local database, the app will connect to this web API for further search.  

## 2. Home screen  
![index](/public/portfolio/sapdictionarywp/index.png "index")  
### 2.1. Glossary
Click on any alphabet to get the list of the words started with that letter, then click on the word to see the description.
![searchindex](/public/portfolio/sapdictionarywp/searchindex.png "searchindex")
![result](/public/portfolio/sapdictionarywp/result.png "result")
### 2.2 Search  
Input free text for searching through keyboard
![inputsearch](/public/portfolio/sapdictionarywp/search.png "inputsearch")
### 2.3 3-Character Classic
Search abbreviation word, similar with Glossary.
![abbreviation](/public/portfolio/sapdictionarywp/abbreviation.png "abbreviation")
Result for abbreviation  
![result2](/public/portfolio/sapdictionarywp/result2.png "result2")
## 3. Settings
You can choose language and enable online search if no result found locally.  
![settings](/public/portfolio/sapdictionarywp/settings.png "settings")
## 4. Source Files
* [Source files of SAP Dictionary on Github](https://github.com/jojozhuang/Portfolio/tree/master/SAPDictionary/Src/DictionaryPhone)
