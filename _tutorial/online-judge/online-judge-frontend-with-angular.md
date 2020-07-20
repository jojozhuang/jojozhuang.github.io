---
layout: tutorial
key: tutorial
title: "Online Judge - Frontend with Angular"
index: 9003
subcategory: online-judge
date: 2018-04-11
tags: [Angular]
---

> Setup frontend UI for Online Judge app with Angular.

## 1. Project Structure
### 1.1 Client Files
All source files for client is under './src' folder.
### 1.2 Angular Project
This app is created by 'ng new' command with Angular CLI.

## 2. Main Components
Separate app functions to different components as follows.

Component   | Path                    | Description
------------|-------------------------|---------------------------
component   | './src/app/component'   | UI components
interceptor | './src/app/interceptor' | HTTP interceptor
model       | './src/app/models'      | Model class
service     | './src/app/services'    | HTTP services to communicate with backend RESTful services
util        | './src/app/util'        | Helper class

### 2.1 UI Components
The app page contains 5 components. In './src/app/components/pages/app.component.html', setup the app page as follows.
```html
<div class="mainpage">
  <app-widget-progress-bar></app-widget-progress-bar>
  <app-header></app-header>
  <app-alert></app-alert>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
</div>
```
Details are explained in the table.

selector                | Description        
------------------------|-----------------------------------------------------
app-widget-progress-bar | Progress bar displays whenever Http request happens
app-header              | Top menus
app-alert               | Common alert dialog, eg. Save, Submit
router-outlet           | Angular Routing, navigate to sub component
app-footer              | Footage of the app

### 2.2 Http Interceptor
Use HttpInterceptor to intercept and modify HTTP requests globally.

File Name              | Class Name             | Description        
-----------------------|------------------------|-------------------------------------------
cookie.interceptor.ts  | CookieHttpInterceptor  | Manipulate Cookies settings on request
error.interceptor.ts   | ErrorHttpInterceptor   | Handle http request error globally
jwt.interceptor.ts     | JwtHttpInterceptor     | Add token to each http request
timeout.interceptor.ts | TimeoutHttpInterceptor | Set timeout before sending http request

### 2.3 Model
Model class for user, question, submission, etc.
### 2.4 Service
Services are collections of common methods. Most of the services are used to send HTTP requests to call RESTful API.

File Name                 | Class Name            | Description        
--------------------------|-----------------------|-------------------------------------------
alert.service.ts          | AlertService          | Display Alert message from anywhere. The Alert will be shown at the top of the page.
auth-guard.service.ts     | AuthGuardService      | Guard access right. If user hasn't logged in, he/she will be navigated to login page if he/she tries to access some pages only available for registered users.
authentication.service.ts | AuthenticationService | Http requests for register, login, etc.
database.service.ts       | DatabaseService       | Http requests for data import and export.
question.service.ts       | QuestionService       | Http requests for question management.
submission.service.ts     | SubmissionService     | Http requests for solution submission.
user.service.ts           | UserService           | Http requests for user management.

### 2.5 Util
Some helper methods, string manipulation, cookie manipulation, etc.

## 3. Angular Routing
Define all the routings in file 'src/app/app.route.ts'. Notice, some components are guarded by 'AuthGuardService'. These components are accessible only when user has logged in.
```typescript
import { RouterModule, Routes } from "@angular/router";

// components
import {
  AlertComponent,
  AppComponent,
  HeaderComponent,
  FooterComponent,
  HomepageComponent,
  SignupComponent,
  LoginComponent,
  ResetpwdComponent,
  ProfileComponent,
  DatabaseComponent,
  QuestionsComponent,
  QuestionComponent,
  EditorComponent,
  UsersComponent,
  UserComponent,
  WysiwygComponent,
  AlgorithmQuestionComponent,
  AlgorithmQuestionsComponent,
  SubmissionComponent
} from "./components/";

// services
import { AuthGuardService } from "./services/";

export const appRoutes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "questions", component: AlgorithmQuestionsComponent },
  { path: "question/:uniquename", component: AlgorithmQuestionComponent },
  { path: "submission/:id", component: SubmissionComponent },
  {
    path: "admin/database",
    component: DatabaseComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/users",
    component: UsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/user",
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/user/:_id",
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/questions",
    component: QuestionsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/question",
    component: QuestionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/question/:_id",
    component: QuestionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "editor",
    component: EditorComponent
  },
  {
    path: "wysiwyg",
    component: WysiwygComponent
  },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  {
    path: "resetpwd",
    component: ResetpwdComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];
```
