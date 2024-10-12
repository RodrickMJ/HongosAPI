import express from "express"
import authRouter from "./auth/infrestructure/Routers/authRouter";
import cors from "cors"

const Port = parseInt(process.env['PORT'] ?? '3000');
const app = express();

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter);


app.get('/', (_req, res) => {
    res.send('Hello World')
})

app.listen( Port, () => {
    console.clear();
    console.log('Server Listening on Port', Port)
})

