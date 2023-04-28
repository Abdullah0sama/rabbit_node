import express from "express"
import { ErrorHandler } from "./utils/middleware/errorHandler"
import { UserController } from "./components/User/UserController"
import {Client} from '@elastic/elasticsearch'
import { config } from "./config"
import { ElasticSearchService } from "./services/elasticsearch/ElasticsearchService"

export async function createApp() {
    const app = express()
    
    const esCl = new Client({
        nodes: config.ELASTICSEARCH.nodes
    })
    
    const esService = await ElasticSearchService.init(esCl)

    const userController = new UserController(esService)

    app.use('/', userController.routes())
    
    app.use(ErrorHandler)
    return app
}

