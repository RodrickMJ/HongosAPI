import 'dotenv/config';
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { setUpMqtt } from './mqtt/mqtt';
import authMiddleware from './middleware/auth';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], 
  },

  allowRequest: authMiddleware
});

const PORT = parseInt(process.env['PORT'] || '3002');

app.get('/', (_req, res) => {
  res.send('Hola mundo');
});

io.on('connection', (socket) => {
  console.log('a user has connected');

  socket.on('disconnect', () => {
    console.log('user has disconnected');
  });

});



setUpMqtt(io);

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
