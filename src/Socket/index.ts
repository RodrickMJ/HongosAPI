import  'dotenv/config'
import express from "express"
import {createServer} from "node:http"
import {Server} from "socket.io"
import cors from "cors"
import { setUpMqtt } from './mqtt/mqtt'

const app = express();
app.use(cors())
const server = createServer(app);
const io = new Server(server);
const PORT = parseInt(process.env['PORT'] || '3002')

app.get('/', (_req, res) => { res.send('Hola mundo')})


io.on('connection', (socket) => {
    console.log('a user connected');
  });

setUpMqtt(io)


  server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });


