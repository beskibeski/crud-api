import http from 'http';
import users from './database/users';
import { showPageNotFoundMessage, showUUIDNotCorrectMessage, showUserNotFoundMessage } from './services/create-errors';
import validateUUID from './services/validate-uuid';
import deleteSlashes from './services/delete-extra-char';

let PORT = process.env.PORT;

const BASE_URL = 'api/users';
const BASE_PATH = 'api';
const USERS_PATH = 'users';

const crud_api = {
  start(): void {
    const server = http.createServer((req, res) => {
      let url = deleteSlashes(req.url);      
      switch (req.method) {
        case 'GET':          
          res.setHeader('Content-type', 'application/json');
          if (url === BASE_URL) {
            res.writeHead(200);
            res.end(JSON.stringify(users));
          } else if (url.split('/').length === 3 && `${url.split('/')[0]}` === BASE_PATH && `${url.split('/')[1]}` === USERS_PATH) {   
            if (validateUUID(url.split('/')[2])) {
              for (let user of users) {              
                if (user.id === url.split('/')[2]) {
                  res.writeHead(200);
                  res.end(JSON.stringify(user));
                  return;
                }
              }             
            } else {
              showUUIDNotCorrectMessage(res);
            }            
          } else {
            showPageNotFoundMessage(res);
          }
        break;
        default:
          showPageNotFoundMessage(res);
        break;
      }
    })  
    server.listen(PORT);
  }
}

export default crud_api;
