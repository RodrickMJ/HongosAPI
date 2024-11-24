import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/ConectionDatabase';
import authRouter from './auth/infrestructure/Routers/authRouter';
import userRouter from './users/infrestructure/routers/UserRouter';
import plantsRouter from './plants/infrestructure/router/plantsRouter';
// import statisticsRouter from './statistics/infrestructure/router/router';
import router from './readData/infrastructure/routers/SensorRouter';
import routerStat from './statistic/infrestructre/StatisticRouter';
import routerPred from './statistic/infrestructre/predictionsRoter';
import routerTendencias from './statistic/infrestructre/TrendsRouter';
import routerInferential from './statistic/infrestructre/inferentialStatisticsRoutes';

const Port = parseInt(process.env['APP_PORT'] ?? '3001');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/plants', plantsRouter);
// app.use('/statistics', statisticsRouter);
app.use('/sensors', router);
app.use('/statistics', routerStat);
app.use('/predictions', routerPred)
app.use('/trends', routerTendencias);
app.use('/inferential', routerInferential);

app.get('/', (_req, res) => res.send('Hello World API'));

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
