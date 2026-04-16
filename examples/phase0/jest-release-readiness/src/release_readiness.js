/**
 * Evaluate whether a release candidate is deployable.
 *
 * This simulates a production-relevant application rule that can be validated
 * by unit tests before BrikByteOS consumes the resulting Jest evidence.
 *
 * @param {object} input
 * @param {number} input.failedChecks
 * @param {boolean} input.securityBlocker
 * @param {boolean} input.performanceRegression
 * @returns {{
 *   deployable: boolean,
 *   reason: "clean" | "failed_checks" | "security_blocker" | "performance_regression"
 * }}
 */
function evaluateReleaseReadiness(input) {
  if (input.securityBlocker) {
    return {
      deployable: false,
      reason: "security_blocker"
    };
  }

  if (input.performanceRegression) {
    return {
      deployable: false,
      reason: "performance_regression"
    };
  }

  if (input.failedChecks > 0) {
    return {
      deployable: false,
      reason: "failed_checks"
    };
  }

  return {
    deployable: true,
    reason: "clean"
  };
}

module.exports = {
  evaluateReleaseReadiness
};