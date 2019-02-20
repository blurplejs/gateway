import * as faker from 'faker'
import Snowflake from './Snowflake'
import Fakeable from './Fakeable'

// @see https://discordapp.com/developers/docs/resources/voice#voice-state-object
type VoiceStateOptions = {
}

export default class VoiceState extends Fakeable<VoiceStateOptions> {

    fake () : VoiceStateOptions {
        return {
        }
    }

}
