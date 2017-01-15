import { checkSyntax } from "./CheckSyntax";
import { Tree } from "./Constants";
import { createTree } from "./CreateTree";
import { postfix } from "./Postfix";
import { tokenize } from "./Tokenize";
import { pipe } from "./Utils/Pipe";

/**
 * Resolves the infix notation expression into abstraction syntax tree.
 * 
 * The expression can contain operators and parentheses
 * 
 * @param infixExpression An expression in infix notation
 * @returns Abstraction syntax tree
 */
export const createTreeFromExpression: (infixExpression: string) => Tree =
    /**
     * For explanation of the pipe function refer to
     *      Documentation in ./Lib/ExpressionSolver/Pipe
     *      Or better here :) http://vanslaars.io/post/create-pipe-function/
     */
    pipe(
        tokenize,
        checkSyntax,
        postfix,
        createTree
    );