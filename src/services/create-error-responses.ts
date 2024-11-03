import { ServerResponse, IncomingMessage} from 'http';

const PAGE_NOT_FOUND = 'RESOURCE NOT FOUND';
const USER_NOT_FOUND = 'USER NOT FOUND';
const UUID_NOT_CORRECT = 'UUID NOT CORRECT';
const USER_NOT_CORRECT = 'USER WITHOUT REQUIRED FIELDS';
const SERVER_PROBLEM = 'SOMETHING IS WRONG WITH SERVER'

const showPageNotFoundMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(404, {
    'Content-Length': Buffer.byteLength(PAGE_NOT_FOUND),
    'Content-Type': 'text/plain',
  })
  .end(PAGE_NOT_FOUND);
}

const showUserNotFoundMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(404, {
    'Content-Length': Buffer.byteLength(USER_NOT_FOUND),
    'Content-Type': 'text/plain',
  })
  .end(USER_NOT_FOUND);
}

const showUUIDNotCorrectMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(400, {
    'Content-Length': Buffer.byteLength(UUID_NOT_CORRECT),
    'Content-Type': 'text/plain',
  })
  .end(UUID_NOT_CORRECT);  
}

const showNotValidUserMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(400, {
    'Content-Length': Buffer.byteLength(USER_NOT_CORRECT),
    'Content-Type': 'text/plain',
  })
  .end(USER_NOT_CORRECT); 
}

const showServerSideProblem = (res: ServerResponse<IncomingMessage>) => {
  res.writeHead(400, {
    'Content-Length': Buffer.byteLength(SERVER_PROBLEM),
    'Content-Type': 'text/plain',
  })
  .end(SERVER_PROBLEM);
}

export { showPageNotFoundMessage, showUserNotFoundMessage, showUUIDNotCorrectMessage, showNotValidUserMessage, showServerSideProblem };