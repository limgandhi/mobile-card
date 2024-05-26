import React, { useCallback, useMemo, useState } from 'react';
import { styled } from '@stitches/react';
import Button from '../components/Button.tsx';
import Flex from '../components/Flex.tsx';
import Text from '../components/Text.tsx';

interface VoteType {
  title: string;
  startDateOfWeek: string;
  choiceList: ChoiceType[];
}

interface ChoiceType {
  title: string;
  voteCount: number;
  voteUserList: string[];
}

const mockVote: VoteType = {
  title: 'RegularVote',
  startDateOfWeek: '2024-05-21',
  choiceList: [
    {
      title: 'MON',
      voteCount: 0,
      voteUserList: [],
    },
    {
      title: 'TUE',
      voteCount: 0,
      voteUserList: [],
    },
    {
      title: 'WED',
      voteCount: 0,
      voteUserList: [],
    },
    {
      title: 'THU',
      voteCount: 0,
      voteUserList: [],
    },
    {
      title: 'FRI',
      voteCount: 0,
      voteUserList: [],
    },
    {
      title: 'SAT',
      voteCount: 0,
      voteUserList: [],
    },
    {
      title: 'SUN',
      voteCount: 0,
      voteUserList: [],
    },
    {
      title: 'WAIT',
      voteCount: 0,
      voteUserList: [],
    },
    {
      title: 'NO',
      voteCount: 0,
      voteUserList: [],
    },
  ],
};

const VotePage = () => {
  const [vote, setVote] = useState<VoteType>(mockVote);
  const [editModeYn, setEditModeYn] = useState<boolean>(false);

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

  const getThreeChoiceList = useCallback(
    (position: 'upper' | 'middle' | 'lower') =>
      vote.choiceList.filter((choice, index) => {
        switch (position) {
          case 'upper':
            return index < 3;
          case 'middle':
            return index >= 3 && index < 6;
          case 'lower':
            return index >= 6 && index < 9;
          default:
            return false;
        }
      }),
    [vote],
  );

  const handleChoiceButtonClick = (targetIndex: number) => {
    setVote((prevState) => {
      const changedChoiceList = prevState.choiceList.map((choice, index) => {
        if (index === targetIndex) return { ...choice, voteCount: choice.voteCount + 1 };
        else return { ...choice };
      });
      return { ...prevState, choiceList: changedChoiceList };
    });
  };

  const handleVoteButtonClick = () => {
    setEditModeYn((prevState) => (prevState ? prevState : !prevState));
  };

  const handleConfirmButtonClick = () => {
    setEditModeYn((prevState) => (prevState ? !prevState : prevState));
  };

  return (
    <Flex fullHeight column start>
      <Flex center css={{ padding: '20px' }}>
        <Flex column css={{ gap: '10px' }}>
          <Text fontSize={30}>{vote.title}</Text>
          <Text fontSize={20}>{votePeriod}</Text>
        </Flex>
      </Flex>
      <Flex column css={{ gap: '20px' }}>
        <Flex between>
          {getThreeChoiceList('upper').map((choice, index) => (
            <ChoiceButtonWrapper center key={'upperChoice' + index}>
              <ChoiceButton
                center
                size65={choice.voteCount >= 6 && choice.voteCount < 12}
                size80={choice.voteCount >= 12}
                onClick={() => handleChoiceButtonClick(index)}
                disabled={!editModeYn}
              >
                {choice.title}
              </ChoiceButton>
            </ChoiceButtonWrapper>
          ))}
        </Flex>
        <Flex between>
          {getThreeChoiceList('middle').map((choice, index) => (
            <ChoiceButtonWrapper center key={'middleChoice' + index}>
              <ChoiceButton
                center
                size65={choice.voteCount >= 6 && choice.voteCount < 12}
                size80={choice.voteCount >= 12}
                onClick={() => handleChoiceButtonClick(index + 3)}
                disabled={!editModeYn}
              >
                {choice.title}
              </ChoiceButton>
            </ChoiceButtonWrapper>
          ))}
        </Flex>
        <Flex between>
          {getThreeChoiceList('lower').map((choice, index) => (
            <ChoiceButtonWrapper center key={'lowerChoice' + index}>
              <ChoiceButton
                center
                size65={choice.voteCount >= 6 && choice.voteCount < 12}
                size80={choice.voteCount >= 12}
                onClick={() => handleChoiceButtonClick(index + 6)}
                disabled={!editModeYn}
              >
                {choice.title}
              </ChoiceButton>
            </ChoiceButtonWrapper>
          ))}
        </Flex>
        <Flex center>
          {editModeYn ? (
            <Button onClick={() => handleConfirmButtonClick()}>Confirm</Button>
          ) : (
            <Button onClick={() => handleVoteButtonClick()}>Vote</Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

const ChoiceButton = styled(Flex, {
  width: '50px',
  height: '50px',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0px 4px 4px 0px #00000040 , inset 0px -4px 4px 0px #00000040',
  transitionProperty: 'width height',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-in-out',
  variants: {
    size65: {
      true: {
        width: '65px',
        height: '65px',
      },
    },
    size80: {
      true: {
        width: '80px',
        height: '80px',
      },
    },
  },
});
const ChoiceButtonWrapper = styled(Flex, {
  width: '100px',
  height: '100px',
  alignItems: 'center',
});

export default VotePage;
