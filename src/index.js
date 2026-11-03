import { base } from "./configs/base.js";
import { i18n } from "./configs/i18n.js";
import { reactConfig } from "./configs/react.js";
import { typescript } from "./configs/typescript.js";
import { plugin } from "./plugin.js";

// Flat config presets (arrays — pass them to defineConfig()).
Object.assign(plugin.configs, {
  base,
  typescript: [...base, ...typescript],
  react: [...base, ...reactConfig],
  recommended: [...base, ...typescript, ...reactConfig],
  i18n,
});

export { coreRules, importRules, stylisticRules } from "./configs/base.js";
export { reactRules } from "./configs/react.js";
export { typescriptRules } from "./configs/typescript.js";
export default plugin;
