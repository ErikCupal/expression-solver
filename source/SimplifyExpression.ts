import { createTree } from "./lib/CreateTree";
import { infix } from "./lib/Infix";
import { postfixTokens } from "./lib/Postfixtokens";
import { prefixTokens } from "./lib/PrefixTokens";
import { tokenize } from "./lib/Tokenize";
import { pipe } from "./lib/Utils/Pipe";

export const simplifyExpression: (infixExpression: string) => string =
    pipe(
        tokenize,
        postfixTokens,
        prefixTokens,
        createTree,
        infix
    );