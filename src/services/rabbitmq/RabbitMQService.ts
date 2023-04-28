import amqp from 'amqplib'
import { ConsumerFn } from './RabbitMqInterface';

export class RabbitMQService{
    constructor(
        private channel: amqp.Channel
    ){}


    async consume(queue: string, fn: ConsumerFn) {
        await this.channel.assertQueue(queue, { durable: true })

        this.channel.consume(queue, async (msg) => {
            if(!msg) return;
            console.log('Recieved from', queue)
            const payload =  JSON.parse(msg.content.toString())
            await fn(payload)

            await this.channel.ack(msg)
        })
    }

    async publish(queue: string, payload: object) {
        await this.channel.assertQueue(queue, { durable: true })
        console.log('Sent to ', queue,)
        await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))
    }
}
