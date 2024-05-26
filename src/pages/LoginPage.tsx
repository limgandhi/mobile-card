import React from 'react';
import { styled } from '@stitches/react';
import Button from '../components/Button.tsx';
import Flex from '../components/Flex.tsx';
import Input from '../components/Input.tsx';
import Text from '../components/Text.tsx';

const LoginPage = () => (
  <StyledFlex fitToParent column center style={{ gap: 10 }}>
    <Flex css={{ gap: 10, height: 50 }} fullWidth center>
      <Text width={50} fontSize={30} center>
        ID
      </Text>
      <Text width={10} fontSize={30} center>
        :
      </Text>
      <Flex css={{ width: 200 }} center>
        <Input />
      </Flex>
    </Flex>
    <Flex css={{ gap: 10, height: 50 }} fullWidth center>
      <Text width={50} fontSize={30} center>
        PW
      </Text>
      <Text width={10} fontSize={30} center>
        :
      </Text>
      <Flex css={{ width: 200 }} center>
        <Input />
      </Flex>
    </Flex>
    <Button css={{ width: '100px', height: '50px' }}>Login</Button>
  </StyledFlex>
);

const StyledFlex = styled(Flex, {
  padding: '50px',
});

export default LoginPage;
