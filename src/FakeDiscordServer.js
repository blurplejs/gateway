import RESTMethods from 'discord.js/src/client/rest/RESTMethods.js'
import * as sinon from 'sinon'

export default class FakeDiscordServer {
    
    bindStubs () {
        this.stub = sinon.stub(RESTMethods.prototype, 'login').rejects()
    }

    unbindStubs () {
        this.stub.restore()
    }

    start () {

    }

}
