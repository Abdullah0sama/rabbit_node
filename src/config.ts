import dotenv from 'dotenv'
import { getMandatory, getMandatoryInt } from './utils/envGetter'
import { NodeOptions } from '@elastic/elasticsearch'
dotenv.config()




export const config: EnvConfig = {
    PORT: getMandatoryInt('PORT'),
    ELASTICSEARCH: {
        nodes: [
            {
                url: new URL(getMandatory('ELASTIC_NODE_1_URL'))
            }
        ]
    }
}

export interface EnvConfig {
    PORT: number,
    ELASTICSEARCH: {
        nodes: NodeOptions[]
    }
}