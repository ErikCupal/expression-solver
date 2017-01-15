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
 * Returns the first element of the array
 * 
 * @param array The source array.
 */
export const head = <T>(array: T[]): T | undefined => array[0]

/**
 * Takes array, removes first element and returns the array
 * 
 * **The function mutates original array.**
 * 
 */
export const tail = <T>(array: T[]): T[] => {
    array.shift()
    return array
}

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