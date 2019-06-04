# Benchmarks

## Running benchmark

### Automatically

Just execute:

```
npm run benchmark
```

and it will do all the stuff four you.

### Manually

Before you run benchmark you should install other rbac lib dependencies. You may add your own libs to test.

```
npm i --no-save easy-rbac @rbac/rbac rbac benchmark
```

After you may run it by the following command:

```
node benchmark/index.js
```

## Results

```
@rbac/rbac x 46,003 ops/sec ±0.48% (87 runs sampled)
rbac:no_wildcard_support x 95,564 ops/sec ±1.55% (84 runs sampled)
easy-rbac x 45,884 ops/sec ±0.74% (89 runs sampled)
fast-rbac x 1,516,366 ops/sec ±0.38% (97 runs sampled)
fast-rbac:defer x 1,037,149 ops/sec ±0.71% (86 runs sampled)
```

## Conclustion

As almost all rbac modules use async syntax. However for `fast-rbac` it's not needed, because it's fast and works great without callbacks or promises.
So the benchmark was done in both modes: when `fast-rbac` returns Promise and when it directly returns result.

Also popular `rbac` library doesn't have proper wildcard support, and it forces you to define all the roles from the start.
That gives it some handicap comparing to other libraries.

So as you can see `fast-rbac` in "simple" (or you may call it "sync") mode is almost 30 times faster then it's competitors.
In "async" mode with promises it's a bit slower, however that result is 20 times faster than other libs that support wildcard rules and 10 times faster than `rbac` which doesn't support it.

This test demonstrates general picture. Adding tests with roles that extend each other will not change it.
`fast-rbac` will remain at the same performance, because it compiles roles and time complexity remains the same: O(n).
But other libs don't do such trick, so their results may be even worse.
