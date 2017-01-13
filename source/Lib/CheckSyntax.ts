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

export const checkSyntax = (array: Token[]): Token[] => {

    const syntaxCheckReducer = (array: Token[], newToken: Token): Token[] => {

        const [lastToken] = array;

        if (lastToken === undefined) {
            // The array is empty - we're at the beginning of reduce function

            switch (newToken.type) {
                case "operator":
                    // Operator can't be at the beginning of the expression
                    throw OPERATORS_ERROR;
            }

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

            return prepend(array, newToken);
        }
    };

    const checked = array
        .reduce(syntaxCheckReducer, [])
        // The reducer returned the new array in reversed order -> reverse it back
        .reverse();

    const lastTokenInArray = last(checked);

    if (lastTokenInArray && lastTokenInArray.type === "operator") {
        // Operator can't be at the end of the expression
        throw OPERATORS_ERROR;
    }

    return checked;
};