import {sleep, withDelay, withTimeout} from '../src'

describe('Async', () => {
  test('Sleep', async () => {
    const start = Date.now()
    await sleep(100)
    const end = Date.now()
    expect(end).toBeGreaterThanOrEqual(start + 100)
  })
  test('With Timeout', async () => {
    let start = Date.now()
    await withTimeout(() => sleep(100), 200)
    let end = Date.now()
    expect(end).toBeGreaterThanOrEqual(start + 100)

    start = Date.now()
    await withTimeout(() => sleep(200), 100)
    end = Date.now()
    expect(end).toBeGreaterThanOrEqual(start + 100)
  })
  test('With Delay', async () => {
    let start = Date.now()
    await withDelay(() => sleep(100), 200)
    let end = Date.now()
    expect(end).toBeGreaterThanOrEqual(start + 200)

    start = Date.now()
    await withDelay(() => sleep(200), 100)
    end = Date.now()
    expect(end).toBeGreaterThanOrEqual(start + 200)

    start = Date.now()
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
      end = Date.now()
      expect(error).toEqual('foo')
      expect(end).toBeGreaterThanOrEqual(start + 200)
    }

    start = Date.now()
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
      end = Date.now()
      expect(error).toEqual('foo')
      expect(end).toBeGreaterThanOrEqual(start + 200)
    }
  })
})
