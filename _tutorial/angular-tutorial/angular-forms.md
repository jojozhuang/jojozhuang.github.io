---
layout: tutorial
key: tutorial
title: "Angular - Forms"
index: 8318
subcategory: angular-tutorial
date: 2018-03-19
tags: [Angular, Forms]
---

> Learn how to use Forms module in Angular application.

## 1. Two Ways of Writing Forms
The Forms module offers two main way of working with forms: template-driven forms and reactive forms. Both ways work with the same Forms module.

## 2. Template-Driven Forms
Template forms use directives to create the form model objects.
* Advantages: Simple, quick to get started, perfect for simple forms, don’t need to know how form model objects work
* Disadvantages: HTML and business rules are coupled, no unit testing

### 2.1 Example
Create angular project with inline template and style.
```raw
$ ng new templateForm --inline-template --inline-style
```
Edit app.component.ts.
{% raw %}
```raw
import { Component, ViewChild } from '@angular/core';
import { NgForm, RequiredValidator } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form #f="ngForm" novalidate>
      <p>First Name <input name="fname" ngModel required /></p>
      <p>Last Name <input name="lname" ngModel required /></p>
      Valid: {{ f.valid }}
      Data: {{ f.value | json }}
    </form> `,
  styles: []
})

export class AppComponent {
  @ViewChild('f') f: NgForm;
}
```
{% endraw %}

## 3. Reactive Forms
In reactive forms, we build the model objects ourselves (including validation form rules), and the form binds (and syncs) to the template.
* Advantages: More control, perfect for more advanced forms, enable unit testing, HTML and business rules are decoupled.
* Disadvantages: Need to know how form model objects work, take more time to develop.

### 3.1 Example
Create angular project with inline template and style.
```raw
$ ng new reactiveForm --inline-template --inline-style
```
Edit app.component.ts.
{% raw %}
```raw
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators }
from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form #form [formGroup]="formGroup" (ngSubmit)="onSubmit(form)" novalidate>
      <label>Name:<input formControlName="name"></label><br/>
      <label>Location:<input formControlName="location"></label><br/>
      <input type="submit" value="Submit" [disabled]="!formGroup.valid">
    </form>
  `,
  styles: []
})

export class AppComponent implements OnInit{
  formGroup: FormGroup;

  ngOnInit(){
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
  }

  onSubmit(form: FormGroup){
    alert('sumit');
  }
}
```
{% endraw %}

### 3.2 FormBuilder
FormBuilder Methods

 Method    | Purpose               | Arguments  | Returns
-----------|-----------------------|------------|--------------------------------------------------------
group      | Create a form group   | Configuration object, extra parameters (validators, async validators) | FormGroup
control    | Create a form control | Current form state (value/disabled status), array of validators, array of async validators | FormControl
array      | Create a form array   | Configuration object (array), validator, async validator | FormArray

## 4. References
* [Book - Angular 5 Projects](https://www.amazon.com/Angular-Projects-Learn-Single-Applications/dp/148423278X)
* [Angular Doc - Forms](https://angular.io/guide/forms)
