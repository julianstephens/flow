# Setup Dev Environment

## 1. Clone repo

```shell
git clone git@github.com:julianstephens/budget-tracker.git
```

## 2. Install packages

### In the root directory:
```shell
yarn install
```

### In the `client` directory:
```
yarn install
```

### In the `server` directory:
```
yarn install
```

## 3. Create docker volumes for the Postgres and Redis databases
```
docker volume create budget_pgdata
docker volume create budget_redis
```

## 4. Add `.env` files

### In the root directory:

```shell
npx dotenv-vault new vlt_c69127b52a712040b74475a43f697468e9688c5f5c6e3d5e0bb9cb1829007402
npx dotenv-vault login -y
npx dotenv-vault pull
```

### In the `client` directory:

```shell
npx dotenv-vault new vlt_e55b4fd461894b412352bcf16e3cfd97466ebc42585528df26f7981850321707
npx dotenv-vault login -y
npx dotenv-vault pull
```

### In the `server` directory:

```shell
npx dotenv-vault new vlt_108913fcf94895451ba334dbe45f5f2be97e8d5fca65af0682566ac7fc7b81cb
npx dotenv-vault login -y
npx dotenv-vault pull
```

## 5. Start project 
```
docker compose up -d --build
```

## 6. Configure DB

Access the CLI for your server container (can be done via Docker CLI or Docker Desktop)

Using the CLI:
```
docker exec -it budget_server bash
yarn prisma migrate dev
```
