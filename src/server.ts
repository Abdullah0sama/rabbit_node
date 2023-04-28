import http from 'http'
import { RegisterServices, clients, createApp } from './app'
import { config } from './config'


async function createServer() {
    const app = await createApp()
    const server = http.createServer(app)
    server.listen(config.PORT, () => {
        console.log('Server has started!')
    })
    RegisterServices(server)
}

createServer()


process.on('SIGINT', () => {
    console.log('SIGINT Signal recieved, server is shutting down')
    ShutdownHandler()
})

process.on('SIGTERM', () => {
    console.log('SIGTERM Signal recieved, server is shutting down')
    ShutdownHandler()
})

function ShutdownHandler() {
    clients.map(client => client.close())
}