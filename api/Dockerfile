FROM node:16-alpine as base

ARG APP_HOME
WORKDIR $APP_HOME/api

##########################
# DEV Stage
##########################
FROM base as development

ARG NODE_ENV
ENV NODE_ENV = $NODE_ENV

COPY package*.json ./

RUN npm install 

COPY  . .

##########################
# PROD Stage
##########################
FROM base as production

ARG NODE_ENV
ENV NODE_ENV = $NODE_ENV

COPY package*.json ./

RUN npm ci 

COPY  . .

RUN npx prisma migrate dev

CMD npm run dev
