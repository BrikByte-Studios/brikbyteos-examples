/**
 * Build a deterministic health summary for a service.
 *
 * This function intentionally avoids:
 * - network access
 * - current-time dependency
 * - random values
 *
 * @param {object} deps
 * @param {boolean} deps.databaseConnected
 * @param {boolean} deps.queueConnected
 * @param {boolean} deps.storageConnected
 * @returns {{
 *   status: "healthy" | "degraded",
 *   checks: {
 *     database: "up" | "down",
 *     queue: "up" | "down",
 *     storage: "up" | "down"
 *   }
 * }}
 */
function buildHealthSummary(deps) {
  const checks = {
    database: deps.databaseConnected ? "up" : "down",
    queue: deps.queueConnected ? "up" : "down",
    storage: deps.storageConnected ? "up" : "down"
  };

  const allHealthy =
    checks.database === "up" &&
    checks.queue === "up" &&
    checks.storage === "up";

  return {
    status: allHealthy ? "healthy" : "degraded",
    checks
  };
}

module.exports = {
  buildHealthSummary
};