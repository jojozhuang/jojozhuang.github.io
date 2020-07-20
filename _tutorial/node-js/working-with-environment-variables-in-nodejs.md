---
layout: tutorial
key: tutorial
title: "Working with Environment Variables in Node.js[Draft]"
index: 8722
subcategory: node-js
date: 2016-03-15
tags: [Node.js]
draft: true
---

> Tutorial for how to use environment variables in Node.js.

When building any kind of server side app, you will eventually have the following thoughts:
* I would like to bind my app to a specific port.
* I would like to enter a connection string so I can connect to my database.
* I would like to use a third-party service through a provided API key or credentials.

Given values to these kinds of parameters will yield a configuration. It is a crucial part of the system as our application will have lots of configurable elements, so it must be handled properly throughout the codebase.

In this article, we will look at the DOs and DON’Ts of Node config handling.

## KEEPING IT TOGETHER
Config Parts
Instead of defining parts of the config in separate files, it is strongly advised to have a config.js file that will hold all configuration in a centralized way.

This will help other developers to locate and adjust config values much more easily, and by having one centralized file ensures reusability of config values and also it can give a quick insight about the project and what technologies/services/libraries are used.

Bad

```javascript
// db.js
const mongoose = require('mongoose');

const host = 'localhost';
const port = 27017;
const name = 'db';
const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.connect(connectionString);

// app.js
const express = require('express');

const app = express();
const port = 3000;
app.listen(port);
```
Better
```javascript
// config.js
const config = {
 app: {
   port: 3000
 },
 db: {
   host: 'localhost',
   port: 27017,
   name: 'db'
 }
};

module.exports = config;

// db.js
const mongoose = require('mongoose');
const config = require('./config');

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.connect(connectionString);

// app.js
const express = require('express');
const config = require('./config');

const app = express();
app.listen(config.app.port);
```
A config file can also export separate variables that hold the values or a simple object with custom depth level so we can also give scope to the config elements.

This is far from perfect as every time we want to change a config value, we have to touch the code. We can overcome this with the help of environment variables.

## USE THE ENV LUKE
Use The Force
Source: Pics me me

During testing, we would like to change the database from the one we are using for development. This way we are able to safely drop all data from it and we don’t mess up our development (or production – yikes!) database. Right now we have to edit the config file each time we would like to run tests.

We will make the app aware of the currently set environment. In Node, the NODE_ENV variable is used for this. Commonly used environments are development or dev when coding on our local machine, production or prod when it is deployed to the live server, test when we are running unit/integration tests (and much more).

The current environment can be retrieved through process.env.NODE_ENV.

```javascript
// config.js
const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
 app: {
   port: 3000
 },
 db: {
   host: 'localhost',
   port: 27017,
   name: 'db'
 }
};

const test = {
 app: {
   port: 3000
 },
 db: {
   host: 'localhost',
   port: 27017,
   name: 'test'
 }
};

const config = {
 dev,
 test
};

module.exports = config[env];
```
Now, when we are running tests (and our NODE_ENV is set to test), the localhost:27017/test will be used instead of localhost:27017/db.

Our app is now aware about its environment; however, when multiple developers are working on a project, their machine setup can (and will) differ from each other and also from the server they are deploying the app.

Environment variables are the go-to solution for this kind of problem too. Aside from creating environment specific configs, we should also offer more fine-grained options too. This means that each element of the configuration should be manipulated through its own environment variable, but a default value should be provided that works for most cases.

```javascript
// config.js
const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
 app: {
   port: parseInt(process.env.DEV_APP_PORT) || 3000
 },
 db: {
   host: process.env.DEV_DB_HOST || 'localhost',
   port: parseInt(process.env.DEV_DB_PORT) || 27017,
   name: process.env.DEV_DB_NAME || 'db'
 }
};
const test = {
 app: {
   port: parseInt(process.env.TEST_APP_PORT) || 3000
 },
 db: {
   host: process.env.TEST_DB_HOST || 'localhost',
   port: parseInt(process.env.TEST_DB_PORT) || 27017,
   name: process.env.TEST_DB_NAME || 'test'
 }
};

const config = {
 dev,
 test
};

module.exports = config[env];
```
For example, when John runs the tests, his Mongo DB runs in Docker on port 27000 instead of the default 27017. By explicitly setting TEST_DB_PORT to 27000, John can easily set the system to his preferences without code modification, and for others connecting to Mongo DB will still work out of the box. Environment variables are also supported by most CIs and PaaS providers so your Node config can also be easily set when your code is verified on the build server, or it is deployed to your production environment.

