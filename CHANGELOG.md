# Changelog

All notable changes to this project are documented in this file. It is
maintained by [release-please](https://github.com/googleapis/release-please)
from [Conventional Commits](https://www.conventionalcommits.org/), and the
project follows [Semantic Versioning](https://semver.org/) as described in the
[versioning policy](README.md#versioning-policy).

## [0.1.1](https://github.com/agm-stack/eslint-config-next/compare/v0.1.0...v0.1.1) (2026-11-18)


### Bug Fixes

* **deps:** Update dependencies ([#10](https://github.com/agm-stack/eslint-config-next/issues/10)) ([3a010ab](https://github.com/agm-stack/eslint-config-next/commit/3a010ab7f30894ef24f255055bafb3b07014004f))

## 0.1.0

Initial release.

### Features

- Flat config presets: `base`, `typescript`, `react`, `recommended` and `i18n`.
- Next.js layer (`@agm-stack/eslint-config-next/next`) built on `eslint-config-next`.
- Tailwind CSS v4 layer (`@agm-stack/eslint-config-next/tailwind`).
- Custom rule [`no-raw-intl-format`](docs/rules/no-raw-intl-format.md).
- Legacy eslintrc preset (`@agm-stack/eslint-config-next/legacy`) for ESLint 9.
- TypeScript declarations for `eslint.config.ts` users.
