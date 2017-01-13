import { checkSyntax } from "./Lib/CheckSyntax";
import { createTree } from "./lib/CreateTree";
import { infix } from "./lib/Infix";
import { postfixTokens } from "./lib/Postfixtokens";
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
        postfixTokens,
        createTree,
        infix
    );