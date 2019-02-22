// @ts-ignore
import * as erlpack from 'erlpack'
import { Data } from 'ws'
import { DecodeError } from '../errors'
import Message from './Message'
import { Snowflake } from '../objects'

export enum Encoding {
    JSON, ETF
}

function isIterable (obj: any) : boolean {
    if (!obj || typeof obj === 'string') return false
    return typeof obj[Symbol.iterator] === 'function' || typeof obj === 'object'
}

export default class MessageEncoder {

    static replaceSnowflakes (data: any) : any {
        if (!isIterable(data)) return data
        if (typeof data._options !== 'undefined') data = data._options

        for (let name in data) {
            if (isIterable(data[name])) data[name] = MessageEncoder.replaceSnowflakes(data[name])
            if (data[name] instanceof Snowflake) data[name] = data[name].toString()
        }

        return data
    }

    static encode (message: Message, encoding: Encoding = Encoding.JSON) : Buffer | string {
        let object = message.toObject()
        object.d = MessageEncoder.replaceSnowflakes(object.d)

        return encoding == Encoding.JSON || true ? JSON.stringify(object) : erlpack.pack(object)
    }

    static decode (data: Data, encoding: Encoding = Encoding.JSON) : object {
        if (encoding == Encoding.JSON) return JSON.parse(data.toString())
        
        try {
            let unpacked = erlpack.unpack(data)
            return unpacked
        } catch (e) {
            throw new DecodeError()
        }
    }

}
