# API
Application Programming Interface

## Description
This file intends to cover the entire description of the `htest-server` API

*__Note__: See `API_example.md` for details about API documentation*

## Routes
### Summary
#### `http` routes
| Name                    | Method | Path                       |
|-------------------------|--------|----------------------------|
| Web server root         | `GET`  | `/`                        |
| Dashboard               | `GET`  | `/index`                   |
| Test trees library      | `GET`  | `/test-trees-library`      |
| Machines tests          | `GET`  | `/machines-tests`          |

#### `socket.io` events
*__Note__: From client(s) to server*  
*__Note2__: Server answers to client are described with client's events*

| Name                                             | Event                               |
|--------------------------------------------------|-------------------------------------|
| User has loaded a web page                       | `'connection'`                      |
| User has loaded test trees library web page      | `'/test-trees-library'`             |
| User has loaded machines tests web page          | `'/machines-tests'`                 |
| Upload new tree                                  | *(handled by socketio-file-upload)* |
| Retrieve available tree families                 | `'retrieve-available-trees'`        |
| Validate new tree family name                    | `'validate-new-tree-family-name'`   |
| Validate new tree family content                 | `'validate-new-tree-data'`          |
| Create new tree family                           | `'submit-new-tree'`                 |
| Delete whole family from family id               | `'delete-trees-from-family-id'`     |
| Retrieve available trees in a family             | `'retrieve-trees-from-family-id'`   |
| Validate new tree content in a given family      | `'validate-new-tree-version-data'`  |
| Create new tree version in a given family        | `'submit-new-tree-version'`         |
| Delete tree from id                              | `'delete-tree-from-id'`             |
| Retrieve tree content from id                    | `'retrieve-tree-from-id'`           |

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

### User has loaded a web page `socket.io` `'connection'`
> Automatic and mandatory event which makes the server listening to `/index`, `/test-trees-library`, and `/machines-tests` socket.io events
```js
{
  protocol: 'socket.io', event: 'connection',
  input: {}, // no input parameter
  output: {}, // no output
}
```

### User has loaded test trees library web page `socket.io` `'/test-trees-library'`
> Event emited after `connection`, makes (theoretically) the server listening to the test trees library specific events
```js
{
  protocol: 'socket.io', event: '/test-trees-library',
  input: {}, // no input parameter
  output: {}, // no output
}
```

### User has loaded machines tests web page `socket.io` `'/machines-tests'`
> Event emited after `connection`, makes (theoretically) the server listening to the machines tests specific events
```js
{
  protocol: 'socket.io', event: '/machines-tests',
  input: {}, // no input parameter
  output: {}, // no output
}
```

### Upload new tree `socketio-file-upload`
> Send a file selected by the user, from the file-system, through `socketio-file-upload`, overlapping `socket.io`
```js
{
  protocol: 'socketio-file-upload',
  event: undefined, input: {}, // no input parameter
  outputEvent: undefined, output: {}, // no output
}
```

### Retrieve available tree families `socket.io` `'retrieve-available-trees'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'retrieve-available-trees', input: {}, // no input parameter
  outputEvent: 'retrieve-available-trees-response', output: {
    ifSuccess: {
      status: 'success',
      trees: [{ familyId: '', name: '' }],
    },
    ifError: {
      status: 'failure',
      message: '',
    },
  },
}
```

### Validate new tree family name `socket.io` `'validate-new-tree-family-name'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'validate-new-tree-family-name', input: {
    name: '',
  },
  outputEvent: 'validate-new-tree-family-name-response', output: {
    ifSuccess: {
      status: 'success',
      message: '',
    },
    ifError: {
      status: 'failure',
      message: '',
    },
  },
}
```

### Validate new tree family content `socket.io` `'validate-new-tree-data'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'validate-new-tree-data', input: {
    clientId: '', // socket.io client id
  },
  outputEvent: 'validate-new-tree-data-response', output: {
    ifSuccess: {
      status: 'success',
      message: '',
    },
    ifError: {
      status: 'failure',
      message: '',
    },
}
```

### Create new tree family `socket.io` `'submit-new-tree'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'submit-new-tree', input: {
    clientId: '',
    familyName: '',
  },
  outputEvent: 'submit-new-tree-response', output: {
    ifSuccess: {
      status: 'success',
    },
    ifError: {
      status: 'failure',
      message: '',
    },
  },
}
```

### Delete whole family from family id `socket.io` `'delete-trees-from-family-id'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'delete-trees-from-family-id', input: {
    familyId: '',
  },
  outputEvent: 'delete-trees-from-family-id-response', output: {
    ifSuccess: {
      status: 'success',
    },
    ifError: {
      status: 'failure',
      message: '',
    },
  },
}
```

### Retrieve available trees in a family `socket.io` `'retrieve-trees-from-family-id'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'retrieve-trees-from-family-id', input: {
    id: '', // family id
  },
  outputEvent: 'retrieve-trees-from-family-id-response', output: {
    ifSuccess: {
      status: 'success',
      familyId: '',
      familyName: '',
      trees: [{ id: '', name: '', version: 1 }],
    },
    ifError: {
      status: 'failure',
      message: '',
    },
  },
}
```

### Validate new tree content in a given family `socket.io` `'validate-new-tree-version-data'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'validate-new-tree-version-data', input: {
    clientId: '',
    familyId: '',
  },
  outputEvent: 'validate-new-tree-version-data-response', output: {
    ifSuccess: {
      status: 'success',
      message: '',
    },
    ifError: {
      status: 'failure',
      message: '',
    },
  },
}
```

### Create new tree version in a given family `socket.io` `'submit-new-tree-version'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'submit-new-tree-version', input: {
    clientId: '',
    familyId: '',
  },
  outputEvent: 'submit-new-tree-version-response', output: {
    ifSuccess: {
      status: 'success',
      familyId: '',
    },
    ifError: {
      status: 'failure',
      message: '',
    },
  },
}
```

### Delete tree from id `socket.io` `'delete-tree-from-id'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'delete-tree-from-id', input: {
    id: '', // tree id
  },
  outputEvent: 'delete-tree-from-id-response', output: {
    ifSuccess: {
      status: 'success',
    },
    ifError: {
      status: 'failure',
      message: '',
    },
  },
}
```

### Retrieve tree content from id `socket.io` `'retrieve-tree-from-id'`
> Foo
```js
{
  protocol: 'socket.io',
  event: 'retrieve-tree-from-id', input: {
    id: '', // tree id
  },
  outputEvent: 'retrieve-tree-from-id-response', output: {
    ifSuccess: {
      status: 'success',
      tree: {
        familyId: '',
        name: '',
        version: 1,
        root: [], // tree nodes, see ../models/*Node.js
      },
    },
    ifError: {
      status: 'failure',
      message: '',
    },
  },
}
```
