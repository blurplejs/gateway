import createClient from './discordClient'
import { expect } from 'chai'
import { storage, Object } from '../../lib'

export default function (validToken: string) {
    return () => {

        it ('should receive newly created guilds', (done) => {
            let client = createClient()
            client.login(validToken).then(() => {
                // Create 3 guilds
                let numberOfGuilds = 3
                storage.factory('guild', numberOfGuilds).create()
    
                // Count how often we receive a guild create event
                let counted = 0
                let callback = () => {
                    counted++

                    // Finish successfully when we received 3 guilds
                    if (counted == numberOfGuilds) {
                        done()
                        client.off('guildCreate', callback)
                    }
                }

                client.on('guildCreate', callback)
            })
        })

    }
}
