function knapsack(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    for (let i = 0; i < weights.length; i++) {
        for (let j = capacity; j >= weights[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i]);
        }
    }
    return dp[capacity];
}

export default knapsack;
