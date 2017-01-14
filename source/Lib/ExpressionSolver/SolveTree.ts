import { OperatorToken, Tree } from "./Constants";

const nodeSolve = (operator: OperatorToken, left?: Tree, right?: Tree): number => {
    if (left && right) {
        return operator.function(
            solveTree(left),
            solveTree(right)
        );
    } else if (left || right) {
        throw "Unary operators not yet implemented!";
    } else {
        throw "Tree error!";
    }
};

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