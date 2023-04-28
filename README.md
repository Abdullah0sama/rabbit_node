# Rabbit Node

## Details
A Node.js application that injests data from RabbitMQ and indexes in Elasticsearch and exposes an endpoint to query Elasticsearch

## Endpoints
```
    - /users/search
        supported query params:
            q
                it searchs the whole document for a match
                ex: /users/search?q=ahmed
```
##  Initializing Development Enviroment
```bash
    npm install     # install dependencies
    npm run build   # build app
    npm run start   # start app
    # server will be start on PORT specified in '.env' (i.e. 3000)
```

```bash
    # to start up RabbitMQ and ElasticSearch locally
    docker compose up -d
```

```bash
    npm run publish:userInfo # publish demo data to RabbitMQ
```

## Run Docker Image
```bash
    docker run -d -p 3000:3000 --env-file .prod.env abdullah0sama/rabbit-node
```
```bash
    # if you want to use services that were launched locally by project's docker compose file
    docker run --name wholesomerabbit --network rabbit_node_default -d -p 3000:3000 --env-file .prod.env abdullah0sama/rabbit-node
```