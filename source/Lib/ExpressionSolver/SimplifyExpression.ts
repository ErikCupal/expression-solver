import { createTreeFromExpression } from "./CreateTreeFromExpression";
import { infix } from "./Infix";
import { pipe } from "./Utils/Pipe";

/**
 * Simplifies the infix notation expression by removing unnecessary parentheses and creating consistent spacing
 * 
 * @param infixExpression An expression in infix notation
 * @returns A simplified expression in infix notation
 */
export const simplifyExpression: (infixExpression: string) => string =
    pipe(
        createTreeFromExpression,
        infix
    );