/**
 * Render HTML in string fromat in the renderElement
 */
export const render = (html: string, renderElement: HTMLElement) =>
    renderElement.innerHTML = html

export const enclosedTag = (tagName: string, params: (string | string[])[]): string => {
    if (params) {
        if (typeof params[0] === "object") {
            const [attributes, ...children] = params
            const joinedAttributes = attributes
                ? (attributes as string[]).reduce((s, x) => s + " " + x, "")
                : ""
            const joinedChildren = children
                ? (children as string[]).reduce((s, x) => s + x, "")
                : ""

            return `<${tagName + joinedAttributes}>${joinedChildren}</${tagName}>`
        } else {
            const children = params as string[]
            const joinedChildren = children ? children.reduce((s, x) => s + x, "") : ""
            return `<${tagName}>${joinedChildren}</${tagName}>`
        }
    } else {
        return `<${tagName}></${tagName}>`
    }
}

export const genTagFunction = (tagName: string) =>
    (...params: (string | string[])[]): string =>
        enclosedTag(tagName, params)

export const div = genTagFunction("div")
export const p = genTagFunction("p")
export const h1 = genTagFunction("h1")
export const h2 = genTagFunction("h2")
export const h3 = genTagFunction("h3")
export const h4 = genTagFunction("h4")
export const h5 = genTagFunction("h5")
export const h6 = genTagFunction("h6")
export const li = genTagFunction("li")
export const ul = genTagFunction("ul")
export const button = genTagFunction("button")
export const input = genTagFunction("input")
export const img = genTagFunction("img")
export const a = genTagFunction("a")
export const span = genTagFunction("span")