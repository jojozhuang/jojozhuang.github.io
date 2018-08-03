---
layout: portfolio
key: portfolio
title: "Restaurant(Anroid)"
index: 90
tags: [Android, Java, Android Studio, Genymotion]
image: /public/portfolios/restaurantandroid/thumbnail.png
excerpt: An Android App for searching restaurants, built with Java.
category: mobile
---

> An Android app for searching restaurants, built with Java.

This app is used to search restaurants, view the details of them. After login, you can share your experience with others by submitting ratings and reviews. All of the data are dynamically fetched from backend server.

## 1. Home screen
### 1.1 Restaurant List  
Each restaurant has a specific icon based on its category(Restaurant, Dessert, CoffeeTea, Bakeries or IceCream). Tap on any of them, the restaurant detail shows up.
![index](/public/portfolios/restaurantandroid/index.png){:width="350px"}  

### 1.2 Restaurant Detail
The detail screen displays pictures, address, rating and comments. You can submit ratings and add comments to share your experience after login the app.
* Touch on the star bar to submit your rating.  
* Click on the ‘Write Comment’ button and fill out your comments.

| Restaurant Details         | Write Comments                   |
|----------------------------|----------------------------------|
| ![detail](/public/portfolios/restaurantandroid/detail.png){:width="330px"} | ![detail](/public/portfolios/restaurantandroid/submitreview.png){:width="330px"}

## 2. Searching
Click the ‘Search’ button on the menu bar, input the keyword and press Enter. The list will show the search result.

| Search Button              | Search Result                    |
|----------------------------|----------------------------------|
| ![searchbutton](/public/portfolios/restaurantandroid/searchbutton.png){:width="330px"} | ![search](/public/portfolios/restaurantandroid/search.png){:width="330px"}

## 3. User Function
Register as new user and login to submit rating or review.

| Sign Up                    | Login                            |
|----------------------------|----------------------------------|
| ![signup](/public/portfolios/restaurantandroid/signup.png){:width="330px"} | ![signin](/public/portfolios/restaurantandroid/signin.png){:width="330px"}

## 4. View in Landscape Mode  
Rotate the screen to landscape mode, the layout still looks pretty.
![landscape](/public/portfolios/restaurantandroid/landscape.png){:width="700px"}  
## 5. View in Tablet
Large Screen size is supported by default. The biggest difference is that the details screen is displayed along with the list view screen. You are able to see all of the contents on one screen.
![pad](/public/portfolios/restaurantandroid/pad.png){:width="900px"}  
If you change the rating value at the right side, you will see the effect at the left side immediately.
![pad2](/public/portfolios/restaurantandroid/pad2.png){:width="900px"}  

## 6. RESTful Services
The backend data server is built with ASP.NET MVC, which provides RESTful APIs. You can simulate the register, login and logout function here. And four main APIs are available.
* Get restaurant list
* Get restaurant by id
* Set rating
* Set comments

![backend](/public/portfolios/restaurantandroid/backend.png)  
## 7. Source Files
* [Source files of Restaurant(Android + DataServer) on Github](https://github.com/jojozhuang/restaurant-android)
