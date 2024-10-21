import http from 'http';
import { showPageNotFoundMessage, showServerSideProblem } from './services/create-error-responses';
import deleteSlashes from './services/delete-extra-char';
import { getUser, getUsers, postNewUser, changeUser, deleteUser } from './services/users-functions';

let PORT = process.env.PORT;

const PATHS = {
  API: 'api',
  USERS: 'users',  
}

const crud_api = {  
  start(): void {
    const server = http.createServer((req, res) => { 
      res.setHeader('Content-type', 'application/json');
      let url = deleteSlashes(req.url);
      console.log(url)
      switch (req.method) {
        case 'GET':
          if (url === `${PATHS.API}/${PATHS.USERS}`) {
            getUsers(res).catch(() => {
              showServerSideProblem(res);
              return;
            });
          } else if (url.split('/').length === 3 && url.startsWith(`${PATHS.API}/${PATHS.USERS}`)) {
            const userId = url.split('/')[2];
            getUser(res, userId).catch(() => {
              showServerSideProblem(res);
              return;
            })
          } else {
            showPageNotFoundMessage(res);
          }
        break;
      }        
    })
    server.listen(PORT).on('listening', () => {
      console.log(`Server starts on ${PORT} port`);
    });
  }
}

export default crud_api;
