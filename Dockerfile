FROM node:16

WORKDIR /

COPY Dockerfile .

WORKDIR /src/backend

COPY ./src/backend/package*.json  ./

RUN npm install

COPY ./src/backend/ .

CMD [ "npm" , "start" ]

WORKDIR /src/frontend

COPY ./src/frontend/package*.json  ./

RUN npm install

COPY ./src/frontend/ .

CMD [ "npm" , "run", "serve" ]

ENV PORT=8080

EXPOSE 8080
