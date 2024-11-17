// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { styled } from '@stitches/react';
// import Button from '../components/Button.tsx';
// import Flex from '../components/Flex.tsx';
// import Input from '../components/Input.tsx';
// import Text from '../components/Text.tsx';
// import useDialog from '../hooks/useDialog.tsx';
// import useFirestore from '../hooks/useFirestore.tsx';
// import { useUserStorage } from '../hooks/useUserStorage.tsx';
// import { User } from '../types/User.types.ts';
//
// const LoginPage = () => {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [setCurrentUser, initCurrentUser] = useUserStorage((state) => [state.setCurrentUser, state.initCurrentUser]);
//   const { open } = useDialog();
//   const { retrieveUsers } = useFirestore();
//   const navigate = useNavigate();
//
//   const handleNameChange = (value: string) => {
//     setName((prevState) => (prevState !== value ? value : prevState));
//   };
//
//   const handlePasswordChange = (value: string) => {
//     setPassword((prevState) => (prevState !== value ? value : prevState));
//   };
//
//   const handleLoginButtonClick = async (name: string, password: string) => {
//     const retrievedUser = await retrieveUsers(name, password);
//
//     if (!retrievedUser) {
//       failedLoggingIn();
//       return;
//     }
//
//     const retrievedName = retrievedUser?.name ?? '';
//     const retrievedLast4PhoneNumber = retrievedUser?.last4PhoneNumber ?? '';
//
//     if (retrievedName === '' || retrievedLast4PhoneNumber === '') {
//       failedLoggingIn();
//       return;
//     }
//
//     setCurrentUser({ name: name, last4PhoneNumber: password } as User);
//     navigate('/regular-vote/board');
//   };
//
//   const failedLoggingIn = () => {
//     open();
//     initCurrentUser();
//   };
//
//   return (
//     <StyledFlex fitToParent column center style={{ gap: 10 }}>
//       <Flex css={{ gap: 10, height: 50 }} center>
//         <Flex css={{ width: 40 }} end>
//           <Text fontSize={30} center>
//             ID
//           </Text>
//         </Flex>
//         <Text fontSize={30} center>
//           :
//         </Text>
//         <Flex css={{ width: 200 }} center>
//           <Input value={name} onChange={(e) => handleNameChange(e)} />
//         </Flex>
//       </Flex>
//       <Flex css={{ gap: 10, height: 50 }} fullWidth center>
//         <Flex css={{ width: 40 }} end>
//           <Text fontSize={30} center>
//             PW
//           </Text>
//         </Flex>
//         <Text fontSize={30} center>
//           :
//         </Text>
//         <Flex css={{ width: 200 }} center>
//           <Input type={'password'} value={password} onChange={(e) => handlePasswordChange(e)} />
//         </Flex>
//       </Flex>
//       <Flex fullWidth center>
//         <Button size={'lg'} onClick={() => handleLoginButtonClick(name, password)}>
//           Login
//         </Button>
//       </Flex>
//     </StyledFlex>
//   );
// };
//
// const StyledFlex = styled(Flex, {
//   padding: '50px',
// });
//
// export default LoginPage;
