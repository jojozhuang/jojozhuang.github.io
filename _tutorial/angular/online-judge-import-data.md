---
layout: tutorial
key: tutorial
title: "Online Judge - Import Data[Draft]"
index: 338
category: angular
image: angular.png
date: 2018-04-25
tags: [Online Judge]
---

> Learn how to upload data into mongo db in Angular application.

## 18. upload file, express


upload file
1) html
```html
<form [formGroup]="uploadForm" (ngSubmit)="onSubmit()">
   <div class="form-group">
     <label for="fileupd">fileupd</label>
     <input type="file" id="fileupd" (change)="onFileChange($event)" name="fileupd" formControlName="fileupd">
     <button type="button" class="btn btn-sm btn-default" (click)="clearFile()">clear file</button>
   </div>
   <button type="submit" [disabled]="loading" class="btn btn-success">Submit <i class="fa fa-spinner fa-spin fa-fw" *ngIf="loading"></i></button>
 </form>
```
2) angular component.ts
```TypeScript
//upload file  
  fileToUpload: File = null;

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    }
  }

  clearFile() {
    this.fileToUpload = null;
  }

  loading: boolean = false;
  onSubmit() {
    console.log(this.fileToUpload);
    this.loading = true;
    const formData = new FormData();
    // 'fileitem' must match with the backen api
    formData.append("fileitem", this.fileToUpload, this.fileToUpload.name);

    // In a real-world app you'd have a http request / service call here like
    this.databaseSerivce.importData(formData).subscribe(
      data => (this.loading = false),
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }
```
3) http service
```javascript
importData(formData: any) {
    console.log(formData);
    return this.http.post(this.apiUrl + "/import", formData, {
      observe: "response"
    });
  }
```
4) router
```javascript
router.post("/import", database_controller.collection_import);
```
5) controller
```javascript
exports.collection_import = function(req, res, next) {
  var storage = multer.diskStorage({
    //multers disk storage settings
    destination: function(req, file, cb) {
      console.log(file);
      var filepath = path.join(__dirname, "./uploads/"); // make sure this folder exists
      console.log(filepath);
      cb(null, filepath);
    },
    filename: function(req, file, cb) {
      var datetimestamp = Date.now();
      var filename =
        file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      console.log(filename);
      cb(null, filename);
    }
  });

  var upload = multer({
    //multer settings
    storage: storage
}).single("fileitem"); // match the name at client side.

  upload(req, res, function(err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, err_desc: null });
  });
};
```
error 1: If you see this error, check
```json
{"error_code":1,"err_desc":{"code":"LIMIT_UNEXPECTED_FILE","field":"fileitem","storageErrors":[]}}
```
check if the settings are correct, change file to fileitem.
```javascript
var upload = multer({
  //multer settings
  storage: storage
}).single("file"); // must match the name at client side.
```
error 2: If you get following error when using multer, check whether the folder defined in destination of multer exists.
```json
{"error_code":1,"err_desc":{"errno":-2,"code":"ENOENT","syscall":"open","path":"uploads/fileitem-1530761053796.txt","storageErrors":[]}}
```
Use 'path.join(__ dirname, ...)' to the the full path.
```javascript
var filepath = path.join(__dirname, "./uploads/"); // make sure this folder exists
```
You see, the folder is in controller folder, create uploads folder in it or change to another exsitign folder.
```json
{"error_code":1,"err_desc":{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/Johnny/GitHub/online-judge-mean/server/controllers/uploads/fileitem-1530761500560.txt","storageErrors":[]}}
```


// additional form data apart from file, progress event.

## 5. References
* https://www.npmjs.com/package/formidable(not used)
* https://www.npmjs.com/package/multer
* https://github.com/expressjs/multer
* https://www.npmjs.com/package/fast-csv


* [File Upload with AngularJS and NodeJS](https://ciphertrick.com/2015/12/07/file-upload-with-angularjs-and-nodejs/)
* [Sample code for file upload](https://github.com/rahil471/file-upload-with-angularjs-and-nodejs/blob/master/server/app.js)
* [Angular File Uploads with an Express Backend](https://scotch.io/tutorials/angular-file-uploads-with-an-express-backend)
* [Creating a File Upload Component in Angular (Including Backend)](https://malcoded.com/posts/angular-file-upload-component-with-express)
* [Uploading files in Angular (2/4) to a REST api](https://nehalist.io/uploading-files-in-angular2/)
* [File Upload with Angular](https://www.codingforentrepreneurs.com/blog/file-upload-with-angular/)
* [Bulk Import a CSV File Into MongoDB Using Mongoose With Node.js](https://code.tutsplus.com/articles/bulk-import-a-csv-file-into-mongodb-using-mongoose-with-nodejs--cms-29574)
