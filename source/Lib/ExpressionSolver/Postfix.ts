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

/**
 * Takes tokenized infix expression and returns its postfix form.
 * 
 * Implemented using [Shunting-yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm).
 * 
 * *The implementation does not suppport unary operators and functions yet.*
 */
export const postfix = (infixTokens: Token[]): Token[] => {

    const processOperator = ([output, specialTokenStack]: OutputAndStack, currOp: OperatorToken): OutputAndStack => {
        const [lastOp] = specialTokenStack;

        if (lastOp === undefined) {
            return [output, [currOp]];
        } else {
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
        const [lastParenthesis] = specialTokenStack;

        if (lastParenthesis === undefined) {
            throw PARENTHESES_ERROR;
        } else {
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
            // The array is empty - we're at the beginning of reduce function

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

    const reduced = infixTokens.reduce<OutputAndStack>(reducer, [[], []]);

    return processRemainingTokensOnStack(reduced);
};