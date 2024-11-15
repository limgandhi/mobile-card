import { useContext } from 'react';
import { collection, doc, getDocs, query, setDoc, updateDoc, where, runTransaction } from 'firebase/firestore';
import { FirebaseContext } from '../global/FirebaseContext.ts';
import { User } from '../types/User.types.ts';
import { Vote, VoteOption } from '../types/Vote.types.ts';
import { isSameUser } from '../utils/User.util.ts';

const useFirestore = () => {
  const { db } = useContext(FirebaseContext);

  const retrieveUsers = async (name: string, password: string) => {
    if (db) {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('name', '==', name), where('last4PhoneNumber', '==', password));
      const result = await getDocs(q);

      if (!result.empty) {
        return result.docs.at(0)?.data() as User;
      }
    }
    return undefined;
  };

  const retrieveVotes = async (user: User) => {
    if (db) {
      const votesRef = collection(db, 'votes');
      const q = query(votesRef, where('authorizedUsers', 'array-contains', user));
      const result = await getDocs(q);

      if (!result.empty) {
        return result.docs.map((doc) => doc.data().title as string);
      }
    }
    return [];
  };

  const retrieveVoteBoard = async (voteId: string) => {
    if (db) {
      const voteBoardRef = collection(db, 'votes');
      const q = query(voteBoardRef, where('voteId', '==', voteId));
      const result = await getDocs(q);

      if (!result?.empty) {
        return {
          ...result.docs.at(0)?.data(),
        } as Vote;
      }
    }
    return undefined;
  };

  const updateVoteBoardOptionTmp = async (voteId: string, options: VoteOption[]) => {
    try {
      if (db) {
        await runTransaction(db, async (transaction) => {
          const voteBoardRef = collection(db, 'votes');

          const docRef = doc(voteBoardRef, voteId);

          const voteBoard = await transaction.get(docRef);

          if (voteBoard.exists()) {
            voteBoard.get('options');
            transaction.update(docRef, { options });
          }
        });
      }
    } catch (e) {
      console.log('Update failed');
    }
  };

  const updateVoteOptions = async (voteId: string, currentUser: User, checkedIndices: number[]) => {
    try {
      if (db) {
        await runTransaction(db, async (transaction) => {
          const voteBoardRef = collection(db, 'votes');

          const docRef = doc(voteBoardRef, voteId);

          const voteBoard = await transaction.get(docRef);

          if (voteBoard.exists()) {
            const options = voteBoard.get('options') as VoteOption[];
            const changedOptions = options.map((option) => {
              const changedVotedUser = option.votedUsers.filter((user) => !isSameUser(user, currentUser));

              if (checkedIndices.includes(option.index)) {
                changedVotedUser.push(currentUser);
              }

              return { ...option, votedUsers: changedVotedUser };
            });

            transaction.update(docRef, { options: changedOptions });
          } else {
            throw 'Vote Board does not exist.';
          }
        });
      } else {
        throw 'DB connections is missing.';
      }
    } catch (e) {
      console.log('Transaction failed!', e);
    }
  };

  const updateVoteBoardOption = async (
    voteId: string,
    optionIndex: number,
    fieldName: keyof VoteOption,
    option: VoteOption,
  ) => {
    if (db) {
      const voteBoardRef = collection(db, 'votes');
      const q = query(voteBoardRef, where('voteId', '==', voteId));
      const result = await getDocs(q);

      if (!result?.empty) {
        const voteOptionsRef = collection(voteBoardRef, result.docs.at(0)?.id ?? '', 'options');

        const optionsQuery = query(voteOptionsRef, where('index', '==', optionIndex));
        const optionResult = await getDocs(optionsQuery);

        if (optionResult) {
          const optionRef = doc(voteOptionsRef, optionResult.docs.at(0)?.id ?? '');
          await updateDoc(optionRef, fieldName, option[fieldName]);
        }
      }
    }
  };

  return {
    retrieveUsers,
    retrieveVotes,
    retrieveVoteBoard,
    // updateVoteBoardOption,
    // updateVoteBoardOptionTmp,
    updateVoteOptions,
  };
};

export default useFirestore;
