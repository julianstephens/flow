FROM node:16-alpine as base

ARG APP_HOME
WORKDIR $APP_HOME/client
RUN chown -R node:node $APP_HOME/api

##########################
# DEV Stage
##########################
FROM base as development

ARG NODE_ENV
ENV NODE_ENV = $NODE_ENV

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install 

COPY --chown=node:node . .
