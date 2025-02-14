import { RangeList } from './index';

describe('RangeList Implementation', () => {
    let rangeList: RangeList;

    beforeEach(() => {
        rangeList = new RangeList();
    });

    describe('add', () => {
        test('should add single range', () => {
            rangeList.add([1, 5]);
            expect(rangeList.print()).toBe("[1, 5)");
        });

        test('add out of order', () => {
            rangeList.add([10, 20])
            rangeList.add([1, 2])
            expect(rangeList.print()).toBe("[1, 2) [10, 20)");
        })

        test('should merge overlapping ranges', () => {
            rangeList.add([1, 5]);
            rangeList.add([3, 7]);
            expect(rangeList.print()).toBe("[1, 7)");
        });

        test('should handle adjacent ranges', () => {
            rangeList.add([1, 3]);
            rangeList.add([3, 5]);
            expect(rangeList.print()).toBe("[1, 5)");
        });

        test('should handle multiple non-overlapping ranges', () => {
            rangeList.add([1, 3]);
            rangeList.add([5, 7]);
            rangeList.add([9, 11]);
            expect(rangeList.print()).toBe("[1, 3) [5, 7) [9, 11)");
        });

        test('should handle completely contained ranges', () => {
            rangeList.add([1, 10]);
            rangeList.add([2, 5]);
            expect(rangeList.print()).toBe("[1, 10)");
        });
    });

    describe('remove', () => {
        test('should remove entire range', () => {
            rangeList.add([1, 5]);
            rangeList.remove([1, 5]);
            expect(rangeList.print()).toBe("");
        });

        test('should remove from middle of range', () => {
            rangeList.add([1, 10]);
            rangeList.remove([3, 7]);
            expect(rangeList.print()).toBe("[1, 3) [7, 10)");
        });

        test('should remove from start of range', () => {
            rangeList.add([1, 10]);
            rangeList.remove([1, 5]);
            expect(rangeList.print()).toBe("[5, 10)");
        });

        test('should remove from end of range', () => {
            rangeList.add([1, 10]);
            rangeList.remove([5, 10]);
            expect(rangeList.print()).toBe("[1, 5)");
        });

        test('should handle non-overlapping remove', () => {
            rangeList.add([1, 5]);
            rangeList.remove([7, 10]);
            expect(rangeList.print()).toBe("[1, 5)");
        });

        test('should handle multiple ranges removal', () => {
            rangeList.add([1, 3]);
            rangeList.add([5, 7]);
            rangeList.add([9, 11]);
            rangeList.remove([2, 10]);
            expect(rangeList.print()).toBe("[1, 2) [10, 11)");
        });
    });

    describe('complex operations', () => {
        test('example from problem description', () => {
            rangeList.add([1, 5]);
            expect(rangeList.print()).toBe("[1, 5)");
            
            rangeList.add([10, 20]);
            expect(rangeList.print()).toBe("[1, 5) [10, 20)");
            
            rangeList.add([20, 20]);
            expect(rangeList.print()).toBe("[1, 5) [10, 20)");
            
            rangeList.add([20, 21]);
            expect(rangeList.print()).toBe("[1, 5) [10, 21)");
            
            rangeList.add([2, 4]);
            expect(rangeList.print()).toBe("[1, 5) [10, 21)");
            
            rangeList.add([3, 8]);
            expect(rangeList.print()).toBe("[1, 8) [10, 21)");
            
            rangeList.remove([10, 10]);
            expect(rangeList.print()).toBe("[1, 8) [10, 21)");
            
            rangeList.remove([10, 11]);
            expect(rangeList.print()).toBe("[1, 8) [11, 21)");
            
            rangeList.remove([15, 17]);
            expect(rangeList.print()).toBe("[1, 8) [11, 15) [17, 21)");
            
            rangeList.remove([3, 19]);
            expect(rangeList.print()).toBe("[1, 3) [19, 21)");
        });
    });

    describe('edge cases', () => {
        test('should handle empty ranges', () => {
            rangeList.add([1, 1]);
            expect(rangeList.print()).toBe("");
        });

        test('should handle negative numbers', () => {
            rangeList.add([-10, -5]);
            rangeList.add([-7, -2]);
            expect(rangeList.print()).toBe("[-10, -2)");
        });

        test('should handle zero', () => {
            rangeList.add([-2, 0]);
            rangeList.add([0, 2]);
            expect(rangeList.print()).toBe("[-2, 2)");
        });
    });
}); 