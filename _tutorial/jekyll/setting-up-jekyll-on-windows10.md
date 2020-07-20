---
layout: tutorial
key: tutorial
title: "Setting up Jekyll on Windows 10"
index: 8104
subcategory: jekyll
date: 2018-04-01
tags: [Jekyll, Windows10]
---

> Setup Jekyll on Windows 10.

## 1. Setup Ruby and Ruby Dev Kit.
Get Ruby Installer from https://rubyinstaller.org/downloads/. Execute it to start the installation, check the option 'Add Ruby executables to your PATH'.
![image](/assets/images/jekyll/8104/setupruby.png){:width="600px"}
After Ruby is installed, check the option 'Run 'ridk install' to install MSYS2 and development toolchain.'
![image](/assets/images/jekyll/8104/installmsys2.png){:width="500px"}
A new command windows will be opened. Select the first option '1 - MSYS2 base installation'.
```raw
_____       _           _____           _        _ _         ___
|  __ \     | |         |_   _|         | |      | | |       |__ \
| |__) |   _| |__  _   _  | |  _ __  ___| |_ __ _| | | ___ _ __ ) |
|  _  / | | | '_ \| | | | | | | '_ \/ __| __/ _` | | |/ _ \ '__/ /
| | \ \ |_| | |_) | |_| |_| |_| | | \__ \ || (_| | | |  __/ | / /_
|_|  \_\__,_|_.__/ \__, |_____|_| |_|___/\__\__,_|_|_|\___|_||____|
                   __/ |           _
                  |___/          _|_ _  __   | | o __  _| _     _
                                  | (_) |    |^| | | |(_|(_)\^/_>

  1 - MSYS2 base installation
  2 - MSYS2 system update
  3 - MSYS2 and MINGW development toolchain

Which components shall be installed? If unsure press ENTER [1,2,3] 1
```
You can also go to http://www.msys2.org/ to download the installer and install it manually.

After the installation, MSYS2 is installed to folder `C:\msys64\`. You can start it by running `msys2_shell.cmd`.
![image](/assets/images/jekyll/8104/msys.png){:width="500px"}

## 2. Install Jekyll gem
Run `gem install jekyll` to install jekyll. However, there is an error, see below.
```raw
c:\Ruby24-x64>gem install jekyll
Temporarily enhancing PATH for MSYS/MINGW...
Building native extensions.  This could take a while...
ERROR:  Error installing jekyll:
        ERROR: Failed to build gem native extension.

    current directory: C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/http_parser.rb-0.6.0/ext/ruby_http_parser
C:/Ruby24-x64/bin/ruby.exe -r ./siteconf20180309-5716-tu74b8.rb extconf.rb
creating Makefile

current directory: C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/http_parser.rb-0.6.0/ext/ruby_http_parser
make "DESTDIR=" clean
'make' is not recognized as an internal or external command,
operable program or batch file.

current directory: C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/http_parser.rb-0.6.0/ext/ruby_http_parser
make "DESTDIR="
'make' is not recognized as an internal or external command,
operable program or batch file.

make failed, exit code 1

Gem files will remain installed in C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/http_parser.rb-0.6.0 for inspection.
Results logged to C:/Ruby24-x64/lib/ruby/gems/2.4.0/extensions/x64-mingw32/2.4.0/http_parser.rb-0.6.0/gem_make.out
```
It seems some components are missing. Run `ridk install`, select the third option '3 - MSYS2 and MINGW development toolchain'.
```raw
c:\Ruby24-x64\bin>ridk install
 _____       _           _____           _        _ _         ___
|  __ \     | |         |_   _|         | |      | | |       |__ \
| |__) |   _| |__  _   _  | |  _ __  ___| |_ __ _| | | ___ _ __ ) |
|  _  / | | | '_ \| | | | | | | '_ \/ __| __/ _` | | |/ _ \ '__/ /
| | \ \ |_| | |_) | |_| |_| |_| | | \__ \ || (_| | | |  __/ | / /_
|_|  \_\__,_|_.__/ \__, |_____|_| |_|___/\__\__,_|_|_|\___|_||____|
                    __/ |           _
                   |___/          _|_ _  __   | | o __  _| _     _
                                   | (_) |    |^| | | |(_|(_)\^/_>

   1 - MSYS2 base installation
   2 - MSYS2 system update
   3 - MSYS2 and MINGW development toolchain

Which components shall be installed? If unsure press ENTER [1,2,3] 3
```
Then, try to install jekyll again. This time, there should be no more error.
```raw
gem install jekyll
```

## 3. Creating New Jekyll Website
Create a new website to test whether Jekyll works properly.
```raw
$ cd d:/test
$ jekyll new blog
$ cd blog
$ gem install bundler
$ bundle install
$ bundle exec jekyll serve
Configuration file: d:/test/blog/_config.yml
            Source: d:/test/blog
       Destination: d:/test/blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 0.755 seconds.
 Auto-regeneration: enabled for 'd:/test/blog'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```
Access http://127.0.0.1:4000/ in web browser. The new 'blog' website is live now.
![image](/assets/images/jekyll/8104/jekyllsite.png)

## 4. Hosting Existing GitHub Page Website
Clone the source code of your GitHub Page Website from GitHub to your local directory. Run 'bundle exec jekyll serve \-\-port 12001'.
```raw
C:\Users\jojoz>cd d:\Johnny\GitHub\jojozhuang.github.io
C:\Users\jojoz>d:
d:\Johnny\GitHub\jojozhuang.github.io>bundle exec jekyll serve --port 12001
Configuration file: d:/Johnny/GitHub/jojozhuang.github.io/_config.yml
            Source: d:/Johnny/GitHub/jojozhuang.github.io
       Destination: d:/Johnny/GitHub/jojozhuang.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
     Build Warning: Layout 'nil' requested in blog/atom.xml does not exist.
                    done in 11.595 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'd:/Johnny/GitHub/jojozhuang.github.io'
    Server address: http://127.0.0.1:12001
```
Access http://127.0.0.1:12001 in web browser. GitHub Page website is live in local.
![image](/assets/images/jekyll/8104/githubpage.png)

## 5. Hosting GitHub Page on Ubuntu
Another option to run Jekyll on Windows is to install Ubuntu on Windows 10. Check the link https://jekyllrb.com/docs/windows/.
### 5.1 Installing the Windows Subsystem for Linux
Run Powershell as administrator
```raw
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
Then, restart your computer when prompted.

### 5.2 Installing Ubuntu from Microsoft Store
![image](/assets/images/jekyll/8104/ubuntuapp.png){:width="800px"}

### 5.3 Installing Jekyll on Ubuntu
Follow the steps mentioned in [Setting up Jekyll on Ubuntu and macOS]({% link _tutorial/jekyll/setting-up-jekyll-on-ubuntu-and-macos.md %}) to setup Jekyll on Ubuntu sub system.

Then navigate to the root directory of jekyll site, use bundle command to launch it.
```sh
cd /mnt/d/GitHub/jojozhuang.github.io/
bundle exec jekyll serve --port 12001
```

## 6. References
* [How to Install and Setup Jekyll on Windows?](https://www.goyllo.com/install-jekyll-on-windows/)
* [Jekyll on Windows](https://jekyllrb.com/docs/windows/)
* [Install the Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
* [MSYS2 installer](http://www.msys2.org/)
