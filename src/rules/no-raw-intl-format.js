/**
 * Disallows ad-hoc locale formatting (`Date#toLocaleDateString`,
 * `new Intl.NumberFormat(...)`, ...) so user-facing dates and numbers go
 * through the app's locale-aware formatter (for example next-intl's
 * `useFormatter` / `getFormatter`).
 */

const DEFAULT_METHODS = ["toLocaleString", "toLocaleDateString", "toLocaleTimeString"];
const DEFAULT_INTL = ["DateTimeFormat", "NumberFormat", "RelativeTimeFormat", "ListFormat", "PluralRules"];

/** @param {import("estree").Node} node */
function getPropertyName(node) {
  if (node.type !== "MemberExpression") {
    return null;
  }
  if (!node.computed && node.property.type === "Identifier") {
    return node.property.name;
  }
  if (node.computed && node.property.type === "Literal" && typeof node.property.value === "string") {
    return node.property.value;
  }
  return null;
}

/** @type {import("eslint").Rule.RuleModule} */
export const noRawIntlFormat = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow ad-hoc locale formatting outside the app's i18n formatter",
      recommended: false,
      url: "https://github.com/agm-stack/eslint-config-next/blob/main/docs/rules/no-raw-intl-format.md",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowMethods: { type: "array", items: { type: "string" }, uniqueItems: true },
          allowIntl: { type: "array", items: { type: "string" }, uniqueItems: true },
          replacement: { type: "string" },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ allowMethods: [], allowIntl: [], replacement: "the locale-aware formatter (e.g. next-intl useFormatter/getFormatter)" }],
    messages: {
      method: "Avoid `.{{name}}()` for user-facing output; use {{replacement}} instead.",
      intl: "Avoid `Intl.{{name}}` for user-facing output; use {{replacement}} instead.",
    },
  },

  create(context) {
    const [{ allowIntl, allowMethods, replacement }] = /** @type {any} */ (context.options);
    const methods = new Set(DEFAULT_METHODS.filter((name) => !allowMethods.includes(name)));
    const intl = new Set(DEFAULT_INTL.filter((name) => !allowIntl.includes(name)));

    /** @param {import("estree").CallExpression | import("estree").NewExpression} node */
    function check(node) {
      const { callee } = node;
      const name = getPropertyName(callee);
      if (!name || callee.type !== "MemberExpression") {
        return;
      }

      if (callee.object.type === "Identifier" && callee.object.name === "Intl") {
        if (intl.has(name)) {
          context.report({ node, messageId: "intl", data: { name, replacement } });
        }
        return;
      }

      if (node.type === "CallExpression" && methods.has(name)) {
        context.report({ node, messageId: "method", data: { name, replacement } });
      }
    }

    return {
      CallExpression: check,
      NewExpression: check,
    };
  },
};
