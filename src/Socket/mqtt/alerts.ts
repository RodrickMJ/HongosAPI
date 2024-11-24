import client from '../config/MqttConexion';
import { sendEmail } from './emailService';

const notificationTopic = 'NotificationTopic';

export const handleAlerts = async (conditions: any) => {
    const alerts = [];
    const actions = {
        activateWaterPump: false,
        activateFan: false,
        //adjustLighting: false,
    };

    // Temperatura
    if (conditions.averageTemperature < 15) {
        alerts.push('La temperatura está por debajo del rango óptimo (< 15°C)');
        actions.activateFan = true;
    } else if (conditions.averageTemperature > 30) {
        alerts.push('La temperatura está por encima del rango óptimo (> 30°C)');
        actions.activateFan = true;
    }

    // Humedad
    if (conditions.averageHumidity < 70) {
        alerts.push('La humedad está por debajo del rango óptimo (< 70%)');
    } else if (conditions.averageHumidity > 80) {
        alerts.push('La humedad está por encima del rango óptimo (> 80%)');
    }

    // Nivel de agua
    if (conditions.waterLevelStatus === 'Bajo') {
        alerts.push('El nivel de agua está bajo');
        actions.activateWaterPump = true;
    }

    // Luz y calidad del aire
    if (conditions.averageLight < 300) { // Ejemplo para luz
        alerts.push('La intensidad de luz es insuficiente');
        //actions.adjustLighting = true;
    }
    if (conditions.airQuality === 'Pobre') {
        alerts.push('La calidad del aire es pobre');
        actions.activateFan = true;
    }

    // Enviar correo si hay alertas
    if (alerts.length > 0) {
        await sendEmail(alerts);
    }

    // Publicar acciones como booleanos en otro topic
    client.publish(notificationTopic, JSON.stringify(actions));
    console.log('Acciones publicadas en MQTT como booleanos:', actions);
};
