FROM node:16-alpine as production

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN npm install --omit=dev

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

COPY . .
