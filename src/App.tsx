import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { globalCss, styled } from '@stitches/react';
import useFirestore from './hooks/useFirestore.tsx';
import { useUserStorage } from './hooks/useUserStorage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ProtectedPage from './pages/ProtectedPage.tsx';
import VoteDetailPage from './pages/VoteDetailPage.tsx';
import VoteListPage from './pages/VoteListPage.tsx';

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
    {
      fontFamily: 'YeonSung-Regular',
      src: 'url("/fonts/YeonSung-Regular.ttf")',
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
        <Route path={'/regular-vote'} element={<ProtectedPage />}>
          <Route path={'list'} element={<VoteListPage />} />
          <Route path={'board'} element={<VoteDetailPage />} />
        </Route>
        <Route path={'*'} element={<ErrorPage />} />
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
