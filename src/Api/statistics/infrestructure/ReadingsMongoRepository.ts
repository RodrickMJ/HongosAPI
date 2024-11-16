import { ReadinsModel } from "./models/ReadingsModel";
import StatisticsRepository from "../domain/StatisticsRepository";
import PrediccionsRequest from "../domain/DTOS/PrediccionsRequest";
import { dataPoint } from "../domain/DTOS/PrediccionsResponse";

export default class ReadingsMongoRepository implements StatisticsRepository {
    constructor(readonly model: typeof ReadinsModel) {}

    async getPredictionsByHour(request: PrediccionsRequest): Promise<dataPoint[]> {
        try {
            const result = await this.model.aggregate([
                {
                    $match: {
                        id_plant: request.idPlant,
                        register_date: {
                            $gte: new Date(request.startDate),
                            $lte: new Date(request.endDate)
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d %H:00",
                                date: "$register_date"
                            }
                        },
                        value: {
                            $avg: `$${request.typeSensor}`
                        }
                    }
                },
                {
                    $sort: {
                        "_id": 1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        time: "$_id",
                        value: {
                            $round: ["$value", 1]
                        }
                    }
                }
            ]);
            return result;
            
        } catch (error) {
            console.error("Error en la consulta de predicciones por hora:", error);
            throw new Error("No se pudieron obtener las predicciones por hora. Intenta nuevamente más tarde.");
        }
    }

    async getPredictionsByWeek(request: PrediccionsRequest): Promise<dataPoint[]> {
        try {
            const result = await this.model.aggregate([
                {
                    $match: {
                        id_plant: request.idPlant,
                        register_date: {
                            $gte: new Date(request.startDate),
                            $lte: new Date(request.endDate)
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-W%V",
                                date: "$register_date"
                            }
                        },
                        value: {
                            $avg: `$${request.typeSensor}`
                        }
                    }
                },
                {
                    $sort: {
                        "_id": 1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        time: "$_id",
                        value: {
                            $round: ["$value", 1]
                        }
                    }
                }
            ]);
            return result;
        } catch (error) {
            console.error("Error en la consulta de predicciones por semana:", error);
            throw new Error("No se pudieron obtener las predicciones por semana. Intenta nuevamente más tarde.");
        }
    }

    async getPredictionsByMonth(request: PrediccionsRequest): Promise<dataPoint[]> {
        try {
            const result = await this.model.aggregate([
                {
                    $match: {
                        id_plant: request.idPlant,
                        register_date: {
                            $gte: new Date(request.startDate),
                            $lte: new Date(request.endDate)
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m",
                                date: "$register_date"
                            }
                        },
                        value: {
                            $avg: `$${request.typeSensor}`
                        }
                    }
                },
                {
                    $sort: {
                        "_id": 1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        time: "$_id",
                        value: {
                            $round: ["$value", 1]
                        }
                    }
                }
            ]);
            return result;
        } catch (error) {
            console.error("Error en la consulta de predicciones por mes:", error);
            throw new Error("No se pudieron obtener las predicciones por mes. Intenta nuevamente más tarde.");
        }
    }
}
