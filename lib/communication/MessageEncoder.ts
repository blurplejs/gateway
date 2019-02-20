// @ts-ignore
import * as erlpack from 'erlpack'
import { Data } from 'ws'
import { DecodeError } from '../errors'
import Message from './Message'

export enum Encoding {
    JSON, ETF
}

export default class MessageEncoder {

    static encode (message: Message, encoding: Encoding = Encoding.JSON) : Buffer | string {
        let object = message.toObject()
        return encoding == Encoding.JSON ? JSON.stringify(object) : erlpack.pack(object)
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
