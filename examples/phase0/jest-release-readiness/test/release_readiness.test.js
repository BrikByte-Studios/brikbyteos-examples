const { evaluateReleaseReadiness } = require("../src/release_readiness");

describe("evaluateReleaseReadiness", () => {
  test("rejects deployment when a security blocker exists", () => {
    const result = evaluateReleaseReadiness({
      failedChecks: 0,
      securityBlocker: true,
      performanceRegression: false
    });

    expect(result).toEqual({
      deployable: false,
      reason: "security_blocker"
    });
  });

  test("rejects deployment when performance regression exists", () => {
    const result = evaluateReleaseReadiness({
      failedChecks: 0,
      securityBlocker: false,
      performanceRegression: true
    });

    expect(result).toEqual({
      deployable: false,
      reason: "performance_regression"
    });
  });

  test("rejects deployment when failed checks exist", () => {
    const result = evaluateReleaseReadiness({
      failedChecks: 2,
      securityBlocker: false,
      performanceRegression: false
    });

    expect(result).toEqual({
      deployable: false,
      reason: "failed_checks"
    });
  });

  test("approves deployment when no release blockers exist", () => {
    const result = evaluateReleaseReadiness({
      failedChecks: 0,
      securityBlocker: false,
      performanceRegression: false
    });

    expect(result).toEqual({
      deployable: true,
      reason: "clean"
    });
  });
});