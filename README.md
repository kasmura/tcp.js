# tcp.js

tcp.js is a Node.js project making TCP communication easy in node.js. It tries to level out the difference between and a client, making the communication more simple. It also has built-in JSON encoding/decoding.

## How to Install

```bash
$ npm install tcp.js
```

## How to use

### Server

```js
var sockets = require('tcp.js').server(1337);

sockets.on('connection', function (socket) {
  socket.send('news', { hello: 'world'});
  socket.on('myEvent', function (data) {
    console.log(data);
  });
});
```

### Client

```js
var sockets = require('tcp.js').client('127.0.0.1', 1337);

sockets.on('connection', function(socket) {
  socket.on('news', function (data) {
    console.log(data);
    socket.send('myEvent', { my: 'data'});
  });    
});
```

## Author
This library is developed by kasmura

His website is www.kasmura.com

## License
NO RIGHTS RESERVED / ANTI-COPYRIGHT / UNLICENSE
