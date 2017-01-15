import { Tree } from "./Constants";

/**
 * Solves an abstraction syntax tree.
 * 
 * *The implementation does not suppport unary operators and functions yet.*
 */
export const solveTree = ({ value, left, right }: Tree): number => {
    switch (value.type) {
        case "number":
            return value.value;
        case "operator":
            if (left && right) {
                const operator = value;

                // Apply operator's function on left and right leaves
                // and return the result
                return operator.function(
                    solveTree(left),
                    solveTree(right)
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