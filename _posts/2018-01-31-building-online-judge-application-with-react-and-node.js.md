---
layout: post
key: blog
title: "Building Online Judge Application With React and Node.js(Draft)"
date: 2018-01-31
tags: [React, Nodejs]
---

> Introduce how to compile and run c/java in Node.js.

1. Signup
https://signup.heroku.com/
2. Install Heroku CLI
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
3. Login through terminal
```sh
$ heroku login
```

view log
```sh
heroku logs --tail
heroku ps //check how many dynos are running
heroku ps:scale web=0 // scale down
heroku ps:scale web=1 // scale up
```

Run the app locally
```sh
heroku local web // same to 'npm start'
```

Console
```sh
$ heroku run bash
Running bash on ⬢ damp-springs-52045... up, run.3598 (Free)
~ $ ls
Procfile  README.md  app.json  index.js  node_modules  package-lock.json  package.json	public	test.js  views
```
type 'exit' to exit.

```sh
Johnny@Johnny-Mac:~$ git push heroku master
Counting objects: 7, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (7/7), done.
Writing objects: 100% (7/7), 68.86 KiB | 6.89 MiB/s, done.
Total 7 (delta 2), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Build failed
remote:  !     Two different lockfiles found: package-lock.json and yarn.lock
remote:
remote:        Both npm and yarn have created lockfiles for this application,
remote:        but only one can be used to install dependencies. Installing
remote:        dependencies using the wrong package manager can result in missing
remote:        packages or subtle bugs in production.
remote:
remote:        - To use npm to install your application's dependencies please delete
remote:          the yarn.lock file.
remote:
remote:          $ git rm yarn.lock
remote:
remote:        - To use yarn to install your application's dependences please delete
remote:          the package-lock.json file.
remote:
remote:          $ git rm package-lock.json
remote:     
remote:        https://kb.heroku.com/why-is-my-node-js-build-failing-because-of-conflicting-lock-files
remote:
remote:  !     Push rejected, failed to compile Node.js app.
remote:
remote:  !     Push failed
remote: Verifying deploy....
remote:
remote: !	Push rejected to afternoon-harbor-24879.
remote:
To https://git.heroku.com/afternoon-harbor-24879.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'https://git.heroku.com/afternoon-harbor-24879.git'
```
remove yarn.lock from git.
```sh
$ git rm yarn.lock
rm 'yarn.lock'
git commit -m "remove yarn.lock"
[master 7944b7d] remove yarn.lock
 1 file changed, 7423 deletions(-)
 delete mode 100644 yarn.lock
$ git push heroku master
```

change the name, then need to update git remote.
https://devcenter.heroku.com/articles/renaming-apps#updating-git-remotes
```sh
git remote rm heroku
heroku git:remote -a online-code-editor
```

## 4. Deployment
Deploying Express.
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment

Lessons learned from deploying my first full-stack web application
https://medium.freecodecamp.org/lessons-learned-from-deploying-my-first-full-stack-web-application-34f94ec0a286

https://daveceddia.com/deploy-react-express-app-heroku/

## 4. Deployment
https://www.jaygould.co.uk/devops/2017/08/18/using-environment-config-variables-node.html
https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment

http://blog.teamtreehouse.com/deploy-static-site-heroku
https://gist.github.com/wh1tney/2ad13aa5fbdd83f6a489

Deploying Express.
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment

Lessons learned from deploying my first full-stack web application
https://medium.freecodecamp.org/lessons-learned-from-deploying-my-first-full-stack-web-application-34f94ec0a286

https://daveceddia.com/deploy-react-express-app-heroku/

## 5. Reference
* [Child Processes on Node.js Document](https://nodejs.org/api/child_process.html)
* [How do I create online compiler for C, C++ and Java using node.js as server language?](https://www.quora.com/How-do-I-create-online-compiler-for-C-C++-and-Java-using-node-js-as-server-language)
* [Go Tutorial](https://www.tutorialspoint.com/go/index.htm)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
* [Making a code compiler using Hackerrank API and ACE editor](http://blog.arpitdubey.com/making-a-code-compiler-using-hackerrank-api-and-ace-editor/)
* * [How to build Online Judge](https://www.zhihu.com/question/20343652)
