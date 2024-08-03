import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import DialogProvider from './global/DialogProvider.tsx';
import FirebaseProvider from './global/FirebaseProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <DialogProvider>
          <App />
        </DialogProvider>
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
