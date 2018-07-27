---
layout: tutorial
key: tutorial
title: "Online Judge - Export Data[Draft]"
index: 337
category: angular
image: angular.png
date: 2018-04-23
tags: [Online Judge]
---

> Learn how to download data from mongo db in Angular application.

## 14. Data import and output
Import export data with mongoose


```sh
mongoexport -h ds263520.mlab.com:63520 -d onlinejudge2 -c users -u testuser -p abc123 -o users.csv --csv -f _id,timecreated,username,email,salt,hash
```


Export database, csv-express
1) server: get data from database and send to client.
```javascript
User.find()
     .lean()
     .exec({}, function(err, users) {
       if (err) return next(err);

       res.statusCode = 200;
       res.setHeader("Content-Type", "text/csv");
       res.setHeader(
         "Content-Disposition",
         "attachment; filename=" + filename
       );
       res.csv(users, true);
     });
```
2) client: send request with 'blob' response type. Then, receive the data and create dummy link button.
```TypeScript
// Export data
  exportData(name: string) {
    return (
      this.http
        .get(this.apiUrl + "/export/" + name, {
          responseType: "blob",
          observe: "response" // to display the full response
        })
        .map(res => {
          return {
            response: res,
            filename: name + ".csv", //res.headers.get("filename");
            data: res.body
          };
        })
        .subscribe(
          res => {
            let options = { type: "text/csv;charset=utf-8;" };
            this.createAndDownloadBlobFile(res.data, options, res.filename);
          },
          err => {
            console.log(err);
          }
        )
    );
  }

  createAndDownloadBlobFile(body, options, filename) {
    console.log("createAndDownloadBlobFile");
    var blob = new Blob([body], options);
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
```


## 5. References
* [Generate CSV using nodejs](http://programmerblog.net/generate-csv-using-nodejs/)
* [AngularJS : Download Files by Sending a HTTP Request to Web API](http://jaliyaudagedara.blogspot.com/2016/05/angularjs-download-files-by-sending.html)
* [How to generate CSV using nodejs and mongodb with mongoose](http://programmerblog.net/generate-csv-using-nodejs/)
* [AngularJS : Download Files by Sending a HTTP Request to Web API](http://jaliyaudagedara.blogspot.com/2016/05/angularjs-download-files-by-sending.html)
* [Download file using Ajax in Angular 4](https://medium.com/@radicalloop/download-file-using-ajax-in-angular-4-50109564bf17)
* [Angular 4 download file from server via http](http://jslim.net/blog/2018/03/13/Angular-4-download-file-from-server-via-http/)
