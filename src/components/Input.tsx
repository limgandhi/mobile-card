import React, { useState } from 'react';
import { styled } from '@stitches/react';
import Flex from './Flex.tsx';

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const InputBase = ({ value, onChange }: InputProps) => {
  const [controlledValue, setControlledValue] = useState(value ?? '');
  const [focusedYn, setFocusedYn] = useState(false);

  const onChangeHandle = (value: string) => {
    if (onChange) {
      onChange(value);
    } else {
      setControlledValue(value);
    }
  };

  return (
    <Flex column css={{ alignItems: 'center' }}>
      <StyledInput
        value={controlledValue}
        onChange={(e) => onChangeHandle(e.target.value as string)}
        onFocus={() => setFocusedYn(true)}
        onBlur={() => setFocusedYn(false)}
      />
      <BorderBottom focus={focusedYn || controlledValue !== ''} />
    </Flex>
  );
};

const StyledInput = styled('input', {
  width: '100%',
  border: 'none',
  outline: 'none',
  fontFamily: 'HakgyoansimBunpilR',
  fontSize: '30px',
});

const BorderBottom = styled(Flex, {
  transitionProperty: 'width',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-in-out',
  height: '3px',
  borderRadius: '5px',
  width: '0%',
  backgroundColor: '#000000',
  variants: {
    focus: {
      true: {
        width: '100%',
      },
    },
  },
});

const Input = styled(InputBase, {});

export default Input;
