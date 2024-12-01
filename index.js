const { FlatCompat } = require("@eslint/eslintrc");
const tseslint = require("typescript-eslint");
const eslint = require("@eslint/js");
const hooks = require("eslint-plugin-react-hooks");
const stylistic = require("@stylistic/eslint-plugin");
const react = require("eslint-plugin-react");
const parser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const sortKeys = require("eslint-plugin-sort-destructure-keys");
const readableTailwind = require('eslint-plugin-readable-tailwind');
const tailwind = require('eslint-plugin-tailwindcss');

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const config = [
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic
  ),
  react.configs.flat.recommended,
  ...compat.extends("eslint-config-next"),
  ...tailwind.configs['flat/recommended'],
  {
    name: 'ESLint Config - Next.JS',
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'react-hooks': hooks,
      'import': importPlugin,
      'sort-destructure-keys': sortKeys,
      'readable-tailwind': readableTailwind
    },
    rules: {
      ...hooks.configs.recommended.rules,

      // Core
      "consistent-return": "off",
      "default-param-last": "off",
      "prefer-promise-reject-errors": ["warn"],
      "sort-keys": "off",
      "no-unused-vars": "off",
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
        },
      ],
      "no-debugger": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-shadow": "off",
      "no-undef": ["error"],
      "no-useless-assignment": "off",
      "no-use-before-define": "off",

      // Tailwind Rules
      'readable-tailwind/multiline': ['warn', {
        classesPerLine: 14, group: 'newLine', preferSingleLine: true, lineBreakStyle: 'windows'
      }],
      'readable-tailwind/no-unnecessary-whitespace': ['warn', { allowMultiline: true, }],

      // TypeScript Rules
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-explicit-any": ["warn"],
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-shadow": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],

      // Stylistic Rules
      "sort-destructure-keys/sort-destructure-keys": "warn",
      "@stylistic/quotes": ["warn", "double"],
      "@stylistic/padded-blocks": "off",
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/no-multi-spaces": [
        "error",
        {
          exceptions: {},
        },
      ],
      "@stylistic/no-multiple-empty-lines": [
        "error",
        {
          "max": 2,
          "maxEOF": 0,
          "maxBOF": 1
        }
      ],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/max-len": [
        "warn",
        {
          code: 175,
        },
      ],
      "@stylistic/indent": [
        "warn",
        2,
        {
          SwitchCase: 1,
          ignoredNodes: ["TemplateLiteral"],
        },
      ],
      "@stylistic/newline-per-chained-call": ["warn", { ignoreChainWithDepth: 3 }],
      "@stylistic/semi": ["warn", "always"],
      "@stylistic/object-curly-spacing": ["warn", "always"],
      "@stylistic/type-annotation-spacing": "warn",
      "@stylistic/member-delimiter-style": [
        "warn",
        {
          multiline: {
            delimiter: "comma",
            requireLast: false,
          },
          singleline: {
            delimiter: "comma",
            requireLast: false,
          },
        },
      ],
      "@stylistic/object-curly-newline": [
        "error",
        {
          ExportDeclaration: {
            consistent: true,
            minProperties: 5,
            multiline: true,
          },
          ImportDeclaration: {
            consistent: true,
            minProperties: 5,
            multiline: true,
          },
          ObjectExpression: {
            consistent: true,
            minProperties: 5,
            multiline: true,
          },
          ObjectPattern: {
            consistent: true,
            minProperties: 5,
            multiline: true,
          },
        },
      ],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/object-property-newline": [
        "error",
        {
          allowAllPropertiesOnSameLine: true,
          allowMultiplePropertiesPerLine: false,
        },
      ],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/comma-spacing": [
        "error",
        {
          after: true,
          before: false,
        },
      ],
      "@stylistic/key-spacing": ["error"],
      "@stylistic/keyword-spacing": [
        "error",
        {
          after: true,
          before: true,
        },
      ],
      "@stylistic/space-before-blocks": ["warn", "always"],
      "@stylistic/space-before-function-paren": [
        "error",
        {
          anonymous: "never",
          asyncArrow: "always",
          named: "never",
        },
      ],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "warn",
      "@stylistic/spaced-comment": [
        "warn",
        "always",
        {
          line: {
            exceptions: ["-", "+"],
            markers: ["=", "!"]
          },
          block: {
            balanced: true,
            markers: ["!"],
            exceptions: ["*"]
          }
        }
      ],

    // React Rules
     "react-hooks/exhaustive-deps": "warn",
     "react-hooks/rules-of-hooks": "error",
     "react/destructuring-assignment": "warn",
     "react/function-component-definition": [
       "warn",
       {
         namedComponents: "function-declaration",
       },
     ],
     "react/jsx-closing-bracket-location": [1, "tag-aligned"],
     "react/jsx-curly-brace-presence": "error",
     "react/jsx-first-prop-new-line": [2, "multiline"],
     "react/jsx-indent-props": [2, 2],
     "react/jsx-max-props-per-line": [
       1,
       {
         maximum: {
           multi: 1,
           single: 5,
         },
       },
     ],
     "react/jsx-one-expression-per-line": [
       1,
       {
         allow: "single-child",
       },
     ],
     "react/jsx-props-no-multi-spaces": ["error"],
     "react/jsx-props-no-spreading": "off",
     "react/jsx-tag-spacing": [
       1,
       {
         beforeSelfClosing: "always",
       },
     ],
     "react/jsx-no-useless-fragment": "warn",
     "react/jsx-curly-newline": [
       "warn",
       {
         multiline: "consistent",
         singleline: "consistent"
       }
     ],
     "react/jsx-sort-props": [
       "warn",
       {
         callbacksLast: true,
         shorthandFirst: true,
         noSortAlphabetically: false,
         reservedFirst: true
       }
     ],
     "react/jsx-wrap-multilines": [
       "warn",
       { declaration: "parens-new-line", assignment: "parens-new-line", return: "parens-new-line" }
     ],
     "react/prop-types": "off",
     "react/react-in-jsx-scope": "off",
     "react/require-default-props": "off",
     "react/jsx-uses-react": "off",

      // Import Rules
      "import/no-anonymous-default-export": "off",
      "import/no-unresolved": ["error"],
      "import/no-anonymous-default-export": "off",
      "import/no-unresolved": ["error"],
      "import/order": [
        "warn",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always-and-inside-groups",
          pathGroups: [
            {
              group: "type",
              pattern: "types",
              position: "after",
            },
            {
              group: "object",
              pattern: "{.,..}/**/*.scss",
              position: "after",
            },
          ],
        },
      ],
      "import/prefer-default-export": "off",
    },
  }
];

module.exports = {
  flat: config
}
