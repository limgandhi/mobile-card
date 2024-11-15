import React, { ReactNode } from 'react';

interface DialogContextProps {
  open: ({ dialogComponent }: { dialogComponent?: ReactNode }) => void;
  close: () => void;
}

export const DialogContext = React.createContext<DialogContextProps>({
  open: ({ dialogComponent }: { dialogComponent?: ReactNode }) => {},
  close: () => {},
});

export default DialogContext;
