# Contena Frontends

Contena's typed API client and OpenAPI type-generation tools.

## Packages

- `@contena/api-client`: typed client for the Administration and Channel APIs.
- `@contena/api-gen`: CLI and library for generating API operation types from OpenAPI schemas.
- `@contena/tsconfig`: private shared TypeScript configuration used to build the public packages.

## Development

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm format:check
```

Run `pnpm --filter @contena/api-client pack --dry-run` and the equivalent `api-gen` command before publishing. Publishing is intentionally manual and requires user-owned npm credentials.
