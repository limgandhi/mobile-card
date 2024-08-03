import React from 'react';

interface DialogContextProps {
  open: () => void;
  close: () => void;
}

export const DialogContext = React.createContext<DialogContextProps>({
  open: () => {},
  close: () => {},
});

export default DialogContext;
