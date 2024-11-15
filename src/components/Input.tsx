import React, { EventHandler, forwardRef, HTMLInputTypeAttribute, ReactEventHandler, useState } from 'react';
import { styled } from '@stitches/react';
import Flex from './Flex.tsx';

interface InputProps {
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: (value: string) => void;
}

const InputBase = forwardRef<HTMLInputElement, InputProps>(({ type, value, onChange, ...props }: InputProps, ref) => {
  const [controlledValue, setControlledValue] = useState(value ?? '');
  const [focusedYn, setFocusedYn] = useState(false);
  const [showPasswordYn, setShowPasswordYn] = useState<boolean>(false);

  const onChangeHandle = (targetValue: string) => {
    setControlledValue(targetValue);

    if (onChange) {
      onChange(targetValue);
    }
  };

  const toggleShowPasswordButton = () => {
    setShowPasswordYn((prevState) => !prevState);
  };

  return (
    <Flex column css={{ alignItems: 'center', gap: '5px' }}>
      <Flex css={{ padding: '0px 5px', alignItems: 'center' }} between>
        <Flex fitToParent>
          <StyledInput
            type={showPasswordYn ? undefined : type}
            value={controlledValue}
            onChange={(e) => onChangeHandle(e.target.value as string)}
            onFocus={() => setFocusedYn(true)}
            onBlur={() => setFocusedYn(false)}
          />
        </Flex>
        {type === 'password' && (
          <Flex
            css={{ width: 30, height: 30, borderRadius: 20, backgroundColor: showPasswordYn ? '#DDDDDD' : '#000000' }}
            onClick={() => toggleShowPasswordButton()}
          />
        )}
      </Flex>
      <BorderBottom focus={focusedYn || controlledValue !== ''} />
    </Flex>
  );
});

InputBase.displayName = 'InputBase';

const StyledInput = styled('input', {
  width: '100%',
  border: 'none',
  outline: 'none',
  fontFamily: 'Moneygraphy-Pixel',
  fontSize: '30px',
});

const BorderBottom = styled(Flex, {
  transitionProperty: 'width',
  transitionDuration: '0.1s',
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
