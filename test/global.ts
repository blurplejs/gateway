import { FakeDiscordGateway } from '../lib'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

let gateway = null

before(async () => {
    gateway = new FakeDiscordGateway()
    await gateway.start()
})

after(async () => {
    // server.unbindStubs()
})
