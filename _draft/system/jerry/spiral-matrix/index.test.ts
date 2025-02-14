import { spiralOrder } from './index';

describe('Spiral Matrix', () => {
    test('should return elements in spiral order for a 3x3 matrix', () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        expect(spiralOrder(matrix)).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
    });

    test('should handle a single row', () => {
        const matrix = [[1, 2, 3, 4]];
        expect(spiralOrder(matrix)).toEqual([1, 2, 3, 4]);
    });

    test('should handle a single column', () => {
        const matrix = [[1], [2], [3], [4]];
        expect(spiralOrder(matrix)).toEqual([1, 2, 3, 4]);
    });

    test('should handle an empty matrix', () => {
        const matrix: number[][] = [];
        expect(spiralOrder(matrix)).toEqual([]);
    });

    test('should handle a 2x2 matrix', () => {
        const matrix = [
            [1, 2],
            [3, 4]
        ];
        expect(spiralOrder(matrix)).toEqual([1, 2, 4, 3]);
    });

    test('should handle a 3x2 matrix', () => {
        const matrix = [
            [1, 2],
            [3, 4],
            [5, 6]
        ];
        expect(spiralOrder(matrix)).toEqual([1, 2, 4, 6, 5, 3]);
    });
}); 