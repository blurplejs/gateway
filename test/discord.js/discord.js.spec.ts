import { Client } from 'discord.js'
import { storage, Object } from '../../lib'

import Login from './login'
import GuildEvents from './guild-events'

describe('Discord.js Integration', () => {

    let validToken = 'my-valid-token'

    beforeEach(() => {
        storage.seed()
        storage.factory('user').create(() => ({ '@api_token': validToken }))
    })

    describe('Login', Login(validToken))
    describe('Guild Events', GuildEvents(validToken))

})
