import { checkSyntax } from "./Lib/CheckSyntax";
import { createTree } from "./lib/CreateTree";
import { postfixTokens } from "./lib/Postfixtokens";
import { solveTree } from "./lib/SolveTree";
import { tokenize } from "./lib/Tokenize";
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
        tokenize,
        checkSyntax,
        postfixTokens,
        createTree,
        solveTree
    );