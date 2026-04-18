const { sum } = require('../src/sum');

describe('sum()', () => {
  test('adds positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('adds negative numbers', () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  test('handles zero', () => {
    expect(sum(0, 5)).toBe(5);
  });
});