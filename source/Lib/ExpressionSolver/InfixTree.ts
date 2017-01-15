import { Leaf, Node_, OperatorToken, Tree } from "./Constants";
import { Errors } from "./Errors";

const {
    OPER_OR_NODE_ERROR,
    TOKEN_ERROR,
} = Errors;

type NodeType = "left" | "right";
type Operator = OperatorToken;

const LEFT = "left";
const RIGHT = "right";

/**
 * Tells whether parentheses are needed
 * 
 * @param child The operator of the concerned node.
 * @param parent The operator of the parent node.
 * @param nodeType Type of the child node in relation to its parent node. Either "left" or "right".
 * @returns boolean
 */
export const shouldParenthesize = (child: Operator, parent: Operator, nodeType: NodeType): boolean => {
    switch (true) {
        case child.precedance < parent.precedance:
            return true;
        case child.precedance > parent.precedance:
            return false;
        case child.precedance === parent.precedance:

            // Special case - associative operator -> (wiki)[https://en.wikipedia.org/wiki/Operator_associativity]
            if (parent.associative) {
                return false;
            }

            // Read about operator associativity on (wiki)[https://en.wikipedia.org/wiki/Operator_associativity]
            switch (nodeType) {
                case LEFT:
                    switch (child.associativity) {
                        case LEFT: return false;
                        case RIGHT: return true;
                    }
                case RIGHT:
                    switch (child.associativity) {
                        case LEFT: return true;
                        case RIGHT: return false;
                    }
            }
    }

    throw OPER_OR_NODE_ERROR;
};

/**
 * Takes an abstraction syntax tree and returns infix expression.
 */
export const infixTree = (
    // Create vars value, left and right from the first parameter
    // This notation is ES6 Destructuring
    { value, left, right }: Tree,
    parentOp?: Operator,
    nodeType?: NodeType
): string => {

    switch (value.type) {
        case "number":
            // Are parentheses needed?
            // Look at this example
            //      5 / (-8-(-8))
            //      They are needed when
            //          the number is less than zero
            //      AND it's node type is left
            if (value.value < 0 && nodeType === "right") {
                return "(" + value.value.toString() + ")";
            } else {
                return value.value.toString();
            }
        case "operator":

            const leftNode = infixTree(left as (Node_ | Leaf), value, LEFT);
            const tokenValue = value.value.toString();
            const rightNode = infixTree(right as (Node_ | Leaf), value, RIGHT);

            if (parentOp && nodeType) {
                const parenthesize = shouldParenthesize(value, parentOp, nodeType);
                if (parenthesize) {
                    return `(${leftNode} ${tokenValue} ${rightNode})`;
                } else {
                    return `${leftNode} ${tokenValue} ${rightNode}`;
                }
            } else {
                return `${leftNode} ${tokenValue} ${rightNode}`;
            }
    }

    throw TOKEN_ERROR;
};
