import 'dotenv/config'
import mqtt from "mqtt"

const brokerUrl:string = `mqtt://${process.env['IP_STANCIA']} ` || 'mqtt://localhost'
const username: string = process.env['USERNAME_MQTT'] || 'admin'
const password: string = process.env['PASSWORD_MQTT'] || 'default'

const client = mqtt.connect(brokerUrl, {
    username,
    password
})

export default client;