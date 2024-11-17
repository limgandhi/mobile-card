import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@stitches/react';
import Button from '../components/Button.tsx';
import Flex from '../components/Flex.tsx';
import Input from '../components/Input.tsx';
import Text from '../components/Text.tsx';
import DialogContext from '../global/DialogContext.ts';
import useFirestore from '../hooks/useFirestore.tsx';
import { useUserStorage } from '../hooks/useUserStorage.tsx';
import { User } from '../types/User.types.ts';

const HomePage = () => {
  const navigate = useNavigate();
  const { open, close } = useContext(DialogContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser, initCurrentUser] = useUserStorage((state) => [
    state.currentUser,
    state.setCurrentUser,
    state.initCurrentUser,
  ]);
  useEffect(() => {
    if (currentUser) {
      navigate('/regular-vote/list', { replace: true });
    }
  }, [currentUser]);
  const { retrieveUsers } = useFirestore();

  const handleAdminButtonClick = () => {
    open({
      dialogComponent: (
        <Flex
          css={{ width: 100, height: 100, backgroundColor: '#000000', position: 'relative' }}
          onClick={() => close()}
        ></Flex>
      ),
    });
  };

  const handleNameChange = (value: string) => {
    setName((prevState) => (prevState !== value ? value : prevState));
  };

  const handlePasswordChange = (value: string) => {
    setPassword((prevState) => (prevState !== value ? value : prevState));
  };

  const handleLoginButtonClick = async (name: string, password: string) => {
    const retrievedUser = await retrieveUsers(name, password);

    if (!retrievedUser) {
      failedLoggingIn();
      return;
    }

    const retrievedName = retrievedUser?.name ?? '';
    const retrievedLast4PhoneNumber = retrievedUser?.last4PhoneNumber ?? '';

    if (retrievedName === '' || retrievedLast4PhoneNumber === '') {
      failedLoggingIn();
      return;
    }

    setCurrentUser({ name: name, last4PhoneNumber: password } as User);
    navigate('/regular-vote/list', { replace: true });
  };

  const failedLoggingIn = () => {
    open({});
    initCurrentUser();
  };

  return (
    <Flex fullWidth fullHeight center column>
      <Flex fullWidth center>
        <Text fontSize={55}>Regular Vote</Text>
      </Flex>
      <Flex column css={{ gap: 30, paddingTop: 50, paddingBottom: 50 }}>
        <Flex css={{ gap: 10, height: 50 }} center>
          <Flex css={{ width: 40 }} end>
            <Text fontSize={30} center>
              ID
            </Text>
          </Flex>
          <Text fontSize={30} center>
            :
          </Text>
          <Flex css={{ width: 200 }} center>
            <Input value={name} onChange={(e) => handleNameChange(e)} />
          </Flex>
        </Flex>
        <Flex css={{ gap: 10, height: 50 }} fullWidth center>
          <Flex css={{ width: 40 }} end>
            <Text fontSize={30} center>
              PW
            </Text>
          </Flex>
          <Text fontSize={30} center>
            :
          </Text>
          <Flex css={{ width: 200 }} center>
            <Input type={'password'} value={password} onChange={(e) => handlePasswordChange(e)} />
          </Flex>
        </Flex>
        <Flex fullWidth center>
          <Button size={'lg'} onClick={() => handleLoginButtonClick(name, password)}>
            Login
          </Button>
        </Flex>
      </Flex>

      {/*<Flex center css={{ gap: 10, padding: '10px 50px', alignItems: 'center' }}>*/}
      {/*  <Text fontSize={40}>(</Text>*/}
      {/*  <Button size={'md'} onClick={() => handleAdminButtonClick()}>*/}
      {/*    Admin Page*/}
      {/*  </Button>*/}
      {/*  <Text fontSize={40}>)</Text>*/}
      {/*</Flex>*/}
    </Flex>
  );
};

export default HomePage;
