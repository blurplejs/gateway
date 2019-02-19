import { Client } from 'discord.js'
import { expect } from 'chai'

describe('Bot Authentication', () => {

    it ('should successfully authenticate a bot with a valid token', () => {
        let client = new Client()

        client.on('debug', console.log)

        let token = 'abcdef'
        expect(client.login(token)).to.eventually.equal(token)
    })

    it ('should not authenticate a bot with an invalid token', () => {
        expect(true).to.be.false
        //let client = new Client()

        //expect(client.login('abc')).to.eventually.equal('Hello')
    })

})
