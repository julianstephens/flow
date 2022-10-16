FROM node:16-alpine as base

ARG APP_HOME
WORKDIR $APP_HOME/api

##########################
# DEV Stage
##########################
FROM base as development

# set env dev or prod
ARG NODE_ENV
ENV NODE_ENV = $NODE_ENV

# install dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install 

# copy api src files
COPY  . .

# generate .js files w/ sourceMap comments
RUN npx tsc --sourceMap

# create log dir
RUN mkdir -p $APP_HOME/logs/api

##########################
# PROD Stage
##########################
FROM base as production

ARG NODE_ENV
ENV NODE_ENV = $NODE_ENV

COPY package*.json ./

RUN yarn install 

COPY  . .

RUN npx prisma migrate dev

CMD npm run dev
