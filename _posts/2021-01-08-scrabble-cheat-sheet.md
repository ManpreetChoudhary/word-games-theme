---
tags:
  - Website to app
  - Website to Android
  - App converter
categories:
  - General
title: How to turn a Mobile Website into an Android App
layout: post
author: Keshav
image: '/uploads/output-25.png'
comments: false
---

# **Easily turn a Mobile Website into an Android App**

Congratulations! Your search for “How to turn a mobile website into an android app” has landed you in the perfect place. This blog will be covering some of the technical ways to get this job done and hence is recommended for developers.

Thanks to advancements in the technology sector, the ever-existing war between websites and apps is somewhere subsiding. While both websites and mobile apps have established their dominance in the market, business enterprises want to achieve greater reaches by establishing themselves over both websites and apps. As a matter of fact, almost every business enterprise claimed to witness greater reachability after establishing themselves on both web and app as opposed to just one, Although a decade earlier from now, developers would have had to write separate codes for both websites and apps, in the 21st century it is now possible to convert a website into an app without writing any heavy codes at all.

Developers might want to convert their websites to mobile apps:

- To target more audience and to get a better reach.
- Apps can outperform their corresponding websites in revenue generation.
- To have the power to send push notifications.
- To enhance the mobile user experience and to meet modern user expectations.
- To build more loyalty and engagement by establishing itself on an app market such as Google PlayStore or Apple AppStore.

One thing to keep in mind is that converting a website to an app does not affect the website at all. The website can still behave the same way and is not destroyed or changed. Now that you know how beneficial this practice can be, let’s look at some of the ways you can convert an existing website into a mobile app. So let’s get started without further ado.

# **_Making your website mobile-friendly_**

The first and foremost step in converting a website to an app is to make it mobile-friendly. You must remember that your website turned app will later be used on smaller screen devices such as mobiles or tablets and you need to optimize it accordingly. Therefore, to make your website mobile-friendly, follow these points:

- **Width and height constraints:** You need to set the width and height constraints such that no content is cut off from the display of mobile/tablet devices. It should fit the device’s screen aptly.
- **Ever-present navigation:** Since the mobile app has a navigation system that is mostly physical and ever-present, you need to incorporate the same in your website. Not only will it make it more user-friendly but will also provide ease of accessibility.
- **No island pages:** Island pages are such pages from which users cannot return. Therefore, the users get stuck on that page and if they want to get back to the home page, they would have to go through the trouble of restarting your app all again, which certainly is not a good practice.
- **Use “\__blank_” target for all external domains**: If you don’t use “\__blank_” targets for external domains, that means if a link redirects the user to some other website, it will open on top of your website if the user clicks on it. For a website, this may be perfectly normal. But for an app, this means that the third party app which was intended to open will open in your app making your app buggy and crashy.

# **_Converting a mobile website to an Android app using Android Studio_**

Since this blog is supposed to be for developers with some sort of technical knowledge, we will therefore go with Android Studio to get our job done.

**About:** Android Studio is the official Integrated Development Environment (IDE) for Android app development, based on IntelliJ IDEA. It is the official software used for building native Android apps. The developer can either choose to code in Java or in Kotlin and make beautiful native Android apps. To support application development within the Android operating system, Android Studio uses a Gradle-based build system, emulator, code templates, and Github integration.

**How to:**

