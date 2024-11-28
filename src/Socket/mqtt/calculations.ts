import SensorsDataRequest from "../interfaces/DTOS/Sensors/DataRequest";

const dataBuffer: Record<string, SensorsDataRequest[]> = {};

// calculateConditions.ts
const calculateStdDev = (values: number[], mean: number) => {
    const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
};

export const calculateConditions = (data: SensorsDataRequest) => {
    const temperatures = [data.temp1, data.temp2, data.temp3];
    const humidities = [data.hum1, data.hum2, data.hum3];
    const lights = [data.luz1, data.luz2];

    const averageTemperature = temperatures.reduce((sum, t) => sum + t, 0) / temperatures.length;
    const maxTemperature = Math.max(...temperatures);
    const minTemperature = Math.min(...temperatures);

    const averageHumidity = humidities.reduce((sum, h) => sum + h, 0) / humidities.length;
    const maxHumidity = Math.max(...humidities);
    const minHumidity = Math.min(...humidities);
    const stdDevHumidity = calculateStdDev(humidities, averageHumidity);

    const averageLight = lights.reduce((sum, l) => sum + l, 0) / lights.length;
    const maxLight = Math.max(...lights);
    const minLight = Math.min(...lights);
    const stdDevLight = calculateStdDev(lights, averageLight);

    const airQuality = data.mq2_value > 50 ? 'Pobre' : data.mq2_value > 25 ? 'Moderada' : 'Buena';
    const waterLevelStatus = data.distancia < 15 ? 'Bajo' : data.distancia < 100 ? 'Aceptable' : 'Óptimo';

    return {
        id_plant: data.id_plant,
        averageTemperature,
        maxTemperature,
        minTemperature,
        averageHumidity,
        maxHumidity,
        minHumidity,
        stdDevHumidity,
        averageLight,
        maxLight,
        minLight,
        stdDevLight,
        airQuality,
        waterLevelStatus,
        mq2_value: data.mq2_value,
        mq2_voltage: data.mq2_voltage, 
        distancia: data.distancia,
    };
};


// Funciones auxiliares para los cálculos
const calculateAverage = (values: number[]): number => {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const calculateStandardDeviation = (values: number[]): number => {
    const mean = calculateAverage(values);
    const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
};

const calculateMax = (values: number[]): number => {
    return Math.max(...values);
};

const calculateMin = (values: number[]): number => {
    return Math.min(...values);
};
