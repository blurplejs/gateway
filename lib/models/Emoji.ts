import * as faker from 'faker'
import Snowflake from './Snowflake'
import Fakeable from './Fakeable'

// @see https://discordapp.com/developers/docs/resources/emoji#emoji-object
type EmojiOptions = {
}

export default class Emoji extends Fakeable<EmojiOptions> {

    fake () : EmojiOptions {
        return {
        }
    }

}
