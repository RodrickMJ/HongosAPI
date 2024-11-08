import 'dotenv/config'
import mqtt from "mqtt"

const brokerUrl:string = `mqtt://${process.env['IP_STANCIA']} ` || 'mqtt://44.218.251.211'
const username: string = process.env['USERNAME_MQTT'] || 'armando'
const password: string = process.env['PASSWORD_MQTT'] || 'armandorv'

const client = mqtt.connect('mqtt://44.218.251.211', {
    username: 'armando',
    password: 'armandorv'
})

export default client;