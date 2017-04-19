export const htmlAttribute =
    (attributeName: string) =>
        (value: string) => `${attributeName}="${value}"`

export const id = htmlAttribute('id')
export const className = htmlAttribute('class')
export const type = htmlAttribute('type')
export const value = htmlAttribute('value')
export const href = htmlAttribute('href')
export const style = htmlAttribute('style')
