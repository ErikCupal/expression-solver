import { checkSyntax } from "./CheckSyntax";
import { Tree } from "./Constants";
import { createTree } from "./CreateTree";
import { postfix } from "./Postfix";
import { tokenize } from "./Tokenize";
import { pipe } from "./Utils/Pipe";

/**
 * Resolves the infix notation expression into abstraction syntax tree.
 * 
 * The expression can contain +, -, *, /, ^ operators and parentheses
 * 
 * @param infixExpression An expression in infix notation
 * @returns Abstraction syntax tree
 */
export const createTreeFromExpression: (infixExpression: string) => Tree =
    pipe(
        tokenize,
        checkSyntax,
        postfix,
        createTree
    );