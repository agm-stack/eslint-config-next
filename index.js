module.exports = {
  extends: [
    "next/core-web-vitals",
    "next/typescript"
  ],
  globals: {
    React: true,
    JSX: true
  },
  plugins: ["@stylistic", "sort-destructure-keys"],
  rules: {
    // TypeScript Rules
    "@typescript-eslint/no-explicit-any": ["warn"],
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": ["warn"],

    // Stylistic Rules
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
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": [
      "error",
      {
        allowAllPropertiesOnSameLine: true,
        allowMultiplePropertiesPerLine: false,
      },
    ],
    "array-bracket-spacing": ["error", "never"],
    "comma-spacing": [
      "error",
      {
        after: true,
        before: false,
      },
    ],
    "key-spacing": ["error"],
    "keyword-spacing": [
      "error",
      {
        after: true,
        before: true,
      },
    ],
    "space-before-blocks": ["warn", "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        asyncArrow: "always",
        named: "never",
      },
    ],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "warn",
    "spaced-comment": [
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
      "error",
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

    // Best Practices
    "consistent-return": "off",
    "default-param-last": "off",
    "newline-per-chained-call": ["warn", { ignoreChainWithDepth: 3 }],
    "padded-blocks": "off",
    "prefer-promise-reject-errors": "off",
    "quote-props": ["error", "as-needed"],
    semi: ["error", "always"],
    "sort-destructure-keys/sort-destructure-keys": "warn",
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
      },
    ],
    "no-debugger": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-multi-spaces": [
      "error",
      {
        exceptions: {},
      },
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
      },
    ],
    "no-trailing-spaces": "error",
    "no-shadow": "off",
    "no-undef": ["error"],
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "max-len": [
      "warn",
      {
        code: 175,
      },
    ],
    indent: [
      "warn",
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ["TemplateLiteral"],
      },
    ],
  },
  settings: {
    react: {
      version: "detect"
    }
  },
};
