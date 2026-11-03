import { plugin } from "../plugin.js";

import { ALL_FILES } from "./shared.js";

export const i18nRules = {
  "@agm-stack/no-raw-intl-format": "warn",
};

/** Opt-in rules for apps whose UI copy and formatting go through an i18n layer. */
export const i18n = [
  {
    name: "@agm-stack/i18n",
    files: ALL_FILES,
    plugins: { "@agm-stack": plugin },
    rules: i18nRules,
  },
];
