
import client from "../config/MqttConexion";
import { Server } from "socket.io";



export const setUpMqtt = (io: Server) => {
    const topic = 'BioReact/Sensors'
    client.on('connect', () => {
        console.log('Conected to has broker MQTT');

        client.subscribe(topic, (error) => {
            if (!error) {
                console.log(`Suscrito al tema: ${topic}`);
            } else {
                console.error('Error al suscribirse:', error);
            }
        })
    });


    client.on('message', (topic: string, message: Buffer) => {
        console.log(`Mensaje recibido del tema${topic}`);
        const entry = JSON.parse(message.toString())
        console.log(JSON.parse(message.toString()))
        io.emit('sensores', entry)
        console.log(entry);

    })

    client.on('error', (err) => {
        console.error('Error en el cliente MQTT:', err);
    });

    client.on('close', () => {
        console.log('Conexión cerrada');
    });


}





