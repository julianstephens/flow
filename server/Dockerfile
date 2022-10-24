FROM node:16-alpine as base

ARG APP_HOME
WORKDIR $APP_HOME/server
RUN chown -R node:node $APP_HOME/server
RUN apk add --no-cache bash

##########################
# DEV Stage
##########################
FROM base as development

# set node env
ARG NODE_ENV
ENV NODE_ENV = $NODE_ENV

# install dependencies
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install 

# copy server src files
COPY --chown=node:node . .

# generate prisma client
# RUN npx prisma generate

