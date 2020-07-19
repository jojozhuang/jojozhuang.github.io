---
layout: tutorial
key: programming
title: "Java Advanced - Object Class - Draft"
index: 2462
subcategory: java-advanced
date: 2017-03-02
tags: [Encryption, Decryption]
draft: true
---

> Create concurrent application with threadings.

Its java.lang.Object. Internally all Java class extends this class.

Object class provides methods like

1. toString() :- this method allows you to convert your Java Class to String object where you can specify, how to convert your class to String object. For ex, If you do not override toString method and print using Sytem.out to your console, it will print something like java,lang.Object@1234, well thats not usefull at all, however if you override toString method something like this :-
```
@Override
public String toString() {
   return this.name;
}
Now, if you print, it will print value of name on called object.
```
2. public int hashCode() :- This method allows you to create a hashCode on given object , which you can later use to compare to Object if they are equal or not. For ex, If you are storing bunch of object in Set collection, in this case Set looks for hasCode method to compare equality and if two different object have same hashCode, Set will not allow to add the later object
3. public boolean equals(Object o):- This method take a Object type and compare with the current object if its equal or not. In the method body you can specify which variables to be used while comparing.


https://www.geeksforgeeks.org/equals-hashcode-methods-java/
https://www.quora.com/Which-is-the-base-class-of-all-class-in-java


Why is char[] preferred over String for passwords?
Strings are immutable. That means once you've created the String, if another process can dump memory, there's no way (aside from reflection) you can get rid of the data before garbage collection kicks in.
https://stackoverflow.com/questions/8881291/why-is-char-preferred-over-string-for-passwords


final keyword in java
* Final variable: to create constant variables.
* Final methods: prevent method overriding
* Final class: prevent inheritance
https://www.geeksforgeeks.org/final-keyword-java/
