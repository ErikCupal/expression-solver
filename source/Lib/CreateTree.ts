import { Token, TreeNode } from "./Constants";

export const createTree = (postfixedTokens: Token[]): TreeNode => {
    const reducer = (stack: TreeNode[], newToken: Token): TreeNode[] => {
        const [x, y, ...xs] = stack;

        switch (newToken.type) {
            case "number":
                return [{
                    token: newToken,
                    left: undefined,
                    right: undefined,
                }, ...stack];
            case "operator":
                return [{
                    token: newToken,
                    left: y,
                    right: x
                }, ...xs];
            default:
                throw "Invalid token!";
        }
    };

    const stack = postfixedTokens.reduce(reducer, []);

    switch (stack.length) {
        case 1:
            return stack[0];
        default:
            throw "Error ocurred while creating the tree";
    }
};