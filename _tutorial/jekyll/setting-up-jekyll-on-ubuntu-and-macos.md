---
layout: tutorial
key: tutorial
title: "Setting up Jekyll on Ubuntu and macOS"
index: 8103
subcategory: jekyll
date: 2016-01-16
tags: [GitHub Pages, Jekyll, Ruby, macOS]
---

> Setup Jekyll on Ubuntu and macOS.

## 1. What is Jekyll?
[Jekyll](https://jekyllrb.com) is a simple, blog-aware, static site generator. Jekyll is the engine behind [GitHub Pages](https://pages.github.com/), which means you can use Jekyll to host your page, blog, or website from GitHub’s servers for free.

## 2. Installing Jekyll on Ubuntu
Make sure gcc and make are installed. Check version of them with the following commands.
```raw
$ gcc -v
$ make -v
$ ruby -v //version must be 2.1 or above
```
Run the following command to install Jekyll.
```raw
$ sudo apt install jekyll
```
Check version.
```raw
$ jekyll --version
```

## 3. Installing Jekyll on Mac
Make sure gcc and make are installed. Check version of them with the following commands.
```raw
$ gcc -v
$ make -v
$ ruby -v //version must be 2.1 or above
```
Install Ruby.
```raw
$ brew install ruby
```

Install Jekyll.
```raw
$ sudo gem install jekyll
```
Check version.
```raw
$ jekyll -v
jekyll 3.6.2
```

## 4. Running Website with Jekyll
Get source files of my person website from Github.
```raw
$ cd /Johnny/Github/
$ git clone https://github.com/jojozhuang/jojozhuang.github.io
$ cd jojozhuang.github.io
```

Build and launch the website. All of the files will be deployed to a new folder named '\_site'. Open web browser and access  http://127.0.0.1:4000/.
```raw
$ jekyll build
$ jekyll serve
```
If you want jekyll to start at different port, add `port` option when using jekyll serve.
```raw
$ jekyll serve --port 12001
```

If you used bundle command, then you need to install the bundler.
```raw
$ gem install bundler
```
And prepending `bundle exec` to the jekyll command.
```raw
$ bundle exec jekyll serve --port 12001
```
Open web browser to access your local jekyll website.
![image](/assets/images/jekyll/8103/local.png)  

## 5. Increase Jekyll Build Speed
Jekyll build speed slows down with the increase in the number of files, posts, images etc. Below are some options to speed up the build.

Exclude files that are not required. Add `exclude` into `_config.yml`.
```raw
exclude: [node_modules, README.md]
```
Keep files that are required as-is. Add `keep_files` into `_config.yml`.
```raw
keep_files: [images]
```
Generate a Liquid rendering profile to help you identify performance bottlenecks.
```raw
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
_popular/design-pattern/design-pattern-overview.md                        |     1 |     1.90K | 0.033
_tutorial/knowledge/deploying-web-applications-to-cloud-services.md      |     1 |     4.42K | 0.022
blog/atom.xml                                                            |     1 |   252.76K | 0.022
_layouts/note.html                                                       |    17 |   184.04K | 0.016
_includes/disqus.html                                                    |   379 |   376.04K | 0.013
about/index.html                                                         |     1 |    40.20K | 0.012
_includes/postinglist.html                                               |     1 |    37.81K | 0.012
index_note.html                                                          |     1 |    32.80K | 0.012
_includes/google_analytics.html                                          |   392 |   156.57K | 0.012
_project/game-store-multi.md                                           |     1 |     3.67K | 0.008
_tutorial/mobile/mobile-app-development.md                               |     1 |     2.01K | 0.008
_layouts/portfolio.html                                                  |    21 |   106.48K | 0.008
_tutorial/online-judge/building-online-judge-application-with-mean-stack.md   |     1 |     4.07K | 0.007
_popular/java-app/data-fix-with-javascript-for-web-application.md    |     1 |     8.77K | 0.006
_project/course-player-socketio.md                                     |     1 |     2.61K | 0.005
_tutorial/react-app/building-course-player-with-signalr-and-aspnet.md     |     1 |    28.92K | 0.005
_project/course-player-signalr.md                                      |     1 |     2.15K | 0.005
_tutorial/docker/creating-mysql-image-with-docker-file.md                |     1 |     7.27K | 0.005
_tutorial/react/introduction-of-course-player.md                         |     1 |     5.27K | 0.004
_project/course-player-xamarin.md                                      |     1 |     4.17K | 0.004
_project/course-player-react.md                                        |     1 |     2.07K | 0.004
_popular/java-app/building-website-with-jsp-and-mysql.md             |     1 |    26.81K | 0.004
_tutorial/react-app/building-online-code-editor-with-react-and-express.md |     1 |    25.71K | 0.004
_tutorial/angular-app/creating-web-app-and-restful-api-with-mean-stack.md |     1 |     6.72K | 0.004
```
Use Jekyll incremental build
```raw
jekyll serve -I
jekyll serve --incremental
```
Let Jekyll build only the necessary posts.
```raw
jekyll serve --watch --limit_posts 1
```
Alternatively, we can set `incremental: true` in Jekyll’s `_config.yml` file. Notice, if the file name is changed, you have to restart the build.
```raw
incremental: true
```

## 6. Upgrade Jekyll
```raw
$ brew update
$ brew upgrade ruby
$ gem update jekyll
$ cd /Johnny/GitHub/jojozhuang.github.io
$ bundle update
$ bundle exec jekyll serve --port 12001
```

## 7. Using RVM to Manage Multiple Ruby Versions
### 7.1 System Ruby
Don't delete the system ruby on macos.
```raw
$ ruby -v
ruby 2.3.7p456 (2018-03-28 revision 63024) [universal.x86_64-darwin18]
$ which ruby
/usr/bin/ruby
```
### 7.2 Installing Rvm
Install rvm and use it to manage multiple ruby versions.

1) Install gnupg
```raw
brew install gnupg
```
2) Install GPG keys  
Go to https://rvm.io/rvm/install, find the link for gpg, execute it. You may get the "No route to host" error, find the host's ip address and try again.
```raw
$ gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
gpg: keyserver receive failed: No route to host
$ host pool.sks-keyservers.net
pool.sks-keyservers.net has address 24.134.103.65
pool.sks-keyservers.net has address 194.95.66.28
pool.sks-keyservers.net has address 138.68.241.223
pool.sks-keyservers.net has address 134.93.178.170
pool.sks-keyservers.net has address 91.143.92.136
pool.sks-keyservers.net has address 198.46.203.97
pool.sks-keyservers.net has address 95.216.167.177
pool.sks-keyservers.net has address 144.76.43.40
pool.sks-keyservers.net has address 178.209.51.99
pool.sks-keyservers.net has address 4.35.226.103
pool.sks-keyservers.net has IPv6 address 2a01:4f8:c2c:19a3::1
pool.sks-keyservers.net has IPv6 address 2620:128:2000::371b:8858:51f1:5681
pool.sks-keyservers.net has IPv6 address 2a01:4f9:c010:206b::1
pool.sks-keyservers.net has IPv6 address 2a02:168:f405::37
pool.sks-keyservers.net has IPv6 address 2604:a880:2:d0::3c1d:6001
pool.sks-keyservers.net has IPv6 address ::ffff:198.46.203.97
pool.sks-keyservers.net has IPv6 address 2001:4c80:40:628:5c70:d1ff:fe44:1424
pool.sks-keyservers.net has IPv6 address 2001:19f0:5001:2dba:ec4:7aff:fe8e:faf2
pool.sks-keyservers.net has IPv6 address 2001:67c:26b4::99:0
pool.sks-keyservers.net has IPv6 address 2607:f140:8801::1:65
$ gpg --keyserver hkp://24.134.103.65 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
gpg: key 105BD0E739499BDB: public key "Piotr Kuczynski <piotr.kuczynski@gmail.com>" imported
gpg: key 3804BB82D39DC0E3: "Michal Papis (RVM signing) <mpapis@gmail.com>" 1 new signature
gpg: key 3804BB82D39DC0E3: "Michal Papis (RVM signing) <mpapis@gmail.com>" 49 signatures cleaned
gpg: Total number processed: 2
gpg:               imported: 1
gpg:         new signatures: 1
gpg:     signatures cleaned: 49
```
3) Install RVM with the latest stable version of Ruby.
```raw
$ curl -sSL https://get.rvm.io | bash -s stable --ruby
```
Source the path, so that we can use rvm.
```raw
$ source ~/.rvm/scripts/rvm
```
4) Show all ruby versions.
```raw
rvm list
=* ruby-2.6.3 [ x86_64 ]

# => - current
# =* - current && default
#  * - default
```
5) Use the specific version.
```raw
$ rvm use 2.6.3
Using /Users/johnny/.rvm/gems/ruby-2.6.3
$ which ruby
/Users/johnny/.rvm/rubies/ruby-2.6.3/bin/ruby
$ ruby -v
ruby 2.6.3p62 (2019-04-16 revision 67580) [x86_64-darwin18]
```
### 7.3 Installing Jekyll
Install Jekyll.
```raw
$ gem install jekyll
```
Check version.
```raw
$ jekyll -v
jekyll 4.0.0
```
Install bundle and update its components.
```raw
$ gem install bundler
$ bundle pack
```
Launch Jekyll site with bundle.
```raw
$ bundle exec jekyll serve --port 12001
```
### 7.4 Security Vulnerability of Dependencies
Frequently receive notifications from GitHub about the security vulnerability in one of GitHub dependencies.

Run the following command to update `Gemfile.lock` file.
```raw
$ bundle update
```

## 8. References
* [Jekyll - Official Installation Guide](https://jekyllrb.com/docs/installation/)
* [Setting up your GitHub Pages site locally with Jekyll
](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
* [Building a static website with Jekyll and GitHub Pages](https://programminghistorian.org/lessons/building-static-sites-with-jekyll-github-pages)
* [How to Set Up a Jekyll Development Site on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jekyll-development-site-on-ubuntu-16-04)
* [Increase Jekyll Build Speed](https://blog.webjeda.com/jekyll-build-speed/)
* [How I reduced my Jekyll build time by 61%](https://forestry.io/blog/how-i-reduced-my-jekyll-build-time-by-61/)
* [How to Install Ruby on Mac OS X with RVM](https://usabilityetc.com/articles/ruby-on-mac-os-x-with-rvm/)
* [gpg: keyserver receive failed: No route to host #4215](https://github.com/rvm/rvm/issues/4215)
