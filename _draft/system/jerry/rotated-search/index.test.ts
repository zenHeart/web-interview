import { search } from './index';

describe('Rotated Sorted Array Search', () => {
    test('should find target in rotated array', () => {
        expect(search([4,5,6,7,0,1,2], 0)).toBe(4);
        expect(search([4,5,6,7,0,1,2], 3)).toBe(-1);
    });

    test('should handle basic cases', () => {
        expect(search([1], 1)).toBe(0);
        expect(search([1], 0)).toBe(-1);
    });

    test('should handle array with two elements', () => {
        expect(search([1, 3], 3)).toBe(1);
        expect(search([3, 1], 1)).toBe(1);
    });

    test('should handle different rotation points', () => {
        expect(search([3,4,5,1,2], 4)).toBe(1);
        expect(search([5,1,2,3,4], 1)).toBe(1);
        expect(search([2,3,4,5,1], 2)).toBe(0);
    });

    test('should handle target at different positions', () => {
        const arr = [4,5,6,7,0,1,2];
        expect(search(arr, 4)).toBe(0); // 开头
        expect(search(arr, 2)).toBe(6); // 结尾
        expect(search(arr, 6)).toBe(2); // 中间
    });
}); 