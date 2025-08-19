# React Native Simple Login Component

This repository contains a simple React Native component `SimpleLogin` that provides a basic login form with username and password fields and a login button.

## Usage

```javascript
import SimpleLogin from './src/SimpleLogin';

<SimpleLogin
  endpoint="https://example.com/api/login"
  onLogin={(response) => console.log(response)}
/>
```

The component posts the `username` and `password` to the provided REST endpoint. The `onLogin` callback receives the parsed JSON response from the server.
