FROM node:16

WORKDIR /src

COPY Dockerfile .

WORKDIR /src/backend

COPY ./backend/package*.json  ./

RUN npm install

COPY ./backend/ .

CMD [ "npm" , "start" ]

WORKDIR /src/frontend

COPY ./frontend/package*.json  ./

RUN npm install

COPY ./frontend/ .

CMD [ "npm" , "run", "serve" ]

ENV PORT=8080

EXPOSE 8080
