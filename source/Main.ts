import { simplifyExpression } from "./SimplifyExpression";
import { solveExpression } from "./SolveExpression";

const expr = `(5 * 9) ^ (4.356 + 1) *6 + (6.684) / 9.53`;
// const expr = `10 - (4 + 3) * 2`;
// const expr = `10 - (8-(3-(6-(7-(8-6)))))`;


try {
    const solved = solveExpression(expr);

    console.log(`Result: ${solved}`);
} catch (error) {
    console.log(`Error: ${error}`);
}

try {
    const simplified = simplifyExpression(expr);

    console.log(`Simplified expresion: ${simplified}`);
} catch (error) {
    console.log(`Error: ${error}`);
}