import type { Linter } from "eslint";

export default function next(options?: { defaultExportFiles?: string[] }): Linter.Config[];
