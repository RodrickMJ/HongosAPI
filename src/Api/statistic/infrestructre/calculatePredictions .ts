import Statistic from "./Statistic";
import PredictionModel from "./PredictionModel";

// Función para calcular predicciones
const calculatePredictions = async (id_plant: string, timeRange: "hour" | "day" | "week") => {
    const now = new Date();
    let rangeStart: Date;

    // Define el rango de tiempo basado en la opción seleccionada
    if (timeRange === "hour") {
        rangeStart = new Date(now.getTime() - 60 * 60 * 1000); // Última hora
    } else if (timeRange === "day") {
        rangeStart = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Último día
    } else {
        rangeStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Última semana
    }

    // Obtener estadísticas dentro del rango de tiempo
    const statistics = await Statistic.find({
        id_plant,
        createdAt: { $gte: rangeStart, $lte: now },
    });

    if (statistics.length === 0) {
        throw new Error("No hay suficientes datos para realizar predicciones");
    }

    // Calcular promedios
    const averageTemperature =
        statistics.reduce((sum, stat) => sum + stat.averageTemperature, 0) /
        statistics.length;

    const averageHumidity =
        statistics.reduce((sum, stat) => sum + stat.averageHumidity, 0) /
        statistics.length;

    const averageLight =
        statistics.reduce((sum, stat) => sum + stat.averageLight, 0) /
        statistics.length;

    const averageMQ2Value =
        statistics.reduce((sum, stat) => sum + stat.mq2_value, 0) /
        statistics.length;

    const averageDistance =
        statistics.reduce((sum, stat) => sum + stat.distancia, 0) /
        statistics.length;

    // Determinar probabilísticamente los estados categóricos
    const airQuality = determineMostFrequentValue(statistics.map((stat) => stat.airQuality));
    const waterLevelStatus = determineMostFrequentValue(
        statistics.map((stat) => stat.waterLevelStatus)
    );

    // Crear la predicción
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
    });
    

    // Guardar en la base de datos
    await prediction.save();

    return prediction;
};

// Función auxiliar para determinar el valor categórico más frecuente
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
