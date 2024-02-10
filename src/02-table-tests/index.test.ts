import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 8, b: 2, action: Action.Subtract, expected: 6 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 32, b: 2, action: Action.Divide, expected: 16 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 8, b: 2, action: Action.Exponentiate, expected: 64 },
  { a: 8, b: 2, action: 'invalid', expected: null },
  { a: 'invalid', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should blah-blah', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toEqual(expected);
  });
});
