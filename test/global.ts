import { FakeDiscordGateway } from '../lib'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

// TODO: Look for the cause why mocha doesn't catch this
// process.on('uncaughtException', () => process.exit(0))

let gateway: FakeDiscordGateway

before(async () => {
    gateway = new FakeDiscordGateway()
    gateway.start()
})

after(async () => {
    gateway.stop()
})
