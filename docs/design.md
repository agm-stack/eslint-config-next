# Design notes

This document records the decisions behind the package's structure, for
contributors and for anyone building a similar shared config.

## One package: config and plugin

ESLint distinguishes two kinds of packages:

- A **shareable config** exports configuration: rule severities, parser,
  settings and plugin registrations. It contains no rule logic.
- A **plugin** exports an object with `rules`, optionally `processors`, and
  optionally `configs` that use those rules.

With flat config, the boundary is mostly about naming. A flat config is just
an array that ships its plugins as imported objects, so one package can
provide both the presets and the custom rules they enable. This package does
that. The default export is a plugin object
(`{ meta, rules, processors, configs }`), following the
`js.configs.recommended` convention.

Splitting into `eslint-plugin-*` and `eslint-config-*` makes sense when the
rules are useful without the style preset, or when the two need separate
release cycles. Neither applies yet.

## Module layout

```
src/
├─ index.js            # default export: plugin object with presets attached
├─ index.d.ts
├─ plugin.js           # meta + rules only, so presets can import it without a cycle
├─ next.js             # optional layer, needs the eslint-config-next peer
├─ tailwind.js         # optional layer, needs the eslint-plugin-tailwindcss peer
├─ legacy.cjs          # eslintrc entry (require)
├─ rules/              # custom rule implementations
└─ configs/
   ├─ shared.js        # file globs, import resolver settings
   ├─ base.js          # core + @stylistic + import rules
   ├─ typescript.js
   ├─ react.js
   ├─ i18n.js
   └─ legacy.js        # eslintrc versions of the presets
```

Rule settings are exported as plain objects (`coreRules`, `stylisticRules`,
`importRules`, `typescriptRules`, `reactRules`). The flat presets and the
legacy preset are both built from them, so the two formats cannot drift
apart.

## Optional layers behind subpath exports

`eslint-config-next` pulls in Babel, the Next.js parser and several plugins,
and it requires `next` to be installed. Putting it behind
`@agm-stack/eslint-config-next/next` keeps the main entry usable in plain
React or Node projects. The same applies to Tailwind. Both packages are
**optional peer dependencies**, so they always match the version the
consuming app already uses.

## Avoiding "Cannot redefine plugin"

Flat config throws when two *different* objects are registered under the
same plugin key. `eslint-config-next` registers its own copies of `react`,
`react-hooks` and `import`, and these may be different module instances from
ours. `next()` removes those registrations (and Next's Babel parser, since
we use the TypeScript parser) from Next's config. It then reapplies our
React rule choices, so the layer can go anywhere in the array.

## Import resolution under pnpm

`eslint-plugin-import` looks up resolvers by package name, relative to the
consuming project. With pnpm's strict `node_modules`, a resolver installed
only as this package's dependency can't be found. `configs/shared.js`
passes the resolver by **absolute path** (`require.resolve(...)`), the same
technique `eslint-config-next` uses.

## Dependency strategy

| Dependency | Kind | Reason |
| --- | --- | --- |
| `eslint` | peer (`^9.22.0`) | The app must own exactly one ESLint. 9.22 adds `defineConfig` and `globalIgnores`. |
| `typescript` | optional peer | `typescript-eslint` uses the app's compiler. |
| Plugins used by the core presets | dependencies | Flat config imports them from this package, so apps install one thing. |
| `eslint-config-next`, `eslint-plugin-tailwindcss` | optional peers | Only the subpath layers need them, and they must match the app's framework versions. |

## Legacy eslintrc support

eslintrc refers to plugins by **name** and resolves them from the consuming
project, and it only loads plugins from packages named `eslint-plugin-*`.
That means:

- Legacy users must install every plugin themselves (listed in the README).
- The custom `@agm-stack/*` rules are flat-config only.
- `src/legacy.cjs` exists because eslintrc loads configs with `require()`,
  and `require(esm)` returns a module namespace rather than the config
  object.

ESLint 10 removed eslintrc. The legacy entry will be deleted in the major
release that adds ESLint 10 support.

## ESLint 10

`eslint-plugin-react@7` and `eslint-plugin-import@2` still declare
`eslint <= 9` as their peer range. Supporting ESLint 10 means waiting for
those packages or moving to `@eslint-react/eslint-plugin` and
`eslint-plugin-import-x`. Either way, that is a major release.
