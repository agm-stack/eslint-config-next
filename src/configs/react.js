import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";

import { ALL_FILES } from "./shared.js";

export const reactRules = {
  ...hooks.configs.recommended.rules,
  "react-hooks/exhaustive-deps": "warn",
  "react-hooks/rules-of-hooks": "warn",
  "react-hooks/refs": "off",
  "react-hooks/set-state-in-effect": "warn",
  "react/destructuring-assignment": "warn",
  "react/function-component-definition": ["warn", { namedComponents: "function-declaration" }],
  "react/jsx-closing-bracket-location": ["warn", "tag-aligned"],
  "react/jsx-curly-brace-presence": "error",
  "react/jsx-first-prop-new-line": ["error", "multiline"],
  "react/jsx-indent-props": ["error", 2],
  "react/jsx-max-props-per-line": ["warn", { maximum: { multi: 1, single: 5 } }],
  "react/jsx-one-expression-per-line": ["warn", { allow: "single-child" }],
  "react/jsx-props-no-multi-spaces": ["error"],
  "react/jsx-props-no-spreading": "off",
  "react/jsx-tag-spacing": ["warn", { beforeSelfClosing: "always" }],
  "react/jsx-no-useless-fragment": "warn",
  "react/jsx-curly-newline": ["warn", { multiline: "consistent", singleline: "consistent" }],
  "react/jsx-sort-props": ["warn", { callbacksLast: true, shorthandFirst: true, noSortAlphabetically: false, reservedFirst: true }],
  "react/jsx-wrap-multilines": ["warn", { declaration: "parens-new-line", assignment: "parens-new-line", return: "parens-new-line" }],
  "react/prop-types": "off",
  "react/react-in-jsx-scope": "off",
  "react/require-default-props": "off",
  "react/jsx-uses-react": "off",
};

/** React + Hooks rules for the automatic JSX runtime (React 17+). */
export const reactConfig = [
  {
    name: "@agm-stack/react",
    files: ALL_FILES,
    languageOptions: {
      globals: { React: "readonly", JSX: "readonly" },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": hooks,
    },
    rules: reactRules,
  },
];
