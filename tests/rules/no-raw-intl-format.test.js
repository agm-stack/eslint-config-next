import { after, describe, it } from "node:test";

import { RuleTester } from "eslint";

import plugin from "../../src/index.js";

// RuleTester uses mocha-style globals; point it at node:test instead.
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.afterAll = after;

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: "latest", sourceType: "module" },
});

ruleTester.run("no-raw-intl-format", plugin.rules["no-raw-intl-format"], {
  valid: [
    "format.dateTime(date, { dateStyle: 'medium' })",
    "date.toISOString()",
    "value.toString()",
    "Intl.getCanonicalLocales('en')",
    "MyIntl.NumberFormat()",
    {
      code: "date.toLocaleDateString('en')",
      options: [{ allowMethods: ["toLocaleDateString"] }],
    },
    {
      code: "new Intl.PluralRules('en')",
      options: [{ allowIntl: ["PluralRules"] }],
    },
  ],
  invalid: [
    {
      code: "date.toLocaleDateString()",
      errors: [{ messageId: "method" }],
    },
    {
      code: "price['toLocaleString']('ro-RO')",
      errors: [{ messageId: "method" }],
    },
    {
      code: "new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' })",
      errors: [{ messageId: "intl" }],
    },
    {
      code: "Intl.DateTimeFormat().format(now)",
      errors: [{ messageId: "intl" }],
    },
    {
      code: "d.toLocaleTimeString()",
      options: [{ replacement: "useFormatter()" }],
      errors: [{ message: "Avoid `.toLocaleTimeString()` for user-facing output; use useFormatter() instead." }],
    },
  ],
});
