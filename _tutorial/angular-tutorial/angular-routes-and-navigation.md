---
layout: tutorial
key: tutorial
title: "Angular - Routes and Navigation"
index: 8317
subcategory: angular-tutorial
date: 2018-03-16
tags: [Angular Routes]
---

> Learn to use routing for manipulating page navigation in Angular application.

## 1. Page Navigation
Users navigate from one page to the next as they perform application tasks. Users can navigate in these ways:
* Entering a URL in the address bar
* Following links, clicking buttons, and so on
* Going backward or forward in the browser history

In Angular applications, users can navigate in the same three ways but they’re navigating through components. We can navigate because we have the Angular router.

### 1.1 Router Module
Objects in the Router Module

Object           | Type      | Description
-----------------|-----------|------------------
RouterModule     | Module    | A separate angular module that provides the necessary service providers and directives for navigating through application views.
Router           |           | Displays the application component for the active urL. Manages navigation from one component to the next.
Routes           |           | Defines an array of routes, each mapping a urL path to a component.
Route            |           | Defines how the router should navigate to a component based on a urL pattern. Most routes consist of a path and a component type.
RouterOutlet     | Directive | The directive (\<router-outlet\>) that marks where the router displays a view.
RouterLink       | Directive | The directive for binding a clickable htML element to a route. Clicking an element with a RouterLink directive that’s bound to a string or a link parameters array triggers a navigation.
RouterLinkActive | Directive | The directive for adding/removing classes from an htML element when an associated RouterLink contained on or inside the element becomes active/inactive.
ActivatedRoute   |           | A service that’s provided to each route component that contains route-specific information such as route parameters, static data, resolve data, global query params, and the global fragment.  
RouterState      |           | The current state of the router including a tree of the currently activated routes together with convenience methods for traversing the route tree.

### 1.2 Route Path Parameters
URL: http://www.example.com/customer/123

You can read the parameter from the route snapshot.
```typescript
constructor(route: ActivatedRoute) {
    this.customerId = route.snapshot.paramMap.get('id');
}
```
Or, you can read the parameter by subscribing to an observable parameter map.
```typescript
constructor(route: ActivatedRoute) {
  route.paramMap.subscribe(
    params => this.customerId = params.get('id')
  );
}
```

### 1.3 Route Query Parameters
URL: http://www.example.com/customer?id=123.

You can read the query parameter from the route snapshot.
```typescript
constructor(route: ActivatedRoute) {
  this.customerId = route.snapshot.queryParams['id'];
}
```
You can read the parameter by subscribing to an observable query parameter map.
```typescript
constructor(route: ActivatedRoute) {
  route.queryParams.subscribe(
    params => this.customerId = params.get('id')
  );
}
```

### 1.4 Example
Define four routings.
```typescript
const routes: Routes = [
    { path: "", component: HomepageComponent },
    { path: "signup", component: SignupComponent },
    { path: "login", component: LoginComponent },
    // otherwise redirect to home
    { path: "**", redirectTo: "" }
]
```
Use routerLink directive to create link.
```html
<a routerLink="home">Home</a>
<a routerLink="signup">Sign Up</a>
<a routerLink="login">Login</a>
```

## 2. Router Imperative Navigation
Imperative navigation is not generating links; it’s simply telling the router to go somewhere, performing navigation in your code. The two methods are Router.navigate() and Router.navigateByUrl().

* `navigate()`: This navigates to a component relatively (to the current route) or absolutely based on an array of commands or route elements.
* `navigateByUrl()`: This navigates to a complete absolute URL string. If the given URL begins with a /, the router will navigate absolutely. If the given URL doesn’t begin with /, the router will navigate relative to this component.

Example, redirect to login page if user has not logged in.
```typescript
ngOnInit() {
    if (!this.auth.isLoggedIn()) {
        // not logged in so redirect to login page
        this.router.navigate(["/login"]);
    }
}
```

## 3. Router: Extracting Data
Extracting Data from Router.

 Property           | Description
--------------------|-------------------
errorHandler        | Error handler that’s invoked when a navigation errors
navigated           | Indicates if at least one navigation happened
urlHandlingStrategy | URL handling strategy
routeReuseStrategy  | Route reuse strategy
routerState         | Current router state
url events          | Current URL
error               | An observable of router events, allows you to add callbacks to router events

## 4. Route Guards
Sometimes the user needs to do something before being allowed access to a certain part of the application—for example, log in. Route guards can be used to control access to certain routes.

There are two main types of route guards:
* CanActivate: Can the user navigate to a route? In this class, you can inject the router. This is useful to navigate the user away to another resource if the user isn’t allowed to navigate to a route.
* CanDeactivate: Can the user move away from a route? Useful for prompting to save changes.

Allow to access only if user has logged in.
```typescript
import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isLoggedIn()) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    return true;
  }
}
```
Usage, add 'canActivate' option to the route. For example, Profile component can only be accessed after user logged in, otherwise, user will be redirected to the login page.
```typescript
const routes: Routes = [
    { path: "", component: HomepageComponent },
    { path: "signup", component: SignupComponent },
    { path: "login", component: LoginComponent },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuardService]},
    // otherwise redirect to home
    { path: "**", redirectTo: "" }
]
```

## 5. References
* [Book - Angular 5 Projects](https://www.amazon.com/Angular-Projects-Learn-Single-Applications/dp/148423278X)
* [Angular Doc - Routing & Navigation](https://angular.io/guide/router)
