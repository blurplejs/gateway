import { Client } from 'discord.js'
import 'mocha'

describe('Discord.js Client', () => {

    it ('should fake the login to be successful', () => {
        let client = new Client()
        client.login('abc')
    })

})
