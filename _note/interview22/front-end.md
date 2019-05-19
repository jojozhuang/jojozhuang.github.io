---
layout: note
key: note
title: "Front End(Draft)"
index: 166
category: interview
image: interview.png
date: 2019-01-16
postdate: 2019-01-16
tags: [Javascript, Html, Css]
---

> Knowledges of front end.

## 1. Event Bubbling and Capturing
Event bubbling and capturing are two ways of event propagation in the HTML DOM API, when an event occurs in an element inside another element, and both elements have registered a handle for that event. The event propagation mode determines in which order the elements receive the event.
* With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.
* With capturing, the event is first captured by the outermost element and propagated to the inner elements.

Capturing is also called "trickling", which helps remember the propagation order:
```sh
trickle down, bubble up
```
Back in the old days, Netscape advocated event capturing, while Microsoft promoted event bubbling. Both are part of the W3C Document Object Model Events standard (2000).

IE < 9 uses only event bubbling, whereas IE9+ and all major browsers support both. On the other hand, the performance of event bubbling may be slightly lower for complex DOMs.

We can use the `addEventListener(type, listener, useCapture)` to register event handlers for in either bubbling (default) or capturing mode. To use the capturing model pass the third argument as true.

Example
```html
<div>
    <ul>
        <li></li>
    </ul>
</div>
```
In the structure above, assume that a click event occurred in the `li` element.

In capturing model, the event will be handled by the `div` first (click event handlers in the div will fire first), then in the `ul`, then at the last in the target element `li`.

In the bubbling model, the opposite will happen: the event will be first handled by the `li`, then by the `ul`, and at last by the `div` element.

### 1.1 Stop Event Bubbling :
If you want to stop the event bubbling, this can be achieved by the use of the `event.stopPropagation()` method. If you want to stop the event flow from event target to top element in DOM, event.stopPropagation() method stops the event to travel to the bottom to top.

## 2. Event delegation
Event delegation is a technique for listening to events where you delegate a parent element as the listener for all of the events that happen inside it.

For example, if you wanted to detect any time any field changed in value inside a specific form, you could do this:
```javascript
var form = document.querySelector('#hogwarts-application');

// Listen for changes to fields inside the form
form.addEventListener('input', function (event) {

    // Log the field that was changed
    console.log(event.target);

}, false);
```

## 3. Class Inheritance vs Prototypal Inheritance

## 6. References
* [What is event bubbling and capturing?](https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing)
* [Event delegation](https://javascript.info/event-delegation)
* [What's the difference between JavaScript event delegation, bubbling, and capturing?](https://gomakethings.com/whats-the-difference-between-javascript-event-delegation-bubbling-and-capturing/)
* [What’s the Difference Between Class & Prototypal Inheritance?](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)
