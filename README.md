# TCP.JS

tcp.js is a Node.js projet making TCP communication easy in node.js. It tries to level out the difference between and a client, making the communication more simple. It also has built-in JSON encoding/decoding.

## How to Install

```bash
git clone https://github.com/kasmura/tcp.js.git
```

## How to use

### Server

```js
var tcpjs = require('./tcp-server.js');
tcpjs.listen(50);

tcpjs.sockets.on('connection', function (socket) {
  socket.send('news', { hello: 'world'});
  socket.on('myEvent', function (data) {
    console.log(data);
  });
});
```

### Client

```js
var tcpjs = require('./tcp-client.js');

tcpjs.sockets.on('connection', function(socket) {
  socket.on('news', function (data) {
    console.log(data);
    socket.send('myEvent', { my: 'data'});
  });    
});

tcpjs.connect('127.0.0.1', 50);
```

## Author
This library is developed by kasmura

His website is www.kasmura.com

## License
NO RIGHTS RESERVED (ANTI-COPYRIGHT)
