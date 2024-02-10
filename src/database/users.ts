import USER from "../models/user";

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

let users: USER[] = [
  {
    id: 'aedeb6b6-51a3-401d-af0c-e08ee514fd78',
    username: 'alex',
    age: 30,
    hobbies: ['skiing']
  }
];

export { users, addUserToDatabase, deleteUserFromDatabase, changeUserFromDatabase };