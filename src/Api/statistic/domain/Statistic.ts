// Statistic.ts (Interfaz)
export interface Statistic {
    id_plant: string;
    averageTemperature: number;
    maxTemperature: number;
    minTemperature: number;
    stdDevTemperature?: number;
    averageHumidity: number;
    maxHumidity: number;
    minHumidity: number;
    stdDevHumidity: number;
    averageLight: number;
    maxLight: number;
    minLight: number;
    stdDevLight: number;
    airQuality: string;
    waterLevelStatus: string;
    mq2_value: number;
    distancia: number;
    createdAt?: Date;
}
