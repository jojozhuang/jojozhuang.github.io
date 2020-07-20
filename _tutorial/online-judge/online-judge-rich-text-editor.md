---
layout: tutorial
key: tutorial
title: "Online Judge - Rich Text Editor"
index: 9021
subcategory: online-judge
date: 2018-04-15
tags: [ngx-editor]
---

> Introduce how to use WYSIWYG(what you see is what you get) Editor: ngx-editor.

## 1. Question Description
Each question has description to show the details about what the problem is, and what solution is required. The description may contains html tags.
![image](/assets/images/online-judge/9021/question_desc.png)
In the admin view, we need a WYSIWYG Editor to edit the content of description.
![image](/assets/images/online-judge/9021/question_admin.png)

## 2. NgxEditor
For this online judge app, I use [ngx-editor](https://www.npmjs.com/package/ngx-editor). It is a WYSIWYG editor for Angular. 'ngx-editor' depeneds on the following libraries to work.
* Font-Awesome v4.7.0
* Ngx-Bootstrap

### 2.1 Ngx-Bootstrap
Install bootstrap.
```raw
$ npm install ngx-bootstrap bootstrap --save
```
Open 'angular-cli.json' and insert a new entry into the 'styles' array.
```javascript
  "styles": [
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
    "styles.css",
],
```
### 2.2 Font-Awesome
Install Font Awesome.
```raw
npm install font-awesome --save
```
Add font-awesome style file to 'angular-cli.json'.
```javascript
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css"
  "../node_modules/font-awesome/css/font-awesome.css"
  "styles.css"
],
```
### 2.3 ngx-editor
Install ngx-editor.
```raw
npm install ngx-editor --save
```
Edit './src/app/app.module.ts', import 'ngx-editor' module.
```typescript
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [ NgxEditorModule ]
})
```
### 2.4 Usage
Add '\<app-ngx-editor\>' to component html. For example, add it for description in './src/app/components/admin/question.component.html'.
```raw
<div class="form-group" [ngClass]="displayFieldCss('description')">
  <label class="control-label col-sm-2" for="description">Description:</label>
  <div class="col-sm-10">
    <app-ngx-editor [config]="editorConfig" [(ngModel)]="htmlContent" name="description" formControlName="description"></app-ngx-editor>
    <app-widget-validation-message [displayError]="isFieldValid('description')" errorMsg="Please enter description">
    </app-widget-validation-message>
  </div>
</div>
```
Then, you can use 'htmlContent' to get or set value for the editor. If your are using reactive form, use 'description' form control directly.

## 3. Testing
### 3.1 Small Icon Issue
Start the app, login as 'jojozhuang', go to question admin view, select one question to edit(eg. http://localhost:12080/admin/question/5b424fb51e73e72e0d54f63b). Notice the icons in the toolbar of the editor is small.
![image](/assets/images/online-judge/9021/small_icon.png)
This is because 'ngx-editor' uses `rem` css. The rem unit sets the font-size relative to the browsers base font-size, and will not inherit from its parents.
```raw
.ngx-editor-button {
    background-color: #f5f5f5;
    background-color: transparent;
    padding: 0.4rem;
    min-width: 2.5rem;
    float: left;
    border: 1px solid #ddd;
    border-right: transparent;
}
```
Meanwhile, we are using bootstrap which sets html's font size to `10px`.
### 3.2 Setting Html Font
To fix the issue, we need to set back the html's font to the default size `16px`. Edit './src/styles.css', add following styling code.
```css
/*styles.css*/
html {
  font-size: 16px;
}
```
In addition, make sure styles.css is after the bootstrap style file in 'angular-cli.json'. So our style can overwrite bootstrap's style.
```javascript
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "../node_modules/font-awesome/css/font-awesome.css",
  "styles.css"
],
```
Refresh the question edit page, the icon now is larger.
![image](/assets/images/online-judge/9021/large_icon.png)

## 4. References
* [WYSIWYG Editor:ngx-editor](https://github.com/Sibiraj-S/ngx-editor)
* [live demo - ngx-editor](https://ngx-editor.stackblitz.io/)
* [ngx-editor configuration](https://sibiraj-s.github.io/ngx-editor/additional-documentation/configuration.html)
* [Include Font Awesome in Angular](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/include-font-awesome.md)
* [rem sample at w3schools](https://www.w3schools.com/cssref/tryit.asp?filename=trycss_unit_rem)
* [Font sizing with rem](https://snook.ca/archives/html_and_css/font-size-with-rem)
