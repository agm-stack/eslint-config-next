# Contributing

Thanks for your interest in improving `@agm-stack/eslint-config-next`.
Issues and pull requests are welcome.

## Development setup

Requirements: Node.js 24 or newer and npm.

```bash
git clone https://github.com/agm-stack/eslint-config-next.git
```

```bash
cd eslint-config-next && npm install
```

| Command | What it does |
| --- | --- |
| `npm run lint` | Lints the package with its own `typescript` preset. |
| `npm test` | Runs the rule tests (`RuleTester`) and the preset integration tests on the Node.js test runner. |
| `npm run pack:check` | Lists the files that would be published. |

Read [docs/design.md](docs/design.md) before changing how the presets are
put together. If you work with an AI coding agent, it picks up the
repository-specific rules from [AGENTS.md](AGENTS.md) (`CLAUDE.md` points
to the same file).

## Making changes

### Changing a preset

1. Edit the rule object in `src/configs/*.js`. The flat and legacy presets
   share it.
2. Update the fixtures or assertions in `tests/configs.test.js` if needed.
3. Check whether the change is breaking (see the
   [versioning policy](README.md#versioning-policy)) and choose the commit
   type accordingly.

### Adding a custom rule

1. Add the implementation to `src/rules/<rule-name>.js` with `meta.docs`,
   `meta.schema`, `meta.defaultOptions` and `meta.messages`.
2. Register it in `src/plugin.js`.
3. Add `tests/rules/<rule-name>.test.js` with valid and invalid cases. For
   fixable rules, include `output`.
4. Document it in `docs/rules/<rule-name>.md` and add it to the rules table
   in the README.
5. A new rule should be opt-in, or enabled only in a new preset, so that
   releasing it is not a breaking change.

[AST Explorer](https://astexplorer.net) with the `espree` or
`@typescript-eslint/parser` parser shows which node types to visit.

### Testing against a real project

`npm link` resolves dependencies from this folder, which can hide missing
dependencies. Test the actual tarball instead:

```bash
npm pack
```

```bash
cd examples/flat-app && npm install && npx eslint
```

```bash
cd examples/legacy-app && npm install && npm run lint
```

`flat-app` should report one `@agm-stack/no-raw-intl-format` warning in
`src/greeting.tsx`, and `legacy-app` should report no problems. The custom
rules are flat-config only. To try the tarball in another project:

```bash
pnpm add -D /path/to/agm-stack-eslint-config-next-0.1.0.tgz
```

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/).
release-please uses them to choose the next version and write the
changelog.

| Example | Release |
| --- | --- |
| `fix(react): allow arrow components in tests` | patch |
| `feat(rules): add no-raw-intl-format option allowIntl` | minor |
| `feat(typescript)!: enable no-floating-promises` | major |
| `docs: clarify tailwind options`, `chore(deps-dev): …`, `test: …` | none |

Messages are validated by [commitlint](https://commitlint.js.org) with
`@commitlint/config-conventional` (see `commitlint.config.js`):

- **Locally:** `npm install` installs a Husky `commit-msg` hook that rejects
  invalid messages. Check a message without committing with
  `echo "feat(next): add option" | npx commitlint`.
- **In CI:** the Commitlint workflow checks the PR title and every commit
  in the PR.

Scopes are optional. When you use one, it must be one of `base`,
`typescript`, `react`, `next`, `tailwind`, `i18n`, `legacy`, `rules`,
`deps`, `deps-dev`, `ci`, `docs` or `release`.

Pull requests are **squash-merged**, so the PR title becomes the commit
that release-please reads. Write it like a commit message.

## Releasing

Maintainers only. Releases are automated:

1. Merging to `main` updates the release PR opened by release-please.
2. Merging the release PR tags the version, updates `CHANGELOG.md` and
   publishes to npm with provenance through npm trusted publishing (no
   long-lived token is stored in the repository).
