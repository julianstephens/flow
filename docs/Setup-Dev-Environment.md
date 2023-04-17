# Setup Dev Environment

## 1. Clone repo

```shell
git clone git@github.com:julianstephens/budget-tracker.git
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
npx dotenv-vault new vlt_b93e804ba2510521e329e68f9f861bec6d617ea28b100130fc33b66fc92f7980
npx dotenv-vault login -y
npx dotenv-vault pull
```

## 5. Start db 
```
docker compose up -d db
```

## 6. Push db schema
```
pnpm db:migrate
```
