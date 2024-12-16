import React, { PropsWithChildren } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';
import { FirebaseContext } from './FirebaseContext.ts';

const FirebaseProvider = ({ children }: PropsWithChildren) => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyCJRfbSrU27VGdsTzM6YhWiiiZxbzzRh3w',
    authDomain: 'regular-vote.firebaseapp.com',
    projectId: 'regular-vote',
    storageBucket: 'regular-vote.appspot.com',
    messagingSenderId: '1037422321801',
    appId: '1:1037422321801:web:1cf7b584d690d843f2e658',
    measurementId: 'G-GZ4W4F1QW0',
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Google Analytics
  const analytics = getAnalytics(app);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(app);
  // requestPermission();
  getToken(messaging, {
    vapidKey: 'BA0rdpYCy7D2sktmp382c7fcfgOxJ1ukqpC7d9qanTaHgEuqXkd_4yNX9y4iNQO6pXl4MjjYXXK4JTfGXIO1iSQ',
  }).then((currentToken) => console.log(currentToken));

  return <FirebaseContext.Provider value={{ db, analytics }}>{children}</FirebaseContext.Provider>;
};

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  });
}

export default FirebaseProvider;
