---
layout: tutorial
key: tutorial
title: "Fixing Issue when Deploying App to Heroku via Travis-CI"
index: 8367
subcategory: angular-app
date: 2020-05-27
tags: [Heroku, Travis CI]
---

> Fix the issue when deploying Text Compare Angular app to Heroku with Travis-CI.

## 1. CI on Heroku
After setting up the CI for one of my project [Text Compare](https://github.com/jojozhuang/text-compare-angular), it was automatically deployed to Heroku after each new update. Refer to [Deploying Angular App to Heroku with Express Server]({% link _tutorial/angular-app/deploying-angular-app-to-heroku-with-express-server.md %}) to learn how to do that.

### 1.1 API Issue
On someday, I got one email notification from Travis, saying that the deployment was failed. I checked the logs, the failure was caused by the error "Invalid credentials provided.".
```raw
0.76s$ git clone --depth=50 --branch=master https://github.com/jojozhuang/text-compare-angular.git jojozhuang/text-compare-angular
0.01s
Setting environment variables from repository settings
$ export HEROKU_API_KEY=[secure]
nvm.install
3.00s$ nvm install 9
cache.1
Setting up build cache
cache.npm
$ node --version
v9.11.2
$ npm --version
5.6.0
$ nvm --version
0.35.3
install.npm
29.86s$ npm install
0.23s$ npm test
> text-compare-angular@1.0.0 test /home/travis/build/jojozhuang/text-compare-angular
> echo "test is ignored"
test is ignored
The command "npm test" exited with 0.
cache.2
store build cache
dpl_0
1.93s$ rvm $(travis_internal_ruby) --fuzzy do ruby -S gem install dpl
dpl.1
Installing deploy dependencies
API request failed.
Message: Invalid credentials provided.
Reference:
dpl.2
Preparing deploy
failed to deploy
```
However, I haven't changed the Heroku API Key. The key is stored as Environment Variable `HEROKU_API_KEY` in Travis. This variable is used during deployment and it is stored in `.travis.yml`.
```yaml
language: node_js
node_js:
  - '9'
branches:
  only:
  - master
deploy:
  provider: heroku
  skip_cleanup: true
  keep-history: true
  api-key:
    secure: $HEROKU_API_KEY
  app: text-compare-angular
```
I tried to update the key in Heroku and assign it to the build task in Travis, but the error was still there.

Heroku->Account settings.
![image](/assets/images/frontend/8367/update-heroku-api-key.png)
Travis->Settings->Select GitHub App-Settings.
![image](/assets/images/frontend/8367/update-key-on-travis.png)

### 1.2 Root Cause
After searching for a while, I found this issue is caused by the encryption of the api key, see https://stackoverflow.com/questions/51925918/issues-with-deploying-to-heroku-via-travis-ci. To solve the issue, we need to update the api-key in '.travis.yml'.

## 2. Usage of Encryption Keys
### 2.1 Installing Travis CLI
First, install Travis CLI.
```sh
$ brew install travis
```
### 2.2 Log into Travis
Then login. Since I'm using travis-ci.com instead of travis-ci.org, I need to add `--pro` option for login. Besides, I'm using GitHub to log into Travis, so just provide the user name and password of GitHub account.
```raw
$ travis login --pro
Shell completion not installed. Would you like to install it now? |y| y
We need your GitHub login to identify you.
This information will not be sent to Travis CI, only to api.github.com.
The password will not be displayed.

Try running with --github-token or --auto if you don't want to enter your password anyway.

Username: xxxx@gmail.com
Password for xxxx@gmail.com: ********
Successfully logged in as xxxx!
```
### 2.3 Generate Key
Run the command `travis encrypt your-heroku-api-key` to generate the encrypted key, replace your-heroku-api-key with your own key.

If your deployment is hosted at travis-ci.org, then use `--org` option. If it is hosted at travis-ci.com, then use `--pro`.
```sh
travis encrypt your-heroku-api-key --org # for travis-ci.org
travis encrypt your-heroku-api-key --pro # for travis-ci.com
```
Navigate to the root directory of the repository and run the above command, it will print out the encrypted key. Then we can copy and paste it to '.travis.yml'.
```sh
$ cd GitHub/text-compare-angular/
$ travis encrypt 85428d0a-1395-47d6-ad28-0ed470ae56f2 --pro
Detected repository as jojozhuang/text-compare-angular, is this correct? |yes| yes
Please add the following to your .travis.yml file:

  secure: "MFTc8fBmaCRwWPYCE54DXWBi4MVflYr4+oNBj15gMgxDrVExVz3mvu2L3njngabOkMSbSn5YYQzXF3XqeZbtbgS3IV6F7m4H/KzB/XQ3kOLktkl9J1Z4/33wOAaH05kApPUCfxu0WCzSLqRY21dy3lA++UD0RgyulxPGQLPyg8zIeH/jOsmaFTaGUO6z4RGE9ngjriJMPEvw+LQUDA42zzVmHsrojD1UIwdwXaUzsJe2VXsX1fvcJXOxRvG/pEkU/JN8Lqf2nLklMzJqA9k47jfLaRp6aEVyZ5rdcdL5aikSh8UD8CahExlH6UJU+4Wo4X/Wp4K2+ZXLcc5/wCUV6RPzJ+tuxJ7eLRQ26PsQFTmcO+mppkP2JqWebcYlV9lyNu5HQSM/yEBHV5jLZi8v86R+NVVl1TmLu+hJiXVuY7rqIKFAQYDLyDELO3WmwRXQx2HhQyGJZYH0+wJSLBl8A8AQspRQb34P1HwD3dj4/EEvonGJF3f/oAyi38w4WGodPx3hK2bhqieAyEkmoC2PhVQQvfM3RO7pOHpi/WBdX0BLotg4ZO+5uqwariK4oHS8Poz2DtzJlWPa8bX5XA90emiyKkh7lt4ZT5l7dj/cbd17NQhhTrxrNg65q9Qt+0/Z7mdsakHThY8rBB5UUeBJsg1fb51hCxARMzV3coSaGsU=
app: text-compare-angular"

Pro Tip: You can add it automatically by running with --add.
```
As the tip mentioned, we can run the command with `--add` option, thus the encrypted key will be added to '.travis.yml' directly.
```sh
travis encrypt your-heroku-api-key --pro --add deploy.api_key
```
See the result.
```sh
$ travis encrypt 85428d0a-1395-47d6-ad28-0ed470ae56f2 --pro --add deploy.api_key

Overwrite the config file /Users/johnny/GitHub/text-compare-angular/.travis.yml with the content below?

This reformats the existing file.

---
language: node_js
node_js:
- '9'
branches:
  only:
  - master
deploy:
  provider: heroku
  skip_cleanup: true
  keep-history: true
  api-key:
    secure: "$HEROKU_API_KEY"
  app: text-compare-angular
  api_key:
    secure: MFTc8fBmaCRwWPYCE54DXWBi4MVflYr4+oNBj15gMgxDrVExVz3mvu2L3njngabOkMSbSn5YYQzXF3XqeZbtbgS3IV6F7m4H/KzB/XQ3kOLktkl9J1Z4/33wOAaH05kApPUCfxu0WCzSLqRY21dy3lA++UD0RgyulxPGQLPyg8zIeH/jOsmaFTaGUO6z4RGE9ngjriJMPEvw+LQUDA42zzVmHsrojD1UIwdwXaUzsJe2VXsX1fvcJXOxRvG/pEkU/JN8Lqf2nLklMzJqA9k47jfLaRp6aEVyZ5rdcdL5aikSh8UD8CahExlH6UJU+4Wo4X/Wp4K2+ZXLcc5/wCUV6RPzJ+tuxJ7eLRQ26PsQFTmcO+mppkP2JqWebcYlV9lyNu5HQSM/yEBHV5jLZi8v86R+NVVl1TmLu+hJiXVuY7rqIKFAQYDLyDELO3WmwRXQx2HhQyGJZYH0+wJSLBl8A8AQspRQb34P1HwD3dj4/EEvonGJF3f/oAyi38w4WGodPx3hK2bhqieAyEkmoC2PhVQQvfM3RO7pOHpi/WBdX0BLotg4ZO+5uqwariK4oHS8Poz2DtzJlWPa8bX5XA90emiyKkh7lt4ZT5l7dj/cbd17NQhhTrxrNg65q9Qt+0/Z7mdsakHThY8rBB5UUeBJsg1fb51hCxARMzV3coSaGsU=


(y/N)
y
```
* If you've already had deploy.api_key.secure in '.travis.yml', you may have to update the file manually.

Finally, `.travis.yml` will be updated as follows. **Notice that we don't need to configure the environment variable `HEROKU_API_KEY` anymore in Travis**.
```yaml
language: node_js
node_js:
  - '9'
branches:
  only:
  - master
deploy:
  provider: heroku
  skip_cleanup: true
  keep-history: true
  api-key:
    secure: MFTc8fBmaCRwWPYCE54DXWBi4MVflYr4+oNBj15gMgxDrVExVz3mvu2L3njngabOkMSbSn5YYQzXF3XqeZbtbgS3IV6F7m4H/KzB/XQ3kOLktkl9J1Z4/33wOAaH05kApPUCfxu0WCzSLqRY21dy3lA++UD0RgyulxPGQLPyg8zIeH/jOsmaFTaGUO6z4RGE9ngjriJMPEvw+LQUDA42zzVmHsrojD1UIwdwXaUzsJe2VXsX1fvcJXOxRvG/pEkU/JN8Lqf2nLklMzJqA9k47jfLaRp6aEVyZ5rdcdL5aikSh8UD8CahExlH6UJU+4Wo4X/Wp4K2+ZXLcc5/wCUV6RPzJ+tuxJ7eLRQ26PsQFTmcO+mppkP2JqWebcYlV9lyNu5HQSM/yEBHV5jLZi8v86R+NVVl1TmLu+hJiXVuY7rqIKFAQYDLyDELO3WmwRXQx2HhQyGJZYH0+wJSLBl8A8AQspRQb34P1HwD3dj4/EEvonGJF3f/oAyi38w4WGodPx3hK2bhqieAyEkmoC2PhVQQvfM3RO7pOHpi/WBdX0BLotg4ZO+5uqwariK4oHS8Poz2DtzJlWPa8bX5XA90emiyKkh7lt4ZT5l7dj/cbd17NQhhTrxrNg65q9Qt+0/Z7mdsakHThY8rBB5UUeBJsg1fb51hCxARMzV3coSaGsU=
  app: text-compare-angular
```

After merging the update to GitHub, the deployment will start automatically and deployment should succeed.

## 3. Security
There is one concern about whether it is safe to store the encrypted key in '.travis.yml', see https://security.stackexchange.com/questions/190413/is-it-a-security-defect-to-display-the-secure-api-key-in-travis-yml-file-of-sour.

**Encryption and decryption keys are tied to the repository**. If you fork a project and add it to Travis CI, it will not have access to the encrypted variables.

## 4. References
* [Issues with Deploying to Heroku via Travis-CI](https://stackoverflow.com/questions/51925918/issues-with-deploying-to-heroku-via-travis-ci)
* [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/)
* [Encryption keys](https://docs.travis-ci.com/user/encryption-keys/)
* [Environment Variables](https://docs.travis-ci.com/user/environment-variables/)
* [Online tool to generate encrypted key(doesn't work for travis-ci.com)](http://travis-encrypt.github.io/)
