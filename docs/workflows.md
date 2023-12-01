# Useful Workflows

## Committing Files

```sh
# Step 1: lint changes and fix any errors
pnpm lint

# Step 2: stage changes
git add ...

# Step 3: commit changes
pnpm commit
```

## Push DB Changes without Migration (dev mode)

```sh
# Step 1: sync local changes with db
pnpm sync

# Step 2: view updated db
pnpm db
```

## Generate and Push DB Migration (prod mode)

```sh
# Step 1: create migration script
pnpm generate

# Step 2: apply migrations
pnpm migrate
```
