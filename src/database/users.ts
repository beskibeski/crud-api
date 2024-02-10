import USER from "../models/user";

const addUserToDatabase = (user: USER): void => {
  users.push(user);
}

const deleteUserFromDatabase = (userId: string): void => {
  users = users.filter(user => user.id !== userId);
  console.log(users);
}

let users: USER[] = [
  {
    id: 'aedeb6b6-51a3-401d-af0c-e08ee514fd78',
    username: 'alex',
    age: 30,
    hobbies: ['skiing']
  }
];

export { users, addUserToDatabase, deleteUserFromDatabase };