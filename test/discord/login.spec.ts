import { Client } from 'discord.js'
import { expect } from 'chai'

describe('Bot Authentication', () => {

    it ('should successfully authenticate a bot with a valid token', async () => {
        let client = new Client()

        let token = 'my-valid-token'
        let response = await client.login(token)
        expect(response).to.equal(token)
    })

    it ('should not authenticate a bot with an invalid token', () => {
        expect(true).to.be.false
    })

})
