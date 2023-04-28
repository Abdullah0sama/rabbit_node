import { Client, errors } from '@elastic/elasticsearch'
import { Indicies } from './indicies/indicies'
import { User } from '../../components/User/UserInterface'

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

    async create(index: string, payload: object, id?: string) {
        await this.client.index({
            index,
            id,
            document: payload
        })
    }


    async search(index: string, query: string) {
        const searchResults = await this.client.search<User>({
            index,
            query: {
                query_string: {
                    query,
                    default_field: '*'
                }
            },
            
        })

        return searchResults.hits.hits.map(hit => {
            return { _id: hit._id, ...hit._source }
        })
    }
    
}