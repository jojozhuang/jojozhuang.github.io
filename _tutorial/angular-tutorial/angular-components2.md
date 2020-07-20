---
layout: tutorial
key: tutorial
title: "Angular - Components 2"
index: 8312
subcategory: angular-tutorial
date: 2018-03-11
tags: [Angular Components]
---

> Learn more advanced knowledge of components.

## 1. More Components
### 1.1 Data Flowing Downwards
Data should flow downwards from higher-level components to lower-level components.
### 1.2 Events Flowing Upwards
Parent components need to have code that responds to things happening (events) on child components. Events should flow upwards, emitted upwards from lower-level components and responded to by higher-level components.
### 1.3 Emitting Output through @Output( )
```typescript
export class CarComponent {
  @Input('theCar') car: ICar;
  @Output() carDelete = new EventEmitter();

  delete(car: ICar){
     this.carDelete.emit(car);
  }
}
```
## 2. Template Reference Variables
A template reference variable is a reference to one or more elements within a template. You can use the `ref-` prefix instead of `#`.  
ViewChild:
{% raw %}
```raw
<h1 #title></h1>
The title is {{title.innerHTML}}
```
{% endraw %}
```typescript
export class AppComponent implements AfterViewInit  {
  @ViewChild('title') title: ElementRef;
  ngAfterViewInit(){
    this.title.nativeElement.innerHTML = 'app works differently!'
  }
}
```
ViewChildren:
{% raw %}
```raw
<p #paragraph1>hello, world</p>
<p #paragraph2>Good morning</p>
<p *ngIf="note">{{note}}</p>
```
{% endraw %}
```typescript
export class AppComponent implements AfterViewInit{
  @ViewChildren('paragraph1, paragraph2') paragraphs;
  note: string = '';
  ngAfterViewInit(){
    setTimeout(_ => this.note = 'Number of Paragraphs:' +
    this.paragraphs.length);
  }
}
```

## 3. NgContent and Transclusion
* ContentChild
* ContentChildren

## 4. Component Class Lifecycle
### 4.1 Constructor vs. OnInit
The OnInit lifecycle method is fired when the component is first initialized. We mostly use ngOnInit for initialization/declaration and avoid work in the constructor. the constructor should only be used to initialize class members but shouldn’t do actual “work”.
```typescript
import {Component, OnInit} from '@angular/core';
export class Users implements OnInit{

    user_list: Array<any>;

    constructor(private _userService: UserService){
    };

    ngOnInit(){
        this._userService.getUsersFromService().subscribe(users =>  this.user_list = users);
    };
}
```

ngAfterViewInit
```typescript
@ViewChildren("username") inputUserName;
ngAfterViewInit() {
  this.inputUserName.first.nativeElement.focus();
}
```

## 4.2 Interfaces
To hook into a lifecycle method, your component’s class should implement the required interface. The interface will then force you to implement the corresponding method.

Interfaces and Methods

 Interface          | Method                | Description
--------------------|-----------------------|--------------------------------------------------------
OnChanges           | ngOnChanges           | Called when an input or output binding value changes
OnInit              | ngOnInit              | After the first ngOnChanges
DoCheck             | ngDoCheck             | Developer’s custom change detection
AfterContentInit    | ngAfterContentInit    | After component content initialized
AfterContentChecked | ngAfterContentChecked | After every check of component content
AfterViewInit       | ngAfterViewInit       | After component's view(s) are initialized
AfterViewChecked    | ngAfterViewChecked    | After every check of a component's view(s)
OnDestroy           | ngOnDestroy           | Just before the directive is destroyed

## 5. References
* [Book - Angular 5 Projects](https://www.amazon.com/Angular-Projects-Learn-Single-Applications/dp/148423278X)
* [Angular Component](https://angular.io/api/core/Component)
