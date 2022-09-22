# budget-tracker

## API Project Structure
`cmd/`: entrypoints

`internal`: rest & db logic
  - `api/models`: db object types
  - `api/service`: rest endpoint functions
  - `database`: db connections

<br>

`routes`: rest api definition

`utils`: helper functions, classes, types, etc.


## Setup Project 
1. Clone repo
2. Install packages
```shell
cd api
npm i
```
3. Create db docker volume
```
docker volume create budget_pgdata
```
4. Start project 
```
docker compose up -d --build
```