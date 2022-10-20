# budget-tracker

## Setup Project 

1. Clone repo

2. Install packages

a. In the root directory:
```shell
yarn install
```

b. Open `api.code-workspace` in VSCode. In a terminal,

```shell
yarn install
```

c. Open `client.code-workspace` in VSCode. In a terminal,
```shell
yarn install
```

3. Create db docker volume
```
docker volume create budget_pgdata
docker volume create budget_redis
```

4. Add `.env` files
```
# .env
APP_HOME=
APP_ENV=

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT_FORWARD=
DB_PORT=

PRISMA_PORT_FORWARD=
PRISMA_PORT=

REDIS_PASSWORD=
REDIS_PORT_FORWARD=
REDIS_PORT=
REDIS_INSIGHT_PORT_FORWARD=
REDIS_INSIGHT_PORT=

API_PORT_FORWARD=
API_PORT=
API_DEBUG_PORT_FORWARD=
API_DEBUG_PORT=
API_IMG_VERSION=

CLIENT_PORT_FORWARD=
CLIENT_PORT=
```
```
# api/.env
PORT=

LOG_DIR=

DATABASE_URL=

REDIS_URL=
REDIS_PORT=
```

```
# client/.env
API_URI=

AUTH0_DOMAIN=
AUTH0_CLIENT=
AUTH0_REDIRECT=
AUTH0_AUDIENCE=
```

5. Start project 
```
docker compose up -d --build
```

6. Configure DB

Access the CLI for your API container (can be done via Docker CLI or Docker Desktop)

```
cd api/prisma
npx prisma migrate dev
```



