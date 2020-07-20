---
layout: tutorial
key: architecture
title: "Prevent Security Vulnerabilities in Web Development"
index: 3814
subcategory: security
date: 2019-07-20
tags: [DomSanitizer, JSX]
---

> Develop web application in secure way when using angular, react, etc.

## 1. Website Security
* XSS
* DDOS
* CSRF

## 2. Angular
In Angular, class `DomSanitizer` helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing values to be safe to use in the different DOM contexts.

### 2.1 Bypass Security Check
Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in sanitization for the value passed in. Carefully check and audit all values and code paths going into this call. Make sure any user data is appropriately escaped for this security context.
* bypassSecurityTrustHtml
* bypassSecurityTrustScript
* bypassSecurityTrustStyle
* bypassSecurityTrustUrl
* bypassSecurityTrustResourceUrl

Example:
```typescript
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'my-app',
  template: `
     <div [innerHtml]="html"></div>
  `,
})
export class App {
  constructor(private sanitizer: DomSanitizer) {
    this.html = sanitizer.bypassSecurityTrustHtml('<h1>DomSanitizer</h1><script>ourSafeCode()</script>') ;
  }
}
```
### 2.2 Sanitize HTML
Calling `sanitize` method to manually sanitize html, css, url, etc.
* SecurityContext.NONE
* SecurityContext.HTML
* SecurityContext.STYLE
* SecurityContext.SCRIPT
* SecurityContext.URL
* SecurityContext.RESOURCE_URL

Example:
```typescript
import {Component, SecurityContext} from '@angular/core'
export class App {
  constructor(private sanitizer: DomSanitizer) {
    this.html = sanitizer.sanitize(SecurityContext.HTML, "<h1>Sanitize</h1><script>attackerCode()</script>");
  }
}
```

## 3. React
### 3.1 JSX Prevents Injection Attacks
By default, React DOM escapes any values embedded in `JSX` before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

It is safe to embed user input in JSX:
```jsx
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```
**Example for how JSX works**  
React automatically escapes variables for you. It prevents XSS injection via string HTML with malicious Javascript. Naturally, inputs are sanitized along with this.

For instance, let's say you have this string.
```javascript
var htmlString = '<img src="javascript:alert('XSS!')" />';
```
If you try to render this string in react,
```javascript
render() {
    return (
        <div>{htmlString}</div>
    );
}
```
you will literally see on the page the whole string including the <span> element tag. aka in the browser you will see
```raw
<img src="javascript:alert('XSS!')" />
```

If you view the source html you would see
```html
<span>"<img src="javascript:alert('XSS!')" />"</span>
```
### 3.2 Other XSS Attacks
But JSX can't prevent all attacks, see below.  
1) XSS via `dangerouslySetInnerHTML`
{% raw %}
```javascript
const aboutUserText = "<img onerror='alert(\"Hacked!\");' src='invalid-image' />";

class AboutUserComponent extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{"__html": aboutUserText}} />
    );
  }
}

ReactDOM.render(<AboutUserComponent />, document.querySelector("#app"))
```
{% endraw %}
2) XSS via `a.href attribute`
{% raw %}
```javascript
const userWebsite = "javascript:alert('Hacked!');";

class UserProfilePage extends React.Component {
  render() {
    return (
      <a href={userWebsite}>My Website</a>
    )
  }
}

ReactDOM.render(<UserProfilePage />, document.querySelector("#app"));
```
{% endraw %}
3) XSS via attacker controlled `props`
{% raw %}
```javascript
const customPropsControledByAttacker = {
  dangerouslySetInnerHTML: {
    "__html": "<img onerror='alert(\"Hacked!\");' src='invalid-image' />"
  }
};

class Divider extends React.Component {
  render() {
    return (
      <div {...customPropsControledByAttacker} />
    );
  }
}

ReactDOM.render(<Divider />, document.querySelector("#app"));
```
{% endraw %}

## 4. References
* [Angular Security](https://angular.io/guide/security)
* [Angular 2 Security — The DomSanitizer Service](https://netbasal.com/angular-2-security-the-domsanitizer-service-2202c83bd90)
* [JSX Prevents Injection Attacks](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)
* [What does it mean when they say React is XSS protected?](https://stackoverflow.com/questions/33644499/what-does-it-mean-when-they-say-react-is-xss-protected)
