FROM node:16

WORKDIR /src/frontend

COPY package*.json  ./

RUN npm install

COPY . src/frontend/

CMD [ "npm" , "run", "serve" ]

WORKDIR /src/backend

COPY package*.json  ./

RUN npm install

COPY . src/backend/

CMD [ "node" , "./bin/www" ]

ENV PORT=8080

EXPOSE 8080
