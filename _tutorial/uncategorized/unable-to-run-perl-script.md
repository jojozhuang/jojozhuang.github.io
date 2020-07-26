---
layout: tutorial
key: tutorial
title: "Unable to Run Perl Script"
index: 9716
subcategory: uncategorized
date: 2018-05-05
tags: [Perl]
---

> Unable to run perl script if module is not found.

## 1. Error
When trying to execute a perl script, I got the following error. The error shows that perl cannot find the required module.
```raw
$ perl encryptionoptin.pl
Can't locate InstalledProduct.pm in @INC (@INC contains:
```

## 2. Cause
The error is either because the module is not installed or its path is not in the @INC list.

## 3. Solution
### 3.1 Checking Directories
Use `perl -V` to check the @INC list. Note, V is upper case.
```raw
perl -V

...
Characteristics of this binary (from libperl):
  Compile-time options: MULTIPLICITY PERL_DONT_CREATE_GVSV
                        PERL_IMPLICIT_CONTEXT PERL_MALLOC_WRAP USE_ITHREADS
                        USE_LARGE_FILES USE_PERLIO USE_REENTRANT_API
                        USE_SITECUSTOMIZE
  Locally applied patches:
    ActivePerl Build 1008 [294165]
    0abd0d78 disable non-unicode case insensitive trie matching
    d956618 Make Term::ReadLine::findConsole fall back to STDIN if /dev/tty cant be opened
  Built under darwin
  Compiled at Dec  9 2010 06:07:59
  @INC:
    /Users/Johnny/Library/ActivePerl-5.10/lib
    /usr/local/ActivePerl-5.10/site/lib
    /usr/local/ActivePerl-5.10/lib
```

### 3.2 Import Module
One approach to solve this error is to use `-I` option to manually import the module.
```raw
$ perl -I /Users/Johnny/project/InstalledProduct.pm  encryptionoptin.pl
```

## 4. Reference
* [Perl - Introduction](https://www.tutorialspoint.com/perl/perl_introduction.htm)
* [Can't locate ... in @INC](https://perlmaven.com/cant-locate-in-inc)
* [How to change @INC to find Perl modules in non-standard locations](https://perlmaven.com/how-to-change-inc-to-find-perl-modules-in-non-standard-locations)
