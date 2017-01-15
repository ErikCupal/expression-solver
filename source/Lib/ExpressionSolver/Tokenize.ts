import {
    getNumberDividerToken,
    getOperatorToken,
    getParenthesisToken,
    isNumberDivider,
    isOperator,
    isParenthesis,
    NumberToken,
    ParenthesisTokens,
    Token
} from "./Constants";
import { Errors } from "./Errors";
import { prepend } from "./Utils/Lists";
import { pipe } from "./Utils/Pipe";
import { isInteger, isWhitespace } from "./Utils/TypeGuards";

const {
    UNKNOWN_CHAR_ERROR,
} = Errors;

const {
    LEFT_PAR
} = ParenthesisTokens;

/**
 * Takes an expression and maps every character to Token object.
 * 
 * - A number character is mapped to new NumberToken object.
 * - An operator, parenthesis or number divider is mapped to constant object located in *"./Constants"*.
 * - A whitespace is filtered out.
 * - Throws exception in case of unknown character.
 */
const tokenizeSingleChars = (input: string): Token[] => {
    return Array.from(input)
        // transfroms each character into Token object
        .map(char => {
            switch (true) {
                case isInteger(char):
                    return {
                        type: "number",
                        value: Number(char)
                    };
                case isOperator(char):
                    return getOperatorToken(char);
                case isParenthesis(char):
                    return getParenthesisToken(char);
                case isNumberDivider(char):
                    return getNumberDividerToken(char);
                case isWhitespace(char):
                    return undefined;
                default:
                    throw UNKNOWN_CHAR_ERROR;
            }
        })
        // filter out undefines (the whitespaces)
        .filter(token => token) as Token[];
};

const resolveUnaryOperators = (array: Token[]): Token[] => {

    const reducer = (outputStack: Token[], newToken: Token): Token[] => {
        switch (outputStack.length) {
            case 0:
                return prepend(outputStack, newToken);
            case 1:
                const [last] = outputStack;
                if (last.type === "operator" && last.unaryFunction) {
                    if (newToken.type === "number") {
                        outputStack.shift();

                        return prepend(outputStack, {
                            type: newToken.type,
                            value: last.unaryFunction(newToken.value),
                        });
                    }
                }

                return prepend(outputStack, newToken);
            default:
                const [firstLast, secondLast] = outputStack;
                if (secondLast === LEFT_PAR) {
                    if (firstLast.type === "operator" && firstLast.unaryFunction) {
                        if (newToken.type === "number") {
                            outputStack.shift();
                            outputStack.shift();

                            return prepend(outputStack, {
                                type: newToken.type,
                                value: firstLast.unaryFunction(newToken.value),
                            }, LEFT_PAR);
                        }
                    }
                }

                return prepend(outputStack, newToken);
        }
    };

    return array
        .reduce(reducer, [])
        .reverse();
};


/**
 * Takes a single character tokenized expression.
 * Returns tokenized expression with merged single digits NumberTokens into complete number NumberTokes.
 */
const mergeNumbers = (array: Token[]): Token[] => {

    /**
     * Takes stack of Tokens (array) and new token
     * 
     * Returns modified stack
     * 
     * Read below how reduce function works :)
     */
    const mergeReducer = (outputStack: Token[], newToken: Token): Token[] => {

        // Take first token from the stack
        const [lastToken] = outputStack;

        if (lastToken === undefined) {
            // We're at the beginning of the array

            switch (newToken.type) {
                case "number":
                    /**
                     * Hmm number, just create array with this it
                     */
                    return [newToken];
                case "numberDivider":
                    /**
                     * It's possible it can be like .3 -> 0.3
                     * We create a number from it and we mark it's
                     * a decimal by setting decimalPlace to 0
                     */
                    return [{
                        type: "number",
                        value: 0,
                        decimalPlace: 0,
                    }];
                default:
                    return [newToken];
            }
        } else {

            switch (lastToken.type) {
                case "number":

                    // We throw away the first element from the array
                    // because we need to replace it with another token
                    outputStack.shift();

                    switch (newToken.type) {
                        case "number":
                            /**
                             * Two numbers
                             * Let's multiply the previous number by 10 and add them together
                             * If it is decimal increase the decimalPlace property
                             */
                            return prepend(outputStack, {
                                type: lastToken.type,
                                value: lastToken.value * 10 + newToken.value,
                                decimalPlace: (typeof lastToken.decimalPlace === "number")
                                    ? lastToken.decimalPlace + 1
                                    : undefined
                            });
                        case "numberDivider":
                            /**
                             * e.g 4562.
                             * We set decimalPlace to 0 to mark it's a decimal
                             */
                            return prepend(outputStack, {
                                type: lastToken.type,
                                value: lastToken.value,
                                decimalPlace: 0
                            });
                        default:
                            switch (lastToken.decimalPlace !== undefined) {
                                case true:
                                    /**
                                     * In case the number is decimal
                                     *      shift the number by decimalPlace number
                                     */
                                    return prepend(outputStack, newToken, {
                                        type: lastToken.type,
                                        value: lastToken.value * 10 ** (-lastToken.decimalPlace)
                                    });
                                default:
                                    return prepend(outputStack, newToken, lastToken);
                            }
                    }
                default:
                    switch (newToken.type) {
                        case "number":
                            // We're creating new NumberToken object in order to get rid of the helper
                            // decimalPlace: undefined property
                            return prepend(outputStack, {
                                type: newToken.type,
                                value: newToken.value,
                            });
                        case "numberDivider":
                            /**
                             * e.g. last = *, new = .
                             * It's possible it can be like .3 -> 0.3
                             * We create a number from it and we mark it's
                             * a decimal by setting decimalPlace to 0
                             */
                            return prepend(outputStack, {
                                type: "number",
                                value: 0,
                                decimalPlace: 0
                            } as NumberToken);
                        default:
                            return prepend(outputStack, newToken);
                    }
            }
        };
    };

    const outputStack = array
        // Explanation of reduce function is in ./Lib/ExpressionSolver/CreateTree (end of the file)
        .reduce(mergeReducer, []);


    let lastToken = outputStack[0];
    if (lastToken) {
        if (lastToken.type === "number" && lastToken.decimalPlace !== undefined) {
            /**
             * In case the number is decimal
             *      shift the number by decimalPlace number
             */
            lastToken = {
                type: lastToken.type,
                value: lastToken.value * 10 ** (-lastToken.decimalPlace)
            };
        }
    }

    return outputStack.reverse();
};




/**
 * Takes an expression. Returns tokenized expression.
 */
export const tokenize: (input: string) => Token[] =
    /**
     * For explanation of the pipe function refer to
     *      Documentation in ./Lib/ExpressionSolver/Pipe
     *      Or better here :) http://vanslaars.io/post/create-pipe-function/
     */
    pipe(
        tokenizeSingleChars,
        resolveUnaryOperators,
        mergeNumbers
    );
