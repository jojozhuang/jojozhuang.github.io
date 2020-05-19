---
layout: general
key: commands
title: Commands
---

> Quick reference for common commands.

## 1. Linux/macOS Commands
### 1.1 Jekyll
Start local Jekyll site.
```sh
# On MacOS
cd Johnny/GitHub/jojozhuang.github.io/
# Or on Windows, Ubuntu sub system
cd /mnt/d/GitHub/jojozhuang.github.io/
# Launch
bundle exec jekyll serve --port 12001
```
### 1.2 File and Directory
```sh
# Search Files by Name
find . -name 'filename' -R
### `.` -> path, the current directory
### `R` -> recursive

# Search Directories end with '-T'.
find . -name "*-T" -type d

# Search Directories end with '-T' and delete them.
find . -name "*-T" -type d -exec rm -rf {} \;

# Search Files Containing Specific Text
grep -Ril "text-to-find-here" /
### `i` - ignore case (optional in your case).
### `R` - recursive.
### `l` - show the file name, not the result itself.

# Open current directory in command line
open .   #macOS
nautilus . #linux

# Copy Files from/to Remote Machine
scp -r user@your.server.example.com:/path/to/foo /home/user/Desktop/
### `r` - Recursively copy entire directories.
```
### 1.3 Compression/Zip
```sh
# Compress the files without the .DS_Store, __MACOSX and other .* files.
cd SINV/SINV-10300
zip -r ImportInvoiceStatus.zip . -x ".*" -x "__MACOSX"
```
### 1.4 Permission
```sh
# Change Owner of Entire Directory to Current User
sudo chown $USER /ariba/ssp_git/ -R
### `R` - Recursively change the owner for sub directories.
```
### 1.5 Shortcut Keys for Mac
* CMD + SHIFT + G, paste path in finder to open a file.

## 2. Git Commands
### 2.1 Basic Commands
<table>
  <tbody>
    <tr>
      <th>Git task</th>
      <th width="400">Git commands</th>
      <th>Notes</th>
    </tr>
    <tr>
      <td colspan="1">Config</td>
      <td colspan="1">git config<br/>git config --list<br/>git config remote.origin.url [remote url]<br/>git config user.email "jojozhuang@gmail.com"</td>
      <td colspan="1"><br/>List all configurations<br/>Change url of remote repository<br/>Change email for specific repository<br/></td>
    </tr>
    <tr>
      <td>Initial</td>
      <td>git init</td>
      <td>Create '.git' directory.</td>
    </tr>
    <tr>
      <td rowspan="2">Clone</td>
      <td colspan="1">git clone username@host./path/to/repository</td>
      <td colspan="1">Clone git repository from remote server.</td>
    </tr>
    <tr>
      <td colspan="1">git clone --mirror URL_ON_GITHUB .git</td>
      <td colspan="1">Clone only the '.git' folder from remote server.</td>
    </tr>
    <tr>
      <td>Add files</td>
      <td>git add &lt;filename&gt;<br/>git add * <br/>git add .</td>
      <td>Add one or more files to staging (index).</td>
    </tr>
    <tr>
      <td>Remove files</td>
      <td>git reset HEAD &lt;filename&gt;</td>
      <td>Remove file from staging (index).</td>
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
      <td colspan="1">git checkout -b &lt;branchname&gt; origin/branchname</td>
      <td colspan="1">Create a new branch from specific branch.</td>
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
      <td colspan="1">If you mess up, you can replace the changes in your working tree with the last content in head: Changes already added to the index, as well as new files, will be kept.</td>
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
    <tr>
      <td>Stash</td>
      <td colspan="1">git stash list<br/>git stash save "message"<br/>git stash pop<br/>git stash pop stash@{0}</td>
      <td colspan="1">Store the modifications in the working directory and restore them back later</td>
    </tr>
   </tbody>
  </table>

### 2.2 Advanced Commands
1) Remove `.idea` folder, which is already checked into github.
```sh
git rm --cached -r .idea
git commit -a -m "remove .idea"
git push origin master
```
2) Remove `.iml` files, which are already checked into github.
```sh
git rm --cached **/*.iml
git commit -a -m "remove .iml"
git push origin master
```
3) Clone all branches and switch to specific branch.
```raw
git clone --mirror https://github.com/jojozhuang/jojozhuang.github.io.git .git
git config --bool core.bare false
git reset --hard
Checking out files: 100% (4315/4315), done.
HEAD is now at e3260368 note for book designing data intesive applciation
git checkout bootstrap-4
```
4) Search commits.  
Search the latest three commits.
```sh
git log -n 3
```
Find commits which has "queue" in the commit description.
```sh
git log --grep="queue"
```
5) View the changes in staged files.
```sh
git diff -staged
```
6) Rename file
```sh
git mv file1.txt file2.txt
```

## 3. Docker Commands
### 3.1 Docker

| Command | Description|
----------|-------------
docker version  |  Check docker version
docker info | Check system-wide information about Docker

### 3.2 Docker Hub

| Command | Description|
----------|-------------
docker search [searchterm]  |  Search Docker Hub for images.
docker pull [user/image] | Downloads an image from Docker Hub.
docker login | Authenticate to Docker Hub
docker push [user/image] | Uploads an image to Docker Hub.

### 3.3 Docker Image

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

### 3.4 Docker Container

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

## 4. Intellij IDEA Commands
* fn+F3: Add Bookmark
* generate java doc: mvn javadoc:javadoc

### 4.2 Live Templates
* sout -> System.out.println();
* souf -> System.out.printf("");
* psfs -> public static final String
* psfi -> public static final int

### 4.3 Common Used Function
* Code->Optimize Imports
* Code->Reformat Code

### 4.4 Views and Tools
* Favorites
* Breakpoint with condition
* Scratch files
* Gist

## 5. Maven Commands
```sh
mvn install
mvn test
mvn javadoc:javadoc
```

## 5. References
* [Basic Git commands](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)
* [Docker Commands Quick Reference Cheat Sheet](https://www.linode.com/docs/applications/containers/docker-commands-quick-reference-cheat-sheet/)
* [Saving Changes with Git Stash](https://mijingo.com/blog/saving-changes-with-git-stash)
* [Intellij IDEA Shortcuts Mac](https://www.jetbrains.com/help/rider/Reference_Keymap_Rider_OSX.html)
* [Intellij IDEA Shortcuts Windows](https://shortcutworld.com/IntelliJ-IDEA/win/IntelliJ_Shortcuts)
* [A Guide to Formatting Code Snippets in Javadoc](https://reflectoring.io/howto-format-code-snippets-in-javadoc/)
