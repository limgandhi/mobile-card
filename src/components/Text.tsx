import React, { PropsWithChildren } from 'react';
import { styled } from '@stitches/react';
import Flex from './Flex.tsx';

interface TextProps {
  width?: number;
  fontSize?: number;
}

const TextBase = ({ children, width, fontSize }: PropsWithChildren<TextProps>) => {
  const widthPx = width + 'px';
  const fontSizePx = fontSize + 'px';

  return (
    <Flex css={{ width: widthPx, fontSize: fontSizePx, fontFamily: 'HakgyoansimBunpilR' }} center>
      {children}
    </Flex>
  );
};

const Text = styled(TextBase, {
  variants: {
    center: {
      true: {
        justifyContent: 'cente',
      },
    },
  },
});

export default Text;
