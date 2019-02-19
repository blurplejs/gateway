import { FakeDiscordServer } from '../dist'
import 'mocha'

let server = null

before(async () => {
    server = new FakeDiscordServer()
    server.bindStubs()
    server.start()
})

after(async () => {
    server.unbindStubs()
})
