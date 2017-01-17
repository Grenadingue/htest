# API
Application Programming Interface

## Description
This file intents to cover the entire description of the `htest-server` API

## Routes
### Example `http` `POST` `/foo/bar`
Here is the description of everything needed to access this sample (fake) route. This code will never be interpreted by a machine, we must consider the reader as a human. You. As the route description is represented as json, we must keep in mind that this very flexible, and that __a description is only a possible representation of a route__.
```js
{
  protocol: 'http',
  method: 'POST',
  path: '/foo/bar',
  input: { // describes the input parameters
    encoding: 'form-data', data: {
      foo: { type: 'int' },
      bar: { type: 'string' }, // important comment about `bar`
      baz: { type: 'string', optional: true },
      beer: { type: 'string', optional: true, defaultValue: 'rince cochon' },
    },
  },
  output: { // describes the possible outputs
    ifSuccess: {
      encoding: 'text', data: 'some sample text', statusCode: 200,
    },
    ifForbidden: {
      encoding: 'text', data: 'forbidden ressource', statusCode: 403,
    },
    ifNotFound: {
      encoding: 'text', data: 'foo not found', statusCode: 404,
    },
  },
}
```
