import { Client } from 'discord.js'
import { expect } from 'chai'

describe('Discord.js Client', () => {

    it ('should fake the login to be successful', () => {
        let client = new Client()

        expect(client.login('abc')).to.eventually.equal('Hello')
    })

})
