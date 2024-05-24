FROM node:latest

LABEL maintainer="anshujai4@gmail.com" 

WORKDIR /usr/src/app

RUN apt-get update && apt-get install ca-certificates

COPY package.json .

RUN npm install

ADD . /usr/src/app

CMD ["npm","run","start"]

EXPOSE 3000

