# Test TODO app using node.js/express and vue.js/bootstrap4

## Frontend Build

For building frontend need to run in *frontend* directory:

```
$ npm run build
```

## Running the app

To run the app you can use docker-compose.

```
$ docker-compose up
```

To run express directly need to execute in *backend* directory (need to have mysql installed and configured):
INFO: For serving the frontend files can set the dist dir to STATIC_ROOT environment variable and express will serve it. 

```
$ npm start
```

The link for accessing the app is *http://localhost:3000*.
