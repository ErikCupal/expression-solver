import * as Dom from "./Lib/Dom";
import { createTreeFromExpression } from "./Lib/ExpressionSolver/CreateTreeFromExpression";
import { infixTree } from "./Lib/ExpressionSolver/InfixTree";
import { printTree } from "./Lib/ExpressionSolver/PrintTree";
import { solveTree } from "./Lib/ExpressionSolver/SolveTree";
import { div, h1, input, p, render, span, ul } from "./Lib/Html";
import { id, type, value } from "./Lib/HtmlAttributes";

// Initial render

const page =
    div(
        h1("Expression solver"),
        input([
            id("exprInput"),
            type("text"),
            value("")
        ]),
        div([
            id("outputElement")
        ])
    );

render(page, Dom.byId("root"));

// Add event to input

const inputElement = Dom.byId("exprInput");
const outputElement = Dom.byId("outputElement");

inputElement.addEventListener("input", (e: any) => {

    const expr = e.target.value;

    if (expr !== "") {
        try {
            const tree = createTreeFromExpression(expr);

            const result = solveTree(tree);
            const simplified = infixTree(tree);
            const htmlTree = printTree(tree);

            const outputHtml =
                div(
                    p(
                        span(`Result: ${result}`)
                    ),
                    p(
                        span(`Canonical form: ${simplified}`)
                    ),
                    p(
                        span(`Abstraction syntax tree:`),
                        ul(htmlTree)
                    ),
                );

            render(outputHtml, outputElement);

        } catch (error) {
            const errorHtml = p(`Error: ${error}`);
            render(errorHtml, outputElement);
        }
    } else {
        render("", outputElement);
    }
});