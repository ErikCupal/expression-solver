import { checkSyntax } from './checkSyntax'
import { Tree } from './constants'
import { createTree } from './createTree'
import { postfix } from './postfix'
import { tokenize } from './tokenize'
import { pipe } from 'ramda'

/** Resolves the infix notation expression into abstraction syntax tree. */
export const createTreeFromExpression: (infixExpression: string) => Tree =
  pipe(
    tokenize,
    checkSyntax,
    postfix,
    createTree,
  )