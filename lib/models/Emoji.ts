import * as faker from 'faker'
import Snowflake from './Snowflake'
import Model from './Model'

// @see https://discordapp.com/developers/docs/resources/emoji#emoji-object
type EmojiOptions = {
}

export default class Emoji extends Model<EmojiOptions>(() => ({})) {

}
