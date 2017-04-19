/**
 * Returns the last element of the array.
 * 
 * @param array The source array.
 */
export const last = <T>(array: T[]): T | undefined =>
    array
        ? array[array.length - 1]
        : undefined

/**
 * Takes array, appends element(s) at the end and returns the array
 * 
 * **The function mutates original array.**
 * .
 */
export const append = <T>(array: T[], ...elements: T[]): T[] => {
    array.push(...elements)
    return array
}

/**
 * Takes array, appends element(s) at the beginning and returns the array
 * 
 * **The function mutates original array.**
 * .
 */
export const prepend = <T>(array: T[], ...elements: T[]): T[] => {
    array.unshift(...elements)
    return array
}