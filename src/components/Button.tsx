import { styled } from '@stitches/react';

const Button = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#FFFFFF',
  border: '5px solid #000000',
  borderRadius: 10,
  fontFamily: 'YeonSung-Regular',
  variants: {
    size: {
      sm: {
        fontSize: 15,
        padding: '5px 10px',
        fontWeight: 'bold',
      },
      md: {
        fontSize: 20,
        padding: '8px 13px',
      },
      lg: {
        fontSize: 30,
        padding: '10px 15px',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default Button;
