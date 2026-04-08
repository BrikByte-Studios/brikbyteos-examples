const sum = require("./sum");

describe("sum", () => {
  test("adds positive numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});