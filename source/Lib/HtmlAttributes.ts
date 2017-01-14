export const genAttributeFunction = (attributeName: string) =>
    (value: string) => `${attributeName}="${value}"`;

export const id = genAttributeFunction("id");
export const className = genAttributeFunction("class");
export const type = genAttributeFunction("type");
export const value = genAttributeFunction("value");
export const href = genAttributeFunction("href");
export const style = genAttributeFunction("style");
