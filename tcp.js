var events = require('events');
var util = require('util');
var _ = require("underscore");
var net = require('net');

function server(port) {
    
    var HOST = '127.0.0.1';
    var PORT = port;
    
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
    
    server.listen(PORT, HOST);
    console.log('tcp.js: Running on ' + HOST + ':' + PORT);
    
    return sockets;
}
module.exports.server = server;

function client(host, port) {
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
    
    var HOST = host;
    var PORT = port;
    
    var client = new net.Socket();
    
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
      client.write(JSON.stringify(message));
    }
    
    var socket0 = new Sockets();
    var extraproto = {
      send: send
    };
    socket = _.extend(socket0, extraproto);
    
    client.connect(PORT, '127.0.0.1', function() {
      console.log('tcp.js: Connected to ' + HOST + ':' + PORT);
      sockets.emit('connection', socket);
    });
    
    
    client.on('data', function(data) {   
      var message = JSON.parse(data);
      if(message.event && message.content)
        socket.emit(message.event, message.content);
      else
        console.log('Invalid message');
    });
    
    return sockets;
}
module.exports.client = client;