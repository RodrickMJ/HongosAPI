import client from "../config/MqttConexion";
import { Server } from "socket.io";
import SensorsDataRequest from "../interfaces/DTOS/Sensors/DataRequest";

const topic = 'BioReact/Sensors';

export const setUpMqtt = (io: Server) => {
    const tenMinutes = 10 * 60 * 1000;

    let latestMessage: SensorsDataRequest = {
        hidrogen: 0, oxygen: 0, ph: 0, temperature: 0
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

    client.on('message', (topic: string, message: Buffer) => {
        try {

            latestMessage = JSON.parse(message.toString()) as SensorsDataRequest;
            console.log(latestMessage);
            const data = JSON.parse(message.toString());
             io.emit('graphics', latestMessage);

        } catch (error) {
            console.error('Error al procesar el mensaje:', error);
        }
    });


    setInterval(() => {
        console.log('Enviando datos cada diez minutos');
        io.emit('statistics', latestMessage);
    }, tenMinutes);


    client.on('error', (err) => {
        console.error('Error en el cliente MQTT:', err);
    });

    client.on('close', () => {
        console.log('Conexión cerrada');
    });
};
