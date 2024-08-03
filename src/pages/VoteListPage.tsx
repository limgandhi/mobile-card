import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Flex from '../components/Flex.tsx';
import Text from '../components/Text.tsx';
import useFirestore from '../hooks/useFirestore.tsx';
import { useUserStorage } from '../hooks/useUserStorage.tsx';
import { User } from '../types/User.types.ts';

const VoteListPage = () => {
  const [currentUser] = useUserStorage((state) => [state.currentUser]);
  const { retrieveVotes } = useFirestore();
  const [voteList, setVoteList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      initVoteList(currentUser);
    }
  }, []);
  useEffect(() => {
    console.log(voteList);
  }, [voteList]);

  const initVoteList = async (user: User) => {
    const result = await retrieveVotes(user);

    setVoteList(result.docs.map((doc) => doc.data().title));
  };

  const handleVoteClick = () => {
    navigate('../board');
  };

  return (
    <Flex fitToParent fullHeight column css={{ gap: 20 }}>
      <Flex center css={{ padding: 10 }}>
        <Text fontSize={40}>Vote List</Text>
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
