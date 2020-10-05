---
layout: tutorial
key: tutorial
title: "Getting Repositories through GitHub API"
index: 9521
subcategory: synology
date: 2019-06-27
tags: [Github API, jq, JSON]
---

> Get a list of all repositories from GitHub API by parsing JSON with jq.

## 1. GitHub REST API
### 1.1 REST API
All GitHub resources can be accessed via https://api.github.com, check [Resources in the REST API](https://docs.github.com/en/free-pro-team@latest/rest/overview/resources-in-the-rest-api) for more details. The latest API version is `v3`. In this posting, we will learn how to use GitHub API to receive a list of all repositories for a specific user.
### 1.2 Getting the List of All Public Repositories
Use `GET /users/{username}/repos` to retrieve the list of all public repositories for the specified user, see [List repositories for a user](https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-repositories-for-a-user). For example:
```sh
curl https://api.github.com/users/jojozhuang/repos
```
* Notice, the api doesn't include the private repositories.

### 1.3 Getting the List of All Repositories(Including Private Repositories)
To get all of the repositories(include the private ones), we need to use `GET /user/repos` with the proper authentication, see [List repositories for the authenticated user](https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-repositories-for-the-authenticated-user).
```sh
curl -H "Authorization: token [xxxxx]" -s "https://api.github.com/user/repos"
```
* Go to https://github.com/settings/tokens to generate a new token.

## 2. Parsing JSON with jq
Once we have the JSON data from GitHub API, we can use `jq` to parse it and exact the information we are interested in.
### 2.1 What is jq?
[jq](https://stedolan.github.io/jq/) is a lightweight and flexible command-line JSON processor.
### 2.2 Installing jq on MacOS
Install `jp` through homebrew.
```sh
brew install jq
```
Test jq.
```sh
echo '{ "name":"John", "age":31, "city":"New York" }' | jq .
```
Output.
```json
{
  "name": "John",
  "age": 31,
  "city": "New York"
}
```
* Use the most simple filter `.`, which returns the input data unchanged but pretty printed.

### 2.3 Using jq from Different Source
1) Parse JSON from local file.
```sh
jq . commits.json
```

