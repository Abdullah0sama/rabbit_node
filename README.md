# Rabbit Node


## Endpoints
```
    - /users/search
        supported query params:
            q
                it searchs the whole document for a match
                ex: /users/search?q=ahmed
```
##  Installation steps
```bash
    npm install     # install dependencies
    npm run build 
    npm run start 
    # server will be start on PORT specified in '.env' (i.e. 3000)
```

```bash
    # to start up RabbitMQ and ElasticSearch
    docker compose up -d
```