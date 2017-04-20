import { OperatorToken, PARENTHESIS_TOKENS, SpecialToken, Token } from './constants'
import { ERRORS } from './errors'
import { append, prepend } from './utils/lists'
import { where } from 'ramda'

const {
  LEFT_PAR,
  RIGHT_PAR,
} = PARENTHESIS_TOKENS

const {
  PARENTHESES_ERROR,
} = ERRORS

type Stacks = [
  Token[],
  SpecialToken[]
]

/**
 * Takes tokenized infix expression and returns its postfix form.
 * 
 * Implemented using [Shunting-yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm).
 */
export const postfix = (infixTokens: Token[]): Token[] => {

  const processOperator = ([outputStack, specialTokenStack]: Stacks, currOp: OperatorToken): Stacks => {

    // Take last operator from the array
    const [lastOp] = specialTokenStack

    if (lastOp === undefined) {
      return [outputStack, [currOp]]
    } else {
      const meetsAlgorithmConditions =
        lastOp.type === 'operator' &&
        ((currOp.associativity === 'left' && currOp.precedance <= lastOp.precedance) ||
          (currOp.associativity === 'right' && currOp.precedance < lastOp.precedance))

      switch (true) {
        case meetsAlgorithmConditions:
          specialTokenStack.shift()
          return processOperator([append(outputStack, lastOp), specialTokenStack], currOp)
        default:
          return [outputStack, prepend(specialTokenStack, currOp)]
      }
    }
  }

  const processRightParenthesis = ([output, specialTokenStack]: Stacks): Stacks => {
    const lastToken = specialTokenStack.shift()

    if (lastToken === undefined) {
      // There must be some token on the stack if there is unmatched right parenthesis
      throw PARENTHESES_ERROR
    } else {
      switch (lastToken) {
        case LEFT_PAR:
          return [output, specialTokenStack]
        default:
          return processRightParenthesis([append(output, lastToken), specialTokenStack])
      }
    }
  }

  const processSpecialTokensStack = ([output, specialTokens]: Stacks): Token[] => {
    switch (specialTokens.length) {
      case 0:
        return output
      default:
        const parenthesisToken = specialTokens
          .find(token => token.type === 'parenthesis')

        if (parenthesisToken) {
          // There can't be any parenthesis on the specialTokens stack in this moment
          throw PARENTHESES_ERROR
        }

        // create new array
        //      output with appended specialTokens stack at the end of the putput
        return output.concat(specialTokens)
    }
  }

  /**
   * The algorith is described [here](https://en.wikipedia.org/wiki/Shunting-yard_algorithm).
   * 
   * Takes stack of Tokens (array) and new token
   * Returns modified stack
   */
  const reducer = ([output, specialTokens]: Stacks, a: Token): Stacks => {

    if (output.length === 0) {
      // The array is empty - we're at the beginning of reduce function

      switch (a.type) {
        case 'number':
          return [[a], specialTokens]
        case 'operator':
          return [[], prepend(specialTokens, a)]
        case 'parenthesis':
          switch (a) {
            case LEFT_PAR:
              return [[], prepend(specialTokens, a)]
            case RIGHT_PAR:
              throw PARENTHESES_ERROR
          }
        default:
          throw new Error(`Unknown token ${a}`)
      }
    } else {
      switch (a.type) {
        case 'number':
          return [append(output, a), specialTokens]
        case 'operator':
          return processOperator([output, specialTokens], a)
        case 'parenthesis':
          switch (a) {
            case LEFT_PAR:
              return [output, prepend(specialTokens, a)]
            case RIGHT_PAR:
              return processRightParenthesis([output, specialTokens])
          }
        default:
          throw new Error(`Unknown token ${a}`)
      }
    }
  }

  const stacks = infixTokens.reduce<Stacks>(reducer, [[], []])

  return processSpecialTokensStack(stacks)
}