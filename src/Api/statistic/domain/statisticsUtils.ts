export const calculateVariance = (values: number[]): number => {
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    return variance;
  };
  
  export const calculateRegression = (values: number[]): string => {
    // Simulación de una regresión simple
    const slope = (values[2] - values[0]) / 2; // Slope simple entre el primer y último valor
    return `y = ${slope}x + ${values[0]}`; // Ecuación lineal simple
  };
  