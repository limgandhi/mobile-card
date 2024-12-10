import React, { ReactNode, useContext } from 'react';
import { styled } from '@stitches/react';
import Flex from './Flex.tsx';
import DialogContext from '../global/DialogContext.ts';

const Dialog = ({ dialogComponent, onClose }: { dialogComponent?: ReactNode; onClose?: () => void }) => (
  <Flex center css={{ position: 'fixed', alignItems: 'center', inset: 0 }}>
    <StyledDialogBackground />

    <StyledDialog>
      {dialogComponent ? (
        dialogComponent
      ) : (
        <Flex css={{ width: 300, height: 500, justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => onClose && onClose()}>test</button>
        </Flex>
      )}
    </StyledDialog>
  </Flex>
);

const StyledDialogBackground = styled(Flex, {
  position: 'fixed',
  inset: 0,
  opacity: 0.8,
  backgroundColor: '#FFFFFF',
});
const StyledDialog = styled(Flex, {
  position: 'relative',
  width: 'fit-content',
  height: 'fit-content',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  boxShadow: '0px 10px 5px 0px rgb(0 0 0 / 25%)',
});

export default Dialog;
