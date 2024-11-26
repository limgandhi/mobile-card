import { styled } from '@stitches/react';

const Button = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FEEED7',
  background: '#3A3754',
  // border: '5px solid #000000',
  border: '0px',
  borderRadius: 10,
  fontFamily: 'Moneygraphy-Pixel',
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
