---
layout: post
key: blog
title: "Perl Script Doesn't Work(Draft)"
date: 2018-05-05
tags: [Perl]
---

> Introduce how to use Scrapy to build a web crawler.

## 1. Perl
Use `perl -V` to check the @INC list. Note, V is upper case.
```sh
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
    /Users/i857285/Library/ActivePerl-5.10/lib
    /usr/local/ActivePerl-5.10/site/lib
    /usr/local/ActivePerl-5.10/lib
```

## 7. Reference

perl -I /home/foobar/code script.pl




/ariba/ssp_dev/root/install/internal/ops/overlay/lib/perl/ariba/rc/InstalledProduct.pm

/ariba/ssp_dev/root/install/bin/encryptionoptin.pl -realm p2pTeSap -mode optin

./ariba/3rdParty/perl/AP810/Darwin/lib/site_perl/Darwin/Crypt/Blowfish.pm



/usr/local/ActivePerl-5.10/bin/perl -I /ariba/ssp_dev/root/install/internal/ops/overlay/lib/perl -I /ariba/ssp_dev/ariba/3rdParty/perl/AP810/Darwin/lib/site_perl/Darwin /ariba/ssp_dev/root/install/bin/encryptionoptin.pl -realm p2pTeSap -mode optin

/usr/local/ActivePerl-5.10/bin/perl -I /ariba/ssp_dev/root/install/internal/ops/overlay/lib/perl -I /ariba/ssp_dev/ariba/3rdParty/perl /ariba/ssp_dev/root/install/bin/encryptionoptin.pl -realm p2pTeSg -mode optin

find . -name SHA1.pm
http://search.cpan.org/~gaas/Digest-SHA1-2.13/

* [Perl - Introduction](https://www.tutorialspoint.com/perl/perl_introduction.htm)
* [Can't locate ... in @INC](https://perlmaven.com/cant-locate-in-inc)
* [How to change @INC to find Perl modules in non-standard locations](https://perlmaven.com/how-to-change-inc-to-find-perl-modules-in-non-standard-locations)
