export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (typeof value === 'object' &&
    value.constructor !== Date &&
    Object.keys(value).length === 0);
