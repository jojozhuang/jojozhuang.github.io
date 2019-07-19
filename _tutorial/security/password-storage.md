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

There are many ways to store the password, let's see.

## 2. Password in Plain Text
A simple approach to store passwords is to create a table in database that maps a username with a password.

 ID | Username  | Password
----|-----------|--------------
 1  | johnny    | abc123
 2  | george    | ASC#iu12!

When a user logs in, the server gets a request for authentication with the given username and password. It looks up the username in the table and compare the password provided with the password stored. A match gives the user access to the application.

The problem here is, if an attacker was to break into the database and steal the passwords table, the attacker could then access any user account. No matter how complex the password is, it is readable. Passwords are compromised.

## 3. Encryption
### 3.1 Encryption & Decryption
A better approach is to encrypt the password before storing it to database. In cryptography, `encryption` is the process of transforming information (referred to as plaintext) using an algorithm (called `cipher`) to make it unreadable to anyone except those possessing special knowledge, usually referred to as a key. The result of the process is encrypted information (in cryptography, referred to as `ciphertext`). In many contexts, the word encryption also implicitly refers to the reverse process, `decryption`, to make the encrypted information readable again (i.e. to make it unencrypted).
![image](/public/images/devops/3611/encryption-process.png){:width="700px"}

### 3.2 Symmetric Encryption
`Symmetric encryption` uses only one secret key to cipher and decipher information. The sender and the recipient should know the secret key that is used to encrypt and decrypt all the messages. Blowfish, AES, RC4, DES, RC5, and RC6 are examples of symmetric encryption. The most widely used symmetric algorithm is AES-128, AES-192, and AES-256.
![image](/public/images/devops/3611/symmetric-encryption.png){:width="600px"}

The main disadvantage of the symmetric key encryption is that all parties involved have to exchange the key used to encrypt the data before they can decrypt it.

### 3.3 Asymmetric Encryption
`Asymmetrical encryption` is also known as public key cryptography. It uses two keys to encrypt a plain text. A `public key` is made freely available to anyone who might want to encrypt the message. The second `private key` is kept a secret so that the original user can only know. A message that is encrypted using a public key can only be decrypted using a private key, while also, a message encrypted using a private key can be decrypted using a public key.
![image](/public/images/devops/3611/asymmetric-encryption.png){:width="600px"}

Asymmetric encryption is mostly used in day-to-day communication channels, especially over the Internet. Popular asymmetric key encryption algorithm includes EIGamal, RSA, DSA, Elliptic curve techniques, PKCS.

**Usage**
* `SSL/TLS` uses both asymmetric and symmetric encryption.
* `Digital certificate` is used in a client-server model of communication.

### 3.4 Example
Encrypt the password before storing it.
```raw
Password: abc123
Encrypted Text: vmF7pYf1W1zuuH7GZUXhnUO7Q/uqFmY8hfnc5774ou4=
```
Later, decrypt the ciphertext to get the original password for comparison.
```raw
Encrypted Text: vmF7pYf1W1zuuH7GZUXhnUO7Q/uqFmY8hfnc5774ou4=
Original Password: abc123
```
You can try encrypt and decrypt password at [Encrypt & Decrypt Text Online](https://www.online-toolz.com/tools/text-encryption-decryption.php).

The problem of the encryption approach is that it is `bidirectional`. If attacker gets the key and knows what algorithm is used, then attacker can easily decrypt the ciphertext to get the original password.

## 4. Hashing
### 4.1 Hashing the Password
A more secure way to store a password is to transform it into data that **cannot** be converted back to the original password. This mechanism is known as `hashing`, which is `unidirectional`. Hashing is a complex mathematical function that transform data with arbitrary size to data with a fixed size.

Commonly used hashing algorithms include Message Digest (MDx) algorithms, such as `MD5`, and Secure Hash Algorithms (SHA), such as SHA-1 and the SHA-2 family that includes the widely used `SHA-256` algorithm.

The MD5 hash of 'abc123'.
```raw
e99a18c428cb38d5f260853678922e03
```
The MD5 hash of 'ASC#iu12!'.
```raw
612c4c40e0f5c226eebc738133ba447b
```
### 4.2 Cracking Hash
Is hashing enough? Not really. Though hashing is unidirectional and the hashed text can't be converted back, attackers can use `Dictionary Attack` or `Bruteforce Attack` to search for a match.
* Dictionary Attack: Attempting to find the original plaintext by hashing common password and comparing them to the target hash.
* Bruteforce Attack: Trying every possible combination of characters against the hashed password, time taken increases exponentially as password length.

**Example for the Dictionary Attack**  
Some websites provide the hash lookup service, which allows you to input a hash and search for its corresponding plaintext in its database of already-cracked hashes.

Go to https://hashkiller.co.uk/Cracker, input MD5 hash **e99a18c428cb38d5f260853678922e03**, the original plain text **abc123** is returned.
![image](/public/images/devops/3611/hash-cracker.png)

## 5. Hashing with Salt
### 5.1 Rainbow Table
In the dictionary attack, the cracked passwords are stored in a table, which is called `Rainbow Table`. A rainbow table is a listing of all possible plaintext permutations of encrypted passwords specific to a given hash algorithm. Rainbow tables are often used by password cracking software for network security attacks.
### 5.2 Salt
In cryptography, a `salt` is random data that is used as an additional input to a one-way function that hashes data, a password or passphrase. Salts are used to safeguard passwords in storage.

The idea of salt is to append a random short text to the end of password before hashing. See the example below.
```raw
Password: abc123
Salt: W!)%z
Salted Password: abc123W!)%z
Hash(MD5): 90426e8c76023a00f9dec51b60a33879
```

**Best Practice**  
* Salt should be stored separately, can't be stored along with password.
* Each user should have a unique salt, so that the generated hashes are totally different for the same password from different users.
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
* [Symmetric Key Encryption - why, where and how it’s used in banking](https://www.cryptomathic.com/news-events/blog/symmetric-key-encryption-why-where-and-how-its-used-in-banking)
* [Symmetric vs. Asymmetric Encryption – What are differences?](https://www.ssl2buy.com/wiki/symmetric-vs-asymmetric-encryption-what-are-differences)
