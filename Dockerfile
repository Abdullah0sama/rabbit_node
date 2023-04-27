FROM node:19-bullseye-slim

RUN apt-get update; \ 
    apt-get install curl -y

WORKDIR /usr/app

COPY package*.json ./

RUN npm install 

COPY tsconfig.json ./

COPY src ./src
RUN npm run build

EXPOSE 3000


CMD ["node", "dist/server"]

