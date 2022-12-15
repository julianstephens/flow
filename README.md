# budget-tracker

## Setup Project 

1. Clone repo

2. Install packages

a. In the root directory:
```shell
yarn install
```

b. In a terminal,
```
yarn install
```

3. Create db docker volume
```
docker volume create budget_pgdata
docker volume create budget_redis
```

4. Add `.env` files
- `.env`
- `server/.env`
- `client/.env`

5. Start project 
```
docker compose up -d --build
```

6. Configure DB

Access the CLI for your API container (can be done via Docker CLI or Docker Desktop)

```
cd server/prisma
yarn prisma migrate dev
```



