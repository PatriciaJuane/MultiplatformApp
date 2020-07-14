# Multiplatform application developed with Angular 8, Nativescript and Firebase.

This application is the Final Thesis Project I developed for my Master's Degree in Computer Engineering, at University of A Coruña.

It stores data related to horse riding competitions (trophies, results, horses, riders and clubs).
All the users can read that data, but only logged in users are able to write it.
Link to the demo video on YouTube: https://youtu.be/ioVHBP85QQk

---

# Technologies

---
### Angular: framework chosen for this project. Powered by Google. The main features I used were:

-Modules
	
-Components (Typescript + HTML5 + CSS3)
	
-Services
	
-Pipes
	
-i18n with ngx-translate
	
-Angular Material
	

---
### Nativescript: used to extend the Angular project with mobile templates. It permits to extend an existing web project. The main features I used were:

-Own modules (.tns)
	
-Has its own component templates (.tns.html, .tns.css) and, sometimes, even its own typescript files (.tns.ts files).
	
-Whenever needed, it has its own services: for example, for Firebase, it uses nativescript-firebase-plugin, so we need to create a separate service than the web one.
	
-Own Nativescript elements: RadListView, RadSideDrawer.
	
-Android configuration files: AndroidManifest.xml, build.gradle.

---
	
### Firebase: used as our NoSQL database in the Cloud. Managed by Google. The features I used were:
	
-**Cloud Firestore**: I have two apps (web and Android) in Firebase to store the data in the Firestore database. We use CRUD operations in both firebase services to manipulate the data. 

-**Cloud Storage**: used to store the images associated to horses and riders.
	
-**Firebase Authentication** (login with Google Account): used to delegate the users management of the application. It uses Google log in, but many more could be integrated.

---

# Requirements
This is a multiplatform application (for web and Android) created to store and read data related to horse riding competitions. 

The functionalities that it has are the following ones:

1. **Users**: log in, logout, user profile.

2. **Horses**: create horse (upload picture), see horse details (with its related results), see list of horses in the application.

3. **Riders**: create rider (upload picture), see rider details (with his/her related reuslts), see list of riders in the application.

4. **Clubs**: create club, see club details (with its related results), see list of clubs in the application.

5. **Competitions**: create competition, see competition details (with list of trophies), see list of competitions at Home page.

6. **Trophies**: create trophy, see trophy details (with list of results), see list of trophies associated to a competition.

7. **Results**: create result, see result details (with horse, rider and club), see list of results associated to a trophy, share result on Twitter.


All the users can read the data, but only logged in users can write it!!

---

# Instalation and execution instructions

Clone this repository in your local machine.

Install Node.js and the Android SDK.

Run this commands:

1. npm install -g @angular/cli -> to install Angular CLI

2. npm install -> for building the web app

3. npm install -g nativescript -> to install nativescript

4. tns build -> for building the mobile app

5. tns doctor -> for mobile app: needed to see if our machine has all the requirements needed to execute the Android app.


Finally, to execute the app:

1. npm start or ng serve -> for executing the web app

2. tns run android -> for executing the mobile Android app (you need an Android emulator or an Android device, both with the Nativescript playground app installed).

## Personal Comments
This was my first application developed with Nativescript and Firebase, and now I'm definitely a huge fan of both technologies.
Thank you very much for taking the time to look at this repository!
