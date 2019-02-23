import { encode } from '../../lib/communication/Encoder'
import Message from '../../lib/communication/Message'
import { storage } from '../../lib'
import { GatewayOpcode } from '../../lib/constants'
import { expect } from 'chai'
import { AbstractDiscordObject } from '../../lib/objects/AbstractObject'

describe('Message Encoder', () => {

    it ('replaces snowflakes with strings in the resulting object', () => {
        storage.seed()
        let guild = storage.random('guild') as any
        let message = new Message(GatewayOpcode.Dispatch, guild)

        let encoded = encode(message)
        let object = JSON.parse(encoded as string)

        expect(object.d.id).to.equal(guild.id.toString())
    })

})
