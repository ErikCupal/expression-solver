export type Tree = Node | Leaf

export interface Node {
  readonly value: Token
  readonly left: Node | Leaf
  readonly right: Node | Leaf
}

export interface Leaf {
  readonly value: Token
  readonly left: undefined
  readonly right: undefined
}

export type Token =
  | OperatorToken
  | ParenthesisToken
  | NumberDividerToken
  | NumberToken

export type SpecialToken =
  | OperatorToken
  | ParenthesisToken

export interface OperatorToken {
  readonly type: 'operator'
  readonly value: string
  readonly literalValue: string
  readonly function?: (a: number, b: number) => number
  readonly unaryFunction?: (a: number) => number
  readonly precedance: 2 | 3 | 4
  readonly associativity: 'left' | 'right'
  readonly associative?: true
}

export interface ParenthesisToken {
  readonly type: 'parenthesis'
  readonly value: '(' | ')'
}

export interface NumberDividerToken {
  readonly type: 'numberDivider'
  readonly value: '.' | ','
}

export interface NumberToken {
  readonly type: 'number'
  readonly value: number
  readonly decimalPlace?: number
}

export type OperatorNames =
  'PLUS' |
  'MULTIPLY' |
  'MINUS' |
  'DIVIDE' |
  'REMAINDER' |
  'POWER'

export const OPERATOR_TOKENS: {
  readonly [K: string]: OperatorToken,
} = {
    PLUS: {
      type: 'operator',
      value: '+',
      literalValue: 'Add',
      function: (a, b) => a + b,
      unaryFunction: a => a,
      precedance: 2,
      associativity: 'left',
      associative: true,
    },
    MULTIPLY: {
      type: 'operator',
      value: '*',
      literalValue: 'Multiply',
      function: (a, b) => a * b,
      precedance: 3,
      associativity: 'left',
      associative: true,
    },
    MINUS: {
      type: 'operator',
      value: '-',
      literalValue: 'Subtract',
      function: (a, b) => a - b,
      unaryFunction: a => (-a),
      precedance: 2,
      associativity: 'left',
    },
    DIVIDE: {
      type: 'operator',
      value: '/',
      literalValue: 'Divide',
      function: (a, b) => a / b,
      precedance: 3,
      associativity: 'left',
    },
    REMAINDER: {
      type: 'operator',
      value: '%',
      literalValue: 'Remainder',
      function: (a, b) => a % b,
      precedance: 3,
      associativity: 'left',
    },
    POWER: {
      type: 'operator',
      value: '^',
      literalValue: 'Power',
      function: (a, b) => a ** b,
      precedance: 4,
      associativity: 'right',
    },
  }

export type ParenthesisNames =
  | 'LEFT_PAR'
  | 'RIGHT_PAR'

export const PARENTHESIS_TOKENS: {
  readonly [K in ParenthesisNames]: ParenthesisToken
} = {
    LEFT_PAR: {
      type: 'parenthesis',
      value: '(',
    },
    RIGHT_PAR: {
      type: 'parenthesis',
      value: ')',
    },
  }

export type NumberDividerNames =
  | 'COMMA'
  | 'DOT'

export const NUMBER_DIVIDER_TOKENS: {
  readonly [K in NumberDividerNames]: NumberDividerToken
} = {
    COMMA: {
      type: 'numberDivider',
      value: ',',
    },
    DOT: {
      type: 'numberDivider',
      value: '.',
    },
  }

// Token getters

/**
 * Gets OperatorToken from OperatorTokens object
 */
export const getOperatorToken = (value: string) =>
  Object.values(OPERATOR_TOKENS)
    .find(operatorToken => value === operatorToken.value) as OperatorToken

/**
 * Gets ParenthesisToken from ParenthesisTokens object
 */
export const getParenthesisToken = (value: string) =>
  Object.values(PARENTHESIS_TOKENS)
    .find(par => value === par.value) as ParenthesisToken

/**
 * Gets NumberDividerToken from NumberDividerTokens object
 */
export const getNumberDividerToken = (value: string) =>
  Object.values(NUMBER_DIVIDER_TOKENS)
    .find(par => value === par.value) as NumberDividerToken

// Token type checkers

/**
 * Checks whether the operator exists in OperatorTokens object
 */
export const isOperator = (value: string) => {
  if (Object.values(OPERATOR_TOKENS)
    .find(operator => value === operator.value)) {
    return true
  } else {
    return false
  }
}

/**
 * Checks whether the parenthesis exists in ParenthesisTokens object
 */
export const isParenthesis = (value: string) => {
  if (Object.values(PARENTHESIS_TOKENS)
    .find(par => value === par.value)) {
    return true
  } else {
    return false
  }
}

/**
 * Checks whether the number divider exists in NumberDividerTokens object
 */
export const isNumberDivider = (value: string) => {
  if (Object.values(NUMBER_DIVIDER_TOKENS)
    .find(par => value === par.value)) {
    return true
  } else {
    return false
  }
}
