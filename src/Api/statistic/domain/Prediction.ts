export interface Prediction {
    id_plant: string;
    timeRange: "hour" | "day" | "week"; 
    averageTemperature: number; 
    averageHumidity: number; 
    averageLight: number; 
    airQuality: string; 
    waterLevelStatus: string;
    mq2_value: number; 
    distancia: number; 
    createdAt?: Date;
}
