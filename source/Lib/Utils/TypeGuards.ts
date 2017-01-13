/**
 * Checks whether the input string is integer.
 */
export const isInteger = (value: string) => /^\d+$/.test(value);
/**
 * Checks whether the input string is whitespace.
 */
export const isWhitespace = (value: string) => /\s/.test(value);