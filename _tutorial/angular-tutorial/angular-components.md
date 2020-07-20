---
layout: tutorial
key: tutorial
title: "Angular - Components"
index: 8311
subcategory: angular-tutorial
date: 2018-03-10
tags: [Angular Components]
---

> Learn to create and use components in Angular application.

## 1. Introducing Components
Normally each component contains three files because there are three parts to a component: the template, the class, and the style. This is how the CLI works by default. For example, when you create an app in the CLI using the command 'ng new [project name]', the CLI generates three files for the app component (more if you include .spec.ts testing files):
* app.component.css: Style
* app.component.html: Template
* app.component.ts: Class

More options for components:
* *Include the style in the .ts class file*: This is called an `inline style` and it saves you having to have a style file for the component. As mentioned in the previous chapter, use the CLI `--inline-style` argument to generate components with inline styles.
* *Include the template in the .ts class file*: This is called an `inline template` and it saves you having to have a template file for the component. As mentioned in the previous chapter, use the CLI `--inline-template` argument to generate components with inline styles.
* *Include multiple component classes in the same file*: You can combine multiple components in the same file, like this:
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'Paragraph',
  template: `
  <p><ng-content></ng-content></p>
  `,
  styles: ['p { border: 1px solid #c0c0c0; padding: 10px }']
})
export class Paragraph {
}
@Component({
  selector: 'app-root',
  template: `
  <p>
  <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Paragraph>
  <Paragraph>Praesent eget ornare neque, vel consectetur eros. </Paragraph>
  </p>
  `,
  styles: ['p { border: 1px solid black }']
})
export class AppComponent {
  title = 'welcome to app!';
}
```

## 2. Component Annotation
### 2.1 Annotations
The annotation is located near the top of the class and is the most important element of it. It’s a function that marks the class as a component and accepts an object. It uses the object to provide metadata to Angular about the component and how to run it. Annotations are also known as decorators.
### 2.2 @Component
See the following @Component annotation which is in the app component.
```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```
### 2.3 Basic Elements
The basic elements you can add to the @Component annotation.

Annotation Element   | Description
---------------------|--------------------------------------
selector             | What markup tag, element this component corresponds to.
template/templateUrl | Specifies the template, which contains the markup for the component. You have two options: you can use `template` to specify the template inline in a block of quotes. this works great for simple templates. Or you can use `templateUrl` to specify the relative path to an external template file. This is better for larger or more complicated template.
styles/styleUrls     | Specifies the Css information for the template markup. You have two options: you can use `styles` to specify an array of styles inline. this works great for just a couple of style definitions. Or you can use `styleUrls` to specify an array of relative paths to style definition files.

### 2.4 Component Templates
Template Location: The template markup can be included in the same file as the Component class, or it can be in a separate file.

```typescript
@Component({
  selector: 'app-root',
  template: `
  <div class='app'>
  [app]
  <app-customer-list>
  </app-customer-list>
  </div>
  `,
  styles: ['.app {background-color:#d5f4e6;margin:10px;padding:10px;}']
})
// or
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```

## 3. Elvis Operator
The Elvis operator is a question mark in the template expression next to the variable that may be null. This operator is also known as the ‘safe navigation operator’, which handles null values.
{% raw %}
```raw
Total {{x.totalAmt}}     // error occurs if x is null
Total {{x?.totalAmt}}    // exit if x is null
Total {{x?.amt?.total}}  // multiple Elvis operators
```
{% endraw %}

## 4. Data Binding
### 4.1 Types of Data Binding
Data binding is what made Angular so popular—the synchronization of elements of the component UI widget to the data in  component classes, and vice versa.
There are two main types of data-binding: one-way and two-way:
* One-way data binding: This can occur when the template (the View) is automatically kept up-to-date with the latest values in the class instance variables (the Model). Updates flow in only one direction. One-way data binding can also occur when the class instance variables (the Model) are automatically kept up-to-date with values input from the template (the View). Updates still flow in only one direction.
* Two-way data binding: This is when the class instance variables (the Model) and the template (the View) keep each other up-to- date.

### 4.2 One-Way Data Binding with \{\{ and \}\}
Those double curly braces are also known as moustaches or interpolation. The double curly braces are used for one-way binding a template expression, making a calculation from available data in the Model and including it in the View.
{% raw %}
```typescript
{{2+2}}
{{firstName}}
{{1 + 1 + getVal()}}
```
{% endraw %}
### 4.3 One-Way Data Binding with [ and ] or *
The square braces can be used for one-way binding.

Data Binding Target Markup

Markup                                            | Description
--------------------------------------------------|-----------------------------------------------------
<img [src] = "imageUrl">                          | sets image source to property imageUrl in the model.  
<div [ngClass] = "{selected: isSelected}"> </div> |  sets Css class according to property isSelected in the model.
<car-detail [car]="selectedCar"></car-detail>     |  sets the car attribute of the car-detail to property selectedCar in the model. the car-detail could be a component, and this would pass information from the current template to that component using the car attribute.
<button [style.color] = "isSpecial ? 'red' : 'green'">  |   sets the button color according to property isSpecial in the model.

### 4.4 Two-Way Data Binding with [( and )]
`[()]` is also known as banana in a box.
```typescript
[(Data Binding Target)] = "Property"
```
* 'Data Binding Target' is something in the DOM (including Component and Directive tags) that can be bound to the property of the expression to the right side of the target. For the input box, the data binding target is `ngModel`, which corresponds to the text in the input box.

## 5. Event Handling
### 5.1 Format
```typescript
(Target Event) = "Template Statement"
```
* The event information is available in the `$event` variable, which may or may not be utilized.

### 5.2 Example
In html, define a event for an input control.
```javascript
<input #input type="text" (input)="textInput($event)" value=""/>
```
In class, define a method to respond the event. It receive the input value and convert it to upper case and lower case.
```typescript
@ViewChild('input') inputBox;

textInput(event){
    this.upperCase = event.target.value.toUpperCase();
    this.lowerCase = event.target.value.toLowerCase();
}
```
### 5.3 Set Focus
The following codes show how to set focus for the input control when page is initially loaded.
```typescript
ngAfterViewInit() {
    this.inputBox.nativeElement.focus()
}
```

## 6. CDK
The Angular CDK (Component Development Kit) was released in 2017 with Angular 5. Its purpose is to enable developers to create high-quality Angular custom components. The CDK is contains services, directives, components, classes and modules. The CDK contains code for component accessibility, text directionality, platform detection, and dynamic component instantiation. If you really want to get into building your own library of custom reusable components then you will need to install the `@angular/cdk` node module and get started.

## 7. References
* [Book - Angular 5 Projects](https://www.amazon.com/Angular-Projects-Learn-Single-Applications/dp/148423278X)
* [Angular Official website](https://angular.io/)
* [Angular Component](https://angular.io/api/core/Component)
