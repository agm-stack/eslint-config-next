# Agent instructions

Instructions for AI coding agents working in this repository. Humans should
start with [CONTRIBUTING.md](CONTRIBUTING.md); this file only adds what an
agent cannot infer from the code. Architecture rationale lives in
[docs/design.md](docs/design.md).

## Commands

Run all of these before finishing a change:

```bash
npm run lint
```

```bash
npm test
```

When `package.json` `exports`/`files` or anything under `src/` entry points
changes, also verify the published tarball:

```bash
npm pack && (cd examples/flat-app && npm install && npx eslint) && (cd examples/legacy-app && npm install && npm run lint)
```

Expected: `flat-app` reports exactly one `@agm-stack/no-raw-intl-format`
warning; `legacy-app` reports no problems.

## Invariants

- **Rule settings live in the exported rule objects** (`coreRules`,
  `stylisticRules`, `importRules`, `typescriptRules`, `reactRules` in
  `src/configs/`). Flat and legacy presets are both built from them; never
  copy rule settings into an individual preset.
- **`src/next.js` must keep stripping** the `react`, `react-hooks`, `import`
  and `@typescript-eslint` plugins and the parser from `eslint-config-next`.
  Re-registering a different plugin instance throws "Cannot redefine plugin".
- **The import resolver stays referenced by absolute path**
  (`src/configs/shared.js`). Resolving it by name breaks under pnpm.
- **`src/index.js` must not import optional peers** (`eslint-config-next`,
  `eslint-plugin-tailwindcss`). They are only imported from their subpath
  entry points.
- **Custom rules are flat-config only.** Do not reference `@agm-stack/*`
  rules from `src/configs/legacy.js`.
- **The `exports` map is public API.** Adding a subpath is a minor change;
  renaming or removing one is breaking.

## Versioning

Follow the [versioning policy](README.md#versioning-policy). In short: if a
change can make a previously passing lint run fail, it is breaking. Enabling
a rule or raising its severity in an existing preset is a major change, so new
rules must be opt-in or shipped in a new preset. Mark breaking commits with
`!` (for example `feat(react)!: …`).

## Keeping docs in sync

Update documentation in the same change as the code:

- New or changed custom rule: `docs/rules/<rule>.md`, the README rules
  table, and RuleTester cases in `tests/rules/`.
- New or changed preset, layer or option: the README "Presets and layers"
  section and, if rules change, "What it enforces".
- Structural or dependency decisions: `docs/design.md`.

Do not edit `CHANGELOG.md` by hand; release-please generates it.

## Commits and releases

- Use [Conventional Commits](https://www.conventionalcommits.org/). Scopes
  are optional but restricted to the list in `commitlint.config.js`. A
  Husky `commit-msg` hook and the Commitlint CI workflow reject anything
  else. Check a message with `echo "<message>" | npx commitlint`.
- PRs are squash-merged, so the PR title must also be a valid commit message.
- Never bypass the hook with `--no-verify`.
- Never run `npm publish` or bump `version` manually; releases go through
  the release-please PR and npm trusted publishing.
- Never add npm tokens, API keys or other secrets to the repository,
  workflows or examples.

## Scope

- Do only what the task asks; keep diffs small and avoid unrelated refactors.
- Do not add dependencies without a concrete need. Plugins used by the core
  presets are `dependencies`; framework integrations are optional
  `peerDependencies`.
- Stay on ESLint `^9.22.0` until `eslint-plugin-react` and
  `eslint-plugin-import` support ESLint 10 (see
  [docs/design.md](docs/design.md#eslint-10)).
- Write source as plain ESM JavaScript with JSDoc types, and keep the
  hand-written `.d.ts` files in sync with any export changes.
