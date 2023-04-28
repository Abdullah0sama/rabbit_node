import http from 'http'
import { createApp } from './app'
import { config } from './config'


async function createServer() {
    const app = await createApp()
    const server = http.createServer(app)
    server.listen(config.PORT, () => {
        console.log('Server has started!')
    })

    process.on('SIGINT', () => {
        console.log('SIGINT Signal recieved, server is shutting down')
        server.close()
    })

    process.on('SIGTERM', () => {
        console.log('SIGTERM Signal recieved, server is shutting down')
        server.close()
    })
}

createServer()