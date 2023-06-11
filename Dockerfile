FROM node:16

WORKDIR /src/frontend

COPY package*.json  ./

RUN npm install

COPY . src/frontend/package.json

CMD [ "npm" , "run", "serve" ]

WORKDIR /src/backend

COPY package*.json  ./

RUN npm install

COPY . src/backend/package.json

CMD [ "node" , "app.js" ]

ENV PORT=8080

EXPOSE 8080
