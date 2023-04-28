import { Router } from "express";
import { ElasticSearchService } from "../../services/elasticsearch/ElasticsearchService";
import { UserIndex } from "../../services/elasticsearch/indicies/userInfo";


export class UserController {
    constructor(
        private elasicS: ElasticSearchService
    ){}

    routes() {
        const router = Router()

        router.get('/users', (req, res) => {
            res.status(200).send('User Data')
        })

        router.get('/users/search', async (req, res) => {
            const users = await this.elasicS.search(UserIndex.name)
            res.status(200).send({ data: users })
        })
        return router
    }
}