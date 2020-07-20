---
layout: tutorial
key: architecture
title: "How To Store Passwords In a Secure Way?"
index: 3811
subcategory: security
date: 2019-07-17
tags: [Hashing, Salt, Pepper]
---

> Hashing the passwords before storing them.

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
![image](/assets/images/architecture/3811/encryption-process.png){:width="700px"}

### 3.2 Symmetric Encryption
`Symmetric encryption` uses only one secret key to cipher and decipher information. The sender and the recipient should know the secret key that is used to encrypt and decrypt all the messages. Blowfish, AES, RC4, DES, RC5, and RC6 are examples of symmetric encryption. The most widely used symmetric algorithm is AES-128, AES-192, and AES-256.
![image](/assets/images/architecture/3811/symmetric-encryption.png){:width="600px"}

The main disadvantage of the symmetric key encryption is that all parties involved have to exchange the key used to encrypt the data before they can decrypt it.

### 3.3 Asymmetric Encryption
`Asymmetrical encryption` is also known as public key cryptography. It uses two keys to encrypt a plain text. A `public key` is made freely available to anyone who might want to encrypt the message. The second `private key` is kept a secret so that the original user can only know. A message that is encrypted using a public key can only be decrypted using a private key, while also, a message encrypted using a private key can be decrypted using a public key.
![image](/assets/images/architecture/3811/asymmetric-encryption.png){:width="600px"}

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
A more secure way to store a password is to transform it into data that **cannot** be converted back to the original password. This mechanism is known as `hashing`, which is `unidirectional`. Hashing is a complex mathematical function that transform data with arbitrary size to data with a `fixed` size.

Commonly used hashing algorithms include Message Digest (MDx) algorithms, such as `MD5`, and Secure Hash Algorithms (SHA), such as SHA-1 and the SHA-2 family that includes the widely used `SHA-256` algorithm.

The MD5 hash of 'abc123'. You can try the [online tool](https://emn178.github.io/online-tools/md5.html) to generated MD5 hash or other type hashes.
```raw
e99a18c428cb38d5f260853678922e03
```
If the input string is changed even by just one single character, the output hash string will be entirely different. For example, The MD5 hash of 'abc129'.
```raw
83bd4ae2d244d72f27e8300722bb4c96
```
### 4.2 Cracking Hash
Is hashing enough? Not really. Though hashing is unidirectional and the hashed text can't be converted back, attackers can use dictionary attack or Bruteforce Attack to search for a match.
* `Dictionary Attack`: Attempting to find the original plaintext by hashing common password and comparing them to the target hash.
* `Bruteforce Attack`: Trying every possible combination of characters against the hashed password, time taken increases exponentially as password length.

**Example for the Dictionary Attack**  
Some websites provide the hash lookup service, which allows you to input a hash and search for its corresponding plaintext in its database of already-cracked hashes.

Go to https://hashkiller.co.uk/Cracker, input MD5 hash **e99a18c428cb38d5f260853678922e03**, the original plain text **abc123** is returned.
![image](/assets/images/architecture/3811/hash-cracker.png)

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
Hash(SHA3-256): 35fdfd6564fe248c8412b71f6a331c593665b12646d28e54cb8270d579ece966
```

**Best Practice**  
* Salt should be stored separately, can't be stored along with password.
* Each user should have a unique salt, so that the generated hashes are totally different for the same password from different users.
![image](/assets/images/architecture/3811/password-salt.png)

## 6. Bcrypt
From above, we learned that a better way to store passwords is to add a salt to the hashing process: adding additional random data to the input of a hashing function that makes each password hash unique.

There are plenty of cryptographic functions to choose from such as the SHA2 family and the SHA-3 family. However, one design problem with the SHA families is that they were designed to be computationally fast. How fast a cryptographic function can calculate a hash has an immediate and significant bearing on how safe the password is. Faster calculations mean faster brute-force attacks.

### 6.1 What is Bcrypt?
`bcrypt` was designed by Niels Provos and David Mazières based on the Blowfish cipher: `b` for `Blowfish` and `crypt` for the name of the hashing function used by the UNIX password system.

`bcrypt` was designed for password hashing hence it is a `slow` algorithm. This is good for password hashing as it reduces the number of passwords by second an attacker could hash when crafting a dictionary attack. Another benefit of bcrypt is that it requires a `salt` by default. It uses a 128-bit salt and encrypts a 192-bit magic value.

### 6.2 How does bcrypt work?
Bcrypt uses the expensive key setup phase of the Blowfish cipher to develop a new key setup algorithm for Blowfish named `eksblowfish`, which stands for "expensive key schedule Blowfish."

bcrypt runs in two phases:
* Phase 1: A function called `EksBlowfishSetup` is setup using the desired cost, the salt, and the password to initialize the state of eksblowfish. Then, bcrypt spends a lot of time running an expensive key schedule which consists of performing a `key derivation` where we derive a set of subkeys from a primary key. Here, the password is used as the primary key.
* Phase 2: The magic value is the 192-bit value `OrpheanBeholderScryDoubt`. This value is encrypted 64 times using eksblowfish in ECB mode with the state from the previous phase. The output of this phase is the cost and the 128-bit salt value concatenated with the result of the encryption loop.
![image](/assets/images/architecture/3811/bcrypt.png){:width="600px"}

### 6.3 Implementing bcrypt
**Generate hash for password**
Technique 1: Generate a salt and hash on separate function calls.
```javascript
const bcrypt = require("bcrypt");
const saltRounds = 10;
const plainTextPassword1 = "DFGh5546*%^__90";

bcrypt
  .genSalt(saltRounds)
  .then(salt => {
    console.log(`Salt: ${salt}`);

    return bcrypt.hash(plainTextPassword1, salt);
  })
  .then(hash => {
    console.log(`Hash: ${hash}`);

    // Store hash in your password DB.
  })
  .catch(err => console.error(err.message));
```
Output.
```raw
Salt: $2b$10$3euPcmQFCiblsZeEu5s7p.
Hash: $2b$10$3euPcmQFCiblsZeEu5s7p.9OVHgeHWFDk9nhMqZ0m/3pd/lhwZgES
```
Technique 2: Auto-generate a salt and a hash
```javascript
const bcrypt = require("bcrypt");
const saltRounds = 10;
const plainTextPassword1 = "DFGh5546*%^__90";

bcrypt
  .hash(plainTextPassword1, saltRounds)
  .then(hash => {
    console.log(`Hash: ${hash}`);

    // Store hash in your password DB.
  })
  .catch(err => console.error(err.message));
```
**Validate Password**
```java
const bcrypt = require("bcrypt");
const plainTextPassword1 = "DFGh5546*%^__90";

const hash = "$2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT/HRM/a";

bcrypt
  .compare(plainTextPassword1, hash)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.error(err.message));
