---
layout: tutorial
key: tutorial
title: "Angular - Directives"
index: 8314
subcategory: angular-tutorial
date: 2018-03-13
tags: [Angular Directives]
---

> Learn to create and use directives in Angular application.

## 1. Introducing Directives
`Directives` are markers on a DOM element (such as an attribute) that tell Angular to attach a specified behavior to an existing element.
### 1.1 Types of Directives
Angular includes several structural directives for you to use in the template:
* NgIf
* NgFor
* NgSwitch, NgSwitchWhen, NgSwitchDefault

Angular also includes several non-structural directives for use in the template:
* NgClass
* NgStyle
* NgControlName
* NgModel

### 1.2 ngIf
The `ngIf` directive is used to include or exclude an element of the UI.
```html
<div *ngIf="this.showName" class="box">
  Name: Mark
</div>
<div *ngIf="!this.showName" class="box">
  Address: Atlanta
</div>
```
### 1.3 ngFor
The `ndFor` directive is useful for generating repeating content, such as a list of customers, elements of a dropdown, and so on.

Each item processed of the iterable has variables available in its template context, see table.

 Variable   | Description
------------|--------------------------
Item itself | example: ngFor="#name of names". In this case, the item has the variable name.
Index       | Current loop iteration for each template context.  
last        | Boolean value indicating whether the item is the last one in the iteration.
last        | Boolean value indicating whether this item has an even index.
odd         | Boolean value indicating whether this item has an odd index.

Example:
```html
<div *ngFor="let name of names; let i = index;">
  <div>{{i}}:&nbsp;{{name}}</div>
</div>
```
### 1.4 ngSwitch, ngSwitchWhen, and ngSwitchDefault
The `ngSwitch` directive is for adding or removing DOM elements when they match switch expressions.
```raw
<select [(ngModel)]="selection">
  <option *ngFor="let option of options">{{option}}</option>
</select>
<div [ngSwitch]="selection">
  <div class="block1" *ngSwitchCase="options[0]">name</div>
  <div class="block2" *ngSwitchCase="options[1]">address</div>
  <div class="block3" *ngSwitchDefault>other</div>
</div>
```
### 1.5 ngClass
The `ngClass` directive can change the appearance of DOM elements by adding or removing classes. Its argument is an object that contains pairs of the following:
* A CSS class name
* An expression

Class name
{% raw %}
```raw
<div [class]="classNames">Customer {{name}}.</div>
```
{% endraw %}
Expression
{% raw %}
```raw
<div [ngClass]="{'selected': type === `success`, 'unselected' : type === `error`}">{{description}}</div>
```
{% endraw %}
### 1.6 ngStyle
This is a directive for setting the CSS styles of an element.
{% raw %}
```raw
<div [ngStyle]="{'color': 'blue', 'font-size': '24px', 'font-weight': 'bold'}">{{text}}</div>
```
{% endraw %}

## 2. Creating Directives
Directives are very useful when reused to add common behavior to user interfaces. They’re often placed into shared modules so they can be reused across applications.
### 2.1 Generating New Directive
```raw
$ ng g directive sizer
```
### 2.2 Defining Behavior
Edit sizer.directive.ts: Change it to the following:
```typescript
import { Directive, Input, Component, ElementRef, Renderer, OnInit } from '@angular/core';
@Directive({
  selector: '[sizer]'
})
export class SizerDirective implements OnInit {
  @Input() sizer : string;
  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementStyle(this.element.nativeElement,'font-size', this.sizer);
  }
}
```
### 2.3 Using Directive
{% raw %}
```raw
<div sizer="72px">
    {{title}}
</div>
```
{% endraw %}
## 3. Accessing the DOM Events in Directives
Access the DOM events for the element linked to the directive. Angular provides different ways to access these events.
### 3.1 Using the Directive Element host
```typescript
@Directive({
  selector: 'input',
  host: {
    '(change)': 'onChange($event)',
    '(window:resize)': 'onResize($event)'
  }
})
class InputDirective {
  onChange(event:Event) {
    // invoked when the input element fires the 'change' event
  }
  onResize(event:Event) {
    // invoked when the window fires the 'resize' event
  }
}
```
### 3.2 HostListeners
Use HostListener annotations to bind a method in class to a DOM event.
```typescript
@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
}
@HostListener('mouseleave') onMouseLeave() {
  this.highlight(null);
}
private highlight(color: string) {
  this.el.nativeElement.style.backgroundColor = color;
}
```

## 4. Accessing the DOM Properties in Directives
The following code shows how to control the background color of the element by modifying the value of the backgroundColor instance variable.
```typescript
@Directive({
    selector: '[myHighlight]',
})
class MyDirective {
  @HostBinding('style.background-color') backgroundColor:string = 'yellow';
}
```
### 4.1 Creating a Directive with Events
```raw
$ ng g directive hoverer
```
Edit hoverer.directive.ts, change it to the following:
```typescript
import { Directive, Input, ElementRef, Renderer } from '@angular/core';
  @Directive({
    selector: '[hoverer]',
    host: {
      '(mouseenter)': 'onMouseEnter()',
      '(mouseleave)': 'onMouseLeave()'
    }
})

export class HovererDirective {
  @Input() hoverer;

  constructor(private elementRef:ElementRef, private renderer:Renderer) { }

  onMouseEnter(){
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'color', this.hoverer);
  }

  onMouseLeave(){
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'color', 'black');
  }
}
```
Usage
```html
<h1 hoverer="red">welcome to app!</h1>
```
Run the app, open the page, it should turn red when you hover over “welcome to app!”.

## 5. References
* [Book - Angular 5 Projects](https://www.amazon.com/Angular-Projects-Learn-Single-Applications/dp/148423278X)
* [Angular Doc - NgModules](https://angular.io/guide/ngmodules)
