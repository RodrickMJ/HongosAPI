export interface SensorsDataRequest {
    id_plant: string;
    temp1: number;
    temp2: number;
    temp3: number;
    hum1: number;
    hum2: number;
    hum3: number;
    luz1: number;
    luz2: number;
    mq2_value: number;
    mq2_voltage: number;  // Asegúrate de que esta propiedad esté incluida.
    distancia: number;
}
