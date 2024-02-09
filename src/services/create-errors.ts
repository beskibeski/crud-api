import { ServerResponse, IncomingMessage} from 'http';

const PAGE_NOT_FOUND = '<h1>RESOURCE NOT FOUND<h1>';
const USER_NOT_FOUND = '<h1>USER NOT FOUND<h1>';
const UUID_NOT_CORRECT = '<h1>UUID NOT CORRECT<h1>';

const showPageNotFoundMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(404);
  res.end(PAGE_NOT_FOUND);
}

const showUserNotFoundMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(404);
  res.end(USER_NOT_FOUND);
}

const showUUIDNotCorrectMessage = (res: ServerResponse<IncomingMessage>): void => {
  res.writeHead(404);
  res.end(UUID_NOT_CORRECT);
}

export { showPageNotFoundMessage, showUserNotFoundMessage, showUUIDNotCorrectMessage };