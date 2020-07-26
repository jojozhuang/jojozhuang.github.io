---
layout: tutorial
key: tutorial
title: "Migrating Repositories From GitHub to GitLab"
index: 9718
subcategory: uncategorized
date: 2018-07-21
tags: [GitHub, GitLab]
---

> Migrate repositories from GitHub to GitLab.

## 1. Microsoft Acquired GitHub
On June 6th, 2018, Microsoft announced an agreement to acquire GitHub. Here is the official blog [Microsoft + GitHub = Empowering Developers](https://blogs.microsoft.com/blog/2018/06/04/microsoft-github-empowering-developers/) about this acquisition. And GitHub also announced this news through [A bright future for GitHub](https://blog.github.com/2018-06-04-github-microsoft/). And this news is highlighted on GitHub.
![image](/assets/images/uncategorized/9718/acquire.png)

## 2. Moving to GitLab
Not sure how open source projects hosted in GitHub would be impacted. For safety, I moved all repositories from [GitHub](ttps://github.com) to [GitLab](https://GitLab.com).
### 2.1 Sign up
Go to https://GitLab.com/users/sign_in to register.
### 2.2 Profile
Login and go to Profile, edit user info.
![image](/assets/images/uncategorized/9718/profile.png)
### 2.3 Import Projects
Click '+' dropdown button which is nearby the top search box, and select 'New project'. Switch to 'Import project' tab, then select 'GitHub'.
![image](/assets/images/uncategorized/9718/import.png)
Click 'List your GitHub repositories', and provide GitHub credentials.
![image](/assets/images/uncategorized/9718/github.png)
You should be able to see all your repositories. Click 'Import all repositories' and wait for few seconds. All of your repositories will be imported to GitLab. Done!
![image](/assets/images/uncategorized/9718/moving.png)

## 3. Working with GitLab
### 3.1 Repository
Compared with GitHub, more information are shown in the same page. The left side is a menu tree, and the right side shows the relative detail information.
![image](/assets/images/uncategorized/9718/portfolio.png)
### 3.2 CI/CD Pipeline
GitLab offers a continuous integration(CI) service. If you add a `.GitLab-ci.yml` file to the root directory of your repository, and configure your GitLab project to use a Runner, then each commit or push, triggers your CI `pipeline`.
![image](/assets/images/uncategorized/9718/pipeline.png)
### 3.3 Kubernete
You can connect your project to Google Kubernetes Engine (GKE) on Google Cloud Platform (GCP).
![image](/assets/images/uncategorized/9718/kubernete.png)

## 4. References
* [Import your project from GitHub to GitLab](https://docs.GitLab.com/ee/user/project/import/github.html)
* [Getting started with GitLab CI/CD](https://docs.GitLab.com/ee/ci/quick_start/README.html)
* [GitLab Google Kubernetes Engine integration](https://about.GitLab.com/google-cloud-platform/)
