import { Client } from 'discord.js'
import { expect } from 'chai'
import { storage, Model } from '../../lib'

describe('Discord Bot Login', () => {

    it ('should successfully authenticate a bot with a valid token', () => {
        let token = 'my-valid-token'
        storage.users = storage.factory(Model.User).create(() => ({ '@api_token': token }))

        let client = new Client()
        let response = client.login(token)

        return expect(response).to.eventually.equal(token)
    })

    it ('should not authenticate a bot with an invalid token', () => {
        storage.users = storage.factory(Model.User).create(() => ({ '@api_token': 'a-valid-token' }))

        let client = new Client()
        let response = client.login('an-invalid-token')

        return expect(response).to.eventually.be.rejectedWith('Incorrect login details were provided.')
    })

})
