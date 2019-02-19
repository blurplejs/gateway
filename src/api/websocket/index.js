import WebSocket from 'ws'
import { Constants } from 'discord.js'

export default class WebSocketServer {

    listen (port) {
        let wss = new WebSocket.Server({ port })
        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                let json = JSON.parse(message)
                switch (json.op) {
                    case Constants.OPCodes.IDENTIFY:
                        return ws.send(this.craftResponse(Constants.OPCodes.HELLO, {
                            "heartbeat_interval": 45000,
                            "__trace": ["discord-test-gateway-1"]
                        }))
                }
            })
        })
    }

    parseMessage (message) {
        let json = JSON.parse(message)
        return json
    }

    craftResponse (opcode, data, sequence = null, eventName = null) {
        let response = {
            t: eventName,
            s: sequence,
            op: opcode,
            d: data
        }

        return JSON.stringify(response)
    }

}
