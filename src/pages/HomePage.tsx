import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@stitches/react';
import Button from '../components/Button.tsx';
import Flex from '../components/Flex.tsx';
import Text from '../components/Text.tsx';
import DialogContext from '../global/DialogContext.ts';

const HomePage = () => {
  const navigate = useNavigate();
  const { open } = useContext(DialogContext);

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  const handleAdminButtonClick = () => {
    open();
  };

  return (
    <Flex fullWidth fullHeight center column>
      <Flex fullWidth center>
        <Text fontSize={55}>Regular Vote</Text>
      </Flex>
      <Flex column css={{ gap: 30, paddingTop: 50, paddingBottom: 50 }}>
        <Flex fullWidth center>
          <Text fontSize={40}>Welcome!</Text>
        </Flex>
        <Flex fullWidth center>
          <Text fontSize={40}>This is</Text>
        </Flex>
        <Flex fullWidth center>
          <Text fontSize={40}>Regular Vote</Text>
        </Flex>
        <Flex fullWidth center>
          <Button size={'lg'} onClick={() => handleLoginButtonClick()}>
            ENTER
          </Button>
        </Flex>
      </Flex>

      <Flex center css={{ gap: 10, padding: '10px 50px', alignItems: 'center' }}>
        <Text fontSize={40}>(</Text>
        <Button size={'md'} onClick={() => handleAdminButtonClick()}>
          Admin Page
        </Button>
        <Text fontSize={40}>)</Text>
      </Flex>
    </Flex>
  );
};

export default HomePage;
