---
layout: project
key: project
title: "Restaurant(Anroid)"
index: 130
category: mobile
image: restaurantandroid/thumbnail.png
tags: [Android, Java, Android Studio, Genymotion]
---

> An Android App for searching restaurants, built with Java.

## 1. Function
This Android app is used to search restaurants, view details and submit comments. The available features are listed below.
* User Authentication - Sign Up, Sign In.
* Restaurants - Grouped by category(Restaurant, Dessert, CoffeeTea, Bakeries and IceCream).
* Search - Search restaurants by name.
* Feedback - Submit Comments and Ratings.
* Screen - Portrait Orientation, Landscape Orientation, Tablet screen is also supported.
* Dynamic Data - All data are fetched from backend RESTful services.

## 2. Home screen
### 2.1 Restaurant List  
Each restaurant has a specific icon based on its category. Tap on any of them, the restaurant detail shows up.
![index](/assets/images/project/restaurantandroid/index.png){:width="350px"}  

### 2.2 Restaurant Detail
The detail screen displays pictures, address, rating and comments. You can submit ratings and add comments to share your experience after login the app.
* Touch on the star bar to submit your rating.  
* Click on the ‘Write Comment’ button and fill out your comments.

| Restaurant Details         | Write Comments                   |
|----------------------------|----------------------------------|
| ![detail](/assets/images/project/restaurantandroid/detail.png){:width="330px"} | ![detail](/assets/images/project/restaurantandroid/submitreview.png){:width="330px"}

## 3. Searching
Click the ‘Search’ button on the menu bar, input the keyword and press Enter. The list will show the search result.

| Search Button              | Search Result                    |
|----------------------------|----------------------------------|
| ![searchbutton](/assets/images/project/restaurantandroid/searchbutton.png){:width="330px"} | ![search](/assets/images/project/restaurantandroid/search.png){:width="330px"}

## 4. User Function
Register as new user and login to submit rating or review.

| Sign Up                    | Login                            |
|----------------------------|----------------------------------|
| ![signup](/assets/images/project/restaurantandroid/signup.png){:width="330px"} | ![signin](/assets/images/project/restaurantandroid/signin.png){:width="330px"}

## 5. View in Landscape Mode  
Rotate the screen to landscape mode, the layout still looks pretty.
![landscape](/assets/images/project/restaurantandroid/landscape.png){:width="700px"}  

## 6. View in Tablet
Large Screen size is supported by default. The biggest difference is that the details screen is displayed along with the list view screen. You are able to see all of the contents on one screen.
![pad](/assets/images/project/restaurantandroid/pad.png){:width="900px"}  
If you change the rating value at the right side, you will see the effect at the left side immediately.
![pad2](/assets/images/project/restaurantandroid/pad2.png){:width="900px"}  

## 7. RESTful Services
The backend data server is built with ASP.NET MVC, which provides RESTful APIs. You can simulate the register, login and logout function here. And four main APIs are available.
* Get restaurant list
* Get restaurant by id
* Set rating
* Set comments

![backend](/assets/images/project/restaurantandroid/backend.png)  
## 8. Source Files
* [Source files of Restaurant(Android + RESTful API) on Github](https://github.com/jojozhuang/restaurant-android)
