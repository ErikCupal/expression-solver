import { li, ul } from "../Html";
import { Tree } from "./Constants";

/**
 * Creates HTML unordered list tree from the abstraction syntax tree.
 * 
 * *The implementation does not suppport unary operators and functions yet.*
 */
export const printTree = ({ value, left, right }: Tree): string => {
    switch (value.type) {
        case "number":
            // li simply creates string "<li>" + children + "</li>"
            return li(
                value.value.toString()
            );
        case "operator":
            const operator = value;

            if (left && right) {
                // li simply creates string "<li>" + children + "</li>"
                // ul simply creates string "<ul>" + children + "</ul>"
                return li(
                    operator.literalValue,
                    ul(
                        printTree(left),
                        printTree(right),
                    )
                );
            } else if (left || right) {
                throw "Unary operators not yet implemented!";
            } else {
                throw "Tree error!";
            }
        default:
            throw "Unknown token!";
    }
};