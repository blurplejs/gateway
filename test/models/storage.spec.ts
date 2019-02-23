import { storage } from '../../lib'
import { expect } from 'chai'
import { Object } from '../../lib';

describe('Storage', () => {

    it ('should create a number of users', () => {
        storage.seed()

        expect(storage.users).to.have.length.above(5)
    })

    it ('should create and return the same users when given the same seed', () => {
        storage.seed(10)
        let firstUser = storage.random('user')

        storage.seed(10)
        let secondUser = storage.random('user')

        // @ts-ignore
        expect(firstUser.id.toString()).to.equal(secondUser.id.toString())
    })

    it ('should emit an event when a guild is created', (done) => {
        let finisher = () => {
            expect(storage.guilds).to.have.lengthOf(1)

            storage.off('guildCreated', finisher)
            done()
        }

        storage.on('guildCreated', finisher)

        storage.empty()
        expect(storage.guilds).to.be.empty
        storage.factory('guild').create()
    })

    it ('should be able to find children of objects', () => {
        let guild = storage.factory('guild').create(() => ({ name: 'fuck'}))[0] as Object.Guild

        // @ts-ignore
        let firstChannel = guild.channels[0]
        expect(storage.find(firstChannel.id)).to.not.be.null
    })

})
