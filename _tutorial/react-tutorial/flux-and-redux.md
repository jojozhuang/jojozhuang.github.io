---
layout: tutorial
key: tutorial
title: "Flux and Redux"
index: 8403
subcategory: react-tutorial
date: 2017-08-18
tags: [Flux, Redux]
---

> Introduction of Flux and Redux.

## 1. Flux
### 1.1 Flux Overview
[Flux](https://github.com/facebook/flux/tree/master/examples/flux-concepts) is a pattern for managing unidirectional data flow in your application. The most important concept is that data flows in one direction.
### 1.2 Core Concepts of Flux
#### 1.2.1 Dispatcher
The dispatcher receives actions and dispatches them to stores that have registered with the dispatcher. Every store will receive every action. There should be only one singleton dispatcher in each application.
#### 1.2.2 Store
A store is what holds the data of an application. Stores will register with the application's dispatcher so that they can receive actions. The data in a store must only be mutated by responding to an action. There should not be any public setters on a store, only getters. Stores decide what actions they want to respond to. Every time a store's data changes it must emit a "change" event. There should be many stores in each application.
#### 1.2.3 Action
Actions define the internal API of your application. They capture the ways in which anything might interact with your application. They are simple objects that have a "type" field and some data.
#### 1.2.4 View
Data from stores is displayed in views. When a view uses data from a store it must also subscribe to change events from that store. Then when the store emits a change the view can get the new data and re-render. Actions are typically dispatched from views as the user interacts with parts of the application's interface.

### 1.3 Data Flow of Flux
The following diagram describes how data flows through the system.
1. Views send actions to the dispatcher.
2. The dispatcher sends actions to every store.
3. Stores send data to the views.

![image](/assets/images/frontend/8403/fluxdataflow.png){:width="700px"}

## 2. Redux
### 2.1 Flux Overview
[Redux](https://redux.js.org/) is an open-source JavaScript library designed for managing application state. It is one of the implementations of Flux. Redux is primarily used together with React or Angular for building user interfaces.
### 2.2 Core Concepts of Redux
#### 2.2.1 Action
Actions are payloads of information that send data from application to store. They are the only source of information for the store. Send them to the store using `store.dispatch()`.
#### 2.2.2 Reducer
Reducers specify how the application's state changes in response created by actions.
#### 2.2.3 Store
Actions represent the facts about 'what happened' and reducers update the state according to those actions. The Store is the object that brings actions and reducers together. The store has the following responsibilities:
* Holds application state;
* Allows access to state via `getState()`;
* Allows state to be updated via `dispatch(action)`;
* Registers listeners via `subscribe(listener)`;
* Handles unregistering of listeners via the function returned by `subscribe(listener)`.

It's important to note that there is only one single store in a Redux application.

## 3. References
* [Flux](https://facebook.github.io/flux/)
* [flux-concepts](https://github.com/facebook/flux/tree/master/examples/flux-concepts)
* [Redux-Official Doc](https://redux.js.org/)
