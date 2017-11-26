---
layout: post
key: blog
title: "Developing Android App"
date: 2017-07-16
tags: [Android, Android Studio]
---

> Tutorial for how to develop Android App with Android Studio on Mac.

Build a simple product management app called GameStore. This app shows a list of products, including a product name, price, and photo. User can add, remove, or edit a product. To add a new product or edit an existing one, users navigate to a different screen where they can specify a name, price, and photo for a particular product.

## 1. Prerequisite
### 1.1 JDK and Android Studio Installed
Refer to [Android Development Environment Setup on Mac]({% link _posts/2017-07-13-android-development-environment-setup-on-mac.md %}) to install JDK and Android Studio on Mac.
### 1.2 Android Emulator Installed
Android Emulator will be installed along with Android Studio. You can also use third-party emulator, like Genymotion.

## 2. Creating New Project
1) In Android Studio, 'Start a new Android Studio project'.
![MIME Type](/public/pics/2017-07-16/welcome.png){:width="700px"}  
2) In the dialog that appears, use the following values to name your app and choose additional options for your project, click 'Next'.
* Product Name: GameStoreiOS
* Team: None
* Organization Name: JoJoStudio
* Organization Identifier: johnny.tutorial
* Language: Swift
* Include Unit Tests: Selected.

![MIME Type](/public/pics/2017-07-10/newproject2.png){:width="700px"}  
3) In the next dialog, select a location to save your project and click Create. Xcode opens the new project in the workspace window.
![MIME Type](/public/pics/2017-07-10/workspacewindow.png)

## 3. UI Design
1) In Xcode, click on `'Main.storyboard'`, add one view controller for 'New Product'.
![MIME Type](/public/pics/2017-07-10/storyboardadd.png){:width="400px"}  
2) Add another view controller for 'Product List'.
![MIME Type](/public/pics/2017-07-10/storyboardlist.png){:width="400px"}  
3) Then, add two navigation controllers, one points to 'Product List' controller, another points to 'New Product' controller. The final storyboard looks like below.
![MIME Type](/public/pics/2017-07-10/storyboard.png)

## 4. Creating Files
1) In Xcode, File->New-File..., select 'Swift File' and click 'Next'. Specify the name to 'Product.swift' and Save.
![MIME Type](/public/pics/2017-07-10/productswift.png){:width="700px"}  
2) Input the following content to `Product.swift`.
3)
1. Add list layout & activity
2. add detail layout & activity
3. create model, Product
4. create sqlite db helper.
double->REAL
5. save and read image from sqlite, blob,
BitmapFactory.decodeByteArray(imgByte, 0, imgByte.length);
6. customize listview using baseadapter
class dataListAdapter extends BaseAdapter {

}
7.add onclick event for product item in list view.

8. Add menu
<item
	android:id="@+id/action_save"
	android:title="Save"
	app:showAsAction="always" />
9. access photo, add to image view
<uses-permission android:name="android.permission.MANAGE_DOCUMENTS" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
10. Add image into android emulator gallery
You can send any file into android emulator via drag-n-drop action. And then go to Settings - Storage and re-mount your sdcard.
https://stackoverflow.com/questions/40681200/add-image-into-android-emulator-gallery

## 6. Testing
In Xcode, click the arrow button to run the app in simulator.
![MIME Type](/public/pics/2017-07-10/simulator.png){:width="400px"}  
Product list.
![MIME Type](/public/pics/2017-07-10/runproductlist.png){:width="400px"}  
Edit product.
![MIME Type](/public/pics/2017-07-10/runproductadd.png){:width="400px"}  
Delete product.
![MIME Type](/public/pics/2017-07-10/runproductdelete.png){:width="400px"}  
In landscape view.
![MIME Type](/public/pics/2017-07-10/runlandscape.png){:width="800px"}  

## 7. Source Files
* [Source files of Game Store(Android) on Github](https://github.com/jojozhuang/Tutorials/tree/master/GameStoreAndroid)

## 4. References
* [Starting Android Development, Creating a Todo App](https://www.sitepoint.com/starting-android-development-creating-todo-app/)
* [Source Code](https://github.com/sitepoint-editors/TodoList)
* [Android Tutorial](https://www.tutorialspoint.com/android/index.htm)
* [Android - SQLite Database](https://www.tutorialspoint.com/android/android_sqlite_database.htm)
* [ListView Tutorial— Android #12](https://appsandbiscuits.com/listview-tutorial-android-12-ccef4ead27cc)
