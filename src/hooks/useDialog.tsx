import { useContext } from 'react';
import DialogContext from '../global/DialogContext.ts';

const useDialog = () => {
  const { open, close } = useContext(DialogContext);

  const openDialog = () => {
    open({});
  };

  const closeDialog = () => {
    close();
  };
  return { open: openDialog, close: closeDialog };
};

export default useDialog;
