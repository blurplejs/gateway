import * as faker from 'faker'
import Snowflake from './Snowflake'
import Model from './Model'

// @see https://discordapp.com/developers/docs/resources/voice#voice-state-object
type VoiceStateOptions = {
}

export default class VoiceState extends Model<VoiceStateOptions> {

    fake () : VoiceStateOptions {
        return {
        }
    }

}
