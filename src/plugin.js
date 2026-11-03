import { createRequire } from "node:module";

import { noRawIntlFormat } from "./rules/no-raw-intl-format.js";

const require = createRequire(import.meta.url);
const { name, version } = require("../package.json");

/**
 * The bare plugin object: metadata + rules. Configs are attached in
 * `index.js` so config modules can reference this object without a
 * circular import.
 *
 * @type {import("eslint").ESLint.Plugin & { configs: Record<string, unknown> }}
 */
export const plugin = {
  meta: { name, version, namespace: "@agm-stack" },
  rules: {
    "no-raw-intl-format": noRawIntlFormat,
  },
  processors: {},
  configs: {},
};
