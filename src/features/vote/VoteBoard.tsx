import React, { useCallback, useMemo, useState } from 'react';
import { styled } from '@stitches/react';
import Button from '../../components/Button.tsx';
import Flex from '../../components/Flex.tsx';
import { User } from '../../types/User.types.ts';
import { isSameUser } from '../../utils/User.util.ts';

interface VoteType {
  title: string;
  startDateOfWeek: string;
  choices: ChoiceType[];
}

interface ChoiceType {
  title: string;
  voteUsers: User[];
}

interface VoteBoardProps {
  vote: VoteType;
  handleVoteChange: (targetNumber: number) => void;
}

const VoteBoard = ({ vote, handleVoteChange }: VoteBoardProps) => {
  const currentUser = { name: 'user01', last4PhoneNumber: '1111' } as User;
  const [editModeYn, setEditModeYn] = useState<boolean>(false);

  const getThreeChoices = useCallback(
    (position: 'upper' | 'middle' | 'lower') =>
      vote.choices.filter((choice, index) => {
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

  const checkedIndices = useMemo(
    () =>
      vote.choices
        .map((choice, index) => (choice.voteUsers.some((user) => isSameUser(user, currentUser)) ? index : -1))
        .filter((value) => value >= 0),
    [vote],
  );

  const handleVoteButtonClick = () => {
    setEditModeYn((prevState) => (prevState ? prevState : !prevState));
  };

  const handleConfirmButtonClick = () => {
    setEditModeYn((prevState) => (prevState ? !prevState : prevState));
  };

  const handleChoiceButtonClick = (targetIndex: number) => handleVoteChange(targetIndex);

  return (
    <Flex column css={{ gap: '20px' }}>
      <Flex between>
        {getThreeChoices('upper').map((choice, index) => (
          <ChoiceButtonWrapper center key={'upperChoice' + index}>
            <ChoiceButton
              center
              size65={choice.voteUsers.length >= 6 && choice.voteUsers.length < 12}
              size80={choice.voteUsers.length >= 12}
              onClick={() => handleChoiceButtonClick(index)}
              disabled={!editModeYn}
              checked={checkedIndices.includes(index)}
            >
              {choice.title}
            </ChoiceButton>
          </ChoiceButtonWrapper>
        ))}
      </Flex>
      <Flex between>
        {getThreeChoices('middle').map((choice, index) => (
          <ChoiceButtonWrapper center key={'middleChoice' + index}>
            <ChoiceButton
              center
              size65={choice.voteUsers.length >= 6 && choice.voteUsers.length < 12}
              size80={choice.voteUsers.length >= 12}
              onClick={() => handleChoiceButtonClick(index + 3)}
              disabled={!editModeYn}
              checked={checkedIndices.includes(index + 3)}
            >
              {choice.title}
            </ChoiceButton>
          </ChoiceButtonWrapper>
        ))}
      </Flex>
      <Flex between>
        {getThreeChoices('lower').map((choice, index) => (
          <ChoiceButtonWrapper center key={'lowerChoice' + index}>
            <ChoiceButton
              center
              size65={choice.voteUsers.length >= 6 && choice.voteUsers.length < 12}
              size80={choice.voteUsers.length >= 12}
              onClick={() => handleChoiceButtonClick(index + 6)}
              disabled={!editModeYn}
              checked={checkedIndices.includes(index + 6)}
            >
              {choice.title}
            </ChoiceButton>
          </ChoiceButtonWrapper>
        ))}
      </Flex>
      <Flex center>
        {editModeYn ? (
          <Button size={'lg'} onClick={() => handleConfirmButtonClick()}>
            Confirm
          </Button>
        ) : (
          <Button size={'lg'} onClick={() => handleVoteButtonClick()}>
            Vote
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

const ChoiceButton = styled(Flex, {
  width: '50px',
  height: '50px',
  alignItems: 'center',
  borderRadius: '10px',
  background: '#D9D9D9',
  boxShadow: '0px 4px 4px 0px #00000040 , inset 0px -4px 4px 0px #00000040',
  transitionProperty: 'width height',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-in-out',
  fontFamily: 'YeonSung-Regular',
  variants: {
    checked: {
      true: {
        background: '#B0B0B0',
        boxShadow: '0px 4px 4px 0px #00000040 , inset 0px 4px 4px 0px #00000040',
      },
    },
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

export default VoteBoard;
