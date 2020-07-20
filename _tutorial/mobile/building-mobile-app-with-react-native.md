---
layout: tutorial
key: tutorial
title: "Building Mobile App with React Native - Draft"
index: 8542
subcategory: mobile
date: 2017-08-28
tags: [React Native, Yarn]
draft: true
---

> Build web application with ReactJS.

## 1. Game Store Web Application
In the posting [Building Web Application with Angular]({% link _tutorial/angular-app/building-web-application-with-angular.md %}), I introduced how to use Angular and RESTful web service to create a web application to manage products. In this tutorial, we will learn how to use React to build such web application with the same UI and functions.

## 2. Tools
Since react native doesn't support npm5, have to use `yarn`.  
```raw
*******************************************************************************
ERROR: npm 5 is not supported yet
*******************************************************************************

It looks like you're using npm 5 which was recently released.

Create React Native App doesn't work with npm 5 yet, unfortunately. We
recommend using npm 4 or yarn until some bugs are resolved.

You can follow the known issues with npm 5 at:
https://github.com/npm/npm/issues/16991

*******************************************************************************
```
Install Yarn.
```raw
brew install yarn
```

## 2. React Project
### 2.1 React Native CLI
Install 'create-react-native-app' globally.
```raw
yarn global add create-react-native-app
//npm install -g create-react-native-app
```
### 2.2 Creating New Project
Create new app named `GameStoreReactNative`.
```raw
$ create-react-native-app GameStoreReactNative
```
Start app, you will get following error.
```raw
$ yarn start
yarn run v1.3.2
$ react-native-scripts start
11:16:26 AM: Unable to start server
See https://git.io/v5vcn for more information, either install watchman or run the following snippet:
  sudo sysctl -w kern.maxfiles=5242880
  sudo sysctl -w kern.maxfilesperproc=524288

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
Follow the instruction and run sysctl, and try again.
```raw
sudo sysctl -w kern.maxfiles=5242880
sudo sysctl -w kern.maxfilesperproc=524288
yarn start
```
QR code in terminal prompt.
![image](/assets/images/mobile/8542/qrcode.png){:width="800px"}
Click `i` to open iOS simulator. It will install [expo](https://expo.io/) first. Then launch the react native app. App is running in the simulator.
![image](/assets/images/mobile/8542/iphonex.png){:width="400px"}
Note: start your desired simulator before running it with expo and expo will detect the currently running simulator and then deploy your code.

### 2.2 Installing Packages
Install native-base and mobx.
```raw
$ yarn add native-base --save
$ yarn add mobx --save
$ yarn add react-navigation --save
```

### 3.4 Final Project Structure

## 4. Running and Testing


## 5. Source Files

## 6. References
* [Official Docs](https://facebook.github.io/react-native/docs/getting-started.html)
* [Create React Native App](https://github.com/react-community/create-react-native-app)
* [Installation of yarn](https://yarnpkg.com/lang/en/docs/install/)
* [Migrating from npm to yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/)
* [Use React Native](http://www.reactnative.com/)
* [Awesome React Native](https://github.com/jondot/awesome-react-native)
* [NativeBase](https://github.com/GeekyAnts/NativeBase)
* [NativeBase Doc](https://docs.nativebase.io/)
* [exp Command-Line Interface](https://docs.expo.io/versions/latest/guides/exp-cli.html)
* [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html)
* [ASYNCSTORAGE, TYPESCRIPT AND ASYNC/AWAIT IN REACT NATIVE](https://shellmonger.com/2017/08/21/asyncstorage-typescript-and-asyncawait-in-react-native/)
* https://blog.logrocket.com/how-why-a-guide-to-using-typescript-with-react-fffb76c61614
* [How to run specific iPhone version with create-react-native-app?](https://stackoverflow.com/questions/47100990/how-to-run-specific-iphone-version-with-create-react-native-app)
* [React Native Vector Icons](https://oblador.github.io/react-native-vector-icons/)
* [How & why: A guide to using Typescript with React](https://blog.logrocket.com/how-why-a-guide-to-using-typescript-with-react-fffb76c61614)
* [Tutorial: How to set up React, Webpack 3, and Babel, in 2017](https://www.valentinog.com/blog/react-webpack-babel/)
* [Navigating Between Screens](http://facebook.github.io/react-native/docs/navigation.html)
* [React Navigation](https://reactnavigation.org/docs/en/getting-started.html)
* [React-Native-Elements](https://react-native-training.github.io/react-native-elements/)
* [React Native Uses Flexbox to Layout](https://medium.com/react-native-training/react-native-uses-flexbox-to-layout-and-arrange-its-components-and-children-3dd4e8399bb)
