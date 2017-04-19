/**
 * Render HTML in string format into the element with renderElementId
 */
export const render = (html: string, renderElementId: HTMLElement) =>
    renderElementId.innerHTML = html

export const enclosedTag = (tagName: string, params: (string | string[])[]): string => {
    if (params) {
        if (typeof params[0] === 'object') {
            const [attributes, ...children] = params
            const joinedAttributes = attributes
                ? (attributes as string[]).reduce((s, x) => s + ' ' + x, '')
                : ''
            const joinedChildren = children
                ? (children as string[]).reduce((s, x) => s + x, '')
                : ''

            return `<${tagName + joinedAttributes}>${joinedChildren}</${tagName}>`
        } else {
            const children = params as string[]
            const joinedChildren = children ? children.reduce((s, x) => s + x, '') : ''
            return `<${tagName}>${joinedChildren}</${tagName}>`
        }
    } else {
        return `<${tagName}></${tagName}>`
    }
}

export const tag =
    (tagName: string) =>
        (...params: (string | string[])[]): string =>
            enclosedTag(tagName, params)

export const div = tag('div')
export const p = tag('p')
export const h1 = tag('h1')
export const h2 = tag('h2')
export const h3 = tag('h3')
export const h4 = tag('h4')
export const h5 = tag('h5')
export const h6 = tag('h6')
export const li = tag('li')
export const ul = tag('ul')
export const button = tag('button')
export const input = tag('input')
export const img = tag('img')
export const a = tag('a')
export const span = tag('span')