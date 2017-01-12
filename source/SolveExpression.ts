import { createTree } from "./lib/CreateTree";
import { postfixTokens } from "./lib/Postfixtokens";
import { prefixTokens } from "./lib/PrefixTokens";
import { solveTree } from "./lib/SolveTree";
import { tokenize } from "./lib/Tokenize";
import { pipe } from "./lib/Utils/Pipe";

export const solveExpression: (infixExpression: string) => number =
    pipe(
        tokenize,
        postfixTokens,
        prefixTokens,
        createTree,
        solveTree
    );