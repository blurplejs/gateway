import { Object } from '../../lib'
import { expect } from 'chai'

const Snowflake = Object.Snowflake

describe('Snowflake', () => {
    
    it ('should generate based on the input parameters', () => {
        let snowflake = Snowflake.create({
            timestamp: 41944705796,
            workerID: 1,
            processID: 0,
            increment: 7
        })

        // Example from Discord API reference
        expect(snowflake.toString()).to.equal('175928847299117063')
    })

    it ('should generate 64-bit snowflakes', () => {
        let snowflake = Snowflake.create()

        expect(snowflake.toBinary()).to.have.lengthOf(64)
    })

    it ('should generate different snowflakes when called multiple times', () => {
        let snowflakeA = Snowflake.create()
        let snowflakeB = Snowflake.create()

        expect(snowflakeA.toString()).to.not.equal(snowflakeB.toString())
    })

    it ('should increment the increment property when generated', () => {
        Snowflake.reset()
        let snowflakeA = Snowflake.create()
        let snowflakeB = Snowflake.create()

        expect(snowflakeB.increment).to.equal(snowflakeA.increment + 1)
    })

})
