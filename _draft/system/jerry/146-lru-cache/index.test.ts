import { LRUCache } from './index';

describe('146. LRU Cache', () => {
    test('example 1', () => {
        const lRUCache = new LRUCache(2);
        lRUCache.put(1, 1);
        lRUCache.put(2, 2);
        expect(lRUCache.get(1)).toBe(1);
        lRUCache.put(3, 3);
        expect(lRUCache.get(2)).toBe(-1);
        lRUCache.put(4, 4);
        expect(lRUCache.get(1)).toBe(-1);
        expect(lRUCache.get(3)).toBe(3);
        expect(lRUCache.get(4)).toBe(4);
    });

    test('capacity 1', () => {
        const cache = new LRUCache(1);
        cache.put(1, 1);
        cache.put(2, 2);
        expect(cache.get(1)).toBe(-1);
        expect(cache.get(2)).toBe(2);
    });

    test('update existing key', () => {
        const cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(1, 2);
        expect(cache.get(1)).toBe(2);
    });
}); 