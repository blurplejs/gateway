import { FakeDiscordGateway } from '../lib'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

let gateway: FakeDiscordGateway | undefined

before(async () => {
    gateway = new FakeDiscordGateway()
    gateway.start()
})

after(async () => {
    if (gateway) gateway.stop()
})
