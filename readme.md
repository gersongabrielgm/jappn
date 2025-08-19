# React Native Simple Login Component

This repository contains a simple React Native component `SimpleLogin` that provides a basic login form with username and password fields and a login button.

## Usage

```javascript
import SimpleLogin from './src/SimpleLogin';

<SimpleLogin onLogin={(credentials) => console.log(credentials)} />
```

The `onLogin` callback receives an object containing `username` and `password`.
