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
import { head, prepend, tail } from "./Utils/Lists";
import { pipe } from "./Utils/Pipe";
import { isInteger, isWhitespace } from "./Utils/TypeGuards";

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

const singleTokenize = (input: string): Token[] =>
    Array.from(input)
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

const mergeNumbers = (array: Token[]): Token[] => {
    const mergeReducer = (array: Token[], newToken: Token): Token[] => {
        const last = head(array);
        const rest = tail(array);

        if (last === undefined) {
            switch (newToken.type) {
                case "number":
                    return [{
                        ...newToken,
                        order: 1
                    }];
                case "numberDivider":
                    return [{
                        type: "number",
                        value: 0,
                        order: 0,
                    }];
                case "operator":
                    throw OPERATORS_ERROR;
                default:
                    return [newToken];
            }
        } else {
            switch (last.type) {
                case "number":
                    switch (newToken.type) {
                        case "number":
                            return prepend(rest, {
                                type: last.type,
                                value: newToken.value * 10 ** last.order + last.value,
                                order: last.order + 1
                            });
                        case "numberDivider":
                            return prepend(rest, {
                                type: last.type,
                                value: last.value * 10 ** (-last.order),
                                order: 0
                            });
                        default:
                            return prepend(rest, newToken, {
                                type: last.type,
                                value: last.value
                            });
                    }
                case "operator":
                    switch (newToken.type) {
                        case "operator":
                            throw OPERATORS_ERROR;
                        case "parenthesis":
                            switch (newToken) {
                                case LEFT_PAR:
                                    throw PAREN_OR_OPER_ERROR;
                            }
                            break;
                    } // intended fall
                case "parenthesis":
                    switch (last) {
                        case LEFT_PAR:
                            switch (newToken.type) {
                                case "parenthesis":
                                    switch (newToken) {
                                        case RIGHT_PAR:
                                            throw PARENTHESES_ERROR;
                                    }
                                    break;
                            }
                            break;
                        case RIGHT_PAR:
                            switch (newToken.type) {
                                case "operator":
                                    throw PAREN_OR_OPER_ERROR;
                                case "parenthesis":
                                    switch (newToken) {
                                        case LEFT_PAR:
                                            throw PARENTHESES_ERROR;
                                    }
                                    break;
                            }
                            break;
                    } // intended fall
                // fall case operator or parenthesis
                default:
                    switch (newToken.type) {
                        case "number":
                            return prepend(rest, {
                                ...newToken,
                                order: 1
                            }, last);
                        case "numberDivider":
                            return prepend(rest, {
                                type: "number",
                                value: 0,
                                order: 1
                            } as NumberToken, last);
                        default:
                            return prepend(rest, newToken, last);
                    }
            }
        };
    };

    const result = array.reduceRight(mergeReducer, []);

    const firstElement = head(result);

    if (firstElement) {
        switch (firstElement.type) {
            case "operator":
                throw OPERATORS_ERROR;
        }
    }

    return result;
};

export const tokenize: (input: string) => Token[] =
    pipe(
        singleTokenize,
        mergeNumbers
    );
