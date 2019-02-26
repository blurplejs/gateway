import { Client } from 'discord.js'

export default function createClient () {
    let client = new Client()
    client.on('error', () => {})
    return client
}
