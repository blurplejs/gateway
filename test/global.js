import { FakeDiscordServer } from '../dist'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

let server = null

before(async () => {
    server = new FakeDiscordServer()
    server.overrideDefaults()
    await server.start()

    // global.
})

after(async () => {
    // server.unbindStubs()
})
