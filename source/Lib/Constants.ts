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
    readonly order?: number
};

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

export const getOperatorToken = (value: string) =>
    Object.values(OperatorTokens)
        .find(operatorToken => value === operatorToken.value) as OperatorToken;

export const getParenthesisToken = (value: string) =>
    Object.values(ParenthesisTokens)
        .find(par => value === par.value) as ParenthesisToken;

export const getNumberDividerToken = (value: string) =>
    Object.values(NumberDividerTokens)
        .find(par => value === par.value) as NumberDividerToken;

// Token type checkers

export const isOperator = (value: string) => {
    if (Object.values(OperatorTokens)
        .find(operator => value === operator.value)) {
        return true;
    } else {
        return false;
    }
};

export const isParenthesis = (value: string) => {
    if (Object.values(ParenthesisTokens)
        .find(par => value === par.value)) {
        return true;
    } else {
        return false;
    }
};

export const isNumberDivider = (value: string) => {
    if (Object.values(NumberDividerTokens)
        .find(par => value === par.value)) {
        return true;
    } else {
        return false;
    }
};