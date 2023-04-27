import http from 'http'
import { createApp } from './app'
import { config } from './config'

const app = createApp()
const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log('Server has started!')
})