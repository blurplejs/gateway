// @ts-ignore
import * as erlpack from 'erlpack'
import { Data } from 'ws'
import { DecodeError } from '../errors'
import Message from './Message'
import { AbstractDiscordObject } from '../objects/AbstractObject'

function isIterable (obj: any) : boolean {
    if (!obj || typeof obj === 'string') return false
    return typeof obj[Symbol.iterator] === 'function' || typeof obj === 'object'
}

function encodeDiscordObjects (data: any) : any {
    if (!isIterable(data)) return data
    if (data instanceof AbstractDiscordObject) return data.forMessage()

    for (let name in data) {
        if (isIterable(data[name])) data[name] = encodeDiscordObjects(data[name])
    }
    
    return data
}

export enum Encoding {
    JSON, ETF
}

export function encode (message: Message, encoding: Encoding = Encoding.JSON) : Buffer | string {
    let object = message.toObject()
    object.d = encodeDiscordObjects(object.d)

    return encoding == Encoding.JSON || true ? JSON.stringify(object) : erlpack.pack(object)
}

export function decode (data: Data, encoding: Encoding = Encoding.JSON) : object {
    if (encoding == Encoding.JSON) return JSON.parse(data.toString())
    
    try {
        let unpacked = erlpack.unpack(data)
        return unpacked
    } catch (e) {
        throw new DecodeError()
    }
}