2) Parse JSON from remote RESTful API.
```sh
curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5' | jq '.'
```
### 2.4 jq Tutorial
Go through this [jq Tutorial](https://stedolan.github.io/jq/tutorial/) to learn more about jq.

## 3. Extracting Repository Information
### 3.1 Sample JSON
The following JSON sample is one of my GitHub repositories.
```json
[
    {
        "id": 43661375,
        "node_id": "MDEwOlJlcG9zaXRvcnk0MzY2MTM3NQ==",
        "name": "algorithm-problems-java",
        "full_name": "jojozhuang/algorithm-problems-java",
        "private": false,
        "owner": {
            "login": "jojozhuang",
            "id": 11085641,
            "node_id": "MDQ6VXNlcjExMDg1NjQx",
            "avatar_url": "https://avatars3.githubusercontent.com/u/11085641?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/jojozhuang",
            "html_url": "https://github.com/jojozhuang",
            "followers_url": "https://api.github.com/users/jojozhuang/followers",
            "following_url": "https://api.github.com/users/jojozhuang/following{/other_user}",
            "gists_url": "https://api.github.com/users/jojozhuang/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/jojozhuang/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/jojozhuang/subscriptions",
            "organizations_url": "https://api.github.com/users/jojozhuang/orgs",
            "repos_url": "https://api.github.com/users/jojozhuang/repos",
            "events_url": "https://api.github.com/users/jojozhuang/events{/privacy}",
            "received_events_url": "https://api.github.com/users/jojozhuang/received_events",
            "type": "User",
            "site_admin": false
        },
        "html_url": "https://github.com/jojozhuang/algorithm-problems-java",
        "description": "Solution for algorithm problems on leetcode, lintcode and hackerrank.",
        "fork": false,
        "url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java",
        "forks_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/forks",
        "keys_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/teams",
        "hooks_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/hooks",
        "issue_events_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/issues/events{/number}",
        "events_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/events",
        "assignees_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/assignees{/user}",
        "branches_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/branches{/branch}",
        "tags_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/tags",
        "blobs_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/languages",
        "stargazers_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/stargazers",
        "contributors_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/contributors",
        "subscribers_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/subscribers",
        "subscription_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/subscription",
        "commits_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/contents/{+path}",
        "compare_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/merges",
        "archive_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/downloads",
        "issues_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/issues{/number}",
        "pulls_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/labels{/name}",
        "releases_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/releases{/id}",
        "deployments_url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java/deployments",
        "created_at": "2015-10-05T02:20:16Z",
        "updated_at": "2020-09-23T06:36:26Z",
        "pushed_at": "2020-09-23T06:36:20Z",
        "git_url": "git://github.com/jojozhuang/algorithm-problems-java.git",
        "ssh_url": "git@github.com:jojozhuang/algorithm-problems-java.git",
        "clone_url": "https://github.com/jojozhuang/algorithm-problems-java.git",
        "svn_url": "https://github.com/jojozhuang/algorithm-problems-java",
        "homepage": "",
        "size": 5409,
        "stargazers_count": 3,
        "watchers_count": 3,
        "language": "Java",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 1,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 0,
        "license": null,
        "forks": 1,
        "open_issues": 0,
        "watchers": 3,
        "default_branch": "master"
    },
]
```
### 3.2 Parsing JSON
Once we know the JSON schema of the GitHub repository. We can exact the useful information from it.

1) Get full name and url in JSON format.
```sh
curl 'https://api.github.com/users/jojozhuang/repos' | jq '.[] | {full_name: .full_name, url: .url}'
```
Output.
```json
{
  "full_name": "jojozhuang/algorithm-problems-java",
  "url": "https://api.github.com/repos/jojozhuang/algorithm-problems-java"
}
{
  "full_name": "jojozhuang/cheatsheets",
  "url": "https://api.github.com/repos/jojozhuang/cheatsheets"
}
{
  "full_name": "jojozhuang/chinese-dictionary-react",
  "url": "https://api.github.com/repos/jojozhuang/chinese-dictionary-react"
}
{
  "full_name": "jojozhuang/code-editor-react",
  "url": "https://api.github.com/repos/jojozhuang/code-editor-react"
}
...
```
2) Get html url in plain text format.
```sh
curl 'https://api.github.com/users/jojozhuang/repos' | jq '.[] | .html_url'
```
Output.
```raw
"https://github.com/jojozhuang/algorithm-problems-java"
"https://github.com/jojozhuang/cheatsheets"
"https://github.com/jojozhuang/chinese-dictionary-react"
"https://github.com/jojozhuang/code-editor-react"
...
```
3) Get links for archive zip file.  
There is no available url for archive files. But we can append "/archive/master.zip" to the end of the html url to get proper links.
```sh
curl 'https://api.github.com/users/jojozhuang/repos' | jq '.[] | .html_url + "/archive/master.zip"'
```
Output.
```raw
"https://github.com/jojozhuang/algorithm-problems-java/archive/master.zip"
"https://github.com/jojozhuang/cheatsheets/archive/master.zip"
"https://github.com/jojozhuang/chinese-dictionary-react/archive/master.zip"
"https://github.com/jojozhuang/code-editor-react/archive/master.zip"
...
```
4) Remove the double quote `"` in the result.  
Just add `-r` option in the jq command.
```sh
curl 'https://api.github.com/users/jojozhuang/repos' | jq -r '.[] | .html_url + "/archive/master.zip"'
```
Output.
```raw
https://github.com/jojozhuang/algorithm-problems-java/archive/master.zip
https://github.com/jojozhuang/cheatsheets/archive/master.zip
https://github.com/jojozhuang/chinese-dictionary-react/archive/master.zip
https://github.com/jojozhuang/code-editor-react/archive/master.zip
...
```
5) Get multiple fields in csv format.  
Concatenate multiple fields in one line, use comma `,` as delimiter.
```sh
curl 'https://api.github.com/users/jojozhuang/repos' | jq -r '.[] | "\(.name),\(.full_name),\(.private),\(.html_url)"'
```
Output.
```raw
algorithm-problems-java,jojozhuang/algorithm-problems-java,false,https://github.com/jojozhuang/algorithm-problems-java
cheatsheets,jojozhuang/cheatsheets,false,https://github.com/jojozhuang/cheatsheets
chinese-dictionary-react,jojozhuang/chinese-dictionary-react,false,https://github.com/jojozhuang/chinese-dictionary-react
code-editor-react,jojozhuang/code-editor-react,false,https://github.com/jojozhuang/code-editor-react
...
```
6) Save the result to file.
```sh
curl 'https://api.github.com/users/jojozhuang/repos' | jq '.[] | .html_url' > output.txt
```

## 4. References
* [GitHub API - Repositories](https://docs.github.com/en/free-pro-team@latest/rest/reference/repos)
* [jq](https://stedolan.github.io/jq/)
* [How to parse a json file from Linux command line using jq](https://linuxconfig.org/how-to-parse-a-json-file-from-linux-command-line-using-jq)
