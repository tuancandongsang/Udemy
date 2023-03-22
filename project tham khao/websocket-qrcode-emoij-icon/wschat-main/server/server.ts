import * as express from 'express';
import * as cors from 'cors'
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
app.use(cors());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.log(message);
    /* Broadcasting to clients */
    wss.clients.forEach(client => {
      client.send(message);
    })
  });
});

server.listen(3000, () => {
  console.log(`Server started :)`);
});
