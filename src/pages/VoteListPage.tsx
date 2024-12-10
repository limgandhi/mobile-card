import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import Flex from '../components/Flex.tsx';
import Text from '../components/Text.tsx';
import useFirestore from '../hooks/useFirestore.tsx';
import useLogout from '../hooks/useLogout.tsx';
import { useUserStorage } from '../hooks/useUserStorage.tsx';
import { User } from '../types/User.types.ts';

const VoteListPage = () => {
  const [currentUser, initCurrentUser] = useUserStorage((state) => [state.currentUser, state.initCurrentUser]);
  const { retrieveVotes } = useFirestore();
  const [voteList, setVoteList] = useState<string[]>([]);
  const navigate = useNavigate();
  const { openLogoutPopup } = useLogout();

  useEffect(() => {
    if (currentUser) {
      initVoteList(currentUser).then();
    }
  }, []);

  const initVoteList = async (user: User) => {
    const voteList = await retrieveVotes(user);
    setVoteList(voteList);
  };

  const handleVoteClick = () => {
    navigate('../board');
  };

  const handleLogoutButtonClick = () => {
    openLogoutPopup();
  };

  return (
    <Flex fullWidth fullHeight column css={{ gap: 20 }}>
      <Flex fullWidth css={{ position: 'relative' }}>
        <Flex fullWidth center css={{ padding: '10px 50px' }}>
          <Text fontSize={40}>{currentUser?.name ?? ''}</Text>
        </Flex>
        <Flex fullWidth end css={{ position: 'absolute', padding: '0 20px' }}>
          <LogoutIcon onClick={() => handleLogoutButtonClick()} />
        </Flex>
      </Flex>
      <Flex fitToParent css={{ paddingLeft: 30, paddingRight: 30, gap: 10 }} column>
        {voteList.map((vote, index) => (
          <Flex key={'vote' + index} onClick={() => handleVoteClick()}>
            <Text fontSize={30}>{vote}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default VoteListPage;
