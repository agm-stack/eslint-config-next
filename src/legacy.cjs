// eslintrc entry, consumed as `extends: ["@agm-stack/eslint-config-next/legacy"]`.
// eslintrc loads shareable configs with require(); Node's require(esm) returns
// the module namespace, so pick the named export.
module.exports = require("./configs/legacy.js").legacyRecommended;
