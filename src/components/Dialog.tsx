import React, { useContext } from 'react';
import { styled } from '@stitches/react';
import Flex from './Flex.tsx';
import DialogContext from '../global/DialogContext.ts';

const Dialog = () => {
  const { close } = useContext(DialogContext);
  return (
    <Flex center css={{ position: 'fixed', alignItems: 'center', inset: 0 }}>
      <StyledDialogBackground />
      <StyledDialog>
        <button onClick={() => close!()}>test</button>
      </StyledDialog>
    </Flex>
  );
};

const StyledDialogBackground = styled(Flex, {
  position: 'fixed',
  inset: 0,
  opacity: 0.8,
  backgroundColor: '#FFFFFF',
});
const StyledDialog = styled(Flex, {
  position: 'relative',
  width: '300px',
  height: '500px',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 5,
  border: '3px solid #000000',
  boxShadow: '0px 10px 5px 0px rgb(0 0 0 / 25%)',
});

export default Dialog;
