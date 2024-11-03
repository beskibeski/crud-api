import http from 'http';
import { showPageNotFoundMessage, showServerSideProblem } from './services/create-error-responses';
import deleteSlashes from './services/delete-extra-char';
import { getUser, getUsers, postNewUser, changeUser, deleteUser } from './services/users-functions';

let PORT = process.env.PORT || 3000;

const BASE_URL = `api/users`;

const crud_api = {
  start(): void {
    const server = http.createServer((req, res) => { 
      res.setHeader('Content-type', 'application/json');
      let url = deleteSlashes(req.url);
      switch (req.method) {
        case 'GET':
          if (url === BASE_URL) {
            getUsers(res).catch(() => {
              showServerSideProblem(res);
              return;
            });
          } else if (url.split('/').length === 3 && url.startsWith(BASE_URL)) {
            const userId = url.split('/')[2];
            getUser(res, userId).catch(() => {
              showServerSideProblem(res);
              return;
            })
          } else {
            showPageNotFoundMessage(res);
          }
        break;
        case 'POST':          
          if (url === BASE_URL)
            postNewUser(res, req).catch(() => {
              showServerSideProblem(res);
              return;
          });
          else {
            showPageNotFoundMessage(res);
          }          
        break;
        case 'PUT':
          if (url.split('/').length === 3 && url.startsWith(BASE_URL)) {
            const userId = url.split('/')[2];
            changeUser(res, req, userId).catch(() => {
              showServerSideProblem(res);
              return;
            })
          } else {
            showPageNotFoundMessage(res);
          }
        break;
        case 'DELETE':
          if (url.split('/').length === 3 && url.startsWith(BASE_URL)) {
            const userId = url.split('/')[2];
            deleteUser(res, userId).catch(() => {
              showServerSideProblem(res);
              return;
            })
          } else {
            showPageNotFoundMessage(res);
          }
        break;
        default:          
        break;
      }        
    })
    server.listen(PORT).on('listening', () => {
      console.log(`Server starts on ${PORT} port`);
    });
  },
}

export default crud_api;
