import tseslint from "typescript-eslint";

import { ALL_FILES, TS_FILES } from "./shared.js";

export const typescriptRules = {
  "@typescript-eslint/no-non-null-assertion": "warn",
  "@typescript-eslint/no-explicit-any": ["warn"],
  "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
  "@typescript-eslint/consistent-type-imports": "warn",
  "@typescript-eslint/no-shadow": "warn",
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      args: "all",
      argsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],
};

/** typescript-eslint strict + stylistic presets plus the shared TS rule tweaks. */
export const typescript = [
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    name: "@agm-stack/typescript",
    files: ALL_FILES,
    languageOptions: { parser: tseslint.parser },
    rules: typescriptRules,
  },
  {
    // The TypeScript compiler already reports undefined identifiers.
    name: "@agm-stack/typescript/no-undef",
    files: TS_FILES,
    rules: { "no-undef": "off" },
  },
];
