import tailwindcss from "eslint-plugin-tailwindcss";

/**
 * Tailwind CSS v4 layer. Requires the optional peer `eslint-plugin-tailwindcss`.
 *
 * @param {{ cssConfigPath: string }} options Path to the CSS entry that `@import "tailwindcss"`.
 */
export default function tailwind({ cssConfigPath }) {
  if (!cssConfigPath) {
    throw new TypeError("@agm-stack/eslint-config-next/tailwind: `cssConfigPath` is required.");
  }

  return [
    tailwindcss.configs.recommended,
    {
      name: "@agm-stack/tailwind",
      settings: { tailwindcss: { cssConfigPath } },
    },
  ];
}
