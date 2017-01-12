import { OperatorToken, ParenthesisTokens, SpecialToken, Token } from "./Constants";
import { Errors } from "./Errors";
import { append, head, prepend, tail } from "./Utils/Lists";

const {
    LEFT_PAR,
    RIGHT_PAR,
} = ParenthesisTokens;

const {
    PARENTHESES_ERROR,
} = Errors;

type OutputAndStack = [
    Token[],
    SpecialToken[]
];

export const postfixTokens = (infixTokens: Token[]): Token[] => {

    const processOperator = ([output, specialTokenStack]: OutputAndStack, currOp: OperatorToken): OutputAndStack => {
        if (specialTokenStack.length === 0) {
            return [output, [currOp]];
        } else {
            const lastOp = head(specialTokenStack) as SpecialToken;

            const meetsAlgorithmConditions =
                lastOp.type === "operator" &&
                ((currOp.associativity === "left" && currOp.precedance <= lastOp.precedance) ||
                    (currOp.associativity === "right" && currOp.precedance < lastOp.precedance));

            switch (true) {
                case meetsAlgorithmConditions:
                    return processOperator([append(output, lastOp), tail(specialTokenStack)], currOp);
                default:
                    return [output, prepend(specialTokenStack, currOp)];
            }
        }
    };

    const processRightParenthesis = ([output, specialTokenStack]: OutputAndStack): OutputAndStack => {
        if (specialTokenStack.length === 0) {
            throw PARENTHESES_ERROR;
        } else {
            const lastParenthesis = head(specialTokenStack) as SpecialToken;

            switch (lastParenthesis) {
                case LEFT_PAR:
                    return [output, tail(specialTokenStack)];
                default:
                    return processRightParenthesis([append(output, lastParenthesis), tail(specialTokenStack)]);
            }
        }
    };

    const processRemainingTokensOnStack = ([output, specialTokens]: OutputAndStack): Token[] => {
        switch (specialTokens.length) {
            case 0:
                return output;
            default:
                const parenthesisToken = specialTokens
                    .find(token => token.type === "parenthesis");

                if (parenthesisToken) {
                    throw PARENTHESES_ERROR;
                } else {
                    return output.concat(specialTokens);
                }
        }
    };

    const reducer = ([output, specialTokens]: OutputAndStack, a: Token): OutputAndStack => {

        if (output.length === 0) {
            switch (a.type) {
                case "number":
                    return [[a], specialTokens];
                case "operator":
                    return [[], prepend(specialTokens, a)];
                case "parenthesis":
                    switch (a) {
                        case LEFT_PAR:
                            return [[], prepend(specialTokens, a)];
                        case RIGHT_PAR:
                            throw PARENTHESES_ERROR;
                    }
                default:
                    throw `Unknown token ${a}`;
            }
        } else {
            switch (a.type) {
                case "number":
                    return [append(output, a), specialTokens];
                case "operator":
                    return processOperator([output, specialTokens], a);
                case "parenthesis":
                    switch (a) {
                        case LEFT_PAR:
                            return [output, prepend(specialTokens, a)];
                        case RIGHT_PAR:
                            return processRightParenthesis([output, specialTokens]);
                    }
                default:
                    throw `Unknown token ${a}`;
            }
        }
    };

    return processRemainingTokensOnStack(
        infixTokens.reduce<OutputAndStack>(reducer, [[], []]));
};