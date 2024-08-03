import React, { PropsWithChildren, useMemo, useState } from 'react';
import DialogContext from './DialogContext.ts';
import Dialog from '../components/Dialog.tsx';

const DialogProvider = ({ children }: PropsWithChildren) => {
  const [openYn, setOpenYn] = useState<boolean>(false);

  const open = () => setOpenYn((prevState) => (prevState ? prevState : !prevState));

  const close = () => setOpenYn((prevState) => (prevState ? !prevState : prevState));

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}
      {openYn && <Dialog />}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
