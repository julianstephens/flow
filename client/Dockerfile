FROM node:16-alpine as base

ARG APP_HOME
WORKDIR $APP_HOME/client

##########################
# DEV Stage
##########################
FROM base as development

ARG NODE_ENV
ENV NODE_ENV = $NODE_ENV

COPY package*.json ./

RUN npm install 

COPY  . .
