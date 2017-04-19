import * as Dom from './html/dom'
import { createTreeFromExpression } from './createTreeFromExpression'
import { infixTree } from './infixTree'
import { printTree } from './printTree'
import { solveTree } from './solveTree'
import { div, h1, input, p, render, span, ul } from './html'
import { id, type, value } from './html/attributes'

/**
 * li, ul, p, div... functions create HTML in string format
 * They accept variable number of parameters - children
 * If the first parameter is array, it is considered as array of tag attributes.
 * 
 * id, type, value... functions create HTML attributes, e.g id("container") => `id="container"`
 * 
 * render method simply sets innerHTML of HTML element
 */

// Initial render

const page =
    div(
        h1('Expression solver'),
        input([
            id('exprInput'),
            type('text'),
            value(''),
        ]),
        div([
            id('outputElement'),
        ]),
    )

render(page, Dom.getById('root'))

// Add event to input

const inputElement = Dom.getById('exprInput')
const outputElement = Dom.getById('outputElement')

// tslint:disable-next-line:no-any
inputElement.addEventListener('input', (e: any) => {

    // Get the input expression
    const expr = e.target.value

    if (expr !== '') {
        try {
            const tree = createTreeFromExpression(expr)

            const result = solveTree(tree)
            const simplified = infixTree(tree)
            const htmlTree = printTree(tree)

            const outputHtml =
                div(
                    p(
                        span(`Result: ${result}`),
                    ),
                    p(
                        span(`Canonical form: ${simplified}`),
                    ),
                    p(
                        span(`Abstraction syntax tree:`),
                        ul(htmlTree),
                    ),
                )

            render(outputHtml, outputElement)

        } catch (error) {
            const errorHtml = p(`Error: ${error}`)
            render(errorHtml, outputElement)
        }
    } else {
        render('', outputElement)
    }
})