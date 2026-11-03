import type { ESLint, Linter } from "eslint";

type Configs = {
  base: Linter.Config[],
  typescript: Linter.Config[],
  react: Linter.Config[],
  recommended: Linter.Config[],
  i18n: Linter.Config[]
};

declare const plugin: ESLint.Plugin & { configs: Configs };

export declare const coreRules: Linter.RulesRecord;
export declare const importRules: Linter.RulesRecord;
export declare const stylisticRules: Linter.RulesRecord;
export declare const typescriptRules: Linter.RulesRecord;
export declare const reactRules: Linter.RulesRecord;
export default plugin;
