import { Client, errors } from '@elastic/elasticsearch'
import { Indicies } from './indicies/indicies'

export class ElasticSearchService {
    private constructor(
        private client: Client
        ) {}
    
    static async init(client: Client) {
        const indiciesPromises = Indicies.map((index) => {
                return client.indices.create({
                    index: index.name,
                    mappings: {
                        properties: index.mapping
                    }
                })
            }
        )
        

        // neglect index already exists error
        const promiseResults = await Promise.allSettled(indiciesPromises)
        for(const promise of promiseResults) {
            if(promise.status=='rejected'&& promise.reason instanceof errors.ResponseError) {
                const { error } = promise.reason.body
                if(error.type && error.type != 'resource_already_exists_exception') {
                    throw error
                }

            }
        }
        
        return new ElasticSearchService(client)
    }


    async search(index: string) {
        const searchResults = await this.client.search({
            index,
            query: {
                match_all: {}
            }
        })
        return searchResults.hits.hits
    }
    
}