import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@stitches/react';
import Button from '../components/Button.tsx';
import Flex from '../components/Flex.tsx';
import Text from '../components/Text.tsx';
import VoteBoard from '../features/vote/VoteBoard.tsx';
import { User } from '../types/User.types.ts';
import { isSameUser } from '../utils/User.util.ts';

interface VoteType {
  title: string;
  startDateOfWeek: string;
  choices: ChoiceType[];
}

interface ChoiceType {
  title: string;
  voteUsers: User[];
}

const mockVote: VoteType = {
  title: 'RegularVote',
  startDateOfWeek: '2024-05-21',
  choices: [
    {
      title: 'MON',
      voteUsers: [
        {
          name: 'user01',
          last4PhoneNumber: '1111',
        },
        // {
        //   name: 'user02',
        //   last4PhoneNumber: '2222',
        // },
        // {
        //   name: 'user03',
        //   last4PhoneNumber: '3333',
        // },
        {
          name: 'user04',
          last4PhoneNumber: '4444',
        },
        {
          name: 'user05',
          last4PhoneNumber: '5555',
        },
        {
          name: 'user06',
          last4PhoneNumber: '6666',
        },
        {
          name: 'user07',
          last4PhoneNumber: '7777',
        },
      ],
    },
    {
      title: 'TUE',
      voteUsers: [],
    },
    {
      title: 'WED',
      voteUsers: [],
    },
    {
      title: 'THU',
      voteUsers: [],
    },
    {
      title: 'FRI',
      voteUsers: [],
    },
    {
      title: 'SAT',
      voteUsers: [],
    },
    {
      title: 'SUN',
      voteUsers: [],
    },
    {
      title: 'WAIT',
      voteUsers: [],
    },
    {
      title: 'NO',
      voteUsers: [],
    },
  ],
};

const VoteDetailPage = () => {
  const currentUser = { name: 'user01', last4PhoneNumber: '1111' } as User;
  const [vote, setVote] = useState<VoteType>(mockVote);

  const votePeriod = useMemo(() => {
    const startDate = new Date(vote.startDateOfWeek);
    const endDate = new Date(vote.startDateOfWeek);
    endDate.setDate(endDate.getDate() + 7);

    const startDateString = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
    const endDateString = `${endDate.getMonth() + 1}/${endDate.getDate()}`;
    const yearString = `${
      startDate.getFullYear() === endDate.getFullYear()
        ? startDate.getFullYear()
        : startDate.getFullYear() + '-' + endDate.getFullYear()
    }`;
    return `${startDateString} ~ ${endDateString}, ${yearString}`;
  }, [vote]);

  const handleVoteChange = (targetIndex: number) => {
    setVote((prevState) => {
      const changedChoices = prevState.choices.map((choice, index) => {
        if (index === targetIndex) {
          return choice.voteUsers.some((user) => isSameUser(user, currentUser))
            ? {
                ...choice,
                voteUsers: choice.voteUsers.filter((user) => !isSameUser(user, currentUser)),
              }
            : { ...choice, voteUsers: [...choice.voteUsers, currentUser] };
        } else return { ...choice };
      });
      return { ...prevState, choices: changedChoices };
    });
  };

  return (
    <Flex fullHeight column start>
      <Flex center css={{ padding: '20px' }}>
        <Flex column css={{ gap: '10px' }}>
          <Flex fullWidth center>
            <Text fontSize={30}>{vote.title}</Text>
          </Flex>
          <Flex fullWidth center>
            <Text fontSize={20}>{votePeriod}</Text>
          </Flex>
        </Flex>
      </Flex>
      <VoteBoard vote={vote} handleVoteChange={handleVoteChange} />
    </Flex>
  );
};

export default VoteDetailPage;
