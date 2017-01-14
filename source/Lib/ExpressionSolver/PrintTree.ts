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
            return li(
                value.value.toString()
            );
        case "operator":
            const operator = value;

            const literalValue =
                (() => {
                    switch (operator.value) {
                        case "+": return "Add";
                        case "-": return "Subtract";
                        case "*": return "Multiply";
                        case "/": return "Divide";
                        case "^": return "Power";
                        default: return operator.value;
                    }
                })();

            if (left && right) {
                return li(
                    literalValue,
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