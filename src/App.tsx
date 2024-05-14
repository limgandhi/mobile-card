import { useState } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import reactLogo from './assets/react.svg';
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer"></a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
