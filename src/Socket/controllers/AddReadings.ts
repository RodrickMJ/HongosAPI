import SensorDataModel from '../Models/SensorDataModel'; 
import SensorsDataRequest  from '../interfaces/DTOS/Sensors/DataRequest';

const addReadings = async (data: SensorsDataRequest): Promise<void> => {
    try {
        const newReading = new SensorDataModel({
            id_plant: data.id_plant,
            luz1: data.luz1,
            luz2: data.luz2,
            temp1: data.temp1,
            hum1: data.hum1,
            temp2: data.temp2,
            hum2: data.hum2,
            temp3: data.temp3,
            hum3: data.hum3,
            mq2_value: data.mq2_value,
            mq2_voltage: data.mq2_voltage,
            distancia: data.distancia,
        });

        await newReading.save();
        console.log('Datos guardados en la base de datos:', newReading);
    } catch (error) {
        console.error('Error al guardar los datos en la base de datos:', error);
        throw error;
    }
};

export default addReadings;
