# @agm-stack/eslint-config-next

[![npm version](https://img.shields.io/npm/v/@agm-stack/eslint-config-next.svg)](https://www.npmjs.com/package/@agm-stack/eslint-config-next)
[![CI](https://github.com/agm-stack/eslint-config-next/actions/workflows/ci.yml/badge.svg)](https://github.com/agm-stack/eslint-config-next/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![ESLint flat config](https://img.shields.io/badge/eslint-flat%20config-4B32C3.svg)](https://eslint.org/docs/latest/use/configure/configuration-files)

A strict, opinionated ESLint config for **Next.js**, **React** and
**TypeScript** projects. You can add **Tailwind CSS** and **i18n** layers if
you need them.

It is built for ESLint's flat config, made of small presets you can combine,
and extracted from the config of a production Next.js app.

```js
// eslint.config.js
import agm from "@agm-stack/eslint-config-next";
import next from "@agm-stack/eslint-config-next/next";
import { defineConfig } from "eslint/config";

export default defineConfig([agm.configs.recommended, next()]);
```

## Contents

- [Highlights](#highlights)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Presets and layers](#presets-and-layers)
- [What it enforces](#what-it-enforces)
- [Custom rules](#custom-rules)
- [Customization](#customization)
- [Editor integration](#editor-integration)
- [Legacy `.eslintrc`](#legacy-eslintrc)
- [Versioning policy](#versioning-policy)
- [Contributing](#contributing)
- [License](#license)

## Highlights

- **Flat config first.** Every preset is a plain array you can compose with
  `defineConfig()`.
- **Use only what you need.** `base`, `typescript`, `react` and
  `recommended` work without Next.js. The Next.js and Tailwind layers are
  separate imports, and their packages are optional peer dependencies.
- **Strict TypeScript.** It uses the `typescript-eslint` `strict` and
  `stylistic` presets, with tuned rules for unused variables, type imports
  and type aliases.
- **Formatting without Prettier.** Formatting is enforced with
  [`@stylistic`](https://eslint.style), and most of it is auto-fixable.
- **Consistent imports.** Imports are grouped and alphabetised, must
  resolve, and named exports are preferred, with exceptions for framework
  files that need default exports.
- **Custom rules.** For example,
  [`no-raw-intl-format`](docs/rules/no-raw-intl-format.md) keeps
  user-facing formatting inside your i18n layer.
- **Works with pnpm.** Import resolution works with strict `node_modules`
  layouts.
- **Typed.** It ships declarations, so `eslint.config.ts` works out of the
  box.

## Requirements

| Dependency | Version | Notes |
| --- | --- | --- |
| Node.js | `>=24.0.0` | Active LTS or newer. |
| ESLint | `^9.22.0` | Needs `defineConfig` and `globalIgnores` from `eslint/config`. |
| TypeScript | `>=5.0.0` | Optional. Needed for TypeScript projects. |
| `eslint-config-next` | `>=16.0.0` | Optional. Needed only for the `/next` layer. |
| `eslint-plugin-tailwindcss` | `^4.0.0` | Optional. Needed only for the `/tailwind` layer (Tailwind CSS v4). |

## Installation

```bash
npm install --save-dev eslint @agm-stack/eslint-config-next
```

For Next.js projects, also install the Next.js layer's peer:

```bash
npm install --save-dev eslint-config-next
```

For Tailwind CSS v4 projects, also install:

```bash
npm install --save-dev eslint-plugin-tailwindcss
```

pnpm and Yarn work the same way (`pnpm add -D …`, `yarn add -D …`).

## Usage

Create `eslint.config.js` (or `eslint.config.mjs` / `eslint.config.ts`) in
the project root.

### Next.js

```js
import agm from "@agm-stack/eslint-config-next";
import next from "@agm-stack/eslint-config-next/next";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["coverage/**"]),
  agm.configs.recommended,
  next(),
]);
```

`next()` ignores `.next/`, `out/` and `build/`, adds the `@next/next` and
`jsx-a11y` rules, and allows default exports in `app/`, `pages/`,
`middleware`, `proxy` and `instrumentation` files.

### Next.js with Tailwind CSS and i18n

```js
import agm from "@agm-stack/eslint-config-next";
import next from "@agm-stack/eslint-config-next/next";
import tailwind from "@agm-stack/eslint-config-next/tailwind";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["src/types/generated/**"]),
  agm.configs.recommended,
  next({ defaultExportFiles: ["src/i18n/request.ts"] }),
  tailwind({ cssConfigPath: "./src/styles/globals.css" }),
  agm.configs.i18n,
]);
```

### React without Next.js (Vite and similar)

```js
import agm from "@agm-stack/eslint-config-next";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist/**"]),
  agm.configs.recommended,
]);
```

### TypeScript library or Node.js service

```js
import agm from "@agm-stack/eslint-config-next";
import { defineConfig } from "eslint/config";

export default defineConfig([agm.configs.typescript]);
```

### Running it

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

## Presets and layers

### Presets

Every preset is available on the default export as `agm.configs.<name>`.

| Preset | Includes | Use for |
| --- | --- | --- |
| `base` | `@eslint/js` recommended, core rules, `@stylistic` formatting, import rules, browser and Node.js globals | Plain JavaScript |
| `typescript` | `base` + `typescript-eslint` strict and stylistic + TypeScript rules | TypeScript without React |
| `react` | `base` + React and React Hooks rules | React with JavaScript |
| `recommended` | `base` + `typescript` + `react` | **Most projects** |
| `i18n` | Custom [`@agm-stack/*`](#custom-rules) rules for internationalised apps | Add on top of another preset |

### Layers

Layers are functions exported from subpaths, so their peer dependencies are
loaded only when you use them.

#### `next(options?)` from `@agm-stack/eslint-config-next/next`

Adds [`eslint-config-next`](https://nextjs.org/docs/app/api-reference/config/eslint)
(`@next/next` and `jsx-a11y` rules) on top of `recommended` or
`react`. The layer depends on the React and import plugins that those
presets register.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultExportFiles` | `string[]` | `[]` | Extra globs where default exports are allowed, for files a framework loads by default export. |

#### `tailwind(options)` from `@agm-stack/eslint-config-next/tailwind`

Adds the [`eslint-plugin-tailwindcss`](https://github.com/francoismassart/eslint-plugin-tailwindcss)
recommended rules (class ordering, contradicting classes and similar) for
Tailwind CSS v4.

| Option | Type | Description |
| --- | --- | --- |
| `cssConfigPath` | `string` | **Required.** Path to the CSS file that contains `@import "tailwindcss"`. |

## What it enforces

This is a summary. The source of truth is [`src/configs`](src/configs).

**Code quality**
- `no-console` (except `console.warn` and `console.error`), `no-debugger`,
  `prefer-promise-reject-errors`.
- Unused variables are reported unless prefixed with `_`. Rest siblings are
  ignored.
- `@typescript-eslint/no-explicit-any` and `no-non-null-assertion` are
  warnings.

**TypeScript style**
- `type` aliases instead of `interface` (`consistent-type-definitions`).
- `import type` for type-only imports (`consistent-type-imports`).

**Formatting** (`@stylistic`, mostly auto-fixable)
- Double quotes, semicolons, 2-space indentation, 175-character lines.
- Commas as type member delimiters, with no trailing delimiter.
- One blank line at most and no trailing whitespace.
- Objects and imports with 5 or more properties go on multiple lines.

**Imports**
- Groups in this order: builtin → external → internal → parent → sibling →
  index → object → type. Each group is alphabetised.
- Imports must resolve (TypeScript paths included).
- **Named exports only.** Default exports are allowed in `*.config.*` files
  and in Next.js framework files when you use the `next()` layer.

**React**
- Components are function declarations.
- JSX props are sorted (reserved first, shorthand first, callbacks last),
  with at most one prop per line in multiline JSX and no unnecessary
  fragments or curly braces.
- React Hooks rules, including the React Compiler rules from
  `eslint-plugin-react-hooks` v7.
- Designed for the automatic JSX runtime, so `react-in-jsx-scope` and
  `prop-types` are off.

## Custom rules

| Rule | Description | Preset | Fixable |
| --- | --- | --- | --- |
| [`@agm-stack/no-raw-intl-format`](docs/rules/no-raw-intl-format.md) | Disallow `toLocale*String()` and `Intl.*Format` outside your i18n formatter | `i18n` | No |

## Customization

### Overriding rules

Put your own config objects **after** the presets. Later entries win.

```js
export default defineConfig([
  agm.configs.recommended,
  next(),
  {
    rules: {
      "@stylistic/max-len": ["warn", { code: 120 }],
      "react/jsx-sort-props": "off",
    },
  },
]);
```

### Per-file overrides

```js
export default defineConfig([
  agm.configs.recommended,
  {
    files: ["**/*.test.{ts,tsx}", "**/*.stories.tsx"],
    rules: {
      "import/no-default-export": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
]);
```

### Reusing rule sets

The rule objects are exported, so you can apply them to your own file
globs:

```js
import { stylisticRules } from "@agm-stack/eslint-config-next";

export default defineConfig([
  agm.configs.typescript,
  { files: ["scripts/**"], rules: { ...stylisticRules, "no-console": "off" } },
]);
```

Available exports: `coreRules`, `stylisticRules`, `importRules`,
`typescriptRules` and `reactRules`.

### Inspecting the resolved config

```bash
npx eslint --inspect-config
```

This opens the [ESLint Config Inspector](https://github.com/eslint/config-inspector),
which shows which preset set each rule, for each file.

## Editor integration

With the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint),
add the following to `.vscode/settings.json`. It fixes problems on save and
replaces a separate formatter:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": false
}
```

## Legacy `.eslintrc`

ESLint 9 can still run eslintrc configs with `ESLINT_USE_FLAT_CONFIG=false`.
ESLint 10 removed them. A legacy preset with the same rules as
`recommended` is provided to help with migration. It does not include the
Next.js and Tailwind layers or the custom rules.

eslintrc resolves plugins from your project, so install them directly:

```bash
npm install --save-dev eslint@9 @agm-stack/eslint-config-next @typescript-eslint/parser @typescript-eslint/eslint-plugin @stylistic/eslint-plugin eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-sort-destructure-keys
```

```json
{
  "root": true,
  "extends": ["@agm-stack/eslint-config-next/legacy"]
}
```

```bash
npx cross-env ESLINT_USE_FLAT_CONFIG=false eslint src --ext .js,.jsx,.ts,.tsx
```

To migrate, `npx @eslint/migrate-config .eslintrc.json` converts the rest of
your config. Then switch to the flat presets above.

## Versioning policy

This package follows [Semantic Versioning](https://semver.org/). For a lint
config, a change is **breaking** if upgrading can make a previously passing
lint run fail.

| Change | Release |
| --- | --- |
| Bug fixes, documentation, relaxing a rule (`error` → `warn` / `off`) | Patch |
| New opt-in presets, layers, rules or rule options | Minor |
| Enabling a rule or raising its severity in an existing preset, removing exports, raising the minimum ESLint or Node.js version | Major |

Use a caret range (`^0.1.0`) to get fixes automatically, and read the
[changelog](CHANGELOG.md) before a major upgrade.

**ESLint 10:** the current major supports ESLint 9. ESLint 10 support is
blocked on `eslint-plugin-react` and `eslint-plugin-import`, which do not
support ESLint 10 yet. It will ship as a major release. See
[docs/design.md](docs/design.md#eslint-10).

## Contributing

Bug reports, rule suggestions and pull requests are welcome. See
[CONTRIBUTING.md](CONTRIBUTING.md) for the development setup, testing and
commit conventions, and [docs/design.md](docs/design.md) for how the package
is built.

## License

[MIT](LICENSE) © Adrian Manduc
