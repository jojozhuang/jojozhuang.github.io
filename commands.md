---
layout: general
key: commands
title: Commands
---

> Quick reference for common commands.

## 1. Git Commands
<table>
  <tbody>
    <tr>
      <th>Git task</th>
      <th width="400">Git commands</th>
      <th>Notes</th>
    </tr>
    <tr>
      <td colspan="1">Config</td>
      <td colspan="1">git config<br/>git config --list<br/>git config remote.origin.url [remote url]</td>
      <td colspan="1"></td>
    </tr>
    <tr>
      <td>Initial</td>
      <td>git init</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Clone</td>
      <td>git clone username@host./path/to/repository</td>
      <td>For a remote server, use.</td>
    </tr>
    <tr>
      <td>Add files</td>
      <td>git add &lt;filename&gt;<br/>git add * <br/>git add .</td>
      <td>Add one or more files to staging (index).</td>
    </tr>
    <tr>
      <td rowspan="2">Commit</td>
      <td colspan="1">git commit -m "Commit message"</td>
      <td colspan="1">Commit changes to head (but not yet to the remote repository).</td>
    </tr>
    <tr>
      <td colspan="1">git commit -a</td>
      <td colspan="1">Commit any files you've added with git add, and also commit any files you've changed since then.</td>
    </tr>
    <tr>
      <td colspan="1">Push</td>
      <td colspan="1">git push origin master</td>
      <td colspan="1">Send changes to the master branch of your remote repository.</td>
    </tr>
    <tr>
      <td colspan="1">Status</td>
      <td colspan="1">git status</td>
      <td colspan="1">List the files you've changed and those you still need to add or commit.</td>
    </tr>
    <tr>
      <td rowspan="2">Connect to a remote repository</td>
      <td colspan="1">git remote add origin &lt;server&gt;</td>
      <td colspan="1">If you haven't connected your local repository to a remote server, add the server to be able to push to it</td>
    </tr>
    <tr>
    <td colspan="1">git remote -v</td>
      <td colspan="1">List all currently configured remote repositories.</td>
    </tr>
    <tr>
      <td rowspan="7">Branches</td>
      <td colspan="1">git checkout -b &lt;branchname&gt;</td>
      <td colspan="1">Create a new branch and switch to it.</td>
    </tr>
    <tr>
      <td colspan="1">git checkout &lt;branchname&gt;</td>
      <td colspan="1">Switch from one branch to another.</td>
    </tr>
    <tr>
      <td colspan="1">git branch</td>
      <td colspan="1">List all the branches in your repo, and also tell you what branch you're currently in.</td>
    </tr>
    <tr>
      <td colspan="1">git branch -d &lt;branchname&gt;</td>
      <td colspan="1">Delete the feature branch.</td>
    </tr>
    <tr>
    <td colspan="1">git push origin &lt;branchname&gt;</td>
      <td colspan="1">Push the branch to your remote repository, so others can use it.</td>
    </tr>
    <tr>
      <td colspan="1">git push --all origin</td>
      <td colspan="1">Push all branches to your remote repository.</td>
    </tr>
    <tr>
      <td colspan="1">git push origin: &lt;branchname&gt;</td>
      <td colspan="1">Delete a branch on your remote repository.</td>
    </tr>
    <tr>
      <td rowspan="4">Update from the remote repository</td>
      <td colspan="1">git pull</td>
      <td colspan="1">Fetch and merge changes on the remote server to your working directory.</td>
    </tr>
    <tr>
      <td colspan="1">git merge &lt;branchname&gt;</td>
      <td colspan="1">To merge a different branch into your active branch.</td>
    </tr>
    <tr>
      <td colspan="1">git diff <br/>git diff --base &lt;filename&gt;<br/>git diff &lt;sourcebranch&gt; &lt;targetbranch&gt;</td>
      <td colspan="1">View all the merge conflicts.<br/>View the conflicts against the base file.<br/>Preview changes, before merging.</td>
    </tr>
    <tr>
      <td colspan="1">git add &lt;filename&gt;</td>
      <td colspan="1">After you have manually resolved any conflicts, you mark the changed file.</td>
    </tr>
    <tr>
      <td rowspan="3">Tags</td>
      <td colspan="1">git tag 1.0.0 &lt;commitID&gt;</td>
      <td colspan="1">You can use tagging to mark a significant changeset, such as a release.</td>
    </tr>
    <tr>
      <td colspan="1">git log</td>
      <td colspan="1">CommitId is the leading characters of the changeset ID, up to 10, but must be unique. Get the ID using.</td>
    </tr>
    <tr>
      <td colspan="1">git push --tags origin</td>
      <td colspan="1">Push all tags to remote repository.</td>
    </tr>
    <tr>
      <td rowspan="2">Undo local changes</td>
      <td colspan="1">git checkout -- &lt;filename&gt;</td>
      <td colspan="1">If you mess up, you can replace the changes in your working tree with the last content in head.<p>Changes already added to the index, as well as new files, will be kept.</p></td>
    </tr>
    <tr>
      <td colspan="1">git fetch origin <br/>git reset --hard origin/master</td>
      <td colspan="1">Instead, to drop all your local changes and commits, fetch the latest history from the server and point your local master branch at it.</td>
    </tr>
    <tr>
      <td>Search</td>
      <td colspan="1">git grep "foo()"</td>
      <td colspan="1">Search the working directory for foo().</td>
    </tr>
   </tbody>
  </table>

## 2. Docker Commands
### 2.1 Docker

| Command | Description|
----------|-------------
docker version  |  Check docker version
docker info | Check system-wide information about Docker

### 2.2 Docker Hub

| Command | Description|
----------|-------------
docker search [searchterm]  |  Search Docker Hub for images.
docker pull [user/image] | Downloads an image from Docker Hub.
docker login | Authenticate to Docker Hub
docker push [user/image] | Uploads an image to Docker Hub.

### 2.3 Docker Image

| Command | Description|
----------|-------------
docker images  |  Lists all images on the local machine.
docker rmi | Delete an image.
docker history [user/image] | Lists the history of an image.
docker tag user/image:tag user/image:newtag | Add a new tag to an image.
docker commit user/image | Save a container as an image.
docker save user/image | Save an image to a tar archive.
docker build -t sampleuser/ubuntu . | Builds a Docker image from a Dockerfile in the current directory.
docker load | Loads an image from file.

### 2.4 Docker Container

| Command | Description|
----------|-------------
docker ps | List all running containers.
docker ps -a | List all container instances, with their ID and status.
docker run [user/image] | Run a container with the selected image
docker run -it [user/image] | Runs an image, creating a container and changing the terminal to the terminal within the container.
docker stop [container name or ID] | Stop a container.
docker stop $(docker ps -a -q) | Stop all of Docker containers.
docker start [container name or ID] | Start a container.
docker rm -f [container name or ID] | Delete a container.
docker rm $(docker ps -a -q) | remove all of Docker containers
docker logs [container name or ID] | Displays the logs from a running container.
docker port [container name or ID] | Displays the exposed port of a running container.
docker diff [container name or ID] | Lists the changes made to a container.
docker attach [container name or ID] | Changes the command prompt from the host to a running container.
docker exec [container name or ID] shell command | Executes a command within a running container.

## 3. References
* [Basic Git commands](https.//confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)
* [Docker Commands Quick Reference Cheat Sheet](https://www.linode.com/docs/applications/containers/docker-commands-quick-reference-cheat-sheet/)
