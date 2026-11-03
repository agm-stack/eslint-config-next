import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export const ALL_FILES = ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"];
export const TS_FILES = ["**/*.{ts,mts,cts,tsx}"];
export const CONFIG_FILES = ["**/*.config.{js,mjs,cjs,ts,mts,cts}"];

/**
 * eslint-plugin-import resolves resolvers by module name relative to the
 * consuming project, which breaks under pnpm's strict node_modules. Passing an
 * absolute path makes the resolver this package ships with always win.
 */
export const importResolverSettings = {
  "import/resolver": {
    [require.resolve("eslint-import-resolver-typescript")]: { alwaysTryTypes: true },
  },
};
