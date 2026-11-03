import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { ESLint, loadESLint } from "eslint";

import plugin from "../src/index.js";
import next from "../src/next.js";
import tailwind from "../src/tailwind.js";

const cwd = fileURLToPath(new URL("./fixtures/app", import.meta.url));

/** @param {import("eslint").Linter.Config[]} overrideConfig */
async function lint(overrideConfig, file) {
  const eslint = new ESLint({ cwd, overrideConfigFile: true, overrideConfig });
  const [result] = await eslint.lintFiles([file]);
  return result.messages;
}

describe("flat presets", () => {
  for (const [name, config] of Object.entries(plugin.configs)) {
    it(`${name} is a valid flat config array`, async () => {
      assert.ok(Array.isArray(config));
      const eslint = new ESLint({ cwd, overrideConfigFile: true, overrideConfig: config });
      await eslint.calculateConfigForFile("src/clean.tsx");
    });
  }

  it("recommended + i18n + next lints a clean file without problems", async () => {
    const messages = await lint([...plugin.configs.recommended, ...plugin.configs.i18n, ...next()], "src/clean.tsx");
    assert.deepEqual(messages, []);
  });

  it("recommended reports the expected rules on a dirty file", async () => {
    const messages = await lint([...plugin.configs.recommended, ...plugin.configs.i18n], "src/dirty.tsx");
    const ruleIds = new Set(messages.map(({ ruleId }) => ruleId));
    for (const ruleId of [
      "@stylistic/jsx-quotes",
      "@stylistic/semi",
      "@typescript-eslint/consistent-type-definitions",
      "import/no-default-export",
      "import/no-unresolved",
      "react/jsx-sort-props",
      "@agm-stack/no-raw-intl-format",
    ]) {
      assert.ok(ruleIds.has(ruleId), `expected ${ruleId} in ${[...ruleIds].join(", ")}`);
    }
  });
});

describe("legacy preset", () => {
  it("lints through eslintrc extends", async () => {
    const LegacyESLint = await loadESLint({ useFlatConfig: false });
    const eslint = new LegacyESLint({
      cwd,
      useEslintrc: false,
      overrideConfig: { extends: [fileURLToPath(new URL("../src/legacy.cjs", import.meta.url))] },
    });
    const [result] = await eslint.lintFiles(["src/dirty.tsx"]);
    const ruleIds = new Set(result.messages.map(({ ruleId }) => ruleId));
    for (const ruleId of ["@stylistic/semi", "import/no-default-export", "react/jsx-sort-props"]) {
      assert.ok(ruleIds.has(ruleId), `expected ${ruleId} in ${[...ruleIds].join(", ")}`);
    }
  });
});

describe("tailwind layer", () => {
  it("requires cssConfigPath", () => {
    assert.throws(() => tailwind({ cssConfigPath: "" }), TypeError);
  });

  it("lints with a Tailwind v4 CSS entry", async () => {
    const messages = await lint([...plugin.configs.recommended, ...tailwind({ cssConfigPath: "./src/index.css" })], "src/clean.tsx");
    assert.deepEqual(messages, []);
  });
});
