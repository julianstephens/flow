FROM node:16-alpine as base

ARG APP_HOME
WORKDIR $APP_HOME/api
RUN chown -R node:node $APP_HOME/api
RUN apk add --no-cache bash

##########################
# DEV Stage
##########################
FROM base as development

# set env dev or prod
ARG NODE_ENV
ENV NODE_ENV = $NODE_ENV

# install dependencies
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install 

# copy api src files
COPY --chown=node:node . .

USER node

# generate routes from controllers
RUN mkdir -p src/routes
# RUN yarn run tsoa routes

# compile ts
RUN yarn run build

##########################
# PROD Stage
##########################
FROM base as production

ARG NODE_ENV
ENV NODE_ENV = $NODE_ENV

COPY package.json ./

RUN yarn install 

COPY  . .

RUN npx prisma migrate dev

CMD npm run dev
