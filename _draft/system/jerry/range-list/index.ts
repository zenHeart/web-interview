export class RangeList {
    private ranges: number[][] = [];

    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    add(range: number[]) {
        if (!range || range.length !== 2 || range[0] >= range[1]) {
            return;
        }

        const [start, end] = range;
        const newRanges: number[][] = [];
        let inserted = false;

        for (let i = 0; i < this.ranges.length; i++) {
            const [currStart, currEnd] = this.ranges[i];

            // 如果新范围在当前范围之前且没有重叠
            if (end < currStart - 1) {
                if (!inserted) {
                    newRanges.push([start, end]);
                    inserted = true;
                }
                newRanges.push(this.ranges[i]);
            }
            // 如果新范围与当前范围有重叠或相邻
            else if (start <= currEnd + 1) {
                const mergedStart = Math.min(start, currStart);
                let mergedEnd = Math.max(end, currEnd);

                // 合并后续可能重叠的范围
                while (i + 1 < this.ranges.length && mergedEnd + 1 >= this.ranges[i + 1][0]) {
                    mergedEnd = Math.max(mergedEnd, this.ranges[i][1]);
                    i++;
                }

                newRanges.push([mergedStart, mergedEnd]);
                inserted = true;
            }
            // 如果新范围在当前范围之后
            else {
                newRanges.push(this.ranges[i]);
            }
        }

        if (!inserted) {
            newRanges.push([start, end]);
        }

        this.ranges = newRanges;
    }

    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    remove(range: number[]) {
        if (!range || range.length !== 2 || range[0] > range[1]) {
            return;
        }

        const [start, end] = range;
        const newRanges: number[][] = [];

        for (const [currStart, currEnd] of this.ranges) {
            // 如果当前范围完全在要移除的范围之外
            if (currEnd < start || currStart > end) {
                newRanges.push([currStart, currEnd]);
            }
            // 如果当前范围部分重叠
            else {
                // 保留左侧部分
                if (currStart < start) {
                    newRanges.push([currStart, start]);
                }
                // 保留右侧部分
                if (currEnd > end) {
                    newRanges.push([end, currEnd]);
                }
            }
        }

        this.ranges = newRanges;
    }

    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        return this.ranges.map(([start, end]) => `[${start}, ${end})`).join(' ');
    }
}