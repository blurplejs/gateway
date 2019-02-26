// @ts-ignore
import * as erlpack from 'erlpack'
import { Data } from 'ws'
import { DecodeError } from '../errors'
import Message from './Message'
import { AbstractDiscordObject } from '../objects/AbstractObject'
import * as zlib from 'zlib'

function isIterable (obj: any) : boolean {
    if (!obj || typeof obj === 'string') return false
    return typeof obj[Symbol.iterator] === 'function' || typeof obj === 'object'
}

function encodeDiscordObjects (data: any) : any {
    if (!isIterable(data)) return data
    if (data instanceof AbstractDiscordObject) return encodeDiscordObjects(data.forMessage())

    for (let name in data) {
        if (isIterable(data[name])) data[name] = encodeDiscordObjects(data[name])
    }
    
    return data
}

export enum Encoding {
    JSON, ETF
}

export async function encode (message: Message, encoding: Encoding = Encoding.JSON, compression: string | undefined = undefined) : Promise<Buffer | string> {
    let object = message.toObject()
    object.d = encodeDiscordObjects(object.d)

    let result = encoding == Encoding.JSON ? JSON.stringify(object) : erlpack.pack(object)
    if (compression === 'zlib-stream') {
        let deflated = zlib.deflateSync(result, { finishFlush: zlib.constants.Z_SYNC_FLUSH })
        result = deflated
    }

    return result
}

export async function decode (data: Data, encoding: Encoding = Encoding.JSON, compression: string | undefined = undefined) : Promise<object> {
    if (encoding == Encoding.JSON) {
        zlib.inflateSync(data as Buffer)
        if (compression === 'zlib-stream') {
            let inflated = zlib.inflateSync(data as Buffer)
            data = inflated
        }

        return JSON.parse(data.toString())
    }
    
    try {
        let unpacked = erlpack.unpack(data)
        return unpacked
    } catch (e) {
        throw new DecodeError()
    }
}
