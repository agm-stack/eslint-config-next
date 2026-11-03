import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import sortKeys from "eslint-plugin-sort-destructure-keys";
import globals from "globals";

import { ALL_FILES, CONFIG_FILES, importResolverSettings } from "./shared.js";

export const coreRules = {
  "consistent-return": "off",
  "default-param-last": "off",
  "prefer-promise-reject-errors": ["warn"],
  "sort-keys": "off",
  "no-unused-vars": "off",
  "sort-imports": ["error", { ignoreDeclarationSort: true }],
  "no-debugger": "warn",
  "no-console": ["warn", { allow: ["warn", "error"] }],
  "no-shadow": "off",
  "no-undef": ["error"],
  "no-useless-assignment": "off",
  "no-use-before-define": "off",
};

export const stylisticRules = {
  "sort-destructure-keys/sort-destructure-keys": "warn",
  "@stylistic/quotes": ["warn", "double"],
  "@stylistic/jsx-quotes": ["warn", "prefer-double"],
  "@stylistic/padded-blocks": "off",
  "@stylistic/quote-props": ["error", "as-needed"],
  "@stylistic/no-multi-spaces": ["error", { exceptions: {} }],
  "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 1 }],
  "@stylistic/no-trailing-spaces": "error",
  "@stylistic/max-len": ["warn", { code: 175 }],
  "@stylistic/indent": ["warn", 2, { SwitchCase: 1, ignoredNodes: ["TemplateLiteral"] }],
  "@stylistic/newline-per-chained-call": ["warn", { ignoreChainWithDepth: 3 }],
  "@stylistic/semi": ["warn", "always"],
  "@stylistic/object-curly-spacing": ["warn", "always"],
  "@stylistic/type-annotation-spacing": "warn",
  "@stylistic/member-delimiter-style": [
    "warn",
    {
      multiline: { delimiter: "comma", requireLast: false },
      singleline: { delimiter: "comma", requireLast: false },
    },
  ],
  "@stylistic/object-curly-newline": [
    "error",
    {
      ExportDeclaration: { consistent: true, minProperties: 5, multiline: true },
      ImportDeclaration: { consistent: true, minProperties: 5, multiline: true },
      ObjectExpression: { consistent: true, minProperties: 5, multiline: true },
      ObjectPattern: { consistent: true, minProperties: 5, multiline: true },
    },
  ],
  "@stylistic/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
  "@stylistic/array-bracket-spacing": ["error", "never"],
  "@stylistic/comma-spacing": ["error", { after: true, before: false }],
  "@stylistic/key-spacing": ["error"],
  "@stylistic/keyword-spacing": ["error", { after: true, before: true }],
  "@stylistic/space-before-blocks": ["warn", "always"],
  "@stylistic/space-before-function-paren": ["error", { anonymous: "never", asyncArrow: "always", named: "never" }],
  "@stylistic/space-in-parens": ["error", "never"],
  "@stylistic/space-infix-ops": "warn",
  "@stylistic/spaced-comment": [
    "warn",
    "always",
    {
      line: { exceptions: ["-", "+"], markers: ["=", "!"] },
      block: { balanced: true, markers: ["!"], exceptions: ["*"] },
    },
  ],
};

export const importRules = {
  "import/no-anonymous-default-export": "off",
  "import/no-unresolved": ["error"],
  "import/order": [
    "warn",
    {
      alphabetize: { caseInsensitive: true, order: "asc" },
      groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
      "newlines-between": "always-and-inside-groups",
      pathGroups: [
        { group: "type", pattern: "types", position: "after" },
        { group: "object", pattern: "{.,..}/**/*.scss", position: "after" },
      ],
    },
  ],
  "import/prefer-default-export": "off",
  "import/no-default-export": "error",
};

/** Framework-agnostic JavaScript rules: core, stylistic, import ordering. */
export const base = [
  { ...eslint.configs.recommended, name: "@agm-stack/base/eslint-recommended" },
  {
    name: "@agm-stack/base",
    files: ALL_FILES,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "@stylistic": stylistic,
      import: importPlugin,
      "sort-destructure-keys": sortKeys,
    },
    settings: importResolverSettings,
    rules: { ...coreRules, ...stylisticRules, ...importRules },
  },
  {
    // Tooling resolves these files through their default export.
    name: "@agm-stack/base/config-files",
    files: CONFIG_FILES,
    rules: { "import/no-default-export": "off" },
  },
];
