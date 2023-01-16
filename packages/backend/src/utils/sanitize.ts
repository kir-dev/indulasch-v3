export function sanitize<T>(object: T, keys: (keyof T)[]) {
  return Object.entries(object)
    .filter(([key]) => keys.includes(key as keyof T))
    .map(([key, value]) => {
      return { [key]: value };
    })
    .reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        ...currentValue,
      };
    }) as Partial<T>;
}

export function sanitizeArray<T>(objects: T[], keys: (keyof T)[]) {
  return objects.map((o) => sanitize(o, keys));
}

export function sanitizeWithExclude<T>(object: T, keys: (keyof T)[]) {
  return Object.entries(object)
    .filter(([key]) => !keys.includes(key as keyof T))
    .map(([key, value]) => {
      return { [key]: value };
    })
    .reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        ...currentValue,
      };
    }) as Partial<T>;
}
