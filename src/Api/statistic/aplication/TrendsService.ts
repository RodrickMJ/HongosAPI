import SensorsDataRequest from "../domain/SensorDataRequest";

interface Trend {
    metric: string;
    trend: "increasing" | "decreasing" | "stable";
    rateOfChange: number;
}

// Servicio para calcular tendencias
export const calculateTrends = (currentData: SensorsDataRequest, previousData: SensorsDataRequest | null): Trend[] => {
    if (!previousData) {
        return []; // Si no hay datos previos, no se pueden calcular tendencias.
    }

    const metrics = [
        { name: "temperature", current: (currentData.temp1 + currentData.temp2 + currentData.temp3) / 3, previous: (previousData.temp1 + previousData.temp2 + previousData.temp3) / 3 },
        { name: "humidity", current: (currentData.hum1 + currentData.hum2 + currentData.hum3) / 3, previous: (previousData.hum1 + previousData.hum2 + previousData.hum3) / 3 },
        { name: "light", current: (currentData.luz1 + currentData.luz2) / 2, previous: (previousData.luz1 + previousData.luz2) / 2 },
        { name: "mq2_value", current: currentData.mq2_value, previous: previousData.mq2_value },
        { name: "distance", current: currentData.distancia, previous: previousData.distancia },
    ];

    return metrics.map(metric => {
        const rateOfChange = metric.current - metric.previous;
        const trend =
            rateOfChange > 0.5 ? "increasing" :
            rateOfChange < -0.5 ? "decreasing" :
            "stable";
        
        return { metric: metric.name, trend, rateOfChange };
    });
};
