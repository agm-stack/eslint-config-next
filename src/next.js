import nextConfig from "eslint-config-next";

import { reactRules } from "./configs/react.js";

/** Plugins our own presets already register; redefining them throws in flat config. */
const OWNED_PLUGINS = new Set(["react", "react-hooks", "import", "@typescript-eslint"]);

/**
 * Next.js layer. Requires the optional peer `eslint-config-next` and must be
 * combined with `configs.recommended` (or `configs.react`), which registers the
 * React/import plugins Next's rules point at.
 *
 * @param {{ defaultExportFiles?: string[] }} [options]
 */
export default function next({ defaultExportFiles = [] } = {}) {
  const entries = nextConfig
    // We bring our own TypeScript setup and parser.
    .filter(({ name }) => name !== "next/typescript")
    .map(({ languageOptions: _languageOptions, plugins, ...entry }) => ({
      ...entry,
      ...(plugins && {
        plugins: Object.fromEntries(Object.entries(plugins).filter(([key]) => !OWNED_PLUGINS.has(key))),
      }),
    }));

  return [
    ...entries,
    {
      // Re-apply our React choices so this layer can sit anywhere in the array.
      name: "@agm-stack/next",
      files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
      rules: {
        ...reactRules,
        "import/no-anonymous-default-export": "off",
        "@next/next/no-img-element": "off",
      },
    },
    {
      // Next.js resolves routes, layouts and middleware through default exports.
      name: "@agm-stack/next/default-exports",
      files: ["**/app/**", "**/pages/**", "**/{middleware,proxy,instrumentation}.{js,ts}", ...defaultExportFiles],
      rules: { "import/no-default-export": "off" },
    },
  ];
}
