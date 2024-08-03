import { User } from '../types/User.types.ts';

export const isSameUser = (a: User, b: User) => a.name === b.name && a.last4PhoneNumber === b.last4PhoneNumber;
