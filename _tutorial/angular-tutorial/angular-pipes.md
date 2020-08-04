---
layout: tutorial
key: tutorial
title: "Angular - Pipes"
index: 8319
subcategory: angular-tutorial
date: 2018-03-20
tags: [Angular, Pipes]
---

> Learn how to create and use pipes in Angular application.

## 1. Pipes
Pipes are useful at transforming data, especially when the same transformation is used throughout the application. Pipes make it easy to add these transformations into your component template.

## 2. Angular Pipes
Angular includes several pipes to add to your template. You can use them without importing them or add them as directives.
### 2.1 lowercase
{% raw %}
```raw
Lowercase: {{ "The Quick Brown Fox Jumped Over The Lazy Dogs" | lowercase }}
```
{% endraw %}
Produces:
```raw
Lowercase: the quick brown fox jumped over the lazy dogs
```
### 2.2 uppercase
{% raw %}
```raw
Uppercase: {{ "The Quick Brown Fox Jumped Over The Lazy Dogs" | uppercase }}
```
{% endraw %}
Produces:
```raw
Uppercase: THE QUICK BROWN FOX JUMPED OVER THE LAZY DOGS
```
### 2.3 currency
{% raw %}
```raw
Currency: {{ 2012.55 | currency }}
```
{% endraw %}
Produces:
```raw
Currency: USD2,012.55
```
### 2.4 UK (gbp) pound currency
{% raw %}
```raw
UK Pound Currency: {{ 2012.55 | currency: 'gbp':true }}
```
{% endraw %}
Produces:
```raw
UK Pound Currency: £2,012.55
```
### 2.5 percent
{% raw %}
```raw
Percentage: {{ 0.5 | percent }}
```
{% endraw %}
Produces:
```raw
Percentage: 50%
```
### 2.6 date
{% raw %}
```raw
Date: {{ dt | date }}
```
{% endraw %}
Produces:
```raw
Date: Jul 12, 2017
```
### 2.7 shortdate
{% raw %}
```raw
Short Date: {{ dt | date:shortdate }}
```
{% endraw %}
Produces:
```raw
Short Date: Jul 12, 2017
```
### 2.8 Special Date Format
{% raw %}
```raw
Special Date Format: {{ dt | date:'yMMMMEEEEd' }}
```
{% endraw %}
Produces:
```raw
Special Date Format: Wednesday, July 12, 2017
```

Predefined Date Formats

Name       | Format     | Example
-----------|------------|-----------------
medium     | yMMMdjms   | Sep 3, 2010, 12:05:08 PM
short      | yMdjm      | 9/3/2010, 12:05 PM
fullDate   | yMMMMEEEEd | Friday, September 3, 2010
longDate   | yMMMMd     | September 3, 2010
mediumDate | yMMMd      | Sep 3, 2010
shortDate  | yMd        | 9/3/2010
mediumTime | jms        | 12:05:08 PM  
shortTime  | jm         | 12:05 PM

### 2.9 json
{% raw %}
```raw
{{ {customerName: 'Mark', 'address': '2312 welton av 30333'} | json }}
```
{% endraw %}
Produces:
```raw
{ "customerName": "Mark", "address": "2312 welton av 30333" }
```

## 3. Custom Pipes
### 3.1 Creating Pipe
Generate a custom pipe.
```raw
$ ng generate pipe reverse
```
### 3.2 Pipe Definition
Edit reverse.pipe.ts, ReversePipe returns the reversed text.
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})

export class ReversePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let spaces = 0;
    if (args){
      spaces = parseInt(args);
    }
    let reversed = '';
    for (let i=value.length-1;i>=0;i--){
      reversed += value.substring(i, i+1);
      reversed += Array(spaces + 1).join(' ');
    }
    return reversed;
  }
}
```
* The class ReversePipe implements the `PipeTransform` interface as any pipe would.

### 3.3 Usage in Component
Edit app.component.ts.
{% raw %}
```raw
import { Component } from '@angular/core';
import { ReversePipe } from './reverse.pipe';

@Component({
  selector: 'app-root',
  template: `
    <p>My name is {{name | reverse}}
    <p>My name is {{name | reverse:5}}
  `,
  styles: []
})

export class AppComponent {
  name: string = 'Johnny';
}
```
{% endraw %}

## 4. References
* [Book - Angular 5 Projects](https://www.amazon.com/Angular-Projects-Learn-Single-Applications/dp/148423278X)
* [Angular Doc - Pipes](https://angular.io/guide/pipes)
