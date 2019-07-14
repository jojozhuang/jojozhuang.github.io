---
layout: tutorial
key: popular
title: "Setting up Jekyll on Ubuntu and MacOS"
index: 1603
category: jekyll
breadcrumb: [Popular, Personal Website, Jekyll]
date: 2016-01-16
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
If you want jekyll to start at different port, add `port` option when using jekyll serve.
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
![image](/public/images/jekyll/1603/local.png)  

## 5. Increase Jekyll Build Speed
Jekyll build speed slows down with the increase in the number of files, posts, images etc. Below are some options to speed up the build.

Exclude files that are not required. Add `exclude` into `_config.yml`.
```sh
exclude: [node_modules, README.md]
```
Keep files that are required as-is. Add `keep_files` into `_config.yml`.
```sh
keep_files: [images]
```
Generate a Liquid rendering profile to help you identify performance bottlenecks.
```sh
jekyll serve --profile
$ bundle exec jekyll build --profile
Configuration file: /Users/Johnny/GitHub/jojozhuang.github.io/_config.yml
            Source: /Users/Johnny/GitHub/jojozhuang.github.io
       Destination: /Users/Johnny/GitHub/jojozhuang.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
     Build Warning: Layout 'nil' requested in blog/atom.xml does not exist.

Filename                                                                 | Count |     Bytes |  Time
-------------------------------------------------------------------------+-------+-----------+------
_layouts/tutorial.html                                                   |   313 | 18175.35K | 3.408
_includes/sidebar.html                                                   |   316 |  9473.80K | 2.605
_layouts/default.html                                                    |   392 | 25954.53K | 0.804
favorite.html                                                            |     1 |   340.92K | 0.646
_includes/navbar.html                                                    |   392 |   956.45K | 0.366
search.html                                                              |     1 |  2039.35K | 0.322
_includes/head.html                                                      |   392 |  1022.56K | 0.263
popular.html                                                             |     1 |   899.64K | 0.186
tutorial.html                                                            |     1 |  1208.29K | 0.159
_includes/pagination.html                                                |   358 |   428.93K | 0.151
index_tutorial.html                                                      |     1 |   154.98K | 0.054
note.html                                                                |     1 |   486.75K | 0.054
_layouts/post.html                                                       |    28 |   242.22K | 0.033
_popular/designpattern/design-pattern-overview.md                        |     1 |     1.90K | 0.033
_tutorial/knowledge/deploying-web-applications-to-cloud-services.md      |     1 |     4.42K | 0.022
blog/atom.xml                                                            |     1 |   252.76K | 0.022
_layouts/note.html                                                       |    17 |   184.04K | 0.016
_includes/disqus.html                                                    |   379 |   376.04K | 0.013
about/index.html                                                         |     1 |    40.20K | 0.012
_includes/postinglist.html                                               |     1 |    37.81K | 0.012
index_note.html                                                          |     1 |    32.80K | 0.012
_includes/google_analytics.html                                          |   392 |   156.57K | 0.012
_portfolio/game-store-multi.md                                           |     1 |     3.67K | 0.008
_tutorial/mobile/mobile-app-development.md                               |     1 |     2.01K | 0.008
_layouts/portfolio.html                                                  |    21 |   106.48K | 0.008
_tutorial/project/building-online-judge-application-with-mean-stack.md   |     1 |     4.07K | 0.007
_popular/javapractice/data-fix-with-javascript-for-web-application.md    |     1 |     8.77K | 0.006
_portfolio/course-player-socketio.md                                     |     1 |     2.61K | 0.005
_tutorial/reactapp/building-course-player-with-signalr-and-aspnet.md     |     1 |    28.92K | 0.005
_portfolio/course-player-signalr.md                                      |     1 |     2.15K | 0.005
_tutorial/docker/creating-mysql-image-with-docker-file.md                |     1 |     7.27K | 0.005
_tutorial/react/introduction-of-course-player.md                         |     1 |     5.27K | 0.004
_portfolio/course-player-xamarin.md                                      |     1 |     4.17K | 0.004
_portfolio/course-player-react.md                                        |     1 |     2.07K | 0.004
_popular/javapractice/building-website-with-jsp-and-mysql.md             |     1 |    26.81K | 0.004
_tutorial/reactapp/building-online-code-editor-with-react-and-express.md |     1 |    25.71K | 0.004
_tutorial/angularapp/creating-web-app-and-restful-api-with-mean-stack.md |     1 |     6.72K | 0.004
```
Use Jekyll incremental build
```sh
jekyll serve -I
jekyll serve --incremental
```
Let Jekyll build only the necessary posts.
```sh
jekyll serve --watch --limit_posts 1
```
Alternatively, we can set `incremental: true` in Jekyll’s `_config.yml` file. Notice, if the file name is changed, you have to restart the build.
```sh
incremental: true
```

## 6. Upgrade Jekyll
```sh
$ brew update
$ brew upgrade ruby
$ gem update jekyll
$ cd /Johnny/GitHub/jojozhuang.github.io
$ bundle update
$ bundle exec jekyll serve --port 12001
```

## 7. References
* [Jekyll - Official Installation Guide](https://jekyllrb.com/docs/installation/)
* [Setting up your GitHub Pages site locally with Jekyll
](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
* [Building a static website with Jekyll and GitHub Pages](https://programminghistorian.org/lessons/building-static-sites-with-jekyll-github-pages)
* [How to Set Up a Jekyll Development Site on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jekyll-development-site-on-ubuntu-16-04)
* [Increase Jekyll Build Speed](https://blog.webjeda.com/jekyll-build-speed/)
* [How I reduced my Jekyll build time by 61%](https://forestry.io/blog/how-i-reduced-my-jekyll-build-time-by-61/)
