import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { globalCss, styled } from '@stitches/react';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import VotePage from './pages/VotePage.tsx';
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
const analytics = getAnalytics(app);

const defaultGlobalStyle = globalCss({
  body: {
    overflow: 'hidden',
    margin: 0,
  },
  '#root': {
    display: 'flex',
    width: '100vw',
    height: '100svh',
    justifyContent: 'center',
    background: 'black',
  },
  '@font-face': [
    {
      fontFamily: 'HakgyoansimBunpilR',
      src: 'url("/fonts/HakgyoansimBunpilR.ttf")',
    },
  ],
});

defaultGlobalStyle();

function App() {
  return (
    <MobilePage>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/vote'} element={<VotePage />} />
      </Routes>
    </MobilePage>
  );
}
const MobilePage = styled('div', {
  display: 'flex',
  width: '430px',
  justifyContent: 'center',
  background: '#FFFFFF',
});

export default App;
