---
layout: tutorial
key: tutorial
title: "Angular - Dependency Injection"
index: 8315
subcategory: angular-tutorial
date: 2018-03-14
tags: [Dependency Injection]
---

> Learn Dependency Injection and how to use it in Angular application.

## 1. Dependency Injection
In software engineering, `dependency injection` is a software design pattern that implements inversion of control for resolving dependencies. A `dependency` is an object that can be used (a service). An `injection` is the passing of a dependency to a dependent object (a client) that would use it.

Some of the advantages of dependency injection include the following:
* Your code is cleaner and more readable.
* Objects are loosely coupled.
* Possible to eliminate, or at least reduce, a component’s unnecessary dependencies.
* Reducing a component’s dependencies typically makes it easier to reuse in a different context.
* Increases a component’s testability.
* Moves the dependencies to the interface of components, so you don’t reference the dependencies explicitly—you reference them via interfaces.

## 2. Services and Providers
Angular’s Provided Services:

Service   | Description
----------|----------------------------------------
Http      | For HTTP communication with the server
Form      | Form handler code
Router    | Page navigation code
Animation | UI animations
Library   | For example, NgBootstrap

## 3. Services
### 3.1 @Injectable() Annotation
When you write services, you typically write them as TypeScript classes, with one file (filename.service.ts) per class. It’s a good idea to mark these classes as injectable using the `@Injectable()` annotation. @Injectable() marks a class as available to an injector for instantiation.

```typescript
// car.service.ts
import { Injectable } from '@angular/core';
@Injectable()
export class CarService {
    constructor(){
        console.log('CarService: constructor');
    }
    // Some dummy method.
    isSuperCharged(car: string){
        return car === 'Ford GT' ? 'yes' : 'no';
    }
}
```
### 3.2 Using Services
Import the service, add it to providers and inject it in constructor.
```typescript
// app.component.ts
import { CarService } from './car.service';

@Component({
    selector: 'car',
    template: `
    <h3>
      {{name}} Is Supercharged: {{supercharged}}
    </h3>
    `,
    styles: [],
    providers: [CarService]
})

export class CarComponent implements OnInit{
    @Input() name;
    supercharged: string = '';

    constructor(private service: CarService){}

    ngOnInit(){
        this.supercharged = this.service.isSuperCharged(this.name);
    }
}
```
### 3.3 Best Practice
If multiple components reply on this service, then it will be referenced by many times, and there are several instances of this service. Actually, we can share one instance of the service in the whole angular application. All you need to do is to push service class to app component or to the app.module.ts to avoid creating duplicated service instances.

## 4. Providers
There are three types of providers:
* class providers
* factory providers
* value providers.

### 4.1 Class Providers
{% raw %}
```raw
class Watch {
  getTime(): string {
    return new Date() + "";
  }
}
class Seiko extends Watch {
   getTime(): string{
     return "Seiko Time:" + super.getTime();
   }
}
@Component({
  selector: 'app-root',
  template: `
  <h1>
    {{watch.getTime()}}
  </h1>
  `,
  styles: [],
  providers: [{
    provide: Watch,
    useClass: Seiko
  }]
})
export class AppComponent {
  constructor(private watch:Watch){}
}
```
{% endraw %}
Notice the providers, useClass.
### 4.2 Factory Provider
```raw
providers: [{
  provide: LoggingService,
  useFactory: () => new LoggingService(LOGGING_USE_DATE);
]}
```

### 4.3 Value Provider
```typescript
providers: [{
  provide: 'language',
  useValue: 'en'
}]
```

## 5. Injector API
If you want even more control over creating dependencies, you can access the Injector object directly. The Injector is a class in the Angular core package. It’s a dependency injection container used for instantiating objects and resolving dependencies.
```typescript
import { Injector } from '@angular/core';
const injector = Injector.resolveAndCreate([Car, Engine, Tires, Doors]);
const car = injector.get(Car);
```
Another example.
```typescript
import { Injector } from '@angular/core';
const injector = Injector.resolveAndCreate(
  [
    provide(Car, useClass: Car)),
    provide(Engine, useClass: Engine)),
    provide(Tires, useClass: Tires)),
    provide(Doors, useClass: Doors))
 ]
);
const car = injector.get(Car);
```

## 6. References
* [Book - Angular 5 Projects](https://www.amazon.com/Angular-Projects-Learn-Single-Applications/dp/148423278X)
* [Angular Doc - Providers](https://angular.io/guide/providers)
* [Angular Doc - Services](https://angular.io/tutorial/toh-pt4)
