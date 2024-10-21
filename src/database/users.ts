import USER from '../models/user';

const addUserToDatabase = (user: USER): void => {
  users.push(user);
}

const deleteUserFromDatabase = (userId: string): void => {
  users = users.filter(user => user.id !== userId);  
}

const changeUserFromDatabase = (userId: string, changedUser: USER): void => {
  const { username, age, hobbies } = changedUser;
  users.find((user) => {
    if (user.id === userId) {
      user.username = username;
      user.age = age;
      user.hobbies = hobbies;
    }     
  })
}

let users: USER[] = [];

export { users, addUserToDatabase, deleteUserFromDatabase, changeUserFromDatabase };