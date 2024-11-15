import React, { PropsWithChildren, ReactNode, useMemo, useState } from 'react';
import DialogContext from './DialogContext.ts';
import Dialog from '../components/Dialog.tsx';

const DialogProvider = ({ children }: PropsWithChildren) => {
  const [openYn, setOpenYn] = useState<boolean>(false);
  const [dialog, setDialog] = useState<ReactNode>();

  const open = ({ dialogComponent }: { dialogComponent?: ReactNode }) => {
    setOpenYn((prevState) => (prevState ? prevState : !prevState));
    setDialog(Dialog({ dialogComponent, onClose: close }));
  };

  const close = () => setOpenYn((prevState) => (prevState ? !prevState : prevState));

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}
      {openYn && dialog}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
