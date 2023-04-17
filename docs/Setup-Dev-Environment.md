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
npx dotenv-vault new vlt_c69127b52a712040b74475a43f697468e9688c5f5c6e3d5e0bb9cb1829007402
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
