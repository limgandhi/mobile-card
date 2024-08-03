import React from 'react';
import { Analytics } from 'firebase/analytics';
import { Firestore } from 'firebase/firestore';

interface FirebaseContextProps {
  db?: Firestore;
  analytics?: Analytics;
}
export const FirebaseContext = React.createContext<FirebaseContextProps>({
  db: undefined,
  analytics: undefined,
});
