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

            // Special case - associative operators -> wiki
            if (parent.associative) {
                return false;
            }

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
 * 
 * *The implementation does not suppport unary operators and functions yet.*
 */
export const infixTree = (
    { value, left, right }: Tree,
    parentOp?: Operator,
    nodeType?: NodeType
): string => {

    switch (value.type) {
        case "number":
            return value.value.toString();
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
