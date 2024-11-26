import React, { forwardRef, HTMLInputTypeAttribute, useRef, useState } from 'react';
import { styled } from '@stitches/react';
import Flex from './Flex.tsx';
import Text from './Text.tsx';

interface InputProps {
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: (value: string) => void;
}

const InputBase = forwardRef<HTMLInputElement, InputProps>(({ type, value, onChange, ...props }: InputProps, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
    <Flex column css={{ alignItems: 'center' }}>
      <Flex css={{ padding: '0px 5px', alignItems: 'center' }} between>
        <Flex fitToParent css={{ position: 'relative' }}>
          {!(focusedYn || controlledValue !== '') && (
            <Flex fullWidth css={{ position: 'absolute', pointerEvents: 'none' }}>
              <Text fontSize={30} fontColor={'#B0B0B0'}>
                {type === 'password' ? '비밀번호' : '김덕배'}
              </Text>
            </Flex>
          )}
          <StyledInput
            ref={inputRef}
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
      <Flex fullWidth css={{ position: 'relative' }}>
        <BorderBottom fullWidth css={{ borderBottom: '3px solid #B0B0B0' }} />
        <BorderBottom css={{ position: 'absolute' }} focus={focusedYn || controlledValue !== ''} />
      </Flex>
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
  backgroundColor: '#FEEED7',
});

const BorderBottom = styled(Flex, {
  transitionProperty: 'width',
  transitionDuration: '0.1s',
  transitionTimingFunction: 'ease-in-out',
  borderRadius: '5px',
  width: '0%',
  borderBottom: '3px solid #000000',
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
