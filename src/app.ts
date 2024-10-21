import http from 'http';

let PORT = process.env.PORT;

const crud_api = {  
  start(): void {
    const server = http.createServer((req, res) => { 
      res.setHeader('Content-type', 'application/json');         
    })
    server.listen(PORT).on('listening', () => {
      console.log(`Server starts on ${PORT} port`);
    });
  }
}

export default crud_api;
