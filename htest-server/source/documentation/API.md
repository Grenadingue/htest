# API
Application Programming Interface

## Description
This file intents to cover the entire description of the `htest-server` API

*Note: See "Example" in "Routes" section for details about how a route is described*

## Routes
### Summary
| Name | Protocol | Method | Path/Event |
|------|----------|--------|------------|
| Example | `http` | `POST` | `/foo/bar` |
| Web server root | `http` | `GET` | `/` |
| Dashboard | `http` | `GET` | `/index` |
| Test trees library | `http` | `GET` | `/test-trees-library` |
| Test procedures library | `http` | `GET` | `/test-procedures-library` |
| Machines tests | `http` | `GET` | `/machines-tests` |
| User has loaded a web page | `socket.io` | - | `connection` |
| User has loaded test trees library web page | `socket.io` | - | `/test-trees-library` |
| User has loaded test procedures library web page | `socket.io` | - | `/test-procedures-library` |
| User has loaded machines tests web page | `socket.io` | - | `/machines-tests` |

### Example `http` `POST` `/foo/bar`
> Here is the description of everything needed to access this sample (fake) route. This code will never be interpreted by a machine, we must consider the reader as a human. You. As the route description is represented as json, we must keep in mind that this very flexible, and that __a description is only a possible representation of a route__.
```js
{
  protocol: 'http', method: 'POST', path: '/foo/bar',
  input: { // describes the input parameters
    encoding: 'form-data', data: {
      foo: { encoding: 'int' },
      bar: { encoding: 'string' }, // important comment about `bar`
      baz: { encoding: 'string', optional: true },
      beer: { encoding: 'string', optional: true, defaultValue: 'rince cochon' },
    },
  },
  output: { // describes the possible outputs
    ifSuccess: {
      encoding: 'text/html', data: 'some sample text', statusCode: 200,
    },
    ifForbidden: {
      encoding: 'text/html', data: 'forbidden ressource', statusCode: 403,
    },
    ifNotFound: {
      encoding: 'text/html', data: 'foo not found', statusCode: 404,
    },
  },
}
```

### Web server root `http` `GET` `/`
> Redirects `/` to `/index`
```js
{
  protocol: 'http', method: 'GET', path: '/',
  input: {}, // no input parameter
  output: {
    ifSuccess: { // redirects page
      encoding: 'text/html', location: '/index', statusCode: 302,
    },
  },
}
```

### Dashboard `http` `GET` `/index`
> Retrieve dashboard web page
```js
{
  protocol: 'http', method: 'GET', path: '/index',
  input: {}, // no input parameter
  output: {
    ifSuccess: {
      encoding: 'text/html', statusCode: 200,
    },
  },
}
```

### Test trees library `http` `GET` `/test-trees-library`
> Retrieve test trees library web page
```js
{
  protocol: 'http', method: 'GET', path: '/test-trees-library',
  input: {}, // no input parameter
  output: {
    ifSuccess: {
      encoding: 'text/html', statusCode: 200,
    },
  },
}
```

### Test procedures library `http` `GET` `/test-procedures-library`
> Retrieve test procedures web page
```js
{
  protocol: 'http', method: 'GET', path: '/test-procedures-library',
  input: {}, // no input parameter
  output: {
    ifSuccess: {
      encoding: 'text/html', statusCode: 200,
    },
  },
}
```

### Machines tests `http` `GET` `/machines-tests`
> Retrieve machines tests web page
```js
{
  protocol: 'http', method: 'GET', path: '/machines-tests',
  input: {}, // no input parameter
  output: {
    ifSuccess: {
      encoding: 'text/html', statusCode: 200,
    },
  },
}
```

### User has loaded a web page `socket.io` `connection`
> Automatic and mandatory event which makes the server listening to `/index`, `/test-trees-library`, `/test-procedures-library` and `/machines-tests` socket.io events
```js
{
  protocol: 'socket.io', event: 'connection',
  input: {}, // no input parameter
  output: {}, // no output parameter
}
```

### User has loaded test trees library web page `socket.io` `/test-trees-library`
> Event emited after `connection`, makes (theoretically) the server listening to the test trees library specific events
```js
{
  protocol: 'socket.io', event: '/test-trees-library',
  input: {}, // no input parameter
  output: {}, // no output parameter
}
```

### User has loaded test procedures library web page `socket.io` `/test-procedures-library`
> Event emited after `connection`, makes (theoretically) the server listening to the test procedures library specific events
```js
{
  protocol: 'socket.io', event: '/test-procedures-library',
  input: {}, // no input parameter
  output: {}, // no output parameter
}
```

### User has loaded machines tests web page `socket.io` `/machines-tests`
> Event emited after `connection`, makes (theoretically) the server listening to the machines tests specific events
```js
{
  protocol: 'socket.io', event: '/machines-tests',
  input: {}, // no input parameter
  output: {}, // no output parameter
}
```
