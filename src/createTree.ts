import { Node } from './constants'
import { Leaf, Token, Tree } from './constants'
import { append } from './utils/lists'

/**
 * Takes a postfix expression and returns an abstraction syntax tree.
 * 
 * [Princip](http://learnyouahaskell.com/functionally-solving-problems#reverse-polish-notation-calculator)
 * (the algorithm was modified to create an abstraction syntax tree).
 */
export const createTree = (postfixExpression: Token[]): Tree => {

  /**
   * Takes stack of Nodes or Leaves (array) and new token
   * Returns reduced stack of Nodes or Leaves
   */
  const reducer = (stack: (Node | Leaf)[], newToken: Token): (Node | Leaf)[] => {
    switch (newToken.type) {
      case 'number':
        return append(stack, {
          value: newToken,
          left: undefined,
          right: undefined,
        })
      case 'operator':
        const y = stack.pop()
        const x = stack.pop()

        if (x && y) {
          return append(stack, {
            value: newToken,
            left: x,
            right: y,
          })
        } else {
          throw Error('Error ocurred while creating the tree')
        }
      default:
        throw Error('Invalid token!')
    }
  }

  const stack = postfixExpression.reduce(reducer, [])

  switch (stack.length) {
    case 1:
      // There must be only one value on the stack - the completed tree
      return stack[0]
    default:
      throw Error('Error ocurred while creating the tree')
  }
}