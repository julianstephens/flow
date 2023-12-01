# Flow

A modern budget tracking solution

## Pre-requisites

-   [Node](https://nodejs.org/en/download)
-   [pnpm](https://pnpm.io/installation)

## Getting Started

1. Install dependencies

```sh
pnpm install
```

2. Pull environment variables

```
pnpm envpull
```

3. Start project

```sh
pnpm dev
```

## Notes/Considerations

-   Thorough testing has shown that the `useSession` hook provided by next-auth is unreliable and does not provide an accurate authentication status. Instead use the asynchronous `getSession` function, also provided by next-auth, which will query `/api/auth/session` (see `src/app/api/auth/session/route.ts`) for up-to-date session data.
