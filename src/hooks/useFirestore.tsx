import { useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FirebaseContext } from '../global/FirebaseContext.ts';
import { User } from '../types/User.types.ts';

const useFirestore = () => {
  const { db } = useContext(FirebaseContext);

  const retrieveUsers = async (name: string, password: string) => {
    if (db) {
      // const data = await getDocs(collection(db, 'users'));

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('name', '==', name), where('last4PhoneNumber', '==', password));
      return getDocs(q);
    } else {
      return undefined;
    }
  };

  const retrieveVotes = async (user: User) => {
    if (db) {
      const votesRef = collection(db, 'votes');
      const userString = `${user.name}_${user.last4PhoneNumber}`;
      console.log(userString);
      const q = query(votesRef, where('authorizedUsers', 'array-contains', userString));
      return getDocs(q);
    } else {
      return undefined;
    }
  };

  return {
    retrieveUsers,
    retrieveVotes,
  };
};

export default useFirestore;
