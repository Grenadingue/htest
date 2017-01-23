# API
Application Programming Interface

## Routes
### Summary
#### `http` routes
| Name    | Protocol | Method | Path/Event |
|---------|----------|--------|------------|
| Example | `http`   | `POST` | `/foo/bar` |

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