One quick note here that every variable read from process.env will be a String; thus, type conversion is needed sometimes (parseInt for converting to Number).

We can adjust the system’s individual configurations without code modification. That looks good; however, we need to talk about sensitive configurations.

## KEEP YOUR SECRETS TO YOURSELF
All these values stored in config.js will be available in the code’s repository. Putting the default port on which the app will bind into the code is not really an issue; however, the login credentials for the production database or the API key for that cool third party service is a big no-no. Both adding and removing them :).

The ideal way to handle these situations is to leave the sensitive configuration variables blank in the code, then set the environment variables on the system where your app is running.

```javascript
// config.js
const config = {
 coolThirdPartyApiKey: process.env.COOL_THIRD_PARTY_API_KEY
};

module.exports = config;

// in the terminal
COOL_THIRD_PARTY_API_KEY=supersecret&node [entry-point].js
```
Of course, when running the app on your own machine or deploying it to your own server (or IaaS), every sensitive environment variable must be set every time the app is started. This can be tedious; however, there are great tools which can help you overcome this problem.

## DO THE DOTENV
Dotenv is a great Node library that enables the use of a .env file that can hold environment variables and feed them to your Node app.
```javascript
// .gitignore
.env

// .env
COOL_THIRD_PARTY_API_KEY=supersecret

// config.js
require('dotenv').config(); // this loads the defined variables from .env

const config = {
 coolThirdPartyApiKey: process.env.COOL_THIRD_PARTY_API_KEY
};

module.exports = config;
```
Just make sure (as stated in the example) to add .env to the .gitignore file or else you will commit the sensitive variables to the repository (which is again, unwanted).

Aside from dotenv, there is direnv, but we won’t cover it in this article, but it’s worth checking out.

## CONVICT, MORE LIKE PRO-VICT (SORRY)
Another Node config helping library that we regularly use is Convict. It has multiple benefits over configuration-by-hand approach:

We can define a configuration schema with type validation
Config variables can have custom validations (port, IP, or plug your own validator)
We can define an environment variable to the config property so it will be env aware
We can define a switch to the property so it can be configured in a command line argument
The config value coming from the environment variable will be automatically cast to the desired type
And much more…
```javascript
// config.js
require('dotenv').config();
const convict = require('convict');

const config = convict({
 env: {
   format: ['prod', 'dev', 'test'],
   default: 'dev',
   arg: 'nodeEnv',
   env: 'NODE_ENV'
 },
 apple: {
   format: String,
   default: 'from default',
   arg: 'apple',
   env: 'APPLE'
 },
 banana: {
   format: String,
   default: 'from default',
   arg: 'banana',
   env: 'BANANA'
 },
 cherry: {
   format: String,
   default: 'from default',
   arg: 'cherry',
   env: 'CHERRY'
 }
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({ allowed: 'strict' }); // throws error if config does not conform to schema

module.exports = config.getProperties(); // so we can operate with a plain old JavaScript object and abstract away convict (optional)

// config/prod.json
{
 "banana": "from prod.json"
}

// .env
NODE_ENV=prod

// from terminal
node index.js --cherry 'from command line'

// index.js
const config = require('./config');

console.log(config);
/**
 {
   env: 'prod',
   apple: 'from default',
   banana: 'from prod.json',
   cherry: 'from command line'
 }
*/
```
In this (rather complex) example we can take a glimpse of what convict combined with dotenv can give us.

## CONCLUSION
In this article we’ve given a step-by-step guide of how to build an efficient configuration module for your Node app. The principles can also be applied to other technologies as well. The key takeaways from this post are the following:

* Centralize your app’s configuration to a single module
* Enable config variable setting without any code modification
* Use the environment variables
* Do not expose secret configuration values
* Don’t be afraid to use third-party config libraries (dotenv, convict) as they will ease the development


## 4. References
* [HOW TO EASILY SET-UP NODE CONFIG FOLLOWING THESE BEST PRACTICES](https://codingsans.com/blog/node-config-best-practices)
* [Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)
