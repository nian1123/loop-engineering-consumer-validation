export function normalizeName(value) {
  if (typeof value !== "string") {
    throw new TypeError("name must be a string");
  }
  return value.trim();
}

export function greet(name) {
  return `Hello, ${normalizeName(name)}!`;
}