```
We did not store the salt though, so how does bcrypt.compare know which salt to use? Looking at a previous hash/salt result, notice how the hash is the salt with the hash appended to it:
```raw
Salt: $2b$10$3euPcmQFCiblsZeEu5s7p.
Hash: $2b$10$3euPcmQFCiblsZeEu5s7p.9OVHgeHWFDk9nhMqZ0m/3pd/lhwZgES
```
This is actually three fields, delimited by `$`:
* `2b` identifies the bcrypt algorithm version that was used.
* `10` is the cost factor; 2^10 iterations of the key derivation function are used
* `3euPcmQFCiblsZeEu5s7p.9OVHgeHWFDk9nhMqZ0m/3pd/lhwZgES` is the salt and the cipher text, concatenated and encoded in a modified Base-64. The first 22 characters decode to a 16-byte value for the salt. The remaining characters are cipher text to be compared for authentication.

## 7. More
Choice of Password Hashing:
* Bcrypt
* Scrypt
* Argon2

`Argon2` is the best.

## 8. References
* [Password Hashing, Salts, Peppers](https://www.youtube.com/watch?v=--tnZMuoK3E)
* [Passwords & hash functions (Simply Explained)](https://www.youtube.com/watch?v=cczlpiiu42M)
* [How Dropbox securely stores your passwords](https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/)
* [Hashing Passwords: One-Way Road to Security](https://auth0.com/blog/hashing-passwords-one-way-road-to-security/)
* [Rainbow table](https://whatis.techtarget.com/definition/rainbow-table)
* [Symmetric Key Encryption - why, where and how it’s used in banking](https://www.cryptomathic.com/news-events/blog/symmetric-key-encryption-why-where-and-how-its-used-in-banking)
* [Symmetric vs. Asymmetric Encryption – What are differences?](https://www.ssl2buy.com/wiki/symmetric-vs-asymmetric-encryption-what-are-differences)
* [Hashing in Action: Understanding bcrypt](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)
* [scrypt - wikipedia](https://en.wikipedia.org/wiki/Scrypt)
* [Key derivation function](https://en.wikipedia.org/wiki/Key_derivation_function)
* [bcrypt - npm](https://www.npmjs.com/package/bcrypt)
* [How can bcrypt have built-in salts?](https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts)
* [Password Hashing: Scrypt, Bcrypt and ARGON2](https://medium.com/@mpreziuso/password-hashing-pbkdf2-scrypt-bcrypt-and-argon2-e25aaf41598e)
* [Argon2 on Github](https://github.com/P-H-C/phc-winner-argon2)
