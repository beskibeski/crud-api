import http from 'http';
let port = process.env.PORT;

const crud_api = {
  start(): void {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        data: 'Hello World!',
      }));
    });
    console.log(port)
    server.listen(port);
  }
}

export default crud_api;