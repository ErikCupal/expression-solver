import { createTreeFromExpression } from "./CreateTreeFromExpression";
import { solveTree } from "./SolveTree";
import { pipe } from "./Utils/Pipe";

/**
 * Resolves the infix notation expression into a number
 * 
 * The expression can contain +, -, *, /, ^ operators and parentheses
 * 
 * @param infixExpression An expression in infix notation
 * @returns A number
 */
export const solveExpression: (infixExpression: string) => number =
    pipe(
        createTreeFromExpression,
        solveTree
    );