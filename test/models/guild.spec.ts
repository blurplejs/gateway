import { Object } from '../../lib'
import { expect } from 'chai'

describe('Guild', () => {
    
    it ('should have at least one role with the name @everyone', () => {
        let guild = new Object.Guild()

        let names = guild.roles.map(r => r.name)
        expect(names).to.include('@everyone')
    })

    it ('should have an @everyone role with the same id as itself', () => {
        let guild = new Object.Guild()

        let everyoneRole = guild.roles.find(r => r.name === '@everyone') as Object.Role
        expect(everyoneRole.id.toString()).to.equal(guild.id.toString())
    })

})
