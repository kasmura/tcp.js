var events = require('events');
var util = require('util');
var _ = require("underscore");

var HOST = '127.0.0.1';
var PORT = 5342;

var Sockets = function(){
  events.EventEmitter.call(this);
  
  function emit(event, data) {
    if(data) {
        this.emit(event, data);
    } else {
        this.emit(event);
    }
  }
};
util.inherits(Sockets, events.EventEmitter);
var sockets = new Sockets();

module.exports.sockets = sockets;
module.exports.listen = listen;

var net = require('net');

var server = net.createServer(function (socket0) {
  
  socket0.prototype = Object.create(events.EventEmitter.prototype);
  
  function send(event, data) {
    var message;
    if(data) {
      message = {
        event: event,
        content: data
      } 
    } else {
      message = {
        event: event
      }
    }
    socket.write(JSON.stringify(message));
  }
  
  var extraproto = {
    send: send
  };
  var socket = _.extend(socket0, extraproto);
  
  console.log('tcp.js: New - ' + socket.remoteAddress + ':' + socket.remotePort);
  
  sockets.emit('connection', socket);
  
  // Add a 'data' event handler to this instance of socket
  socket.on('data', function(data) {
    var message = JSON.parse(data);
    if(message.event && message.content)
      socket.emit(message.event, message.content);
    else
      console.log('Invalid message');
  });
});

function listen(port) {
    PORT = port;
    server.listen(PORT, HOST);
    console.log('tcp.js: Running on ' + HOST + ':' + PORT);
}