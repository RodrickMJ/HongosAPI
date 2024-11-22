import 'dotenv/config'
import mqtt from "mqtt"

const brokerUrl:string = `mqtt://${process.env['IP_STANCIA']} ` || 'mqtt://34.226.165.33'
const username: string = process.env['USERNAME_MQTT'] || 'Rrodrick'
const password: string = process.env['PASSWORD_MQTT'] || '159632478xd'

const client = mqtt.connect('mqtt://34.226.165.33', {
    username: 'Rodrick',
    password: '159632478xd'
})

export default client;