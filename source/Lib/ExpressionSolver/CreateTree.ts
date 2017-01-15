import { Node_ } from "./Constants";
import { Leaf, Token, Tree } from "./Constants";
import { append } from "./Utils/Lists";

/**
 * Takes a postfix expression and returns an abstraction syntax tree.
 * 
 * [Princip](http://learnyouahaskell.com/functionally-solving-problems#reverse-polish-notation-calculator)
 * (the algorithm was modified to create an abstraction syntax tree).
 * 
 * *The implementation does not suppport unary operators and functions yet.*
 */
export const createTree = (postfixExpression: Token[]): Tree => {

    /**
     * Takes stack of Nodes or Leaves (array) and new token
     * 
     * Returns modified stack
     * 
     * Read below how reduce function works :)
     */
    const reducer = (stack: (Node_ | Leaf)[], newToken: Token): (Node_ | Leaf)[] => {
        switch (newToken.type) {
            case "number":
                // In case the new token is a number, push it onto the stack
                return append(stack, {
                    value: newToken,
                    left: undefined,
                    right: undefined,
                });
            case "operator":
                // In case the new token is operator
                // 1) pop two nodes or leaves of the stack
                // 2) create new node with the newToken as token and the two popped nodes (leaves) its leaves
                // 3) push the new node on the stack

                const x = stack.pop();
                const y = stack.pop();

                // Checks whether x and y exist
                if (x && y) {
                    return append(stack, {
                        value: newToken,
                        left: y,
                        right: x
                    });
                } else {
                    // Impossible, can't happen
                    throw "Error ocurred while creating the tree";
                }
            default:
                throw "Invalid token!";
        }
    };


    /**
     * Reduce function (method of Array object) does this:
     * 
     * It takes a function as first parameter
     * 
     * It iterates over the array and calls the function on each iteration
     *      It provides the function two parameters
     *          1) accumulated value <- read below
     *          2) new value from the array
     *      The function returns something - the something will be passed as the accumulated value during next iteration
     * After the iteration finished, it returns the accumulated value
     * 
     * In this case the accumulated value is our stack
     * 
     * On the very first iteration there is no accumulated value - we must provide initial value to the reduce function
     *      In this case: empty array [] -----------
     *                                              |
     *                                              |
     */
    const stack = postfixExpression.reduce(reducer, []);

    switch (stack.length) {
        case 1:
            // There must be only one value on the stack - the completed tree
            return stack[0];
        default:
            throw "Error ocurred while creating the tree";
    }
};