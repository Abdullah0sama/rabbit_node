import { Router } from "express";
import { ElasticSearchService } from "../../services/elasticsearch/ElasticsearchService";
import { UserIndex } from "../../services/elasticsearch/indicies/userInfo";


export class UserController {
    constructor(
        private elasicS: ElasticSearchService
    ){}

    routes() {
        const router = Router()

        router.get('/users/search', async (req, res) => {
            const searchQuery = (req.query.q) ? req.query.q.toString(): '*'
            const users = await this.elasicS.search(UserIndex.name, searchQuery)
            res.status(200).send({ data: users })
        })
        return router
    }
}