import type { Linter } from "eslint";

export default function tailwind(options: { cssConfigPath: string }): Linter.Config[];
