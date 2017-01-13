import { createTreeFromExpression } from "./CreateTreeFromExpression";
import { solveTree } from "./lib/SolveTree";
import { pipe } from "./lib/Utils/Pipe";

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