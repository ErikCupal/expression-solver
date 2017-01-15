// Typescript types, used for proper typechecking

export type Tree = Node_ | Leaf;

export type Node_ = {
    value: Token
    left: Node_ | Leaf
    right: Node_ | Leaf
};

export type Leaf = {
    value: Token
    left: undefined
    right: undefined
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
    readonly value: string
    readonly literalValue: string
    readonly function?: (a: number, b: number) => number
    readonly unaryFunction?: (a: number) => number
    readonly precedance: 2 | 3 | 4
    readonly associativity: "left" | "right"
    readonly associative?: true,
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

export type OperatorNames =
"PLUS" |
"MULTIPLY" |
"MINUS" |
"DIVIDE" |
"REMAINDER" |
"POWER";
/**
 * Constant and readonly object of OperatorToken objects
 */
export const OperatorTokens: {
    readonly [K: string]: OperatorToken
} = {
        PLUS: {
            type: "operator",
            value: "+",
            literalValue: "Add",
            function: (a, b) => a + b,
            unaryFunction: a => a,
            precedance: 2,
            associativity: "left",
            associative: true,
        },
        MULTIPLY: {
            type: "operator",
            value: "*",
            literalValue: "Multiply",
            function: (a, b) => a * b,
            precedance: 3,
            associativity: "left",
            associative: true,
        },
        MINUS: {
            type: "operator",
            value: "-",
            literalValue: "Subtract",
            function: (a, b) => a - b,
            unaryFunction: a => (-a),
            precedance: 2,
            associativity: "left",
        },
        DIVIDE: {
            type: "operator",
            value: "/",
            literalValue: "Divide",
            function: (a, b) => a / b,
            precedance: 3,
            associativity: "left",
        },
        REMAINDER: {
            type: "operator",
            value: "%",
            literalValue: "Remainder",
            function: (a, b) => a % b,
            precedance: 3,
            associativity: "left",
        },
        POWER: {
            type: "operator",
            value: "^",
            literalValue: "Power",
            function: (a, b) => a ** b,
            precedance: 4,
            associativity: "right",
        },
    };

export type ParenthesisNames =
"LEFT_PAR" |
"RIGHT_PAR";
/**
 * Constant and readonly object of ParenthesisToken objects
 */
export const ParenthesisTokens: {
    readonly [K in ParenthesisNames]: ParenthesisToken
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

export type NumberDividerNames =
"COMMA" |
"DOT";
/**
 * Constant and readonly object of NumberDividerToken objects
 */
export const NumberDividerTokens: {
    readonly [K in NumberDividerNames]: NumberDividerToken
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
 * Gets OperatorToken from OperatorTokens object
 */
export const getOperatorToken = (value: string) =>
    Object.values(OperatorTokens)
        .find(operatorToken => value === operatorToken.value) as OperatorToken;

/**
 * Gets ParenthesisToken from ParenthesisTokens object
 */
export const getParenthesisToken = (value: string) =>
    Object.values(ParenthesisTokens)
        .find(par => value === par.value) as ParenthesisToken;

/**
 * Gets NumberDividerToken from NumberDividerTokens object
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