- Download and install Android Studio on your system if not already installed. Android Studio is heavy software requiring some minimum specs. You can look at the specs by scrolling to the end of [this](https://developer.android.com/studio) website.
- Once the Android Studio opens and is completely set up, click on **File** > **New** > **New Project…** and select Empty Activity as the activity type.

  ![](/uploads/image1.png)

- Go to **app**>**manifests**>**AndroidMainfest.xml** and add the following line before the opening of the **_application_** tag:

  > _<uses-permission android:name="android.permission.INTERNET"></uses-permission>_

- Open **activity_main.xml** and erase any existing code and paste the following snippet of code:

> _<?xml version="1.0" encoding="utf-8"?>_
>
> _<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"_
>
> _xmlns:app="http://schemas.android.com/apk/res-auto"_
>
> _xmlns:tools="http://schemas.android.com/tools"_
>
> _android:layout_width="match_parent"_
>
> _android:layout_height="match_parent"_
>
> _tools:context=".MainActivity">_
>
> _<WebView_
>
> _android:id="@+id/webview"_
>
> _android:layout_width="match_parent"_
>
> _android:layout_height="match_parent" />_
>
> _</RelativeLayout>_

- Open **styles.xml** and change the existing style tag to:

> _<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">_

Basically, here we changed **DarkActionBar** to **NoActionBar**.

- Go to **MainActivity.java** and replace the existing code with:

> _package yourPackageName;_
>
> _import androidx.appcompat.app.AppCompatActivity;_
>
> _import android.graphics.Bitmap;_
>
> _import android.os.Bundle;_
>
> _import android.webkit.WebSettings;_
>
> _import android.webkit.WebView;_
>
> _import android.webkit.WebViewClient;_
>
> _public class MainActivity extends AppCompatActivity {_
>
> _private WebView mywebView;_
>
> _@Override_
>
> _protected void onCreate(Bundle savedInstanceState) {_
>
> _super.onCreate(savedInstanceState);_
>
> _setContentView(R.layout.activity_main);_
>
> _mywebView=(WebView) findViewById(R.id.webview);_
>
> _mywebView.setWebViewClient(new WebViewClient());_
>
> _mywebView.loadUrl("YourWebsiteURL");_
>
> _WebSettings webSettings=mywebView.getSettings();_
>
> _webSettings.setJavaScriptEnabled(true);_
>
> _}_
>
> _public class mywebClient extends WebViewClient{_
>
> _@Override_
>
> _public void onPageStarted(WebView view, String url, Bitmap favicon){_
>
> _super.onPageStarted(view,url,favicon);_
>
> _}_
>
> _@Override_
>
> _public boolean shouldOverrideUrlLoading(WebView view,String url){_
>
> _view.loadUrl(url);_
>
> _return true;_
>
> _}_
>
> _}_
>
> _@Override_
>
> _public void onBackPressed(){_
>
> _if(mywebView.canGoBack()) {_
>
> _mywebView.goBack();_
>
> _}_
>
> _else{_
>
> _super.onBackPressed();_
>
> _}_
>
> _}_
>
> _}_

- Be sure to replace **_yourPackageName_** in the above code with yours. Also, replace **YourWebsiteURL** with the website that you want to convert in _mywebView.loadUrl("YourWebsiteURL");_.
- Your app is now all set up. You just need to change the icon of your app.
- To change the icon of your app, go to **res** > **drawable**(_right-click_)> **New** > **Image Asset**.

  ![](/uploads/image2-2.png)

- Make the **Asset Type** as **Image** and change the **Path** to the path of your icon.
- Adjust the icon and click **Next**.
- Your app is now all ready. You just need to generate the APK.
- To generate the APK file of your Android Studio project, go to **Build** and select **Generate Signed Bundle / APK…**.

  ![](/uploads/image5-1.png)

- In the window that appears, enter all the details and choose a password.

  ![](/uploads/image4.png)

- Click **Next** and select release as the **Build Variants** and check both the checkboxes in **Signature Versions**.

  ![](/uploads/image3-1.png)

- At last, click on **Finish** and your app will be ready in few minutes.
- You have now successfully converted your website to an Android app.

After having converted, or more aptly, generated a brand new Android app from your existing mobile website, you can publish it across various app markets. The best choice would be of course to go with the Google PlayStore as it is the official app market for Android devices and comes pre-installed. However, publishing an app to the Google PlayStore requires a Google Developer account which is paid.

Therefore, if you would like to try with the free ones then Amazon’s App Store makes another great choice. Hope you achieve your required results and try this way out.
