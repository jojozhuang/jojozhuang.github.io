---
layout: tutorial
key: tutorial
title: "Using Yarn to Manage Packages"
index: 8703
subcategory: node-js
date: 2018-02-01
tags: [Yarn]
---

> Introduce how to use Yarn for fast, reliable, and secure dependency management.

## 1. Yarn
[Yarn](https://yarnpkg.com/lang/en/) is a new package manager that replaces the existing workflow for the [npm](https://www.npmjs.com/) client or other package managers while remaining compatible with the npm registry. It has the same feature set as existing workflows while operating faster, more securely, and more reliably.

## 2. CLI Commands Comparison

npm (v5)                                | Yarn
----------------------------------------|--------------
`npm install`                           | `yarn install`
**(N/A)**                               | `yarn install --flat`
**(N/A)**                               | `yarn install --har`
`npm install --no-package-lock`         | `yarn install --no-lockfile`
**(N/A)**                               | `yarn install --pure-lockfile`
`npm install [package]`                 | `yarn add [package]`
`npm install [package] --save-dev`      | `yarn add [package] --dev`
**(N/A)**                               | `yarn add [package] --peer`
`npm install [package] --save-optional` | `yarn add [package] --optional`
`npm install [package] --save-exact`    | `yarn add [package] --exact`
**(N/A)**                               | `yarn add [package] --tilde`
`npm install [package] --global`        | `yarn global add [package]`
`npm update --global`                   | `yarn global upgrade`
`npm rebuild`                           | `yarn add --force`
`npm uninstall [package]`               | `yarn remove [package]`
`npm cache clean`                       | `yarn cache clean [package]`
`rm -rf node_modules && npm install`    | `yarn upgrade`
`npm version major`                     | `yarn version --major`
`npm version minor`                     | `yarn version --minor`
`npm version patch`                     | `yarn version --patch`

## 3. Reference
* [Yarn: A new package manager for JavaScript](https://code.facebook.com/posts/1840075619545360)
* [Migrating from npm to yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/)
