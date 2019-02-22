import * as bigint from 'big-integer'
import { AbstractDiscordObject } from './AbstractObject';

type SnowflakeParts = {
    timestamp: number,
    workerID: number,
    processID: number,
    increment: number
}

export default class Snowflake extends AbstractDiscordObject {
    
    constructor (public snowflake: bigint.BigInteger) {
        super()
    }

    protected static discordEpoch = 1420070400000
    
    public static timestamp = 59961600
    protected static processID = 0
    protected static increment = 0

    static reset () : void {
        Snowflake.processID = 0
        Snowflake.increment = 0
    }

    static create (parts: Partial<SnowflakeParts> = {}) : Snowflake {
        // Set default values
        if (typeof parts.increment == 'undefined') {
            parts.increment = ++Snowflake.increment
            // When carrying the increment to the processID we get 2^17 possible auto-generated snowflakes
            if (Snowflake.increment >= 4095) {
                Snowflake.increment = 0
                Snowflake.processID++ 
            }
        }
        if (typeof parts.processID == 'undefined') parts.processID = Snowflake.processID
        if (typeof parts.workerID == 'undefined') parts.workerID = 1
        if (typeof parts.timestamp == 'undefined') parts.timestamp = Snowflake.timestamp

        // Generate bigint for the snowflake. Timestamp has to be relative to 2015 now.
        let snowflake = bigint(parts.timestamp).shiftLeft(22)
            .add(bigint(parts.workerID).shiftLeft(17))
            .add(bigint(parts.processID).shiftLeft(12))
            .add(parts.increment)

        return new Snowflake(snowflake)
    }

    get timestamp () : number {
        return this.snowflake.shiftRight(22).add(Snowflake.discordEpoch).toJSNumber()
    }

    get workerID () : number {
        return this.snowflake.and(0x3E0000).shiftRight(17).toJSNumber()
    }

    get processID () : number {
        return this.snowflake.and(0x1F000).shiftRight(12).toJSNumber()
    }

    get increment () : number {
        return this.snowflake.and(0xFFF).toJSNumber()
    }

    toString () : string {
        return this.snowflake.toString(10)
    }

    toBinary () : string {
        return this.snowflake.toString(2).padStart(64, '0')
    }

    forMessage () {
        return this.toString()
    }
    
}
