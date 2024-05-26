import React, { PropsWithChildren } from 'react';
import { styled } from '@stitches/react';

interface FlexProps {
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  gap?: number;
  disabled?: boolean;
}

const FlexBase = ({ children, ...props }: PropsWithChildren<FlexProps>) => {
  const etst = '';

  return <div>{children}</div>;
};

const Flex = styled('div', {
  display: 'flex',

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    fullHeight: {
      true: {
        height: '100%',
      },
    },
    fitToParent: {
      true: {
        flex: 1,
      },
    },
    column: {
      true: {
        flexDirection: 'column',
      },
    },
    start: {
      true: {
        justifyContent: 'flex-start',
      },
    },
    center: {
      true: {
        justifyContent: 'center',
      },
    },
    end: {
      true: {
        justifyContent: 'flex-end',
      },
    },
    between: {
      true: {
        justifyContent: 'space-between',
      },
    },
    disabled: {
      true: {
        pointerEvents: 'none',
      },
    },
  },
});

export default Flex;
