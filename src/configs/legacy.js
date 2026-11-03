import { coreRules, importRules, stylisticRules } from "./base.js";
import { reactRules } from "./react.js";
import { importResolverSettings } from "./shared.js";
import { typescriptRules } from "./typescript.js";

/**
 * eslintrc (legacy) equivalents of the flat presets. They reuse the same rule
 * objects, so the two formats cannot drift apart. In eslintrc, plugins are
 * referenced by *name* and resolved from the consuming project, so consumers
 * must install every plugin listed here themselves. The custom `@agm-stack/*`
 * rules are flat-config only: eslintrc loads plugins solely from packages
 * named `eslint-plugin-*`.
 *
 * Only works on ESLint 9 with ESLINT_USE_FLAT_CONFIG=false; ESLint 10 removed
 * eslintrc entirely.
 */
const legacyBase = {
  env: { browser: true, node: true, es2024: true },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["@stylistic", "import", "sort-destructure-keys"],
  extends: ["eslint:recommended"],
  settings: importResolverSettings,
  rules: { ...coreRules, ...stylisticRules, ...importRules },
  overrides: [
    {
      files: ["*.config.{js,mjs,cjs,ts,mts,cts}"],
      rules: { "import/no-default-export": "off" },
    },
  ],
};

export const legacyRecommended = {
  ...legacyBase,
  parser: "@typescript-eslint/parser",
  parserOptions: { ...legacyBase.parserOptions, ecmaFeatures: { jsx: true } },
  plugins: [...legacyBase.plugins, "@typescript-eslint", "react", "react-hooks"],
  extends: [...legacyBase.extends, "plugin:@typescript-eslint/strict", "plugin:@typescript-eslint/stylistic"],
  settings: { ...legacyBase.settings, react: { version: "detect" } },
  rules: { ...legacyBase.rules, ...typescriptRules, ...reactRules },
  overrides: [
    ...legacyBase.overrides,
    {
      files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
      rules: { "no-undef": "off" },
    },
  ],
};
