# Expression solver

### A little set of functions for solving mathematical expressions
____________________________

## About

This is a demo implementation of [infix](https://en.wikipedia.org/wiki/Infix_notation) expression solver.
It supports operators +, -, *, /, ^ and parentheses.
Other operators can be easily added.
Unfortunately, it doesn't support [unary](https://en.wikipedia.org/wiki/Unary_operation) operators yet :/.
It is written using functional Javascript.

This repo was created for learning purposes.

## [Demo](https://jsfiddle.net/lapuckire/77bcvzox/)

## I want to experiment..

1. [Download](https://nodejs.org/en/) and install latest Node
0. Clone the repo (terminal -> `git clone https://github.com/ErikCupal/expression-solver.git`)
0. Open terminal in the root folder
0. Run `npm i` in the terminal
0. Run `npm run dev` in the terminal
0. Experiment with the source code :). The page is automatically updated on file save.

## How to bundle it into single Javascript file

Run `npm run pack` in terminal. There will be `app.js` file in `output` folder.

## How does it work

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

## Wait! What is this `ts` thing, what is `=>`, `const`, `...` and how come the code is split into several files??? I can't understand a thing!

### Typescript

`Ts` is [Typescript](https://www.typescriptlang.org/) filename extension.
Typescript is a superset of Javascript, which adds **optional** support for static typing.
Every time you see `: SomeType` (unless its property definition in
[object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals)),
you know it is a type annotation.
The types can beeither `string`, `number`, `boolean`, `{}`, `[]` or custom typescreated using these basic types.
Types are defined by `type` keyword.
All types and type annotation are removed during transpilation, that's why Typescript is compatible with Javascript code

But don't worry, you can still write your code as you are used to
(as long as it's valid code, don't even try such a nastyness as `"5" * 3` :D),
because it's really just superset.

### ES6

The `=>`, `const`, `let`, `...`, `import`, `export`, `map`, `filter`, `reduce` are all the new features from [ES6](https://github.com/lukehoban/es6features) (officialy named ECMAScript 2015) Javascript standard officialy published in 2015.
They allow to write more readable, safer and shorter code. ES6 also enables to split the code into several files (therefore the `import` and `export` keywords).
If want, consider adopting at least some of the new concepts. All modern browsers support ES6 and it can be easily [polyfilled](https://en.wikipedia.org/wiki/Polyfill) for the older one (this project uses polyfill).






