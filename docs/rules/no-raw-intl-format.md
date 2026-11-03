# `@agm-stack/no-raw-intl-format`

Disallow ad-hoc locale formatting so user-facing dates, times and numbers go
through the application's i18n formatter.

- **Type:** suggestion
- **Enabled in:** `configs.i18n` (as `warn`)
- **Fixable:** no

## Rule details

Calling `Date.prototype.toLocaleDateString()` or `new Intl.NumberFormat()`
directly picks a locale at the call site, usually the runtime default. On
the server that is the server's locale, not the visitor's, which causes
inconsistent output and hydration mismatches in React Server Components.

Internationalised apps should format through one locale-aware layer, such as
[next-intl](https://next-intl.dev)'s `useFormatter()` / `getFormatter()`.
This rule reports the common ways to bypass it:

- `.toLocaleString()`, `.toLocaleDateString()` and `.toLocaleTimeString()` calls
- `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat`,
  `Intl.ListFormat` and `Intl.PluralRules`, with or without `new`

Examples of **incorrect** code:

```js
const label = event.startsAt.toLocaleDateString();
const price = new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(amount);
const time = Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(now);
```

Examples of **correct** code:

```tsx
const format = useFormatter();

const label = format.dateTime(event.startsAt, { dateStyle: "medium" });
const price = format.number(amount, { style: "currency", currency: "EUR" });
const iso = event.startsAt.toISOString(); // machine-readable output is fine
```

## Options

```ts
type Options = [{
  allowMethods?: string[], // e.g. ["toLocaleTimeString"]
  allowIntl?: string[],    // e.g. ["PluralRules"]
  replacement?: string,    // text used in the error message
}];
```

| Option | Default | Description |
| --- | --- | --- |
| `allowMethods` | `[]` | `toLocale*` method names to allow. |
| `allowIntl` | `[]` | `Intl` constructor names to allow. |
| `replacement` | `"the locale-aware formatter (e.g. next-intl useFormatter/getFormatter)"` | What the error message tells the developer to use instead. |

```js
{
  rules: {
    "@agm-stack/no-raw-intl-format": ["error", {
      allowIntl: ["PluralRules"],
      replacement: "useFormatter() from next-intl",
    }],
  },
}
```

## When not to use it

Turn the rule off for code that formats for machines or logs, not people,
and in apps without an i18n layer. To turn it off for specific files, use a
`files` override:

```js
{
  files: ["scripts/**", "src/server/logging/**"],
  rules: { "@agm-stack/no-raw-intl-format": "off" },
}
```

## Limitations

The rule is purely syntactic. It does not know the type of the receiver, so
`myCustomObject.toLocaleString()` is reported too, and aliased access such as
`const { NumberFormat } = Intl` is not.
