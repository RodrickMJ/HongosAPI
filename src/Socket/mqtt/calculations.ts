import SensorsDataRequest from "../interfaces/DTOS/Sensors/DataRequest";

export const calculateConditions = (data: SensorsDataRequest) => {
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
        data.distancia < 15
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
