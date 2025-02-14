import { divide } from './index';

describe('Integer Division', () => {
    test('should handle basic positive division', () => {
        expect(divide(10, 3)).toBe(3);
        expect(divide(7, 2)).toBe(3);
        expect(divide(15, 5)).toBe(3);
    });

    test('should handle division with negative numbers', () => {
        expect(divide(-10, 3)).toBe(-3);
        expect(divide(10, -3)).toBe(-3);
        expect(divide(-10, -3)).toBe(3);
    });

    test('should handle division by 1', () => {
        expect(divide(42, 1)).toBe(42);
        expect(divide(-42, 1)).toBe(-42);
    });

    test('should handle division of zero', () => {
        expect(divide(0, 5)).toBe(0);
        expect(divide(0, -5)).toBe(0);
    });

    test('should handle powers of 2', () => {
        expect(divide(8, 2)).toBe(4);
        expect(divide(16, 4)).toBe(4);
        expect(divide(32, 8)).toBe(4);
    });

    test('should truncate decimal results', () => {
        expect(divide(7, 3)).toBe(2); // 2.333... should be 2
        expect(divide(5, 2)).toBe(2); // 2.5 should be 2
        expect(divide(11, 4)).toBe(2); // 2.75 should be 2
    });

    test('should handle consecutive numbers', () => {
        expect(divide(4, 3)).toBe(1);
        expect(divide(5, 4)).toBe(1);
        expect(divide(6, 5)).toBe(1);
    });
}); 