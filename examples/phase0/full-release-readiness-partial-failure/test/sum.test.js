const { sum } = require("../src/sum");

describe("sum", () => {
  test("adds positive numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  test("adds zero correctly", () => {
    expect(sum(3, 0)).toBe(3);
  });
});