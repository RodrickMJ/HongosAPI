import client from '../config/MqttConexion';
import { Server } from 'socket.io';
import { calculateConditions } from './calculations';
import { handleAlerts } from './alerts';
import axios from 'axios';

const topic = 'TopicsMQTT';

export const setUpMqtt = (io: Server) => {
    client.on('connect', () => {
        console.log('Conectado al broker MQTT');
        client.subscribe(topic, (error) => {
            if (!error) {
                console.log(`Suscrito al tema: ${topic}`);
            } else {
                console.error('Error al suscribirse:', error);
            }
        });
    });

    client.on('message', async (topic: string, message: Buffer) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            console.log('Mensaje recibido:', parsedMessage);

            io.emit('graphics', parsedMessage);

            await axios.post('http://localhost:3000/sensors/readings', parsedMessage);
            console.log('Datos originales guardados en la base de datos');

            await axios.post("http://localhost:3000/trends/", parsedMessage);
            console.log('Cálculos de tendencias realizados con éxito');

            const calculatedConditions = calculateConditions(parsedMessage);
            io.emit('statistics', calculatedConditions);

            await axios.post('http://localhost:3000/statistics/', calculatedConditions);
            console.log('Cálculos guardados en la base de datos');

            await axios.post('http://localhost:3000/inferential/', calculatedConditions);
            console.log('Cálculos inferenciales guardados con éxito');

            const timeRanges = ['hour', 'day', 'week'];
            for (const timeRange of timeRanges) {
                const predictionData = { ...calculatedConditions, timeRange };
                await axios.post('http://localhost:3000/predictions/', predictionData);
                console.log(`Predicción (${timeRange}) guardada en la base de datos`);
            }

            // Manejar alertas y acciones
            await handleAlerts(calculatedConditions);
        } catch (error) {
            console.error('Error al procesar el mensaje:', error);
        }
    });

    client.on('error', (err) => {
        console.error('Error en el cliente MQTT:', err);
    });

    client.on('close', () => {
        console.log('Conexión cerrada');
    });
};
