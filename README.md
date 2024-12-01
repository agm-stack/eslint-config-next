# @agm-stack/eslint-config-next

A tailored ESLint configuration for Next.js 15+ projects leveraging TypeScript, requiring ESLint version 9 or above. This package offers a comprehensive ESLint setup optimized for Next.js and TypeScript development, featuring stylistic rules, import sorting, and React-specific linting guidelines.

---

## Features

- Incorporates Next.js-specific rules through [`eslint-config-next`](https://www.npmjs.com/package/eslint-config-next).
- Provides TypeScript support using [`@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint).
- Enforces stylistic standards with [`@stylistic/eslint-plugin`](https://www.npmjs.com/package/@stylistic/eslint-plugin).
- Ensures consistent destructuring key order via [`eslint-plugin-sort-destructure-keys`](https://www.npmjs.com/package/eslint-plugin-sort-destructure-keys).
- Automatically promotes best practices for React, imports, and TypeScript codebases.

---

## Installation

Install the package along with its necessary dependencies by executing:

```bash
npm install --save-dev @agm-stack/eslint-config-next
```

## Usage

```javascript
import eslintConfigNext from '@agm-stack/eslint-config-next/index.mjs';


const config = [
  ...eslintConfigNext
];

export default config;
```

## Peer Dependencies

This package relies on the following peer dependencies, which will not be installed automatically:

eslint (v9+)
typescript (v5+)
To install the required peer dependencies, run:

```bash
npm install --save-dev eslint@^8 eslint-config-next@^15 typescript
```

## License

This project is licensed under the MIT License.
