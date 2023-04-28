import { config } from "../config"
import { userInfoConsumer } from "../consumers/UserInfoConsumer"
import { RabbitMQService } from "../services/rabbitmq/RabbitMQService"
import amqp from 'amqplib'
import * as path from 'path'
import fs from 'fs/promises'
import { Queues } from "../services/rabbitmq/Queue"

export const userInfoPublisher = async () => {

    // this part was created to be used for the demo, usually the application would have used RabbitMQService directly
    // or created a similar function the takes the payload as an argument
    const data = await fs.readFile(path.join(__dirname, '../../', 'data.json'))
    const usersInfo = JSON.parse(data.toString()) as object[]

    const conn = await amqp.connect(config.RABBITMQ.url)
    const channel = await conn.createChannel()
    const rabbitMQS = new RabbitMQService(channel)


    for(const userInfo of usersInfo) {
        await rabbitMQS.publish(Queues.UserInfo, userInfo)
    }
}

userInfoPublisher()