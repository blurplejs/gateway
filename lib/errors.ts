import { GatewayCloseEventCode } from './constants'

export interface WebSocketError {
    code: number
}

export function isWebsocketError (error: any) : error is WebSocketError {
    return error.hasOwnProperty('code')
}

export class UnknownOpcodeError extends Error implements WebSocketError {
    public code = GatewayCloseEventCode.UnknownOpcode
}

export class DecodeError extends Error implements WebSocketError {
    public code = GatewayCloseEventCode.DecodeError
}

export class AuthenticationFailedError extends Error implements WebSocketError {
    public code = GatewayCloseEventCode.AuthenticationFailed
}
