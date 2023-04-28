import { MappingProperty } from '@elastic/elasticsearch/lib/api/types'

export const UserInfoIndexMapping: Record<string, MappingProperty> = {
    "index": {
        "type": "long"
    },
    "guid": {
        "type": "keyword"
    },
    "isActive": {
        "type": "boolean"
    },
    "balance": {
        "type": "keyword"
    },
    "about": {
        "type": "text"
    },
    "address": {
        "type": "text"
    },
    "age": {
        "type": "long"
    },
    "company": {
        "type": "keyword"
    },
    "email": {
        "type": "keyword"
    },
    "eyeColor": {
        "type": "keyword"
    },
    "friends": {
        "type": "object"
    },
    "gender": {
        "type": "keyword"
    },
    "latitude": {
        "type": "double"
    },
    "longitude": {
        "type": "double"
    },
    "name": {
        "type": "keyword"
    },
    "phone": {
        "type": "keyword"
    },
    "picture": {
        "type": "keyword"
    },
    "registered": {
        "type": "date"
    },
    "tags": {
        "type": "keyword"
    },
    "ingestedAt": {
        "type": "date"
    }
}

export const UserIndex = {
    mapping: UserInfoIndexMapping,
    name: 'userinfo'
}   