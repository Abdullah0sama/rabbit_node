import { BaseUser } from "../components/User/UserInterface";
import { ConsumerFn } from "../services/rabbitmq/RabbitMqInterface";
import { ElasticSearchService } from "../services/elasticsearch/ElasticsearchService";
import { UserIndex } from "../services/elasticsearch/indicies/userInfo";

export const userInfoConsumer: (e: ElasticSearchService) => ConsumerFn = (elasticService: ElasticSearchService) => {
    return async (payload: object) => {
        const { _id, ...userInfo } = payload as BaseUser
        try {
            await elasticService.create(UserIndex.name, { ...userInfo, ingestedAt: new Date() }, _id)
        } catch (err) {
            console.log(err)
        }
    }   
}