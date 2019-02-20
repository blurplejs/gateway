# blurple.js testing utilities

[![Test](https://img.shields.io/travis/blurplejs/testing.svg?style=for-the-badge)](https://travis-ci.org/blurplejs/testing) [![Coverage Status](https://img.shields.io/coveralls/github/blurplejs/testing.svg?style=for-the-badge)](https://coveralls.io/github/blurplejs/testing?branch=master)

For more information read [the documentation](https://blurple.js.org/extensions/testing.html).

Discord Bots are usually built around the Discord Gateway which provides live updates via WebSockets. If we were to connect a Discord Gateway Client to a different WebSocket-Server that provided the same API with the same kind of responses we could have these clients unit-testable. This is exactly what these test utilities provide: A dummy implementation of the Discord Gateway that's programmatically controllable to have events triggered when you need them.

Keep in mind that this is used for integration testing, which - although it is all run locally - still uses network connections and is therefore generally slower than your regular unit tests.

### Discord version
We aim to implement the Gateway API version 6, so in theory any client working on that API should work. The tool was built with discord.js in mind however, so our primary focus lies on fully supporting that.
