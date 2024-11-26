import React, { PropsWithChildren } from 'react';
import { styled } from '@stitches/react';
import Flex from './Flex.tsx';

interface TextProps {
  fontSize?: number;
  fontColor?: string;
}

const TextBase = ({ children, fontSize, fontColor }: PropsWithChildren<TextProps>) => {
  const fontSizePx = fontSize + 'px';

  return <span style={{ fontFamily: 'Moneygraphy-Pixel', fontSize: fontSizePx, color: fontColor }}>{children}</span>;
};

const Text = styled(TextBase, {
  variants: {
    center: {
      true: {
        justifyContent: 'center',
      },
    },
  },
});

export default Text;
