import {performance} from 'perf_hooks'
import {sleep, withDelay, withTimeout} from '../src'

describe('Async', () => {
  test('Sleep', async () => {
    const start = performance.now()
    await sleep(100)
    const end = performance.now()
    expect(end).toBeCloseTo(start + 100, -0.5)
  })
  test('With Timeout', async () => {
    let start = performance.now()
    await withTimeout(() => sleep(100), 200)
    let end = performance.now()
    expect(end).toBeCloseTo(start + 100, -0.5)

    start = performance.now()
    await withTimeout(() => sleep(200), 100)
    end = performance.now()
    expect(end).toBeCloseTo(start + 100, -0.5)
  })
  test('With Delay', async () => {
    let start = performance.now()
    await withDelay(() => sleep(100), 200)
    let end = performance.now()
    expect(end).toBeCloseTo(start + 200, -0.5)

    start = performance.now()
    await withDelay(() => sleep(200), 100)
    end = performance.now()
    expect(end).toBeCloseTo(start + 200, -0.5)

    start = performance.now()
    try {
      await withDelay(
        () =>
          new Promise((_, reject) =>
            setTimeout(() => {
              reject('foo')
            }, 100)
          ),
        200
      )
    } catch (error) {
      end = performance.now()
      expect(error).toEqual('foo')
      expect(end).toBeCloseTo(start + 200, -0.5)
    }

    start = performance.now()
    try {
      await withDelay(
        () =>
          new Promise((_, reject) =>
            setTimeout(() => {
              reject('foo')
            }, 200)
          ),
        100
      )
    } catch (error) {
      end = performance.now()
      expect(error).toEqual('foo')
      expect(end).toBeCloseTo(start + 200, -0.5)
    }
  })
})
