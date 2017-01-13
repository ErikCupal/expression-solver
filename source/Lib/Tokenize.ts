import {
    getNumberDividerToken,
    getOperatorToken,
    getParenthesisToken,
    isNumberDivider,
    isOperator,
    isParenthesis,
    NumberToken,
    Token
} from "./Constants";
import { Errors } from "./Errors";
import { head, prepend, tail } from "./Utils/Lists";
import { pipe } from "./Utils/Pipe";
import { isInteger, isWhitespace } from "./Utils/TypeGuards";

const {
    UNKNOWN_CHAR_ERROR,
} = Errors;

const tokenizeSingleChars = (input: string): Token[] => {
    return Array.from(input)
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
        .filter(token => token) as Token[];
};

const mergeNumbers = (array: Token[]): Token[] => {

    const mergeReducer = (array: Token[], newToken: Token): Token[] => {
        const lastToken = head(array);

        if (lastToken === undefined) {
            switch (newToken.type) {
                case "number":
                    return [{
                        type: newToken.type,
                        value: newToken.value,
                    }];
                case "numberDivider":
                    return [{
                        type: "number",
                        value: 0,
                        decimalPlace: 0,
                    }];
                default:
                    return [newToken];
            }
        } else {

            // We don't want to get the rest off the array until it's really necessary
            // because *tail* function is mutative and pops values from the array
            // even if it was not actually used.
            const rest = () => tail(array);

            switch (lastToken.type) {
                case "number":
                    switch (newToken.type) {
                        case "number":
                            return prepend(rest(), {
                                type: lastToken.type,
                                value: lastToken.value * 10 + newToken.value,
                                decimalPlace: (typeof lastToken.decimalPlace === "number")
                                    ? lastToken.decimalPlace + 1
                                    : undefined
                            });
                        case "numberDivider":
                            return prepend(rest(), {
                                type: lastToken.type,
                                value: lastToken.value,
                                decimalPlace: 0
                            });
                        default:
                            return prepend(rest(), newToken, {
                                type: lastToken.type,
                                value: (typeof lastToken.decimalPlace === "number")
                                    ? lastToken.value * 10 ** (-lastToken.decimalPlace)
                                    : lastToken.value,
                                decimalPlace: undefined
                            });
                    }
                default:
                    switch (newToken.type) {
                        case "number":
                            return prepend(rest(), {
                                type: newToken.type,
                                value: newToken.value,
                            }, lastToken);
                        case "numberDivider":
                            return prepend(rest(), {
                                type: "number",
                                value: 0,
                                decimalPlace: 0
                            } as NumberToken, lastToken);
                        default:
                            return prepend(rest(), newToken, lastToken);
                    }
            }
        };
    };

    const convertLastNumberIfPresent = (token: Token) => {
        switch (token.type) {
            case "number":
                return {
                    type: token.type,
                    value: (typeof token.decimalPlace === "number")
                        ? token.value * 10 ** (-token.decimalPlace)
                        : token.value,
                    decimalPlace: undefined
                };
            default:
                return token;
        }
    };

    const removeDecimalPlaceProperty = (token: Token) => {
        switch (token.type) {
            case "number":
                return {
                    type: token.type,
                    value: token.value
                };
            default:
                return token;
        }
    };

    return array
        .reduce(mergeReducer, [])
        .map(convertLastNumberIfPresent)
        .map(removeDecimalPlaceProperty)
        .reverse();
};

export const tokenize: (input: string) => Token[] =
    pipe(
        tokenizeSingleChars,
        mergeNumbers
    );
