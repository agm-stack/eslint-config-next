# @agm-stack/eslint-config-next

A custom ESLint configuration for Next.js 15+ projects using TypeScript. This package provides an opinionated ESLint setup tailored for Next.js and TypeScript development, including stylistic rules, import sorting, and React-specific linting.

---

## Features

- Next.js-specific rules via [`eslint-config-next`](https://www.npmjs.com/package/eslint-config-next).
- TypeScript support with [`@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint).
- Stylistic rules with [`@stylistic/eslint-plugin`](https://www.npmjs.com/package/@stylistic/eslint-plugin).
- Destructuring key sorting with [`eslint-plugin-sort-destructure-keys`](https://www.npmjs.com/package/eslint-plugin-sort-destructure-keys).
- Automatically enforces best practices for React, imports, and TypeScript codebases.

---

## Installation

To install the package along with its required dependencies, run:

```bash
npm install --save-dev @agm-stack/eslint-config-next
```

## Usage

```javascript
module.exports = {
  extends: ["@agm-stack/eslint-config-next"]
};
```

## Peer Dependencies

This package relies on the following peer dependencies, which will not be installed automatically:

eslint (v8)
eslint-config-next (v15+)
typescript (v4+)
To install the required peer dependencies, run:

```bash
npm install --save-dev eslint@^8 eslint-config-next@^15 typescript
```

## License

This project is licensed under the MIT License.
