import { ConsumerFn } from "../services/rabbitmq/RabbitMqInterface";

export const userInfoConsumer: ConsumerFn = async (payload: object) => {
    console.log('UserInfoConsumer', payload)
}