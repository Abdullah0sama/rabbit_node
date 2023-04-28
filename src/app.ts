import express from "express"
import { ErrorHandler } from "./utils/middleware/errorHandler"
import { UserController } from "./components/User/UserController"
import {Client} from '@elastic/elasticsearch'
import { config } from "./config"
import { ElasticSearchService } from "./services/elasticsearch/ElasticsearchService"
import amqp from 'amqplib'
import { RabbitMQService } from "./services/rabbitmq/RabbitMQService"
import { userInfoConsumer } from "./consumers/UserInfoConsumer"


export async function createApp() {
    const app = express()
    
    const elasticClient = new Client({
        nodes: config.ELASTICSEARCH.nodes
    })
    const elasticService = await ElasticSearchService.init(elasticClient)
    const conn = await amqp.connect(config.RABBITMQ.url)

    RegisterServices(elasticClient, conn)


    const channel = await conn.createChannel()
    const rabbitMQS = new RabbitMQService(channel)
    rabbitMQS.consume('user-info', userInfoConsumer)


    // register controllers 
    const userController = new UserController(elasticService)
    app.use('/', userController.routes())
    
    app.use(ErrorHandler)
    return app
}

export const clients: ClientsInterface[] = []

export function RegisterServices(...client: ClientsInterface[]) {
    clients.push(...client)
}
interface ClientsInterface {
    close: () => void
}

