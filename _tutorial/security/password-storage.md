---
layout: tutorial
key: tutorial
title: "Password Storage"
index: 3611
subcategory: security
date: 2019-07-17
tags: [Hashing, Salt, Pepper, SHA1]
---

> Protect password.

## 1. Storing Password
Authentication provides users with a set of credentials, such as username and password, and verifies them whenever users want access to the application. We need a way to store these credentials in our database for future comparisons.

## 2. Password in Plain Text
A simple approach to storing passwords is to create a table in our database that maps a username with a password.

 ID | Username  | Password
----|-----------|--------------
 1  | johnny    | abc123
 2  | george    | ASC#iu12!

When a user logs in, the server gets a request for authentication with the given username and password. We look up the username in the table and compare the password provided with the password stored. A match gives the user access to the application.

The problem here is, if an attacker was to break into the database and steal the passwords table, the attacker could then access each user account. No matter how complex the password is, it is compromised.

## 3. Hashing
### 3.1 Hashing the Password
A more secure way to store a password is to transform it into data that cannot be converted back to the original password. This mechanism is known as `hashing`. Hashing is a complex mathematical function that transform data with arbitrary size to data with a fixed size.

Commonly used hashing algorithms include Message Digest (MDx) algorithms, such as MD5, and Secure Hash Algorithms (SHA), such as SHA-1 and the SHA-2 family that includes the widely used SHA-256 algorithm.

The MD5 hash of 'abc123'.
```sh
e99a18c428cb38d5f260853678922e03
```
The MD5 hash of 'ASC#iu12!'.
```sh
612c4c40e0f5c226eebc738133ba447b
```
### 3.2 Hash Crack
Is hashing enough? Not really. Attackers can use `Dictionary Attack` or `Bruteforce Attack`.
* Dictionary Attack: Attempting to find the original plaintext by hashing common password and comparing them to the target hash.
* Bruteforce Attack: Trying every possible combination of characters against the hashed password, time taken increases exponentially as password length.

**Example for the Dictionary Attack**  
Some websites provide the hash lookup service, which allows you to input an hash hash and search for its corresponding plaintext ("found") in its database of already-cracked hashes.

Go to https://hashkiller.co.uk/Cracker, input MD5 hash **e99a18c428cb38d5f260853678922e03**, the original plain text **abc123** is returned.
![image](/public/images/devops/3611/hash-cracker.png)

## 4. Hashing with Salt
### 4.1 Rainbow Table
In the dictionary attack, the cracked passwords are stored in a database or a table, which is called `Rainbow Table`. A rainbow table is a listing of all possible plaintext permutations of encrypted passwords specific to a given hash algorithm. Rainbow tables are often used by password cracking software for network security attacks.
### 4.2 Salt
In cryptography, a `salt` is random data that is used as an additional input to a one-way function that "hashes" data, a password or passphrase. Salts are used to safeguard passwords in storage.

The idea is to append salt to the end of password before hashing. For example.
```sh
Password: abc123
Salt: W!)%z
Salted Password: abc123W!)%z
Hash(MD5): 90426e8c76023a00f9dec51b60a33879
```

**Best Practice**  
* The salt should be stored separately, can't be stored along with password.
* Each user should have his/her own salt.
![image](/public/images/devops/3611/password-salt.png)

## 5. Bcrypt, Scrypt, Argon2

Use Bcrypt (or Scrypt)
Goals for password security
Never use a bare hash (e.g. MD5, SHA1)
They’re too fast
If you can’t use those, use PBKDF2 and slow it way down


## 6. References
* [Password Hashing, Salts, Peppers](https://www.youtube.com/watch?v=--tnZMuoK3E)
* [Passwords & hash functions (Simply Explained)](https://www.youtube.com/watch?v=cczlpiiu42M)
* [How Dropbox securely stores your passwords](https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/)
* [Hashing Passwords: One-Way Road to Security](https://auth0.com/blog/hashing-passwords-one-way-road-to-security/)
* [Rainbow table](https://whatis.techtarget.com/definition/rainbow-table)
