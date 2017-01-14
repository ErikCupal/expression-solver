# Expression solver

### A little set of functions for solving mathematical expressions
____________________________

## About

This is a demo implementation of [infix](https://en.wikipedia.org/wiki/Infix_notation) expression solver.
It supports operators +, -, *, /, ^ and parentheses.
Other operators can be easily added.
Unfortunately, it doesn't support [unary](https://en.wikipedia.org/wiki/Unary_operation) operators yet :/.

## [Demo](https://jsfiddle.net/lapuckire/77bcvzox/)

## I want to experiment..

1. [Download](https://nodejs.org/en/) and install latest Node
0. Clone the repo
0. Open terminal in the root folder
0. Run `npm i` in the terminal
0. Run `npm run dev` in the terminal
0. Experiment :)

## How is does it work

The process is divided into several separate functions.

We start with a expression, for example
> `5 + (9* 3) + 2^ 6`

### Tokenize it

1. We transform each character into object with type (number, operator, number divider or parenthesis) and value.
The token objects are stored in array.
0. We throw away whitespaces.
2. We merge consequent single numbers and number dividers (like `.` or `,`) into complete numbers.

We got tokenized array.

### Check for syntax errors

Error is thrown if there is any syntax error.

### Transform the expression into postfix notation

The expression is transform into [postfix](https://en.wikipedia.org/wiki/Reverse_Polish_notation) form (also called reverse polish notation).
We use [Shunting-yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) to achieve it.
The expression will look like this
> `5 9 3 * + 2 6 ^ +`

*It is still stored as array of tokens*

### Create abstraction syntax tree

We create a tree. [Princip](http://learnyouahaskell.com/functionally-solving-problems#reverse-polish-notation-calculator)
(the algorithm was modified to create abstraction syntax tree instead of solving the expression)

### Great, what now?

We got the tree and we can
* Solve the expression
* Print the expression in canonical form
* Print the tree

## Wait! What is this `ts` thing, what is `=>`, `const`, `...` and how come the code is split into several files???

`Ts` is [Typescript](https://www.typescriptlang.org/) filename extension.
Typescript is a superset of Javascript, which adds **optional** support for static typing.
But don't worry, you can still write your code as you are used to, because it's really just superset.

The `=>`, `const`, `let`, `...`, `import`, `export`, `map`, `filter`, `reduce` are all the new features from [ES6](https://github.com/lukehoban/es6features) Javascript standard officialy published in 2015.
They allow to write more readable, safer and shorter code.






