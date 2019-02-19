// @ts-ignore
import * as erlpack from 'erlpack'
import { Data } from 'ws'
import { DecodeError } from '../errors'
import Message from './Message'

export default class MessagePacker {

    constructor (protected etf: boolean = false) {

    }

    pack (data: Message) : Buffer | string {
        let object = data.toObject()
        return this.etf ? erlpack.pack(object) : JSON.stringify(object)
    }

    unpack (data: Data) : object {
        if (!this.etf) return JSON.parse(data.toString())
        
        try {
            let unpacked = erlpack.unpack(data)
            return unpacked
        } catch (e) {
            throw new DecodeError()
        }
    }

}
