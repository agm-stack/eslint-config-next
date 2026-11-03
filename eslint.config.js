import { defineConfig, globalIgnores } from "eslint/config";

import agm from "./src/index.js";

// Dogfood the TypeScript preset (includes base) on the package itself.
export default defineConfig([
  globalIgnores(["examples/**", "tests/fixtures/**"]),
  agm.configs.typescript,
  {
    // ESLint loads plugins and these entry points through their default export.
    files: ["src/{index,next,tailwind}.{js,d.ts}"],
    rules: { "import/no-default-export": "off" },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: { sourceType: "commonjs" },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
]);
