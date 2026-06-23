export function sumBy<T>(data: T[], selector: (item: T) => number): number {
  return data.reduce((sum, item) => sum + selector(item), 0);
}

export function avgBy<T>(data: T[], selector: (item: T) => number): number {
  if (!data.length) return 0;
  return sumBy(data, selector) / data.length;
}

export function countBy<T>(data: T[], predicate: (item: T) => boolean): number {
  return data.filter(predicate).length;
}

export function uniqueCountBy<T>(data: T[], selector: (item: T) => string): number {
  return new Set(data.map(selector)).size;
}

export function groupCountBy<T>(data: T[], selector: (item: T) => string): Record<string, number> {
  return data.reduce<Record<string, number>>((acc, item) => {
    const key = selector(item) || "Tidak diketahui";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}
