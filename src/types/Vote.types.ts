import { User } from './User.types.ts';

export interface Vote {
  voteId: string;
  title: string;
  options: VoteOption[];
  authorizedUsers: string[];
}

export interface VoteOption {
  index: number;
  name: string;
  displayName: string;
  votedUsers: User[];
  date?: Date;
}

export const initVote: Vote = {
  voteId: '',
  title: '',
  options: [],
  authorizedUsers: [],
};
