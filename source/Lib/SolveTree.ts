import { OperatorToken, OperatorTokens, TreeNode } from "./Constants";
import { Errors } from "./Errors";

const {
    PLUS,
    MULTIPLY,
    MINUS,
    DIVIDE,
    POWER
} = OperatorTokens;

const {
    OPERATORS_ERROR
} = Errors;

const nodeSolve = (operator: OperatorToken, left?: TreeNode, right?: TreeNode): number => {
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

export const solveTree = ({ token, left, right }: TreeNode): number => {
    switch (token.type) {
        case "number":
            return token.value;
        case "operator":
            return nodeSolve(token, left, right);
        default:
            throw "Unknown token!";
    }
};