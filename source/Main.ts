import { simplifyExpression } from "./SimplifyExpression";
import { solveExpression } from "./SolveExpression";

const expr = `(5 * 9) ^ 5 + 6 / 9`;

try {
    const solved = solveExpression(expr);

    console.log(`\nResult: ${solved}`);
} catch (error) {
    console.log(`\nError: ${error}`);
}

try {
    const simplified = simplifyExpression(expr);

    console.log(`\nSimplified expresion: ${simplified}`);
} catch (error) {
    console.log(`\nError: ${error}`);
}