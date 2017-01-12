/**
 * Returns the last element of the array.
 * 
 * @param array The source array.
 */
export const last = <T>(array: T[]): T | undefined =>
    array
        ? array[array.length - 1]
        : undefined;

/**
 * Returns the first element of the array
 * 
 * @param array The source array.
 */
export const head = <T>(array: T[]): T | undefined => array[0];

/**
 * Returns the array without the first element
 * 
 * **Warning:** Unlike in most functional languages, the function mutates original array.
 * Use only for perfomance crutial tasks.
 * 
 * @param array The array.
 */
export const tail = <T>(array: T[]): T[] => {
    array.shift();
    return array;
};

/**
 * Returns the array with the element(s) appended at the end
 * 
 * **Warning:** Unlike in most functional languages, the function mutates original array.
 * Use only for perfomance crutial tasks.
 * 
 * @param elements New elements of the Array.
 */
export const append = <T>(array: T[], ...elements: T[]): T[] => {
    array.push(...elements);
    return array;
};

/**
 * Returns the array with the element(s) appended at the beginning
 * 
 * **Warning:** Unlike in most functional languages, the function mutates original array.
 * Use only for perfomance crutial tasks.
 * 
 * @param elements New elements of the Array.
 */
export const prepend = <T>(array: T[], ...elements: T[]): T[] => {
    array.unshift(...elements);
    return array;
};