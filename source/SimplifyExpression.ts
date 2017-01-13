import { checkSyntax } from "./Lib/CheckSyntax";
import { createTree } from "./lib/CreateTree";
import { infix } from "./lib/Infix";
import { postfix } from "./lib/Postfix";
import { tokenize } from "./lib/Tokenize";
import { pipe } from "./lib/Utils/Pipe";

/**
 * Simplifies the infix notation expression by removing unnecessary parentheses and creating consistent spacing
 * 
 * @param infixExpression An expression in infix notation
 * @returns A simplified expression in infix notation
 */
export const simplifyExpression: (infixExpression: string) => string =
    pipe(
        tokenize,
        checkSyntax,
        postfix,
        createTree,
        infix
    );