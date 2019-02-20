import { storage } from '../../lib'
import { expect } from 'chai'

describe('Storage', () => {

    it ('should create the a number of users', () => {
        storage.seed()

        expect(storage.users).to.have.length.above(5)
    })

    it ('should create and return the same users when given the same seed', () => {
        storage.seed(10)
        let userA = storage.random('user')

        storage.seed(10)
        let userB = storage.random('user')

        expect(userA.options.id.toString()).to.equal(userB.options.id.toString())
    })

})
