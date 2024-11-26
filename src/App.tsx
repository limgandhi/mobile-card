import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { globalCss, styled } from '@stitches/react';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/HomePage.tsx';
import ProtectedPage from './pages/ProtectedPage.tsx';
import VoteBoardPage from './pages/VoteBoardPage.tsx';
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
    WebkitTapHighlightColor: 'transparent !important',
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
    {
      fontFamily: 'Moneygraphy-Pixel',
      src: 'url("/fonts/Moneygraphy-Pixel.ttf")',
    },
    {
      fontFamily: 'Moneygraphy-Rounded',
      src: 'url("/fonts/Moneygraphy-Rounded.ttf")',
    },
  ],
});

defaultGlobalStyle();

function App() {
  return (
    <MobilePage>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/regular-vote'} element={<ProtectedPage />}>
          <Route path={'list'} element={<VoteListPage />} />
          <Route path={'board'} element={<VoteBoardPage />} />
        </Route>
        <Route path={'*'} element={<ErrorPage />} />
      </Routes>
    </MobilePage>
  );
}
const MobilePage = styled('div', {
  display: 'flex',
  width: '430px',
  padding: '0px 10px',
  justifyContent: 'center',
  background: '#FEEED7',
});

export default App;
