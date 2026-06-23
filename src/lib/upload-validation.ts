import type { SchemaValidationResult } from "./types";

export function validateRequiredColumns(
  actualColumns: string[],
  requiredColumns: string[],
  totalRows = 0,
  sheetName?: string
): SchemaValidationResult {
  const normalizedActual = actualColumns.map((col) => String(col).trim());
  const matchedColumns = requiredColumns.filter((col) => normalizedActual.includes(col));
  const missingColumns = requiredColumns.filter((col) => !normalizedActual.includes(col));
  const extraColumns = normalizedActual.filter((col) => !requiredColumns.includes(col));

  return {
    sheetName,
    matchedColumns,
    missingColumns,
    extraColumns,
    totalRows,
    isValid: missingColumns.length === 0,
    message:
      missingColumns.length === 0
        ? "Schema valid. Dataset dapat diterapkan ke dashboard."
        : "Beberapa kolom wajib belum ditemukan. Data tetap bisa dipreview, tetapi belum dapat diterapkan ke dashboard."
  };
}
