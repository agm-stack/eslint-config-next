/**
 * Enforces the Conventional Commits that release-please reads to pick the next
 * version: `fix` → patch, `feat` → minor, `!` or `BREAKING CHANGE:` → major.
 *
 * @type {import("@commitlint/types").UserConfig}
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Scope is optional, but when present it must be one of these.
    "scope-enum": [
      2,
      "always",
      [
        "base",
        "typescript",
        "react",
        "next",
        "tailwind",
        "i18n",
        "legacy",
        "rules",
        "deps",
        "deps-dev",
        "ci",
        "docs",
        "release",
        "main", // release-please's "chore(main): release x.y.z"
      ],
    ],
    "subject-case": [0],
    // Dependabot and release-please write long, generated bodies.
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};
