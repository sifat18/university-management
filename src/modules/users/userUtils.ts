import { getLastUserDb } from './userService';

export const generateUserID = async () => {
  const curId = (await getLastUserDb()) || (0).toString().padStart(5, '0');
  const increamentID = parseInt(curId) + 1;
  const updatedId = increamentID.toString().padStart(5, '0');
  return updatedId;
};
