// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Add })).toEqual(10);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Subtract })).toEqual(
      6,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Multiply })).toEqual(
      16,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Divide })).toEqual(4);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 8, b: 2, action: Action.Exponentiate }),
    ).toEqual(64);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 8, b: 2, action: 'invalid' })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'invalid', b: 2, action: Action.Add }),
    ).toEqual(null);
  });
});
