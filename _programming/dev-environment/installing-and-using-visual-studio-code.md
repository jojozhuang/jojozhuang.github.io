---
layout: tutorial
key: programming
title: "Installing and Using Visual Studio Code"
index: 2026
subcategory: dev-environment
date: 2018-07-13
tags: [Visual Studio Code]
---

> Walk through setting up Visual Studio Code and get an overview of the basic features.

## 1. What is Visual Studio Code?
Visual Studio Code(VS Code) is a source code editor developed by Microsoft for Windows, Linux and macOS. It includes support for debugging, embedded Git control, syntax highlighting, intelligent code completion, snippets, and code refactoring.

Visual Studio Code is based on [Electron](https://electronjs.org/), a framework which is used to deploy Node.js applications for the desktop.

## 2. Installation
Go to https://code.visualstudio.com/, download VS Code and install it.

## 3. Running and Using VS Code
### 3.1 Launch from UI
Start VS Code through Launch pad.
![image](/assets/images/programming/2026/vscode.png)
### 3.2 Launch from Terminal
In terminal, navigate to the folder where your code file locates, type the following command.
```raw
$ code .
```
* `.` represents the current directory.

If you get the 'code: command not found' error, you need to install 'code' command in PATH. In VS Code, open the Command Palette (⇧⌘P) and type shell command to find the Shell Command: Install 'code' command in PATH command.

After executing the command, restart the terminal for the new $PATH value to take effect. You'll be able to simply type 'code .' in any folder to start editing files in that folder.

### 3.3 Hot Keys
Go to menu Code > Preferences > Keyboard Shortcuts to view or define the shortcut keys.
![image](/assets/images/programming/2026/shortcuts.png)

### 3.4 Useful Shortcuts

Shortcut        | Description
----------------|------------------
CMD + P         | Go to File
CMD + Shift + P | Toggle Command Palette
CMD + F         | Find in current document
CMD + Shift + F | Project Scope Search
CMD + /         | Toggle Line Comment
Ctrl + Tab      | Switch between working files
CMD + Shift + M | Go to Problems
CMD + Shift + D | Debug, Breakpoint, Watch
CMD + Shift + V | Preview Markdown directly in the editor  

* Replace CMD with ctrl on windows.

### 3.5 Debugging
The debugging is more useful for debugging server-side code than for browser-side code,

### 3.6 Tasks
https://code.visualstudio.com/docs/editor/tasks

## 4. Reference
* [Setup and Basics of VS Code](https://code.visualstudio.com/docs/introvideos/basics)
* [VS Code Tips and Tricks](https://github.com/Microsoft/vscode-tips-and-tricks)
* [Key Bindings for Visual Studio Code](https://code.visualstudio.com/docs/getstarted/keybindings)
* [Integrate with External Tools via Tasks](https://code.visualstudio.com/docs/editor/tasks)
* [“code .” Not working in Command Line for Visual Code Studio on OSX/Mac](https://stackoverflow.com/questions/29955500/code-not-working-in-command-line-for-visual-code-studio-on-osx-mac)
