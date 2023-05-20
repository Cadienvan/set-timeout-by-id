# What is this?

This is a timeout implementation that allows you to set a timeout and then clear it using keys instead of the timeout variable reference.  
This is useful when you have to clear a timeout from a different scope than the one where it was set.

## How To Install?

```bash
npm install set-timeout-by-id
```

## How To Use?

```javascript
import { setTimeoutById, clearTimeoutById } from 'set-timeout-by-id';

const timeoutId = setTimeoutById(() => {
  console.log('Hello World!');
}, 1000, 'myTimeout'); // This will set a timeout with the id 'myTimeout'

// Meanwhile, in another file...
clearTimeoutById('myTimeout'); // This will clear the timeout
```

## How does it work under the hood?

This library uses a Map to store the timeout references, leveraging the `singleton` pattern.  
When you set a timeout, it will be stored in the Map with the given id as key.  
When you clear a timeout, it will be removed from the Map and cleared using the reference stored in the Map.

# How to run tests?

```bash
npm test
```

# Contributing

If you want to contribute to this project, please open an issue or a pull request.  
I will be happy to review it and merge it if it's useful.  
Please, remember to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.  
