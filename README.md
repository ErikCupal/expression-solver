# Expression solver

A little set of functions for solving mathematical expressions

## About

This is a simple implementation of arithmetic expression solver.
It supports binary operators +, -, *, /, ^, %, unary operators +, - and parentheses.
Other operators can be easily added.

## [Demo](https://jsfiddle.net/lapuckire/77bcvzox/)

## I want to experiment

1. Ensure you have latest version of [Node.JS](https://nodejs.org/)
1. Clone the repo: `git clone https://github.com/ErikCupal/expression-solver.git`
1. Run `npm install`
1. Run `npm run dev`
1. Experiment with the source code :). The page is automatically updated on file save.

## How to bundle it into single Javascript file

Run `npm run build` in terminal. It generates 'index.js' in 'build' folder.

## How does it work

The process is divided into several separate functions.

We start with an expression, for example
> `5 + (9* 3) + 2^ 6`

### Tokenize it

1.We transform each character into object with type (number, operator, number divider or parenthesis), value and possibly other properties (like precedance for operators).
The token objects are stored in array.
1.We throw away whitespaces.
1.We check for any unary operators and resolve them right away - e.g. `-5 * (-8)`
1.We merge consequent single numbers and number dividers (like `.` or `,`) into complete numbers.

We got tokenized array.

### Check for syntax errors

Error is thrown if there is any syntax error.

### Transform the expression into postfix notation

The expression is transformed into [postfix](https://en.wikipedia.org/wiki/Reverse_Polish_notation) form (also called reverse polish notation).
We use [Shunting-yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) to achieve it.
The expression will look like this (still in form of tokens).
> `5 9 3 * + 2 6 ^ +`

### Create abstraction syntax tree

We create a tree. [Princip of algorithm](http://learnyouahaskell.com/functionally-solving-problems#reverse-polish-notation-calculator)
I modified the algorithm to create abstraction syntax tree instead of solving the expression. I did so because I am using the tree to canonicalize (remove unnecessary paretheses) the expression as well.

### Great, what now?

We got the tree and we can

* Solve the expression -> `96` (Simple recursive tree algorithm - We go through nodes of our tree. If the node value is a number, we return it. If the node value is an operator, we apply the operator on the node leaves.)
* Print the expression in canonical form -> `5 + 9 * 3 + 2 ^ 6`
* Print the tree:
  * Add
    * Add
      * 5
      * Multiply
        * 9
        * 3
    * Power
      * 2
      * 6