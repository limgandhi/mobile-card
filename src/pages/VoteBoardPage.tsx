import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import Flex from '../components/Flex.tsx';
import Text from '../components/Text.tsx';
import VoteBoard from '../features/vote/VoteBoard.tsx';
import useFirestore from '../hooks/useFirestore.tsx';
import useLogout from '../hooks/useLogout.tsx';
import { useUserStorage } from '../hooks/useUserStorage.tsx';
import { initVote, Vote } from '../types/Vote.types.ts';
import { isSameUser } from '../utils/User.util.ts';

const VoteBoardPage = () => {
  const [currentUser, initCurrentUser] = useUserStorage((state) => [state.currentUser, state.initCurrentUser]);
  const { retrieveVoteBoard, updateVoteOptions } = useFirestore();
  const [vote, setVote] = useState<Vote>(initVote);
  const navigate = useNavigate();
  const { openLogoutPopup } = useLogout();

  useEffect(() => {
    retrieveVoteBoard('regularVote1').then((data) => {
      if (data) {
        setVote(data);
      }
    });
  }, []);

  const voteInitYn = useMemo(() => JSON.stringify(vote) !== JSON.stringify(initVote), [vote]);

  // const votePeriod = useMemo(() => {
  //   const startDate = new Date(vote.startDateOfWeek);
  //   const endDate = new Date(vote.startDateOfWeek);
  //   endDate.setDate(endDate.getDate() + 7);
  //
  //   const startDateString = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
  //   const endDateString = `${endDate.getMonth() + 1}/${endDate.getDate()}`;
  //   const yearString = `${
  //     startDate.getFullYear() === endDate.getFullYear()
  //       ? startDate.getFullYear()
  //       : startDate.getFullYear() + '-' + endDate.getFullYear()
  //   }`;
  //   return `${startDateString} ~ ${endDateString}, ${yearString}`;
  // }, [vote]);

  const handleVoteChange = (targetIndex: number) => {
    setVote((prevState) => {
      const changedOptions = prevState.options.map((option) => {
        if (option.index === targetIndex && currentUser) {
          return option.votedUsers.some((user) => isSameUser(user, currentUser))
            ? {
                ...option,
                votedUsers: option.votedUsers.filter((user) => !isSameUser(user, currentUser)),
              }
            : { ...option, votedUsers: [...option.votedUsers, currentUser] };
        } else return { ...option };
      });
      return { ...prevState, options: changedOptions };
    });
  };

  const updateVoteData = async (checkedIndices: number[]) => {
    await updateVoteOptions(vote.voteId, currentUser!, checkedIndices);
  };

  const handleListButtonClick = () => {
    navigate('../list', { replace: true });
  };

  const handleLogoutButtonClick = () => {
    openLogoutPopup();
  };

  return (
    voteInitYn && (
      <Flex fullWidth fullHeight column start>
        <Flex fullWidth css={{ position: 'relative' }}>
          <Flex fullWidth css={{ position: 'absolute', justifyContent: 'space-between' }}>
            <ListIcon onClick={() => handleListButtonClick()} />
            <LogoutIcon onClick={() => handleLogoutButtonClick()} />
          </Flex>
          <Flex fullWidth center css={{ padding: '10px 50px' }}>
            <Flex column css={{ gap: '10px' }}>
              <Flex fullWidth center>
                <Text fontSize={30}>{vote?.title ?? ''}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex center css={{ padding: 20 }}>
          <VoteBoard vote={vote} handleVoteChange={handleVoteChange} updateVoteData={updateVoteData} />
        </Flex>
      </Flex>
    )
  );
};

export default VoteBoardPage;
