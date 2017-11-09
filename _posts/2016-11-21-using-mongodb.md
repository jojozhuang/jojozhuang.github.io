---
layout: post
key: blog
title: "Using MongoDB"
date: 2016-11-21
tags: [MongoDB]
---

> Tutorial for how to create database, collections and documents in MongoDB.

## 1. Start MongoDB
Start MongoDB service.
```sh
$ sudo service mongod start
```
Launch MongoDB Shell with `mongo` command.
```sh
$ mongo
>
```
To exit the Shell, type `quit()` or use the `<Ctrl-C>` shortcut.
```sh
> quit()
```

## 2. Database
### 2.1 Show Existing Database
Check the current databases list with `show dbs` command.
```sh
> show dbs
admin  0.000GB
local  0.000GB
```
### 2.2 Create Database
Create a database named `mymdb` with `use DATABASE` command.
```sh
> use mymdb
switched to db mymdb
```
To check your currently selected database, use the command `db`.
```sh
> db
mymdb
```
If you use `show dbs` command to show the databases, `mymdb` is not present in list. To display database, you need to insert at least one document into it.
```sh
> db.mymdb.insert({"name":"iPhone 8"})
WriteResult({ "nInserted" : 1 })
> show dbs
admin  0.000GB
local  0.000GB
mymdb  0.000GB
```

### 2.3 Drop Database
Delete database `mymdb` with `db.dropDatabase()` command.
```
> use mymdb
switched to db mymdb
> db.dropDatabase()
{ "dropped" : "mymdb", "ok" : 1 }
> show dbs
admin  0.000GB
local  0.000GB
```

## 3. Collection
### 3.1 Syntax of Creating Collection
Basic syntax of creating new collection in MongoDB.
```sh
db.createCollection(name, options)
```
Option list:
* capped: If true, enables a capped collection. Capped collection is a fixed size collection that automatically overwrites its oldest entries when it reaches its maximum size. If you specify true, you need to specify size parameter also.
* autoIndexId: If true, automatically create index on \_id field.s Default value is false.
* size: Specifies a maximum size in bytes for a capped collection. If capped is true, then you need to specify this field also.
* max: Specifies the maximum number of documents allowed in the capped collection.

### 3.2 Creating Collection Without Options
Create database named `store` and collection named `product`.
```
> use store
switched to db store
> db.createCollection("product")
{ "ok" : 1 }
```

Check the created collection with `show collection` command.
```sh
> show collections
product
```
### 3.3 Creating Collection With Options
Create collection with explicit options.
```
>db.createCollection("productOptions", { capped : true, autoIndexId : true, size : 2000000, max : 10000 } )
{ "ok" : 1 }
```

Check the collection list.
```sh
> show collections
product
productOptions
```
### 3.3 Creating Collection Implicitly
MongoDB creates collection automatically, when you insert document into it.
```sh
> db.productImplicit.insert({"name":"iPhone 8"})
WriteResult({ "nInserted" : 1 })
> show collections
product
productImplicit
productOptions
>
```

### 3.4 Dropping Collection
Drop a collection from the database `store` with `db.<Collection>.drop()` command.
```sh
> use store
switched to db store
> db.productImplicit.drop()
true
> show collections
product
productOptions
>
```

## 4. Document
### 4.1 Creating Document
Syntax:
```sh
> db.<Collection>.insert(document)
```

Create a document with two attributes in collection `product`.
```sh
> db.product.insert({name: 'Xbox', price: 100})
WriteResult({ "nInserted" : 1 })
```

Use `<Collection>.find()` command to show the documents.
```
> db.product.find()
{ "_id" : ObjectId("5a04df9a4ddc534948a491a6"), "name" : "Xbox", "price" : 100 }
```

Use `db.product.find().pretty()` command to show the documents in a formatted way.
```sh
> db.product.find().pretty()
{
    "_id" : ObjectId("5a04df9a4ddc534948a491a6"),
    "name" : "Xbox",
    "price" : 100
}
>
```
![MIME Type](/public/pics/2016-11-21/create.png){:width="700px"}  

