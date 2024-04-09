FROM node:latest-alpine

WORKDIR /app

RUN npm -g install pnpm

COPY package*.json ./

RUN pnpm install

COPY  . .

EXPOSE 8080

CMD [ "pnpm", "start" ]