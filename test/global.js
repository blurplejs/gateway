import { FakeDiscordAPI } from '../dist'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

let server = null

before(async () => {
    server = new FakeDiscordAPI()
    server.overrideDefaults()
    await server.start()
})

after(async () => {
    // server.unbindStubs()
})
