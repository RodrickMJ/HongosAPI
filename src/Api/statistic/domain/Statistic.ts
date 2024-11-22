//Statistic.ts
export interface Statistic {
    id_plant: string;
    averageTemperature: number; 
    averageHumidity: number; 
    averageLight: number;
    airQuality: string; 
    waterLevelStatus: string; 
    mq2_value: number; 
    distancia: number; 
    createdAt?: Date; 
}
