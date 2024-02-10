import { ServerResponse, IncomingMessage} from 'http';

const PAGE_NOT_FOUND = '<h1>RESOURCE NOT FOUND<h1>';
const USER_NOT_FOUND = '<h1>USER NOT FOUND<h1>';
const UUID_NOT_CORRECT = '<h1>UUID NOT CORRECT<h1>';
const USER_NOT_CORRECT = '<h1>USER WITHOUT REQUIRED FIELDS<h1>';
const SERVER_PROBLEM = '<h1>SOMETHING IS WRONG WITH SERVER<h1>'

const showPageNotFoundMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(404);
  res.end(PAGE_NOT_FOUND);
}

const showUserNotFoundMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(404);
  res.end(USER_NOT_FOUND);
}

const showUUIDNotCorrectMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(400);
  res.end(UUID_NOT_CORRECT);
}

const showNotValidUserMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(400);
  res.end(USER_NOT_CORRECT);
}

const showServerSideProblem = (res: ServerResponse<IncomingMessage>) => {
  res.writeHead(400);
  res.end(SERVER_PROBLEM);
}

export { showPageNotFoundMessage, showUserNotFoundMessage, showUUIDNotCorrectMessage, showNotValidUserMessage, showServerSideProblem };