import { checkSyntax } from "./Lib/CheckSyntax";
import { TreeNode } from "./Lib/Constants";
import { createTree } from "./lib/CreateTree";
import { postfix } from "./lib/Postfix";
import { tokenize } from "./lib/Tokenize";
import { pipe } from "./lib/Utils/Pipe";

/**
 * Resolves the infix notation expression into abstraction syntax tree.
 * 
 * The expression can contain +, -, *, /, ^ operators and parentheses
 * 
 * @param infixExpression An expression in infix notation
 * @returns Abstraction syntax tree
 */
export const createTreeFromExpression: (infixExpression: string) => TreeNode =
    pipe(
        tokenize,
        checkSyntax,
        postfix,
        createTree
    );