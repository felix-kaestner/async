<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@felix-kaestner/async](./async.md) &gt; [withDelay](./async.withdelay.md)

## withDelay() function

Execute a async function an resolve it's promise with a after at least a given amount of time.

<b>Signature:</b>

```typescript
export declare function withDelay<T>(block: () => Promise<T>, timeout: number): Promise<T>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  block | () =&gt; Promise&lt;T&gt; | the builder function to execute |
|  timeout | number | the number of milliseconds to wait at least, before builder resolves |

<b>Returns:</b>

Promise&lt;T&gt;

a Promise which resolves to the result of the block after a least the given amount of milliseconds have passed.

## Remarks

This helper function can be used to avoid to quick layout changes when using [Concurrent Mode](https://reactjs.org/docs/concurrent-mode-intro.html) and [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html)<!-- -->. It is exactly the opposite to [withTimeout()](./async.withtimeout.md)<!-- -->.

