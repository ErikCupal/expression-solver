export type TreeNode = {
    token: Token
    left?: TreeNode
    right?: TreeNode
};

export type Token =
    OperatorToken |
    ParenthesisToken |
    NumberDividerToken |
    NumberToken;

export type SpecialToken =
    OperatorToken |
    ParenthesisToken;

export type OperatorToken = {
    readonly type: "operator"
    readonly value:
    "+" |
    "*" |
    "-" |
    "/" |
    "^"
    readonly function: (a: number, b: number) => number
    readonly precedance: 2 | 3 | 4
    readonly associativity: "left" | "right"
    readonly associative?: true
};

export type ParenthesisToken = {
    readonly type: "parenthesis"
    readonly value: "(" | ")"
};

export type NumberDividerToken = {
    readonly type: "numberDivider"
    readonly value: "." | ","
};

export type NumberToken = {
    readonly type: "number"
    readonly value: number
    readonly decimalPlace?: number
};

/**
 * Constant and readonly object of OperatorToken objects
 */
export const OperatorTokens: {
    readonly [K: string]: OperatorToken
} = {
        PLUS: {
            type: "operator",
            value: "+",
            function: (a, b) => a + b,
            precedance: 2,
            associativity: "left",
            associative: true,
        },
        MULTIPLY: {
            type: "operator",
            value: "*",
            function: (a, b) => a * b,
            precedance: 3,
            associativity: "left",
            associative: true,
        },
        MINUS: {
            type: "operator",
            value: "-",
            function: (a, b) => a - b,
            precedance: 2,
            associativity: "left",
        },
        DIVIDE: {
            type: "operator",
            value: "/",
            function: (a, b) => a / b,
            precedance: 3,
            associativity: "left",
        },
        POWER: {
            type: "operator",
            value: "^",
            function: (a, b) => a ** b,
            precedance: 4,
            associativity: "right",
        }
    };

/**
 * Constant and readonly object of ParenthesisToken objects
 */
export const ParenthesisTokens: {
    readonly [K: string]: ParenthesisToken
} = {
        LEFT_PAR: {
            type: "parenthesis",
            value: "(",
        },
        RIGHT_PAR: {
            type: "parenthesis",
            value: ")",
        },
    };

/**
 * Constant and readonly object of NumberDividerToken objects
 */
export const NumberDividerTokens: {
    readonly [K: string]: NumberDividerToken
} = {
        COMMA: {
            type: "numberDivider",
            value: ",",
        },
        DOT: {
            type: "numberDivider",
            value: ".",
        },
    };

// Token getters

/**
 * Gets an OperatorToken from OperatorTokens object
 */
export const getOperatorToken = (value: string) =>
    Object.values(OperatorTokens)
        .find(operatorToken => value === operatorToken.value) as OperatorToken;

/**
 * Gets an ParenthesisToken from ParenthesisTokens object
 */
export const getParenthesisToken = (value: string) =>
    Object.values(ParenthesisTokens)
        .find(par => value === par.value) as ParenthesisToken;

/**
 * Gets an NumberDividerToken from NumberDividerTokens object
 */
export const getNumberDividerToken = (value: string) =>
    Object.values(NumberDividerTokens)
        .find(par => value === par.value) as NumberDividerToken;

// Token type checkers

/**
 * Checks whether the operator exists in OperatorTokens object
 */
export const isOperator = (value: string) => {
    if (Object.values(OperatorTokens)
        .find(operator => value === operator.value)) {
        return true;
    } else {
        return false;
    }
};

/**
 * Checks whether the parenthesis exists in ParenthesisTokens object
 */
export const isParenthesis = (value: string) => {
    if (Object.values(ParenthesisTokens)
        .find(par => value === par.value)) {
        return true;
    } else {
        return false;
    }
};

/**
 * Checks whether the number divider exists in NumberDividerTokens object
 */
export const isNumberDivider = (value: string) => {
    if (Object.values(NumberDividerTokens)
        .find(par => value === par.value)) {
        return true;
    } else {
        return false;
    }
};