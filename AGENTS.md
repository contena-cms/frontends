# Contena Frontends

This repository contains only Contena's API client and API type generator.

## Structure

- `packages/api-client`: runtime API client and bundled generated API types.
- `packages/api-gen`: OpenAPI schema loader, transformer, type generator, and CLI.
- `packages/tsconfig`: private shared TypeScript configuration.

## Rules

- Keep the repository limited to `api-client`, `api-gen`, and their proven internal dependencies.
- Update the official local mirror first, review upstream changes, and extract only changes affecting retained packages or required root tooling.
- Use `@contena/*` package names and `contena.cn` system domains.
- Do not reintroduce retired product branding or retired administration prefixes in tracked text or paths.
- Generated files in `packages/api-client/api-types` must be regenerated through `@contena/api-gen`, not edited by hand.
- Before handing work back, run install, lint, typecheck, unit tests, build, format check, and `pnpm pack --dry-run` for both public packages.
- Releases use `.changeset` and the upstream-style `.github/workflows/release.yml`; do not add direct package publishing workflows.
