import SensorsDataRequest from "../domain/SensorDataRequest";

const calculateBinomialCoefficient = (n: number, k: number): number => {
    if (k > n) return 0;
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result = (result * (n - i + 1)) / i;
    }
    return result;
};

// Función para calcular la probabilidad binomial
const calculateBinomialProbability = (n: number, k: number, p: number): number => {
    const binomialCoefficient = calculateBinomialCoefficient(n, k);
    return binomialCoefficient * Math.pow(p, k) * Math.pow(1 - p, n - k);
};

// Servicio para calcular tendencias en un lote de datos
export const calculateBatchTrends = (batchData: SensorsDataRequest[]) => {
    const trends: any[] = [];

    const metrics = Object.keys(batchData[0]) as (keyof SensorsDataRequest)[];

    for (const metric of metrics) {
        if (metric !== "id_plant") {
            const values = batchData.map(data => data[metric] as number).filter(v => v !== undefined);

            if (values.length > 0) {
                const max = Math.max(...values);
                const min = Math.min(...values);

              
                const n = values.length;
                const k = values.filter(v => v > 0).length; 
                const p = k / n;
                const binomialProbability = calculateBinomialProbability(n, k, p);

  
                const rateOfChange = (values[values.length - 1] - values[0]) / values.length;

                trends.push({
                    metric,
                    trend: rateOfChange > 0 ? "increasing" : rateOfChange < 0 ? "decreasing" : "stable",
                    rateOfChange,
                    max,
                    min,
                    binomial: binomialProbability,
                });
            }
        }
    }

    return trends;
};
