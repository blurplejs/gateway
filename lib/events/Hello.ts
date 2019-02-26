import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#hello
export namespace Hello {

    export type PayloadType = {
        heartbeat_interval: number,
        _trace: string[]
    }

    export class Event extends EventType<PayloadType> {

        constructor (protected hearbeat: number = 45000) {
            super()
        }

        get payload () {
            return {
                heartbeat_interval: this.heartbeat,
                _trace: ["fake-gateway-1-"]
            }
        }
    
    }

}
