import { sum } from '../src/sum';

describe('sum()', () => {
  it('adds positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('adds negative numbers', () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  it('handles zero', () => {
    expect(sum(0, 5)).toBe(5);
  });
});