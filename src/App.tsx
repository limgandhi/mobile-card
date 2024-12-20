import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { globalCss, styled } from '@stitches/react';

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
    background: 'white',
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
      <Routes></Routes>
    </MobilePage>
  );
}
const MobilePage = styled('div', {
  display: 'flex',
  width: '430px',
  justifyContent: 'center',
  background: '#FEEED7',
});

export default App;
