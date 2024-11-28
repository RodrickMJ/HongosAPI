import client from '../config/MqttConexion';
import { Server } from 'socket.io';
import { calculateConditions } from './calculations';
import { handleAlerts } from './alerts';
import { SensorsDataRequest } from '../interfaces/DTOS/Sensors/DataRequest';
import axios from 'axios';

const topic = 'TopicsMQTT';

// Asegúrate de que el buffer tenga el tipo adecuado
const buffer: SensorsDataRequest[] = [];
const calculationInterval = 300000; // 5 minutos en milisegundos

// Función para agregar datos al buffer y realizar cálculos
const aggregateData = (dataArray: SensorsDataRequest[]) => {
    const aggregated = {
        id_plant: dataArray[0]?.id_plant,
        temp1: [] as number[], // Especificar tipo number para los arrays
        temp2: [] as number[],
        temp3: [] as number[],
        hum1: [] as number[],
        hum2: [] as number[],
        hum3: [] as number[],
        luz1: [] as number[],
        luz2: [] as number[],
        mq2_value: [] as number[],
        mq2_voltage: [] as number[],
        distancia: [] as number[],
    };

    // Recorrer los datos y agregarlos al objeto agregado
    dataArray.forEach((data) => {
        aggregated.temp1.push(data.temp1);
        aggregated.temp2.push(data.temp2);
        aggregated.temp3.push(data.temp3);
        aggregated.hum1.push(data.hum1);
        aggregated.hum2.push(data.hum2);
        aggregated.hum3.push(data.hum3);
        aggregated.luz1.push(data.luz1);
        aggregated.luz2.push(data.luz2);
        aggregated.mq2_value.push(data.mq2_value);
        aggregated.mq2_voltage.push(data.mq2_voltage);
        aggregated.distancia.push(data.distancia);
    });

    // Consolidar promedios y devolver el objeto
    return {
        id_plant: aggregated.id_plant,
        temp1: average(aggregated.temp1),
        temp2: average(aggregated.temp2),
        temp3: average(aggregated.temp3),
        hum1: average(aggregated.hum1),
        hum2: average(aggregated.hum2),
        hum3: average(aggregated.hum3),
        luz1: average(aggregated.luz1),
        luz2: average(aggregated.luz2),
        mq2_value: average(aggregated.mq2_value),
        mq2_voltage: average(aggregated.mq2_voltage),
        distancia: average(aggregated.distancia),
    };
};

// Función para calcular el promedio
const average = (values: number[]): number => {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
};

// Temporizador para procesar el buffer cada 5 minutos
setInterval(async () => {
    if (buffer.length > 0) {
        console.log(`Procesando ${buffer.length} datos acumulados`);

        const aggregatedData = aggregateData(buffer);
        const calculatedConditions = calculateConditions(aggregatedData);

        // Enviar cálculos a la base de datos
        try {
            await axios.post('http://localhost:3000/statistics/', calculatedConditions);
            console.log('Cálculos guardados en la base de datos:', calculatedConditions);
        } catch (error) {
            console.error('Error al guardar los cálculos:', error);
        }

        // Emitir las estadísticas a través del WebSocket
        // io.emit('statistics', calculatedConditions);

        // Guardar cálculos inferenciales
        const reducedConditions = {
            id_plant: calculatedConditions.id_plant,
            averageTemperature: calculatedConditions.averageTemperature,
            averageHumidity: calculatedConditions.averageHumidity,
            averageLight: calculatedConditions.averageLight,
            airQuality: calculatedConditions.airQuality,
            waterLevelStatus: calculatedConditions.waterLevelStatus,
            mq2_value: calculatedConditions.mq2_value,
            mq2_voltage: calculatedConditions.mq2_voltage,  
            distancia: calculatedConditions.distancia,
            createdAt: new Date(), 
            updatedAt: new Date(),
            __v: 0,
        };

        try {
            await axios.post('http://localhost:3000/inferential/', reducedConditions);
            console.log('Cálculos inferenciales guardados con éxito');
        } catch (error) {
            console.error('Error al guardar cálculos inferenciales:', error);
        }

        const timeRanges = ['hour', 'day', 'week'];
        for (const timeRange of timeRanges) {
            const predictionData = { ...reducedConditions, timeRange };
            try {
                await axios.post('http://localhost:3000/predictions/', predictionData);
                console.log(`Predicción (${timeRange}) guardada en la base de datos`);
            } catch (error) {
                console.error('Error al guardar predicción:', error);
            }
        }

        // Manejar alertas y acciones
        try {
            await handleAlerts(reducedConditions);
        } catch (error) {
            console.error('Error al manejar alertas:', error);
        }

        // Vaciar el buffer después de procesar los datos
        buffer.length = 0;
    } else {
        console.log('No hay datos acumulados para procesar.');
    }
}, calculationInterval);

// Este bloque se ejecuta para cada mensaje MQTT recibido y almacena los datos en el buffer
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

            // Agregar mensaje al buffer
            buffer.push(parsedMessage);
            console.log('Dato almacenado en el buffer');

            // Emitir datos originales para gráficos
            io.emit('graphics', parsedMessage);

            // Guardar los datos originales en la base de datos
            await axios.post('http://localhost:3000/sensors/readings', parsedMessage);
            console.log('Datos originales guardados en la base de datos');

            // Guardar tendencias
            await axios.post("http://localhost:3000/trends/", parsedMessage);
            console.log('Cálculos de tendencias realizados con éxito');
        } catch (error) {
            console.error('Error procesando el mensaje:', error);
        }
    });
};
