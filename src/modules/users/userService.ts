import config from '../../config';
import { IUser } from './userInterface';
import { User } from './userModel';
import { generateUserID } from './userUtils';

// creating user
export const createUserDB = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserID();

  user.id = id;
  if (!user?.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error('failed to create User');
  }
  return createdUser;
};

// last usere
export const getLastUserDb = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id;
};
