import { createTreeFromExpression } from "./CreateTreeFromExpression";
import { printTree } from "./PrintTree";
import { pipe } from "./Utils/Pipe";

/**
 * Creates HTML unordered list tree from the infix expression.
 * 
 * *The implementation does not suppport unary operators and functions yet.*
 */
export const printTreeFromExpression: (infixExpression: string) => string =
    pipe(
        createTreeFromExpression,
        printTree
    );