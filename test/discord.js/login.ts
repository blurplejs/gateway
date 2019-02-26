import createClient from './discordClient'
import { expect } from 'chai'
import { storage, Object } from '../../lib'

export default function (validToken: string) {
    return () => {

        it ('should successfully authenticate a bot with a valid token', () => {
            let client = createClient()
            let response = client.login(validToken)
    
            return expect(response).to.eventually.equal(validToken)
        })
    
        it ('should receive a list of guilds', async () => {
            let client = createClient()
            await client.login(validToken)
    
            let randomGuild = storage.random('guild') as Object.Guild
            let clientGuild = client.guilds.find(g => g.id === randomGuild.id.toString())
            expect(clientGuild).to.not.be.null
        })
    
        it ('should not authenticate a bot with an invalid token', () => {
            let client = createClient()
            let response = client.login('an-invalid-token')
    
            return expect(response).to.eventually.be.rejectedWith('Incorrect login details were provided.')
        })

    }
}
