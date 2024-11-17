import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { useUserStorage } from '../hooks/useUserStorage.tsx';

const ProtectedPage = ({ children }: PropsWithChildren) => {
  const [currentUser] = useUserStorage((state) => [state.currentUser]);
  const navigate = useNavigate();
  const outlet = useOutlet();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, []);

  return <>{outlet}</>;
};

export default ProtectedPage;
