import React, { useCallback, useMemo, useState } from 'react';
import { styled } from '@stitches/react';
import Button from '../../components/Button.tsx';
import Flex from '../../components/Flex.tsx';
import { useUserStorage } from '../../hooks/useUserStorage.tsx';
import { Vote } from '../../types/Vote.types.ts';
import { isSameUser } from '../../utils/User.util.ts';

interface VoteBoardProps {
  vote: Vote;
  handleVoteChange: (targetNumber: number) => void;
  updateVoteData: (checkedIndcies: number[]) => void;
}

const VoteBoard = ({ vote, handleVoteChange, updateVoteData }: VoteBoardProps) => {
  const [currentUser] = useUserStorage((state) => [state.currentUser]);
  const [editModeYn, setEditModeYn] = useState<boolean>(false);

  const getThreeOptions = useCallback(
    (position: 'upper' | 'middle' | 'lower') =>
      vote.options.filter((option) => {
        switch (position) {
          case 'upper':
            return option.index < 3;
          case 'middle':
            return option.index >= 3 && option.index < 6;
          case 'lower':
            return option.index >= 6 && option.index < 9;
          default:
            return false;
        }
      }),
    [vote],
  );

  const checkedIndices = useMemo(
    () =>
      vote.options
        .map((option, index) =>
          option.votedUsers.some((user) => !!currentUser && isSameUser(user, currentUser)) ? index : -1,
        )
        .filter((value) => value >= 0),
    [vote],
  );

  const handleVoteButtonClick = () => {
    setEditModeYn((prevState) => (prevState ? prevState : !prevState));
  };

  const handleConfirmButtonClick = () => {
    setEditModeYn((prevState) => (prevState ? !prevState : prevState));

    updateVoteData(checkedIndices);
  };

  const handleChoiceButtonClick = (targetIndex: number) => handleVoteChange(targetIndex);

  return (
    <Flex fullWidth column css={{ gap: '20px' }}>
      <Flex fullWidth center css={{ gap: '20px' }}>
        {getThreeOptions('upper').map((option, index) => (
          <ChoiceButtonWrapper center key={'upperChoice' + index}>
            <ChoiceButton
              center
              size65={option.votedUsers.length >= 6 && option.votedUsers.length < 12}
              size80={option.votedUsers.length >= 12}
              onClick={() => handleChoiceButtonClick(index)}
              disabled={!editModeYn}
              checked={checkedIndices.includes(index)}
            >
              {option.displayName}
            </ChoiceButton>
          </ChoiceButtonWrapper>
        ))}
      </Flex>
      <Flex fullWidth center css={{ gap: '20px' }}>
        {getThreeOptions('middle').map((option, index) => (
          <ChoiceButtonWrapper center key={'middleChoice' + index}>
            <ChoiceButton
              center
              size65={option.votedUsers.length >= 6 && option.votedUsers.length < 12}
              size80={option.votedUsers.length >= 12}
              onClick={() => handleChoiceButtonClick(index + 3)}
              disabled={!editModeYn}
              checked={checkedIndices.includes(index + 3)}
            >
              {option.displayName}
            </ChoiceButton>
          </ChoiceButtonWrapper>
        ))}
      </Flex>
      <Flex fullWidth center css={{ gap: '20px' }}>
        {getThreeOptions('lower').map((option, index) => (
          <ChoiceButtonWrapper center key={'lowerChoice' + index}>
            <ChoiceButton
              center
              size65={option.votedUsers.length >= 6 && option.votedUsers.length < 12}
              size80={option.votedUsers.length >= 12}
              onClick={() => handleChoiceButtonClick(index + 6)}
              disabled={!editModeYn}
              checked={checkedIndices.includes(index + 6)}
            >
              {option.displayName}
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
  transitionDuration: '0.1s',
  transitionTimingFunction: 'ease-in-out',
  fontFamily: 'Moneygraphy-Pixel',
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
