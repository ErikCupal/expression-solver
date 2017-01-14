import { Node_ } from "./Constants";
import { Token, Tree, Leaf } from "./Constants";

/**
 * Takes a postfix expression and returns an abstraction syntax tree.
 * 
 * [Princip](http://learnyouahaskell.com/functionally-solving-problems#reverse-polish-notation-calculator)
 * (the algorithm was modified to create an abstraction syntax tree).
 * 
 * *The implementation does not suppport unary operators and functions yet.*
 */
export const createTree = (postfixExpression: Token[]): Tree => {
    const reducer = (stack: (Node_ | Leaf)[], newToken: Token): (Node_ | Leaf)[] => {
        const [x, y, ...rest] = stack;

        switch (newToken.type) {
            case "number":
                // In case the new token is a number, push it to the stack
                return [{
                    value: newToken,
                    left: undefined,
                    right: undefined,
                }, ...stack];
            case "operator":
                // In case the new token is operator
                // 1) pop two nodes of the stack
                // 2) create new node with the newToken as token and the two popped nodes as leaves
                // 3) push the new node on the stack
                return [{
                    value: newToken,
                    left: y,
                    right: x
                }, ...rest];
            default:
                throw "Invalid token!";
        }
    };

    const stack = postfixExpression.reduce(reducer, []);

    switch (stack.length) {
        case 1:
            return stack[0];
        default:
            throw "Error ocurred while creating the tree";
    }
};