You can also insert multiple documents by passing an array of documents in insert method.
```sh
> db.product.insert([{name: 'PS4',price: 400},{name: 'iPhone',price: 699}])
BulkWriteResult({
    "writeErrors" : [ ],
    "writeConcernErrors" : [ ],
    "nInserted" : 2,
    "nUpserted" : 0,
    "nMatched" : 0,
    "nModified" : 0,
    "nRemoved" : 0,
    "upserted" : [ ]
})
```
### 4.2 Updating Document
Syntax:
```sh
> db.<Collection>.update(SELECTION_CRITERIA, UPDATED_DATA)
```
Check the existing documents.
```
> db.product.find()
{ "_id" : ObjectId("5a04df9a4ddc534948a491a6"), "name" : "Xbox", "price" : 100 }
{ "_id" : ObjectId("5a04e0b14ddc534948a491a7"), "name" : "PS4", "price" : 400 }
{ "_id" : ObjectId("5a04e0b14ddc534948a491a8"), "name" : "iPhone", "price" : 699 }
>
```
Update the price to '888' for 'iPhone'.
```sh
> db.product.update({'name':'iPhone'},{$set:{'price':'888'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```
Check the updated document.
```
> db.product.find()
{ "_id" : ObjectId("5a04df9a4ddc534948a491a6"), "name" : "Xbox", "price" : 100 }
{ "_id" : ObjectId("5a04e0b14ddc534948a491a7"), "name" : "PS4", "price" : 400 }
{ "_id" : ObjectId("5a04e0b14ddc534948a491a8"), "name" : "iPhone", "price" : "888" }
>
```
![MIME Type](/public/pics/2016-11-21/update.png){:width="700px"}  

### 4.3 Deleting Document
Syntax:
```sh
> db.<Collection>.remove(DELLETION_CRITTERIA)
```
Check the existing documents.
```
> db.product.find()
{ "_id" : ObjectId("5a04df9a4ddc534948a491a6"), "name" : "Xbox", "price" : 100 }
{ "_id" : ObjectId("5a04e0b14ddc534948a491a7"), "name" : "PS4", "price" : 400 }
{ "_id" : ObjectId("5a04e0b14ddc534948a491a8"), "name" : "iPhone", "price" : "888" }
>
```
Delete the documents whose name is 'iPhone'.
```sh
> db.product.remove({'name':'iPhone'})
WriteResult({ "nRemoved" : 1 })
```
Check the documents again.
```
> db.product.find()
{ "_id" : ObjectId("5a04df9a4ddc534948a491a6"), "name" : "Xbox", "price" : 100 }
{ "_id" : ObjectId("5a04e0b14ddc534948a491a7"), "name" : "PS4", "price" : 400 }
>
```
![MIME Type](/public/pics/2016-11-21/delete.png){:width="700px"}  

Specify '1' in the delete method to delete only the first record if there are multiple records.
```sh
> db.<Collection>.remove(DELETION_CRITERIA,1)
```

Delete all documents if no deletion criteria is specified.
```sh
> db.<Collection>.remove()
```

## 5. Query In MongoDB
### 5.1 Finding Document
Display all the documents in collection.
```sh
> db.<Collection>.find()
```
Display all the documents in formatted way with `pretty()`;
```sh
> db.<Collection>.find().pretty()
```
Return only one document from the result.
```sh
> db.<Collection>.findOne()
```
### 5.2 Where Clause
Use following operations to query the document with some conditions.

 Operation           | Syntax                     | Example                               | Equivalent
---------------------|----------------------------|---------------------------------------|-------------------
 Equality            | {\<key\>:\<value\>}        | db.product.find({"name":"iPhone"})    | where name = 'iPhone'
 Less Than           | {\<key\>:{$`lt`:\<value\>}}  | db.product.find({"price":{$lt:400}})  | where price < 400
 Less Than Equals    | {\<key\>:{$`lte`:\<value\>}} | db.product.find({"price":{$lte:400}}) | where price <= 400
 Greater Than        | {\<key\>:{$`gt`:\<value\>}}  | db.product.find({"price":{$gt:400}})  | where price > 400
 Greater Than Equals | {\<key\>:{$`gte`:\<value\>}} | db.product.find({"price":{$gte:400}}) | where price >= 400
 Not Equals          | {\<key\>:{$`ne`:\<value\>}}  | db.product.find({"price":{$ne:400}})  | where price != 400

### 5.3 AND in MongoDB
Find products whose price is greater than or equals to 400, and its price is less than 800.
```sh
> db.product.find({$and:[{"price":{$gte:400}},{"price":{$lt:800}}]})
```
![MIME Type](/public/pics/2016-11-21/findand.png){:width="700px"}  
### 5.4 OR in MongoDB
Find products whose name is 'Xbox', or its price is greater than 600.
```sh
> db.product.find({$or:[{"name":"Xbox"},{"price":{$gt:600}}]})
```
![MIME Type](/public/pics/2016-11-21/findor.png){:width="700px"}  
### 5.5 Using AND and OR Together
Find products whose name is 'Xbox', or its price is greater than 600, and its price is less than 300.
```sh
> db.product.find({"price":{$lt:300}, $or:[{"name":"Xbox"},{"price":{$gt:600}}]})
```
![MIME Type](/public/pics/2016-11-21/findandor.png){:width="700px"}  

## 6. References
* [MongoDB Official Website](https://www.mongodb.com)
* [MongoDB - Create Database](https://www.tutorialspoint.com/mongodb/mongodb_create_database.htm)
* [Databases and Collections](https://docs.mongodb.com/manual/core/databases-and-collections/)
