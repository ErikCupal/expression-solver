import { ParenthesisTokens, Token } from "./Constants";
import { Errors } from "./Errors";
import { last, prepend } from "./Utils/Lists";

const {
    RIGHT_PAR,
    LEFT_PAR
} = ParenthesisTokens;

const {
    PARENTHESES_ERROR,
    PAREN_OR_OPER_ERROR,
    OPERATORS_ERROR,
    UNKNOWN_CHAR_ERROR,
} = Errors;

/**
 * Takes tokenized expression returns it back. Throws exception in case of syntax error.
 * 
 * *The implementation does not suppport unary operators and functions yet.*
 */
export const checkSyntax = (tokens: Token[]): Token[] => {

    /**
     * Takes stack of Tokens (array) and new token
     * 
     * Returns modified stack
     * 
     * Read below how reduce function works :)
     */
    const syntaxCheckReducer = (stack: Token[], newToken: Token): Token[] => {

        // Takes the first element from the stack
        const [lastToken] = stack;

        if (lastToken === undefined) {
            // The stack is empty - we're at the beginning of the reduce function

            switch (newToken.type) {
                case "operator":
                    // Operator can't be at the beginning of the expression
                    throw OPERATORS_ERROR;
            }

            // Return new stack array with the new token
            return [newToken];

        } else {
            switch (lastToken.type) {
                case "operator":
                    switch (newToken.type) {
                        case "operator":
                            // Can't have two consequent operators in expression
                            throw OPERATORS_ERROR;
                        case "parenthesis":
                            switch (newToken) {
                                case RIGHT_PAR:
                                    // e.g. *) - nonsense
                                    throw PAREN_OR_OPER_ERROR;
                            }
                            break;
                    }
                    break;
                case "parenthesis":
                    switch (lastToken) {
                        case LEFT_PAR:
                            switch (newToken.type) {
                                case "operator":
                                    // e.g. (* - nonsense
                                    throw PAREN_OR_OPER_ERROR;
                                case "parenthesis":
                                    switch (newToken) {
                                        case RIGHT_PAR:
                                            // () - dissallowed, though this rule might be possibly omitted
                                            throw PARENTHESES_ERROR;
                                    }
                                    break;
                            }
                            break;
                        case RIGHT_PAR:
                            switch (newToken.type) {
                                case "parenthesis":
                                    switch (newToken) {
                                        case LEFT_PAR:
                                            // )( - dissallowed
                                            throw PARENTHESES_ERROR;
                                    }
                                    break;
                            }
                            break;
                    }
                    break;
            }

            // Add new token at the beginning of the stack 
            return prepend(stack, newToken);
        }
    };

    const checked = tokens
        // Explanation of reduce function is in ./Lib/ExpressionSolver/CreateTree (end of the file)
        .reduce(syntaxCheckReducer, [])
        // The reducer returned the new array in reversed order -> reverse it back
        .reverse();

    const lastTokenInArray = last(checked);

    if (lastTokenInArray && lastTokenInArray.type === "operator") {
        // Operator can't be at the end of the expression
        throw OPERATORS_ERROR;
    }

    // Everything is fine, return the original array
    return tokens;
};