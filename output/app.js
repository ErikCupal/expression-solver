/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/output/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Dom = __webpack_require__(2);

	var Dom = _interopRequireWildcard(_Dom);

	var _CreateTreeFromExpression = __webpack_require__(3);

	var _InfixTree = __webpack_require__(13);

	var _PrintTree = __webpack_require__(14);

	var _SolveTree = __webpack_require__(16);

	var _Html = __webpack_require__(15);

	var _HtmlAttributes = __webpack_require__(17);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
	var page = (0, _Html.div)((0, _Html.h1)("Expression solver"), (0, _Html.input)([(0, _HtmlAttributes.id)("exprInput"), (0, _HtmlAttributes.type)("text"), (0, _HtmlAttributes.value)("")]), (0, _Html.div)([(0, _HtmlAttributes.id)("outputElement")]));
	(0, _Html.render)(page, Dom.byId("root"));
	// Add event to input
	var inputElement = Dom.byId("exprInput");
	var outputElement = Dom.byId("outputElement");
	inputElement.addEventListener("input", function (e) {
	    // Get the input expression
	    var expr = e.target.value;
	    if (expr !== "") {
	        try {
	            var tree = (0, _CreateTreeFromExpression.createTreeFromExpression)(expr);
	            var result = (0, _SolveTree.solveTree)(tree);
	            var simplified = (0, _InfixTree.infixTree)(tree);
	            var htmlTree = (0, _PrintTree.printTree)(tree);
	            var outputHtml = (0, _Html.div)((0, _Html.p)((0, _Html.span)("Result: " + result)), (0, _Html.p)((0, _Html.span)("Canonical form: " + simplified)), (0, _Html.p)((0, _Html.span)("Abstraction syntax tree:"), (0, _Html.ul)(htmlTree)));
	            (0, _Html.render)(outputHtml, outputElement);
	        } catch (error) {
	            var errorHtml = (0, _Html.p)("Error: " + error);
	            (0, _Html.render)(errorHtml, outputElement);
	        }
	    } else {
	        (0, _Html.render)("", outputElement);
	    }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var byId = exports.byId = function byId(elementId) {
	  return document.getElementById(elementId);
	};
	var byClass = exports.byClass = function byClass(elementId) {
	  return document.getElementsByClassName(elementId);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createTreeFromExpression = undefined;

	var _CheckSyntax = __webpack_require__(4);

	var _CreateTree = __webpack_require__(8);

	var _Postfix = __webpack_require__(9);

	var _Tokenize = __webpack_require__(10);

	var _Pipe = __webpack_require__(11);

	/**
	 * Resolves the infix notation expression into abstraction syntax tree.
	 *
	 * The expression can contain operators and parentheses
	 *
	 * @param infixExpression An expression in infix notation
	 * @returns Abstraction syntax tree
	 */
	var createTreeFromExpression =
	/**
	 * For explanation of the pipe function refer to
	 *      Documentation in ./Lib/ExpressionSolver/Pipe
	 *      Or better here :) http://vanslaars.io/post/create-pipe-function/
	 */
	exports.createTreeFromExpression = (0, _Pipe.pipe)(_Tokenize.tokenize, _CheckSyntax.checkSyntax, _Postfix.postfix, _CreateTree.createTree);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.checkSyntax = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _Constants = __webpack_require__(5);

	var _Errors = __webpack_require__(6);

	var _Lists = __webpack_require__(7);

	var RIGHT_PAR = _Constants.ParenthesisTokens.RIGHT_PAR,
	    LEFT_PAR = _Constants.ParenthesisTokens.LEFT_PAR;
	var PARENTHESES_ERROR = _Errors.Errors.PARENTHESES_ERROR,
	    PAREN_OR_OPER_ERROR = _Errors.Errors.PAREN_OR_OPER_ERROR,
	    OPERATORS_ERROR = _Errors.Errors.OPERATORS_ERROR,
	    UNKNOWN_CHAR_ERROR = _Errors.Errors.UNKNOWN_CHAR_ERROR;
	/**
	 * Takes tokenized expression returns it back. Throws exception in case of syntax error.
	 */

	var checkSyntax = exports.checkSyntax = function checkSyntax(tokens) {
	    /**
	     * Takes stack of Tokens (array) and new token
	     *
	     * Returns modified stack
	     *
	     * Read below how reduce function works :)
	     */
	    var syntaxCheckReducer = function syntaxCheckReducer(stack, newToken) {
	        // Takes the first element from the stack
	        var _stack = _slicedToArray(stack, 1),
	            lastToken = _stack[0];

	        if (lastToken === undefined) {
	            // The stack is empty - we're at the beginning of the reduce function
	            switch (newToken.type) {
	                case "operator":
	                    // Operator can't be at the beginning of the expression
	                    throw OPERATORS_ERROR;
	            }
	            // Return new stack array with the new token
	            return [newToken];
	        } else {
	            switch (lastToken.type) {
	                case "operator":
	                    switch (newToken.type) {
	                        case "operator":
	                            // Can't have two consequent operators in expression
	                            throw OPERATORS_ERROR;
	                        case "parenthesis":
	                            switch (newToken) {
	                                case RIGHT_PAR:
	                                    // e.g. *) - nonsense
	                                    throw PAREN_OR_OPER_ERROR;
	                            }
	                            break;
	                    }
	                    break;
	                case "parenthesis":
	                    switch (lastToken) {
	                        case LEFT_PAR:
	                            switch (newToken.type) {
	                                case "operator":
	                                    // e.g. (* - nonsense
	                                    throw PAREN_OR_OPER_ERROR;
	                                case "parenthesis":
	                                    switch (newToken) {
	                                        case RIGHT_PAR:
	                                            // () - dissallowed, though this rule might be possibly omitted
	                                            throw PARENTHESES_ERROR;
	                                    }
	                                    break;
	                            }
	                            break;
	                        case RIGHT_PAR:
	                            switch (newToken.type) {
	                                case "parenthesis":
	                                    switch (newToken) {
	                                        case LEFT_PAR:
	                                            // )( - dissallowed
	                                            throw PARENTHESES_ERROR;
	                                    }
	                                    break;
	                            }
	                            break;
	                    }
	                    break;
	            }
	            // Add new token at the beginning of the stack 
	            return (0, _Lists.prepend)(stack, newToken);
	        }
	    };
	    var checked = tokens.reduce(syntaxCheckReducer, []).reverse();
	    var lastTokenInArray = (0, _Lists.last)(checked);
	    if (lastTokenInArray && lastTokenInArray.type === "operator") {
	        // Operator can't be at the end of the expression
	        throw OPERATORS_ERROR;
	    }
	    // Everything is fine, return the original array
	    return tokens;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// Typescript types, used for proper typechecking
	/**
	 * Constant and readonly object of OperatorToken objects
	 */
	var OperatorTokens = exports.OperatorTokens = {
	    PLUS: {
	        type: "operator",
	        value: "+",
	        literalValue: "Add",
	        function: function _function(a, b) {
	            return a + b;
	        },
	        unaryFunction: function unaryFunction(a) {
	            return a;
	        },
	        precedance: 2,
	        associativity: "left",
	        associative: true
	    },
	    MULTIPLY: {
	        type: "operator",
	        value: "*",
	        literalValue: "Multiply",
	        function: function _function(a, b) {
	            return a * b;
	        },
	        precedance: 3,
	        associativity: "left",
	        associative: true
	    },
	    MINUS: {
	        type: "operator",
	        value: "-",
	        literalValue: "Subtract",
	        function: function _function(a, b) {
	            return a - b;
	        },
	        unaryFunction: function unaryFunction(a) {
	            return -a;
	        },
	        precedance: 2,
	        associativity: "left"
	    },
	    DIVIDE: {
	        type: "operator",
	        value: "/",
	        literalValue: "Divide",
	        function: function _function(a, b) {
	            return a / b;
	        },
	        precedance: 3,
	        associativity: "left"
	    },
	    REMAINDER: {
	        type: "operator",
	        value: "%",
	        literalValue: "Remainder",
	        function: function _function(a, b) {
	            return a % b;
	        },
	        precedance: 3,
	        associativity: "left"
	    },
	    POWER: {
	        type: "operator",
	        value: "^",
	        literalValue: "Power",
	        function: function _function(a, b) {
	            return Math.pow(a, b);
	        },
	        precedance: 4,
	        associativity: "right"
	    }
	};
	/**
	 * Constant and readonly object of ParenthesisToken objects
	 */
	var ParenthesisTokens = exports.ParenthesisTokens = {
	    LEFT_PAR: {
	        type: "parenthesis",
	        value: "("
	    },
	    RIGHT_PAR: {
	        type: "parenthesis",
	        value: ")"
	    }
	};
	/**
	 * Constant and readonly object of NumberDividerToken objects
	 */
	var NumberDividerTokens = exports.NumberDividerTokens = {
	    COMMA: {
	        type: "numberDivider",
	        value: ","
	    },
	    DOT: {
	        type: "numberDivider",
	        value: "."
	    }
	};
	// Token getters
	/**
	 * Gets OperatorToken from OperatorTokens object
	 */
	var getOperatorToken = exports.getOperatorToken = function getOperatorToken(value) {
	    return Object.values(OperatorTokens).find(function (operatorToken) {
	        return value === operatorToken.value;
	    });
	};
	/**
	 * Gets ParenthesisToken from ParenthesisTokens object
	 */
	var getParenthesisToken = exports.getParenthesisToken = function getParenthesisToken(value) {
	    return Object.values(ParenthesisTokens).find(function (par) {
	        return value === par.value;
	    });
	};
	/**
	 * Gets NumberDividerToken from NumberDividerTokens object
	 */
	var getNumberDividerToken = exports.getNumberDividerToken = function getNumberDividerToken(value) {
	    return Object.values(NumberDividerTokens).find(function (par) {
	        return value === par.value;
	    });
	};
	// Token type checkers
	/**
	 * Checks whether the operator exists in OperatorTokens object
	 */
	var isOperator = exports.isOperator = function isOperator(value) {
	    if (Object.values(OperatorTokens).find(function (operator) {
	        return value === operator.value;
	    })) {
	        return true;
	    } else {
	        return false;
	    }
	};
	/**
	 * Checks whether the parenthesis exists in ParenthesisTokens object
	 */
	var isParenthesis = exports.isParenthesis = function isParenthesis(value) {
	    if (Object.values(ParenthesisTokens).find(function (par) {
	        return value === par.value;
	    })) {
	        return true;
	    } else {
	        return false;
	    }
	};
	/**
	 * Checks whether the number divider exists in NumberDividerTokens object
	 */
	var isNumberDivider = exports.isNumberDivider = function isNumberDivider(value) {
	    if (Object.values(NumberDividerTokens).find(function (par) {
	        return value === par.value;
	    })) {
	        return true;
	    } else {
	        return false;
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Errors = exports.Errors = {
	    PARENTHESES_ERROR: "Misplaced parenthesis!",
	    PAREN_OR_OPER_ERROR: "Misplaced operators or parenthesis!",
	    OPERATORS_ERROR: "Misplaced operators!",
	    UNKNOWN_CHAR_ERROR: "Unknown character!",
	    OPER_OR_NODE_ERROR: "Invalid operator or node!",
	    TOKEN_ERROR: "Invalid token!"
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Returns the last element of the array.
	 *
	 * @param array The source array.
	 */
	/**
	 * Returns the last element of the array.
	 *
	 * @param array The source array.
	 */var last = exports.last = function last(array) {
	  return array ? array[array.length - 1] : undefined;
	};
	/**
	 * Returns the first element of the array
	 *
	 * @param array The source array.
	 */
	var head = exports.head = function head(array) {
	  return array[0];
	};
	/**
	 * Takes array, removes first element and returns the array
	 *
	 * **The function mutates original array.**
	 *
	 */
	var tail = exports.tail = function tail(array) {
	  array.shift();
	  return array;
	};
	/**
	 * Takes array, appends element(s) at the end and returns the array
	 *
	 * **The function mutates original array.**
	 * .
	 */
	var append = exports.append = function append(array) {
	  for (var _len = arguments.length, elements = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    elements[_key - 1] = arguments[_key];
	  }

	  array.push.apply(array, elements);
	  return array;
	};
	/**
	 * Takes array, appends element(s) at the beginning and returns the array
	 *
	 * **The function mutates original array.**
	 * .
	 */
	var prepend = exports.prepend = function prepend(array) {
	  for (var _len2 = arguments.length, elements = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    elements[_key2 - 1] = arguments[_key2];
	  }

	  array.unshift.apply(array, elements);
	  return array;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createTree = undefined;

	var _Lists = __webpack_require__(7);

	/**
	 * Takes a postfix expression and returns an abstraction syntax tree.
	 *
	 * [Princip](http://learnyouahaskell.com/functionally-solving-problems#reverse-polish-notation-calculator)
	 * (the algorithm was modified to create an abstraction syntax tree).
	 */
	var createTree = exports.createTree = function createTree(postfixExpression) {
	    /**
	     * Takes stack of Nodes or Leaves (array) and new token
	     *
	     * Returns modified stack
	     *
	     * Read below how reduce function works :)
	     */
	    var reducer = function reducer(stack, newToken) {
	        switch (newToken.type) {
	            case "number":
	                // In case the new token is a number, push it onto the stack
	                return (0, _Lists.append)(stack, {
	                    value: newToken,
	                    left: undefined,
	                    right: undefined
	                });
	            case "operator":
	                // In case the new token is operator
	                // 1) pop two nodes or leaves of the stack
	                // 2) create new node with the newToken as token and the two popped nodes (leaves) its leaves
	                // 3) push the new node on the stack
	                var y = stack.pop();
	                var x = stack.pop();
	                // Checks whether x and y exist
	                if (x && y) {
	                    return (0, _Lists.append)(stack, {
	                        value: newToken,
	                        left: x,
	                        right: y
	                    });
	                } else {
	                    // Impossible, can't happen
	                    throw "Error ocurred while creating the tree";
	                }
	            default:
	                throw "Invalid token!";
	        }
	    };
	    /**
	     * Reduce function (method of Array object) does this:
	     *
	     * It takes a function as first parameter
	     *
	     * It iterates over the array and calls the function on each iteration
	     *      It provides the function two parameters
	     *          1) accumulated value <- read below
	     *          2) new value from the array
	     *      The function returns something - the something will be passed as the accumulated value during next iteration
	     * After the iteration finished, it returns the accumulated value
	     *
	     * In this case the accumulated value is our stack
	     *
	     * On the very first iteration there is no accumulated value - we must provide initial value to the reduce function
	     *      In this case: empty array [] -----------
	     *                                              |
	     *                                              |
	     */
	    var stack = postfixExpression.reduce(reducer, []);
	    switch (stack.length) {
	        case 1:
	            // There must be only one value on the stack - the completed tree
	            return stack[0];
	        default:
	            throw "Error ocurred while creating the tree";
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.postfix = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _Constants = __webpack_require__(5);

	var _Errors = __webpack_require__(6);

	var _Lists = __webpack_require__(7);

	var LEFT_PAR = _Constants.ParenthesisTokens.LEFT_PAR,
	    RIGHT_PAR = _Constants.ParenthesisTokens.RIGHT_PAR;
	var PARENTHESES_ERROR = _Errors.Errors.PARENTHESES_ERROR;
	/**
	 * Takes tokenized infix expression and returns its postfix form.
	 *
	 * Implemented using [Shunting-yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm).
	 */

	var postfix = exports.postfix = function postfix(infixTokens) {
	    var processOperator = function processOperator(_ref, currOp) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            outputStack = _ref2[0],
	            specialTokenStack = _ref2[1];

	        // Take last operator from the array
	        var _specialTokenStack = _slicedToArray(specialTokenStack, 1),
	            lastOp = _specialTokenStack[0];

	        if (lastOp === undefined) {
	            return [outputStack, [currOp]];
	        } else {
	            var meetsAlgorithmConditions = lastOp.type === "operator" && (currOp.associativity === "left" && currOp.precedance <= lastOp.precedance || currOp.associativity === "right" && currOp.precedance < lastOp.precedance);
	            switch (true) {
	                case meetsAlgorithmConditions:
	                    specialTokenStack.shift();
	                    return processOperator([(0, _Lists.append)(outputStack, lastOp), specialTokenStack], currOp);
	                default:
	                    return [outputStack, (0, _Lists.prepend)(specialTokenStack, currOp)];
	            }
	        }
	    };
	    var processRightParenthesis = function processRightParenthesis(_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2),
	            output = _ref4[0],
	            specialTokenStack = _ref4[1];

	        var lastToken = specialTokenStack.shift();
	        if (lastToken === undefined) {
	            // There must be some token on the stack if there is unmatched right parenthesis
	            throw PARENTHESES_ERROR;
	        } else {
	            switch (lastToken) {
	                case LEFT_PAR:
	                    return [output, specialTokenStack];
	                default:
	                    return processRightParenthesis([(0, _Lists.append)(output, lastToken), specialTokenStack]);
	            }
	        }
	    };
	    var processSpecialTokensStack = function processSpecialTokensStack(_ref5) {
	        var _ref6 = _slicedToArray(_ref5, 2),
	            output = _ref6[0],
	            specialTokens = _ref6[1];

	        switch (specialTokens.length) {
	            case 0:
	                return output;
	            default:
	                var parenthesisToken = specialTokens.find(function (token) {
	                    return token.type === "parenthesis";
	                });
	                if (parenthesisToken) {
	                    // There can't be any parenthesis on the specialTokens stack in this moment
	                    throw PARENTHESES_ERROR;
	                }
	                // create new array
	                //      output with appended specialTokens stack at the end of the putput
	                return output.concat(specialTokens);
	        }
	    };
	    /**
	     * The algorith is described [here](https://en.wikipedia.org/wiki/Shunting-yard_algorithm).
	     *
	     *
	     * Takes stack of Tokens (array) and new token
	     *
	     * Returns modified stack
	     *
	     * Read below how reduce function works :)
	     */
	    var reducer = function reducer(_ref7, a) {
	        var _ref8 = _slicedToArray(_ref7, 2),
	            output = _ref8[0],
	            specialTokens = _ref8[1];

	        if (output.length === 0) {
	            // The array is empty - we're at the beginning of reduce function
	            switch (a.type) {
	                case "number":
	                    return [[a], specialTokens];
	                case "operator":
	                    return [[], (0, _Lists.prepend)(specialTokens, a)];
	                case "parenthesis":
	                    switch (a) {
	                        case LEFT_PAR:
	                            return [[], (0, _Lists.prepend)(specialTokens, a)];
	                        case RIGHT_PAR:
	                            throw PARENTHESES_ERROR;
	                    }
	                default:
	                    throw "Unknown token " + a;
	            }
	        } else {
	            switch (a.type) {
	                case "number":
	                    return [(0, _Lists.append)(output, a), specialTokens];
	                case "operator":
	                    return processOperator([output, specialTokens], a);
	                case "parenthesis":
	                    switch (a) {
	                        case LEFT_PAR:
	                            return [output, (0, _Lists.prepend)(specialTokens, a)];
	                        case RIGHT_PAR:
	                            return processRightParenthesis([output, specialTokens]);
	                    }
	                default:
	                    throw "Unknown token " + a;
	            }
	        }
	    };
	    // Explanation of reduce function is in ./Lib/ExpressionSolver/CreateTree (end of the file)
	    var stacks = infixTokens.reduce(reducer, [[], []]);
	    return processSpecialTokensStack(stacks);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.tokenize = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _Constants = __webpack_require__(5);

	var _Errors = __webpack_require__(6);

	var _Lists = __webpack_require__(7);

	var _Pipe = __webpack_require__(11);

	var _TypeGuards = __webpack_require__(12);

	var UNKNOWN_CHAR_ERROR = _Errors.Errors.UNKNOWN_CHAR_ERROR;
	var LEFT_PAR = _Constants.ParenthesisTokens.LEFT_PAR;
	/**
	 * Takes an expression and maps every character to Token object.
	 *
	 * - A number character is mapped to new NumberToken object.
	 * - An operator, parenthesis or number divider is mapped to constant object located in *"./Constants"*.
	 * - A whitespace is filtered out.
	 * - Throws exception in case of unknown character.
	 */

	var tokenizeSingleChars = function tokenizeSingleChars(input) {
	    return Array.from(input).map(function (char) {
	        switch (true) {
	            case (0, _TypeGuards.isInteger)(char):
	                return {
	                    type: "number",
	                    value: Number(char)
	                };
	            case (0, _Constants.isOperator)(char):
	                return (0, _Constants.getOperatorToken)(char);
	            case (0, _Constants.isParenthesis)(char):
	                return (0, _Constants.getParenthesisToken)(char);
	            case (0, _Constants.isNumberDivider)(char):
	                return (0, _Constants.getNumberDividerToken)(char);
	            case (0, _TypeGuards.isWhitespace)(char):
	                return undefined;
	            default:
	                throw UNKNOWN_CHAR_ERROR;
	        }
	    }).filter(function (token) {
	        return token;
	    });
	};
	var resolveUnaryOperators = function resolveUnaryOperators(array) {
	    var reducer = function reducer(outputStack, newToken) {
	        switch (outputStack.length) {
	            case 0:
	                return (0, _Lists.prepend)(outputStack, newToken);
	            case 1:
	                var _outputStack = _slicedToArray(outputStack, 1),
	                    last = _outputStack[0];

	                if (last.type === "operator" && last.unaryFunction) {
	                    if (newToken.type === "number") {
	                        outputStack.shift();
	                        return (0, _Lists.prepend)(outputStack, {
	                            type: newToken.type,
	                            value: last.unaryFunction(newToken.value)
	                        });
	                    }
	                }
	                return (0, _Lists.prepend)(outputStack, newToken);
	            default:
	                var _outputStack2 = _slicedToArray(outputStack, 2),
	                    firstLast = _outputStack2[0],
	                    secondLast = _outputStack2[1];

	                if (secondLast === LEFT_PAR) {
	                    if (firstLast.type === "operator" && firstLast.unaryFunction) {
	                        if (newToken.type === "number") {
	                            outputStack.shift();
	                            outputStack.shift();
	                            return (0, _Lists.prepend)(outputStack, {
	                                type: newToken.type,
	                                value: firstLast.unaryFunction(newToken.value)
	                            }, LEFT_PAR);
	                        }
	                    }
	                }
	                return (0, _Lists.prepend)(outputStack, newToken);
	        }
	    };
	    return array.reduce(reducer, []).reverse();
	};
	/**
	 * Takes a single character tokenized expression.
	 * Returns tokenized expression with merged single digits NumberTokens into complete number NumberTokes.
	 */
	var mergeNumbers = function mergeNumbers(array) {
	    /**
	     * Takes stack of Tokens (array) and new token
	     *
	     * Returns modified stack
	     *
	     * Read below how reduce function works :)
	     */
	    var mergeReducer = function mergeReducer(outputStack, newToken) {
	        // Take first token from the stack
	        var _outputStack3 = _slicedToArray(outputStack, 1),
	            lastToken = _outputStack3[0];

	        if (lastToken === undefined) {
	            // We're at the beginning of the array
	            switch (newToken.type) {
	                case "number":
	                    /**
	                     * Hmm number, just create array with this it
	                     */
	                    return [newToken];
	                case "numberDivider":
	                    /**
	                     * It's possible it can be like .3 -> 0.3
	                     * We create a number from it and we mark it's
	                     * a decimal by setting decimalPlace to 0
	                     */
	                    return [{
	                        type: "number",
	                        value: 0,
	                        decimalPlace: 0
	                    }];
	                default:
	                    return [newToken];
	            }
	        } else {
	            switch (lastToken.type) {
	                case "number":
	                    // We throw away the first element from the array
	                    // because we need to replace it with another token
	                    outputStack.shift();
	                    switch (newToken.type) {
	                        case "number":
	                            /**
	                             * Two numbers
	                             * Let's multiply the previous number by 10 and add them together
	                             * If it is decimal increase the decimalPlace property
	                             */
	                            return (0, _Lists.prepend)(outputStack, {
	                                type: lastToken.type,
	                                value: lastToken.value * 10 + newToken.value,
	                                decimalPlace: typeof lastToken.decimalPlace === "number" ? lastToken.decimalPlace + 1 : undefined
	                            });
	                        case "numberDivider":
	                            /**
	                             * e.g 4562.
	                             * We set decimalPlace to 0 to mark it's a decimal
	                             */
	                            return (0, _Lists.prepend)(outputStack, {
	                                type: lastToken.type,
	                                value: lastToken.value,
	                                decimalPlace: 0
	                            });
	                        default:
	                            switch (lastToken.decimalPlace !== undefined) {
	                                case true:
	                                    /**
	                                     * In case the number is decimal
	                                     *      shift the number by decimalPlace number
	                                     */
	                                    return (0, _Lists.prepend)(outputStack, newToken, {
	                                        type: lastToken.type,
	                                        value: lastToken.value * Math.pow(10, -lastToken.decimalPlace)
	                                    });
	                                default:
	                                    return (0, _Lists.prepend)(outputStack, newToken, lastToken);
	                            }
	                    }
	                default:
	                    switch (newToken.type) {
	                        case "number":
	                            // We're creating new NumberToken object in order to get rid of the helper
	                            // decimalPlace: undefined property
	                            return (0, _Lists.prepend)(outputStack, {
	                                type: newToken.type,
	                                value: newToken.value
	                            });
	                        case "numberDivider":
	                            /**
	                             * e.g. last = *, new = .
	                             * It's possible it can be like .3 -> 0.3
	                             * We create a number from it and we mark it's
	                             * a decimal by setting decimalPlace to 0
	                             */
	                            return (0, _Lists.prepend)(outputStack, {
	                                type: "number",
	                                value: 0,
	                                decimalPlace: 0
	                            });
	                        default:
	                            return (0, _Lists.prepend)(outputStack, newToken);
	                    }
	            }
	        }
	        ;
	    };
	    var outputStack = array.reduce(mergeReducer, []);
	    var lastToken = outputStack[0];
	    if (lastToken) {
	        if (lastToken.type === "number" && lastToken.decimalPlace !== undefined) {
	            /**
	             * In case the number is decimal
	             *      shift the number by decimalPlace number
	             */
	            lastToken = {
	                type: lastToken.type,
	                value: lastToken.value * Math.pow(10, -lastToken.decimalPlace)
	            };
	        }
	    }
	    return outputStack.reverse();
	};
	/**
	 * Takes an expression. Returns tokenized expression.
	 */
	var tokenize =
	/**
	 * For explanation of the pipe function refer to
	 *      Documentation in ./Lib/ExpressionSolver/Pipe
	 *      Or better here :) http://vanslaars.io/post/create-pipe-function/
	 */
	exports.tokenize = (0, _Pipe.pipe)(tokenizeSingleChars, resolveUnaryOperators, mergeNumbers);

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var combineReducer = function combineReducer(param, func) {
	  return func(param);
	};
	var combine = function combine(param, funcs) {
	  return funcs.reduce(combineReducer, param);
	};
	/**
	 * Takes variable number of functions which take one parameter. Returns a function,
	 * which is their sequenced combination. The returned function takes one parameter.
	 */
	var untypedPipe = function untypedPipe() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function (param) {
	    return combine(param, funcs);
	  };
	};
	/**
	 * We're creating 20 diferent Typescript overloads in order to support proper typechecking.
	 * Unfortunately Typescript doesn't have any other reasonable way to do it now,
	 * we got to type it manually. Typechecking is limited for first 19 overloads,
	 * there is not much chance you would need more.
	 */

	var PipeClass = function () {
	  function PipeClass() {
	    _classCallCheck(this, PipeClass);
	  }

	  _createClass(PipeClass, null, [{
	    key: "typedPipe",

	    // The actual method
	    /**
	     * Takes variable number of functions which take one parameter. Returns a function,
	     * which is their sequenced combination. The returned function takes one parameter.
	     */
	    value: function typedPipe(f1, f2) {
	      for (var _len2 = arguments.length, fnArray = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        fnArray[_key2 - 2] = arguments[_key2];
	      }

	      switch (true) {
	        case fnArray.length >= 1:
	          return untypedPipe.apply(undefined, [f1, f2].concat(fnArray));
	        default:
	          return untypedPipe(f1, f2);
	      }
	    }
	  }]);

	  return PipeClass;
	}();
	/**
	 * Takes variable number of functions which take one parameter. Returns a function,
	 * which is their sequenced combination. The returned function takes one parameter.
	 */


	var pipe = exports.pipe = PipeClass.typedPipe;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Checks whether the input string is integer.
	 */
	/**
	 * Checks whether the input string is integer.
	 */var isInteger = exports.isInteger = function isInteger(value) {
	  return (/^\d+$/.test(value)
	  );
	};
	/**
	 * Checks whether the input string is whitespace.
	 */
	var isWhitespace = exports.isWhitespace = function isWhitespace(value) {
	  return (/\s/.test(value)
	  );
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.infixTree = exports.shouldParenthesize = undefined;

	var _Errors = __webpack_require__(6);

	var OPER_OR_NODE_ERROR = _Errors.Errors.OPER_OR_NODE_ERROR,
	    TOKEN_ERROR = _Errors.Errors.TOKEN_ERROR;

	var LEFT = "left";
	var RIGHT = "right";
	/**
	 * Tells whether parentheses are needed
	 *
	 * @param child The operator of the concerned node.
	 * @param parent The operator of the parent node.
	 * @param nodeType Type of the child node in relation to its parent node. Either "left" or "right".
	 * @returns boolean
	 */
	var shouldParenthesize = exports.shouldParenthesize = function shouldParenthesize(child, parent, nodeType) {
	    switch (true) {
	        case child.precedance < parent.precedance:
	            return true;
	        case child.precedance > parent.precedance:
	            return false;
	        case child.precedance === parent.precedance:
	            // Special case - associative operator -> (wiki)[https://en.wikipedia.org/wiki/Operator_associativity]
	            if (parent.associative) {
	                return false;
	            }
	            // Read about operator associativity on (wiki)[https://en.wikipedia.org/wiki/Operator_associativity]
	            switch (nodeType) {
	                case LEFT:
	                    switch (child.associativity) {
	                        case LEFT:
	                            return false;
	                        case RIGHT:
	                            return true;
	                    }
	                case RIGHT:
	                    switch (child.associativity) {
	                        case LEFT:
	                            return true;
	                        case RIGHT:
	                            return false;
	                    }
	            }
	    }
	    throw OPER_OR_NODE_ERROR;
	};
	/**
	 * Takes an abstraction syntax tree and returns infix expression.
	 */
	var infixTree = exports.infixTree = function infixTree(
	// Create vars value, left and right from the first parameter
	// This notation is ES6 Destructuring
	_ref, parentOp, nodeType) {
	    var value = _ref.value,
	        left = _ref.left,
	        right = _ref.right;

	    switch (value.type) {
	        case "number":
	            // Are parentheses needed?
	            // Look at this example
	            //      5 / (-8-(-8))
	            //      They are needed when
	            //          the number is less than zero
	            //      AND it's node type is left
	            if (value.value < 0 && nodeType === "right") {
	                return "(" + value.value.toString() + ")";
	            } else {
	                return value.value.toString();
	            }
	        case "operator":
	            var leftNode = infixTree(left, value, LEFT);
	            var tokenValue = value.value.toString();
	            var rightNode = infixTree(right, value, RIGHT);
	            if (parentOp && nodeType) {
	                var parenthesize = shouldParenthesize(value, parentOp, nodeType);
	                if (parenthesize) {
	                    return "(" + leftNode + " " + tokenValue + " " + rightNode + ")";
	                } else {
	                    return leftNode + " " + tokenValue + " " + rightNode;
	                }
	            } else {
	                return leftNode + " " + tokenValue + " " + rightNode;
	            }
	    }
	    throw TOKEN_ERROR;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.printTree = undefined;

	var _Html = __webpack_require__(15);

	/**
	 * Creates HTML unordered list tree from the abstraction syntax tree.
	 *
	 * *The implementation does not suppport  operators and functions yet.*
	 */
	var printTree = exports.printTree = function printTree(_ref) {
	    var value = _ref.value,
	        left = _ref.left,
	        right = _ref.right;

	    switch (value.type) {
	        case "number":
	            // li simply creates string "<li>" + children + "</li>"
	            return (0, _Html.li)(value.value.toString());
	        case "operator":
	            var operator = value;
	            if (left && right) {
	                // li simply creates string "<li>" + children + "</li>"
	                // ul simply creates string "<ul>" + children + "</ul>"
	                return (0, _Html.li)(operator.literalValue, (0, _Html.ul)(printTree(left), printTree(right)));
	            } else {
	                throw "Tree error!";
	            }
	        default:
	            throw "Unknown token!";
	    }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	/**
	 * Render HTML in string fromat in the renderElement
	 */
	/**
	 * Render HTML in string fromat in the renderElement
	 */var render = exports.render = function render(html, renderElement) {
	    return renderElement.innerHTML = html;
	};
	var enclosedTag = exports.enclosedTag = function enclosedTag(tagName, params) {
	    if (params) {
	        if (_typeof(params[0]) === "object") {
	            var _params = _toArray(params),
	                attributes = _params[0],
	                children = _params.slice(1);

	            var joinedAttributes = attributes ? attributes.reduce(function (s, x) {
	                return s + " " + x;
	            }, "") : "";
	            var joinedChildren = children ? children.reduce(function (s, x) {
	                return s + x;
	            }, "") : "";
	            return "<" + (tagName + joinedAttributes) + ">" + joinedChildren + "</" + tagName + ">";
	        } else {
	            var _children = params;
	            var _joinedChildren = _children ? _children.reduce(function (s, x) {
	                return s + x;
	            }, "") : "";
	            return "<" + tagName + ">" + _joinedChildren + "</" + tagName + ">";
	        }
	    } else {
	        return "<" + tagName + "></" + tagName + ">";
	    }
	};
	var genTagFunction = exports.genTagFunction = function genTagFunction(tagName) {
	    return function () {
	        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	            params[_key] = arguments[_key];
	        }

	        return enclosedTag(tagName, params);
	    };
	};
	var div = exports.div = genTagFunction("div");
	var p = exports.p = genTagFunction("p");
	var h1 = exports.h1 = genTagFunction("h1");
	var h2 = exports.h2 = genTagFunction("h2");
	var h3 = exports.h3 = genTagFunction("h3");
	var h4 = exports.h4 = genTagFunction("h4");
	var h5 = exports.h5 = genTagFunction("h5");
	var h6 = exports.h6 = genTagFunction("h6");
	var li = exports.li = genTagFunction("li");
	var ul = exports.ul = genTagFunction("ul");
	var button = exports.button = genTagFunction("button");
	var input = exports.input = genTagFunction("input");
	var img = exports.img = genTagFunction("img");
	var a = exports.a = genTagFunction("a");
	var span = exports.span = genTagFunction("span");

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Solves an abstraction syntax tree.
	 */
	var solveTree = exports.solveTree = function solveTree(_ref) {
	    var value = _ref.value,
	        left = _ref.left,
	        right = _ref.right;

	    switch (value.type) {
	        case "number":
	            return value.value;
	        case "operator":
	            if (left && right) {
	                var operator = value;
	                // Ckecks whether the operator has a function
	                // Apply operator's function on left and right leaves
	                // and return the result
	                if (operator.function) {
	                    return operator.function(solveTree(left), solveTree(right));
	                } else {
	                    throw "Operator doesn't have binary function!";
	                }
	            } else {
	                throw "Tree error!";
	            }
	        default:
	            throw "Unknown token!";
	    }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var genAttributeFunction = exports.genAttributeFunction = function genAttributeFunction(attributeName) {
	  return function (value) {
	    return attributeName + "=\"" + value + "\"";
	  };
	};
	var id = exports.id = genAttributeFunction("id");
	var className = exports.className = genAttributeFunction("class");
	var type = exports.type = genAttributeFunction("type");
	var value = exports.value = genAttributeFunction("value");
	var href = exports.href = genAttributeFunction("href");
	var style = exports.style = genAttributeFunction("style");

/***/ }
/******/ ]);