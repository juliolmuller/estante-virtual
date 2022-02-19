
export function stringifyQuery(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}
