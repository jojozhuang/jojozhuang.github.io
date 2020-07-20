---
layout: tutorial
key: programming
title: "Java Advanced - Cryptography"
index: 2471
subcategory: java-advanced
date: 2018-05-10
tags: [Encryption, Decryption]
---

> Introduce how to encrypt and decrypt file with java.

## 1. Java Cryptography
### 1.1 Java Cryptography API
The Java Cryptography API enables you to encrypt and decrypt data in Java, as well as manage keys, sign and authenticate messages, calculate cryptographic hashes and much more. The term cryptography is often abbreviated to `crypto`, so sometimes you will see references to Java crypto instead of Java Cryptography. The two terms refer to the same topic though.
### 1.2 Java Cryptography Extension
The Java cryptography API is provided by what is officially called the Java Cryptography Extension(JCE).

The Java Cryptography Extension has been part of the Java platform for a long time now. The JCE was initially kept separate from Java because the US had some export restrictions on encryption technology. Therefore the strongest encryption algorithms were not included in the standard Java platform. You could obtain these stronger encryption algorithms for Java JCE if you were a company inside the US, but the rest of the world had to make due with the weaker algorithms (or implement their own crypto algorithms and plug into JCE). Today (2017) the US encryption export rules have been eased a lot. Therefore most of the world can benefit from the international encryption standards via Java JCE.

Java Cryptographic Extension (JCE) framework which implements the standard cryptographic algorithms such as AES, DES, DESede and RSA.

## 2. Advanced Encryption Standard
Advanced Encryption Standard(AES) is a symmetric-key algorithm that uses the same key for both encryption and decryption of data. We will use AES in the following sample to encrypt and decrypt files.
### 2.1 Eclipse Project
In Eclipse, create a new Java project.
### 2.2 CryptoUtils
Defined two method for encryption and decryption.
* encrypt()
* decrypt()

```java
// CryptoUtils.java
package johnny.tutorial.encryption;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

public class CryptoUtils {
    private static final String ALGORITHM = "AES";
    private static final String TRANSFORMATION = "AES";

    public static void encrypt(String key, File inputFile, File outputFile)
            throws CryptoException {
        doCrypto(Cipher.ENCRYPT_MODE, key, inputFile, outputFile);
    }

    public static void decrypt(String key, File inputFile, File outputFile)
            throws CryptoException {
        doCrypto(Cipher.DECRYPT_MODE, key, inputFile, outputFile);
    }

    private static void doCrypto(int cipherMode, String key, File inputFile,
            File outputFile) throws CryptoException {
        try {
            // Create a Key from a given byte array for a given algorithm
            Key secretKey = new SecretKeySpec(key.getBytes(), ALGORITHM);
            // Get an instance of Cipher class for a given algorithm transformation
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            // Initialize the Cipher with an appropriate mode (encrypt or decrypt) and the given Key
            cipher.init(cipherMode, secretKey);

            // Get content to be encrypted or decrypted
            FileInputStream inputStream = new FileInputStream(inputFile);
            byte[] inputBytes = new byte[(int) inputFile.length()];
            inputStream.read(inputBytes);

            // Invoke doFinal() method to perform encryption or decryption
            byte[] outputBytes = cipher.doFinal(inputBytes);

            // Save the encrypted or decrypted content to output file
            FileOutputStream outputStream = new FileOutputStream(outputFile);
            outputStream.write(outputBytes);

            inputStream.close();
            outputStream.close();

        } catch (NoSuchPaddingException | NoSuchAlgorithmException
                | InvalidKeyException | BadPaddingException
                | IllegalBlockSizeException | IOException ex) {
            throw new CryptoException("Error encrypting/decrypting file:", ex);
        }
    }
}
```
### 2.3 CryptoException
Create a customized exception for Crypto errors.
```java
// CryptoException.java
package johnny.tutorial.encryption;

public class CryptoException extends Exception {
    public CryptoException() {
    }

    public CryptoException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
```
### 2.4 CryptoUtilsTest
Create a new Junit test class for CryptoUtils.
```java
// CryptoUtilsTest.java
package johnny.tutorial.encryption.test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.junit.Test;

import johnny.tutorial.encryption.CryptoException;
import johnny.tutorial.encryption.CryptoUtils;
import org.junit.Assert;

public class CryptoUtilsTest {
    private static final String ORIGINAL_FILE = "document.txt";
    private static final String ENCRYPTED_FILE = "encrypted.txt";
    private static final String DECRYPTED_FILE = "decrypted.txt";
    private static final String KEY_16 = "Mary has one cat";
    private static final String KEY_17 = "Water is purified";

    @Test
    public void test() {
        // Take a look the original content
        String original = readFile(ORIGINAL_FILE);
        System.out.print("Original content: ");
        System.out.println(original);

        File inputFile = new File(ORIGINAL_FILE);
        File encryptedFile = new File(ENCRYPTED_FILE);
        File decryptedFile = new File(DECRYPTED_FILE);

        try {
            CryptoUtils.encrypt(KEY_16, inputFile, encryptedFile);
            CryptoUtils.decrypt(KEY_16, encryptedFile, decryptedFile);
        } catch (CryptoException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }

        // Take a look the encrypted content
        String encrypted = readFile(ENCRYPTED_FILE);
        System.out.print("Encrypted content: ");
        System.out.println(encrypted);

        // Take a look the decrypted content
        String decrypted = readFile(DECRYPTED_FILE);
        System.out.print("Decrypted content: ");
        System.out.println(decrypted);

        Assert.assertEquals(original, decrypted);
    }

    /*
     * Read content from the given file
     */
    private String readFile(String filename) {
        String content = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(filename));
            try {
                StringBuilder sb = new StringBuilder();
                String line = br.readLine();

                while (line != null) {
                    sb.append(line);
                    sb.append(System.lineSeparator());
                    line = br.readLine();
                }
                content = sb.toString();
            }
            finally {
                br.close();
            }
       } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
       } finally {
       }
       return content;
    }

}
```

