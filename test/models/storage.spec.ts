import { storage } from '../../lib'
import { expect } from 'chai'

describe('Storage', () => {

    it ('should create the a number of users', () => {
        storage.seed()

        expect(storage.users).to.have.length.above(5)
    })

    it ('should create and return the same users when given the same seed', () => {
        storage.seed(10)
        let firstUser = storage.random('user')

        storage.seed(10)
        let secondUser = storage.random('user')

        expect(firstUser.id.toString()).to.equal(secondUser.id.toString())
    })

})
