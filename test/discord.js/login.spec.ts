import { Client } from 'discord.js'
import { expect } from 'chai'
import { storage, Model } from '../../lib'

describe('Discord Bot Login', () => {

    let validToken = 'my-valid-token'
    let invalidToken = 'an-invalid-token'

    beforeEach(() => {
        storage.seed()
        storage.factory(Model.User).create(() => ({ '@api_token': validToken }))
    })

    it ('should successfully authenticate a bot with a valid token', () => {
        let client = new Client()
        let response = client.login(validToken)

        return expect(response).to.eventually.equal(validToken)
    })

    it ('should receive a list of guilds', async () => {
        let client = new Client()
        let response = await client.login(validToken)

        // @ts-ignore
        let clientGuild = client.guilds.find(g => g.id === storage.random('guild').id.toString())

        expect(clientGuild).to.not.be.null
    })

    it ('should not authenticate a bot with an invalid token', () => {
        let client = new Client()
        let response = client.login(invalidToken)

        return expect(response).to.eventually.be.rejectedWith('Incorrect login details were provided.')
    })

})
