import Statistic from "./Statistic";
import PredictionModel from "./PredictionModel";

// Nueva función para calcular la probabilidad de ocurrencia de un valor
const calculateProbability = (values: number[], targetValue: number, tolerance: number = 0.1): number => {
    const total = values.length;
    const matches = values.filter(value => Math.abs(value - targetValue) <= tolerance).length;
    return total > 0 ? (matches / total) * 100 : 0; // Porcentaje de ocurrencia
};

const calculatePredictions = async (id_plant: string, timeRange: "hour" | "day" | "week") => {
    const now = new Date();
    let rangeStart: Date;

    if (timeRange === "hour") {
        rangeStart = new Date(now.getTime() - 60 * 60 * 1000); 
    } else if (timeRange === "day") {
        rangeStart = new Date(now.getTime() - 24 * 60 * 60 * 1000); 
    } else {
        rangeStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); 
    }

    const statistics = await Statistic.find({
        id_plant,
        createdAt: { $gte: rangeStart, $lte: now },
    });

    if (statistics.length === 0) {
        throw new Error("No hay suficientes datos para realizar predicciones");
    }

    // Calcular promedios
    const averageTemperature = statistics.reduce((sum, stat) => sum + stat.averageTemperature, 0) / statistics.length;
    const averageHumidity = statistics.reduce((sum, stat) => sum + stat.averageHumidity, 0) / statistics.length;
    const averageLight = statistics.reduce((sum, stat) => sum + stat.averageLight, 0) / statistics.length;
    const averageMQ2Value = statistics.reduce((sum, stat) => sum + stat.mq2_value, 0) / statistics.length;
    const averageDistance = statistics.reduce((sum, stat) => sum + stat.distancia, 0) / statistics.length;

    // Calcular valores frecuentes
    const airQuality = determineMostFrequentValue(statistics.map((stat) => stat.airQuality));
    const waterLevelStatus = determineMostFrequentValue(statistics.map((stat) => stat.waterLevelStatus));

    // Calcular probabilidades
    const temperatureValues = statistics.map(stat => stat.averageTemperature);
    const humidityValues = statistics.map(stat => stat.averageHumidity);

    const temperatureProbability = calculateProbability(temperatureValues, averageTemperature);
    const humidityProbability = calculateProbability(humidityValues, averageHumidity);

    // Crear predicción
    const prediction = new PredictionModel({
        id_plant,
        timeRange,
        averageTemperature,
        averageHumidity,
        averageLight,
        airQuality,
        waterLevelStatus,
        mq2_value: averageMQ2Value,
        distancia: averageDistance,
        temperatureProbability,
        humidityProbability,
    });

    await prediction.save();

    return prediction;
};

// Función para determinar el valor más frecuente
const determineMostFrequentValue = (values: string[]) => {
    const frequencyMap: Record<string, number> = {};
    values.forEach((value) => {
        frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    return Object.keys(frequencyMap).reduce((a, b) =>
        frequencyMap[a] > frequencyMap[b] ? a : b
    );
};

export default calculatePredictions;
