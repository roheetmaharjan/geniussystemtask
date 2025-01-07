import users from '../lib/users.json';

export const getUserJoinData = (id) => {
  const user = users.find((user) => user.id === id);
  return user;
}