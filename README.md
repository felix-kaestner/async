# Async

<p align="center">
    <span>Async utilities.</span>
    <br><br>
    <a href="https://github.com/felix-kaestner/async/issues">
        <img alt="Issues" src="https://img.shields.io/github/issues/felix-kaestner/async?color=29b6f6&style=flat-square">
    </a>
    <a href="https://github.com/felix-kaestner/async/stargazers">
        <img alt="Stars" src="https://img.shields.io/github/stars/felix-kaestner/async?color=29b6f6&style=flat-square">
    </a>
    <a href="https://github.com/felix-kaestner/async/blob/main/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/felix-kaestner/async?color=29b6f6&style=flat-square">
    </a>
    <a href="https://twitter.com/kaestner_felix">
        <img alt="Twitter" src="https://img.shields.io/badge/twitter-@kaestner_felix-29b6f6?style=flat-square">
    </a>
</p>

## Install

Install with `npm` or `yarn`:

```
$ npm i git+https://github.com/felix-kaestner/async
```

```
$ yarn add git+https://github.com/felix-kaestner/async
```

## Usage

```js
import {sleep} from '@felix-kaestner/async'

async function main() {
  // ...
  await sleep(500 /* ms */)
  // ...
}
```

## API

### sleep(ms)

Returns a promise which resolves after the specified amount of milliseconds.

Example:

```js
import {sleep} from '@felix-kaestner/async'

async function main() {
  // ...
  await sleep(500 /* ms */)
  // ...
}
```

### withTimeout(function, ms)

Returns a promise which is rejected in the case the promise returned from the provided function is not resolved or rejected in the specified amount of milliseconds.

This is useful if you are running asynchronous operations which may become stale after a specified amount of time

Example:

```js
import {withTimeout} from '@felix-kaestner/async'

async function sendStatusUpdate() {
  // ...
  await withTimeout(() => fetch('/status', {method: 'POST'}), 500 /* ms */)
  // ...
}
```

### withDelay(function, ms)

Returns a promise which resolves after the promise returned from the provided function is resolved or rejected and at least the amount of milliseconds provided via the second parameter has passed.

This is useful if you are running asynchronous operations which may complete very fast, and you want to prevent flickering in your UI.

Example:

```js
import {withDelay} from '@felix-kaestner/async'

async function main() {
  // ... render initial UI, e.g. a loading spinner
  const blog = await withDelay(() => fetch('/blog'), 500 /* ms */)
  // ... render updated UI, e.g. a list of blog entries
}
```

This function can also be combined with the `React.lazy` component in order to avoid to quick layout changes.

React Example:

```jsx
import {withDelay} from '@felix-kaestner/async'
import {Suspense, lazy} from 'react'

// Show loading screen for a least 1 second while the app is imported
const Root = lazy(() => withDelay(() => import('./Root'), 1000))

function App() {
  ;<Suspense fallback={<div>Loading...</div>}>
    <Root />
  </Suspense>
}
```

## Contribute

All contributions in any form are welcome! 🙌  
Just use the [Issue](.github/ISSUE_TEMPLATE) and [Pull Request](.github/PULL_REQUEST_TEMPLATE) templates and
I will be happy to review your suggestions. 👍

## Support

Any kind of support is well appreciated! 👏  
If you want to tweet about the project, make sure to tag me [@kaestner_felix](https://twitter.com/kaestner_felix). You can also support my open source work on [GitHub Sponsors](https://github.com/sponsors/felix-kaestner). All income will be directly invested in Coffee ☕!

## Cheers ✌
