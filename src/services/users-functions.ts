import { showNotValidUserMessage, showUUIDNotCorrectMessage, showUserNotFoundMessage } from './create-error-responses';
import validateUUID from './validate-uuid';
import { ServerResponse, IncomingMessage } from 'http';
import { users, addUserToDatabase, deleteUserFromDatabase, changeUserFromDatabase } from '../database/users';
import USER from '../models/user';
import validateUser from './validate-user';
import createUniqID from './create-id';

const getUsers = async (res: ServerResponse<IncomingMessage>): Promise<void> => {  
  res.writeHead(200);
  res.end(JSON.stringify(users));
}

const getUser = async (res: ServerResponse<IncomingMessage>, userId: string): Promise<void> => {
  if (validateUUID(userId)) {                   
    for (let user of users) {              
      if (user.id === userId) {
        res.writeHead(200);
        res.end(JSON.stringify(user));
        return;
      }
    }
    showUserNotFoundMessage(res);
  } else {
    showUUIDNotCorrectMessage(res);
  }            
}

const postNewUser = async (res: ServerResponse<IncomingMessage>, req: IncomingMessage): Promise<void> => {
  let data: string = '';
  req.on('data', (chunk: ReadableStreamType) => {    
    data += chunk.toString();
  })
  req.on('end', () => {   
    if (validateUser(data)) {
      res.writeHead(201);
      const user: USER = {
        id: createUniqID(),
        username: JSON.parse(data).username,
        age: JSON.parse(data).age,
        hobbies: JSON.parse(data).hobbies,
      };      
      addUserToDatabase(user);
      res.end((JSON.stringify(user)));
    } else {
      showNotValidUserMessage(res);
    }
  })
}

const changeUser = async (res: ServerResponse<IncomingMessage>, req: IncomingMessage, userId: string): Promise<void> => {
  if (validateUUID(userId)) {                   
    for (let user of users) {    
      if (user.id === userId) {
        let data: string = '';
        req.on('data', (chunk: ReadableStreamType) => {    
          data += chunk.toString();
        })        
        req.on('end', () => {      
          const newUserData: USER = JSON.parse(data);
          changeUserFromDatabase(userId, newUserData);
        })
        res.writeHead(200);
        res.end();
        return;
      }
    }
    showUserNotFoundMessage(res);
  } else {
    showUUIDNotCorrectMessage(res);
  }

  let data: string = '';
  req.on('data', (chunk: ReadableStreamType) => {    
    data += chunk.toString();
  })
}

const deleteUser = async (res: ServerResponse<IncomingMessage>, userId: string): Promise<void> => {
  if (validateUUID(userId)) {                   
    for (let user of users) {    
      if (user.id === userId) {
        deleteUserFromDatabase(userId);
        res.writeHead(204);
        res.end();
        return;
      }
    }
    showUserNotFoundMessage(res);
  } else {
    showUUIDNotCorrectMessage(res);
  }       
}


export { getUsers, getUser, postNewUser, changeUser, deleteUser };