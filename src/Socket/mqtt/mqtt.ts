import client from '../config/MqttConexion';
import { Server } from 'socket.io';
import axios from 'axios';
import SensorsDataRequest from '../interfaces/DTOS/Sensors/DataRequest';

const topic = 'TopicsMQTT';

export const setUpMqtt = (io: Server) => {
    let latestMessage: SensorsDataRequest = {
        id_plant: '',
        luz1: 0,
        luz2: 0,
        temp1: 0,
        hum1: 0,
        temp2: 0,
        hum2: 0,
        temp3: 0,
        hum3: 0,
        mq2_value: 0,
        mq2_voltage: 0,
        distancia: 0,
    };

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
            const parsedMessage: SensorsDataRequest = JSON.parse(message.toString());
            latestMessage = parsedMessage;
            console.log('Mensaje recibido:', latestMessage);

            io.emit('graphics', latestMessage);


            await axios.post('http://localhost:3000/sensors/readings', latestMessage);
            console.log('Datos originales guardados en la base de datos');


            const calculatedConditions = calculateConditions(latestMessage);


            io.emit('statistics', calculatedConditions);

            await axios.post('http://localhost:3000/statistics/', calculatedConditions);
            console.log('Cálculos guardados en la base de datos');

            const timeRanges = ['hour', 'day', 'week'];
            for (const timeRange of timeRanges) {
                const predictionData = { ...calculatedConditions, timeRange };
                await axios.post('http://localhost:3000/predictions/', predictionData);
                console.log(`Predicción (${timeRange}) guardada en la base de datos`);
            }
        } catch (error) {
            console.error('Error al procesar el mensaje o guardar datos:', error);
        }
    });

    client.on('error', (err) => {
        console.error('Error en el cliente MQTT:', err);
    });

    client.on('close', () => {
        console.log('Conexión cerrada');
    });
};


const calculateConditions = (data: SensorsDataRequest) => {
    const averageTemperature = (data.temp1 + data.temp2 + data.temp3) / 3;
    const averageHumidity = (data.hum1 + data.hum2 + data.hum3) / 3;
    const averageLight = (data.luz1 + data.luz2) / 2;
    const airQuality =
        data.mq2_value > 50
            ? 'Pobre'
            : data.mq2_value > 25
            ? 'Moderada'
            : 'Buena';
    const waterLevelStatus =
        data.distancia < 50
            ? 'Bajo'
            : data.distancia < 100
            ? 'Aceptable'
            : 'Óptimo';

    return {
        id_plant: data.id_plant,
        averageTemperature,
        averageHumidity,
        averageLight,
        airQuality,
        waterLevelStatus,
        mq2_value: data.mq2_value,
        distancia: data.distancia,
    };
};
