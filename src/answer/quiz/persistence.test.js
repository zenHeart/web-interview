const { splitMultiply, persistence } = require('./persistence');

describe.skip('persistence test', function() {
    it('persistence', function() {
        let testData = [
            {
                input: 1,
                expect: 0
            },
            {
                input: 34,
                expect: 2
            },
            {
                input: 999,
                expect: 4
            }
        ];

        testData.forEach(ele => {
            expect(persistence(ele.input)).toBe(ele.expect);
        });
    });
    it('splitMultiply', function() {
        let testData = [
            {
                input: 1,
                expect: 1
            },
            {
                input: 34,
                expect: 12
            },
            {
                input: 999,
                expect: 729
            }
        ];

        testData.forEach(ele => {
            expect(splitMultiply(ele.input)).toBe(ele.expect);
        });
    });
});
