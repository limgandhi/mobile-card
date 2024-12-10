import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStorage } from './useUserStorage.tsx';
import Button from '../components/Button.tsx';
import Flex from '../components/Flex.tsx';
import Text from '../components/Text.tsx';
import DialogContext from '../global/DialogContext.ts';

const useLogout = () => {
  const [initCurrentUser] = useUserStorage((state) => [state.initCurrentUser]);
  const { open, close } = useContext(DialogContext);
  const navigate = useNavigate();

  const handleOkButtonClick = () => {
    initCurrentUser();
    navigate('/', { replace: true });
    close();
  };

  const openLogoutPopup = () =>
    open({
      dialogComponent: (
        <Flex
          css={{
            width: 330,
            height: 500,
            backgroundColor: '#FEEED7',
            position: 'relative',
            borderRadius: 10,
          }}
          column
        >
          <Flex
            fullWidth
            center
            css={{
              height: '80px',
              background: '#3A3754',
              borderRadius: '10px 10px 0px 0px',
              alignItems: 'center',
            }}
          >
            <Text fontSize={40} fontColor={'#FEEED7'}>
              Log-Out
            </Text>
          </Flex>
          <Flex fullWidth fitToParent>
            <Flex fullWidth fitToParent column center css={{ padding: 20, alignItems: 'center' }}>
              <Text fontSize={30}>{'Are you sure want'}</Text>&nbsp;<Text fontSize={30}> to log out?</Text>
            </Flex>
          </Flex>
          <Flex fullWidth center>
            <Flex fullWidth css={{ padding: 20 }}>
              <Flex fullWidth column css={{ gap: 20 }}>
                <Button size="lg" css={{ flex: 1, background: '#C03935' }} onClick={() => handleOkButtonClick()}>
                  OK
                </Button>
                <Button size="lg" css={{ flex: 1 }} onClick={() => close()}>
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ),
    });

  return {
    openLogoutPopup,
  };
};

export default useLogout;
