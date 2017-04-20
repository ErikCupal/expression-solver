import { Tree } from './constants'

/** Solves an abstraction syntax tree. */
export const solveTree = ({ value, left, right }: Tree): number => {
  switch (value.type) {
    case 'number':
      return value.value
    case 'operator':
      if (left && right) {
        const operator = value

        // Ckecks whether the operator has a function
        // Apply operator's function on left and right leaves
        // and return the result
        if (operator.function) {
          return operator.function(
            solveTree(left),
            solveTree(right),
          )
        } else {
          throw Error("Operator doesn't have binary function!")
        }
      } else {
        throw Error('Tree error!')
      }
    default:
      throw Error('Unknown token!')
  }
}