## 3. Testing
### 3.1 Orignal File
Create a text file in the project root folder with name 'document.txt' and the following content.
```raw
Happy work, happy life!
```
### 3.2 Run Junit
In the console, you should see the following output. The encrypted content is unreadable.
```raw
Original content: Happy work, happy life!

Encrypted content: �C�D3\(��u7��칿~�qN��]ZJ��l

Decrypted content: Happy work, happy life!
```

## 4. More Notes
### 4.1 Key Size
The AES algorithm requires that the key size must be `16 bytes (or 128 bit)`. So if you provide a key whose size is not equal to 16 bytes, a java.security.InvalidKeyException will be thrown. In case your key is longer, you should consider using a `padding mechanism` that transforms the key into a form in which its size is multiples of 16 bytes.
```java
String key = "Mary has one cat";  //length = 16, works
String key = "Water is purified"; //length = 17, InvalidKeyException occurs.
```

### 4.2 JSE Packages
If you get *'InvalidKeyException : Illegal Key Size'* error when *'cipher.init(cipherMode, secretKey)'* is executed, go to http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html, download Java Cryptography Extension (JCE) files. Make sure you download the proper version, here we need JCE for java 8.

Then, extract `local_policy.jar` and `US_export_policy.jar` from the downloaded package and copy them to *$JAVA_HOME/jre/lib/security*, for example */opt/jdk1.8.161/jre/lib/security*. Restart your application, the error should be gone.

## 5. Source Files
* [Source files of Encryption Java on Github](https://github.com/jojozhuang/Tutorials/tree/master/EncryptionJava)

## 6. References
* [Java Cryptography](http://tutorials.jenkov.com/java-cryptography/index.html)
* [File Encryption and Decryption Simple Example](http://www.codejava.net/coding/file-encryption-and-decryption-simple-example)
* [InvalidKeyException Illegal key size](https://stackoverflow.com/questions/3862800/invalidkeyexception-illegal-key-size/3864276)
* [InvalidKeyException : Illegal Key Size - Java code throwing exception for encryption class - how to fix?](https://stackoverflow.com/questions/6363801/invalidkeyexception-illegal-key-size-java-code-throwing-exception-for-encryp)
