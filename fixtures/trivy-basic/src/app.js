/**
 * Minimal application used for Trivy scanning.
 *
 * Purpose:
 * - Ensure dependency graph exists
 * - Provide deterministic scan surface
 * - Avoid runtime complexity
 */

const _ = require("lodash");

function main() {
  const data = [1, 2, 3, 4];

  // simple lodash usage
  const result = _.shuffle(data);

  console.log("Result:", result);
}

main();