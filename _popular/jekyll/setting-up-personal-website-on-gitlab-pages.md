---
layout: tutorial
key: popular
title: "Setting up Personal Website on GitLab Pages(Draft)"
index: 1602
category: jekyll
breadcrumb: [Popular, Personal Website, Jekyll]
date: 2018-06-06
tags: [GitLab Pages]
---

> Introduce how to setup personal website on GitLab.

```
baseurl: "/blog"
```

.gitlab-ci.yml
```sh
image: ruby:2.3

variables:
  JEKYLL_ENV: production

before_script:
  - bundle install

test:
  stage: test
  script:
  - bundle exec jekyll build -d test
  artifacts:
    paths:
    - test
  except:
  - master

pages:
  stage: deploy
  script:
  - bundle exec jekyll build -d _site
  artifacts:
    paths:
    - _site
  only:
  - master
```
## 4. References
* [GitLab Pages Getting Started](https://docs.gitlab.com/ee/user/project/pages/index.html)
* [Getting started with GitLab CI/CD](https://docs.GitLab.com/ee/ci/quick_start/README.html)
* [GitLab Google Kubernetes Engine integration](https://about.GitLab.com/google-cloud-platform/)
