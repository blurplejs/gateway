import { encode } from '../../lib/communication/Encoder'
import Message from '../../lib/communication/Message'
import { storage } from '../../lib'
import { GatewayOpcode } from '../../lib/constants'
import { expect } from 'chai'

describe('Message Encoder', () => {

    it ('replaces snowflakes with strings in the resulting object', async () => {
        storage.seed()
        let guild = storage.random('guild') as any
        let message = new Message(GatewayOpcode.Dispatch, guild)

        let encoded = await encode(message)
        let object = JSON.parse(encoded as string)

        expect(object.d.id).to.equal(guild.id.toString())
    })

})
