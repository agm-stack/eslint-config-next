import agm from "@agm-stack/eslint-config-next";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist/**"]),
  agm.configs.recommended,
  agm.configs.i18n,
  {
    // Project-specific overrides always go last.
    files: ["src/legacy/**"],
    rules: { "@agm-stack/no-raw-intl-format": "off" },
  },
]);
