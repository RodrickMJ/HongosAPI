import express from "express";
import authRouter from "./auth/infrestructure/Routers/authRouter";
import userRouter from "./users/infrestructure/routers/UserRouter"
import cors from "cors";
import 'dotenv/config';
import connectToDatabase from "./config/ConectionDatabase";

const Port = parseInt(process.env['APP_PORT'] ?? '3001');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter)

app.get('/', (_req, res) => { res.send('Hello World')});

async function startServer() {
    try {
        console.clear();
        await connectToDatabase();

        app.listen(Port, () => {
            console.log('Server Listening on Port', Port);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
