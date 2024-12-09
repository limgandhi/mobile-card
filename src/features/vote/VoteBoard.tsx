import React, { useCallback, useContext, useMemo, useState } from 'react';
import { styled } from '@stitches/react';
import Button from '../../components/Button.tsx';
import Flex from '../../components/Flex.tsx';
import Text from '../../components/Text.tsx';
import DialogContext from '../../global/DialogContext.ts';
import { useUserStorage } from '../../hooks/useUserStorage.tsx';
import { Vote } from '../../types/Vote.types.ts';
import { isSameUser } from '../../utils/User.util.ts';

interface VoteBoardProps {
  vote: Vote;
  handleVoteChange: (targetNumber: number) => void;
  updateVoteData: (checkedIndcies: number[]) => void;
}

const VoteBoard = ({ vote, handleVoteChange, updateVoteData }: VoteBoardProps) => {
  const { open, close } = useContext(DialogContext);
  const [currentUser] = useUserStorage((state) => [state.currentUser]);
  const [editModeYn, setEditModeYn] = useState<boolean>(false);

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

  const handleChoiceButtonClick = (targetIndex: number) => {
    if (editModeYn) {
      handleVoteChange(targetIndex);
    } else {
      open({
        dialogComponent: (
          <Flex
            css={{
              width: 300,
              height: 500,
              backgroundColor: '#FFFFFF',
              position: 'relative',
              padding: '20px',
              borderRadius: 5,
            }}
            column
          >
            <Flex fullWidth center css={{ height: '100px' }}>
              <Text fontSize={30}>Users</Text>
            </Flex>
            <Flex fullWidth fitToParent column start>
              {vote.options
                .filter((option) => option.index === targetIndex)
                .flatMap((option) => option.votedUsers)
                .map((user, index) => (
                  <Flex fullWidth center key={'user' + index}>
                    <Text>{user.name}</Text>
                  </Flex>
                ))}
            </Flex>
            <Flex fullWidth center>
              <Button size="lg" onClick={() => close()}>
                OK
              </Button>
            </Flex>
          </Flex>
        ),
      });
    }
  };

  return (
    <Flex fullWidth column css={{ gap: '20px' }}>
      {Array.from(vote.options, (option) => option.index).map(
        (optionIndex) =>
          optionIndex % 3 === 0 && (
            <Flex key={`row${optionIndex / 3}`} center>
              <Flex css={{ gap: '20px', width: '340px' }}>
                {vote.options
                  .filter((option) => optionIndex <= option.index && option.index < optionIndex + 3)
                  .map((option) => (
                    <ChoiceButtonWrapper center key={'choice' + option.index}>
                      <ChoiceButton
                        center
                        size65={option.votedUsers.length >= 6 && option.votedUsers.length < 12}
                        size80={option.votedUsers.length >= 12}
                        onClick={() => handleChoiceButtonClick(option.index)}
                        checked={checkedIndices.includes(option.index)}
                        editable={editModeYn}
                      >
                        {option.displayName}
                      </ChoiceButton>
                    </ChoiceButtonWrapper>
                  ))}
              </Flex>
            </Flex>
          ),
      )}
      <Flex center>
        {editModeYn ? (
          <Button size={'lg'} css={{ flex: 1, background: '#C03935' }} onClick={() => handleConfirmButtonClick()}>
            Confirm
          </Button>
        ) : (
          <Button size={'lg'} css={{ flex: 1 }} onClick={() => handleVoteButtonClick()}>
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
  background: '#F5AD35',
  transitionProperty: 'width height',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-in-out',
  fontFamily: 'Moneygraphy-Pixel',
  variants: {
    editable: {
      true: {
        boxShadow: '0px 6px 4px 0px #00000040 , inset 0px -6px 2px 0px #00000040',
      },
    },
    checked: {
      true: {
        background: '#7B571B',
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
  compoundVariants: [
    {
      editable: true,
      checked: true,
      css: { boxShadow: '0px 0px 0px 0px #00000040, inset 0px 6px 2px 0px #00000040' },
    },
  ],
});
const ChoiceButtonWrapper = styled(Flex, {
  width: '100px',
  height: '100px',
  alignItems: 'center',
});

export default VoteBoard;
