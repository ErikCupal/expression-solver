import { Token, TreeNode } from "./Constants";
import { postfixTokens } from "./PostfixTokens";
import { head, tail } from "./Utils/Lists";

export const createTree = (postfixTokens: Token[]): TreeNode => {

    if (postfixTokens.length === 0) {
        throw "The token array is empty!";
    }

    const createNodeTree = (array: Token[]): TreeNode | undefined => {
        const token = head(array);
        const rest = tail(array);

        if (token) {
            switch (token.type) {
                case "number":
                    return {
                        token: token,
                        left: undefined,
                        right: undefined,
                    };
                default:
                    return {
                        token: token,
                        right: createNodeTree(rest),
                        left: createNodeTree(rest),
                    };
            }
        }

        return undefined;
    };

    const tree = createNodeTree([...postfixTokens]);

    if (tree) {
        return tree;
    } else {
        throw "Error ocurred while creating the tree";
    }
};