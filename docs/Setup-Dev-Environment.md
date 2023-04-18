# Setup Dev Environment

## 1. Clone repo

```shell
git clone git@github.com:julianstephens/flow.git
```

## 2. Install packages

### In the root directory:
```shell
pnpm i
```

## 3. Create docker volume for Postgres
```
docker volume create flow_pgdata
```

## 4. Add `.env` file

### In the root directory:

```shell
pnpm dlx dotenv-vault new vlt_b93e804ba2510521e329e68f9f861bec6d617ea28b100130fc33b66fc92f7980
pnpm dlx dotenv-vault login -y
pnpm dlx dotenv-vault pull
```

## 5. Start db 
```
docker compose up -d db
```

## 6. Push db schema

### In the root directory:
```
pnpm db:migrate:dev
```
