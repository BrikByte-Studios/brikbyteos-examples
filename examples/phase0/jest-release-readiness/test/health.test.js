const { buildHealthSummary } = require("../src/health");

describe("buildHealthSummary", () => {
  test("returns healthy when all dependencies are up", () => {
    const result = buildHealthSummary({
      databaseConnected: true,
      queueConnected: true,
      storageConnected: true
    });

    expect(result).toEqual({
      status: "healthy",
      checks: {
        database: "up",
        queue: "up",
        storage: "up"
      }
    });
  });

  test("returns degraded when database is down", () => {
    const result = buildHealthSummary({
      databaseConnected: false,
      queueConnected: true,
      storageConnected: true
    });

    expect(result).toEqual({
      status: "degraded",
      checks: {
        database: "down",
        queue: "up",
        storage: "up"
      }
    });
  });

  test("returns degraded when queue is down", () => {
    const result = buildHealthSummary({
      databaseConnected: true,
      queueConnected: false,
      storageConnected: true
    });

    expect(result).toEqual({
      status: "degraded",
      checks: {
        database: "up",
        queue: "down",
        storage: "up"
      }
    });
  });

  test("returns degraded when storage is down", () => {
    const result = buildHealthSummary({
      databaseConnected: true,
      queueConnected: true,
      storageConnected: false
    });

    expect(result).toEqual({
      status: "degraded",
      checks: {
        database: "up",
        queue: "up",
        storage: "down"
      }
    });
  });
});