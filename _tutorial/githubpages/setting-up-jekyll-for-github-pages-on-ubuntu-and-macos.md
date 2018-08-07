---
layout: tutorial
key: tutorial
title: "Setting up Jekyll for GitHub Pages on Ubuntu and MacOS"
index: 901
category: githubpages
image: github-pages.png
date: 2018-07-01
postdate: 2016-01-16
tags: [GitHub Pages, Jekyll, Ruby]
---

> Set up a local version of Jekyll GitHub Pages site to test changes before submitting to github.

## 1. What is Jekyll?
[Jekyll](https://jekyllrb.com) is a simple, blog-aware, static site generator. Jekyll is the engine behind [GitHub Pages](https://pages.github.com/), which means you can use Jekyll to host your page, blog, or website from GitHub’s servers for free.

## 2. Installing Jekyll on Ubuntu
Make sure gcc and make are installed. Check version of them with the following commands.
```sh
$ gcc -v
$ make -v
$ ruby -v //version must be 2.1 or above
```
Run the following command to install Jekyll.
```sh
$ sudo apt install jekyll
```
Check version.
```sh
$ jekyll --version
```

## 3. Installing Jekyll on Mac
Make sure gcc and make are installed. Check version of them with the following commands.
```sh
$ gcc -v
$ make -v
$ ruby -v //version must be 2.1 or above
```
Install Ruby.
```sh
$ brew install ruby
```

Install Jekyll.
```sh
$ sudo gem install jekyll
```
Check version.
```sh
$ jekyll -v
jekyll 3.6.2
```

## 4. Running Website with Jekyll
Get source files of my person website from Github.
```sh
$ cd /Johnny/Github/
$ git clone https://github.com/jojozhuang/jojozhuang.github.io
$ cd jojozhuang.github.io
```

Build and launch the website. All of the files will be deployed to a new folder named '\_site'. Open web browser and access  http://127.0.0.1:4000/.
```sh
$ jekyll build
$ jekyll serve
```
If you want jekyll to start at different port, add port option when using `jekyll serve`.
```sh
$ jekyll serve --port 12001
```

If you used bundle command, then you need to install the bundler.
```sh
$ gem install bundler
```
And prepending `bundle exec` to the jekyll command.
```sh
$ bundle exec jekyll serve --port 12001
```
Open web browser to access your local jekyll website.
![image](/public/tutorials/901/local.png)  

## 5. References
* [Jekyll - Official Installation Guide](https://jekyllrb.com/docs/installation/)
* [Setting up your GitHub Pages site locally with Jekyll
](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
* [Building a static website with Jekyll and GitHub Pages](https://programminghistorian.org/lessons/building-static-sites-with-jekyll-github-pages)
* [How to Set Up a Jekyll Development Site on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jekyll-development-site-on-ubuntu-16-04)
