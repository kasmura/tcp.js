var events = require('events');
var util = require('util');
var _ = require("underscore");
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 1338;

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

function connect(host, port) {
    HOST = host;
    PORT = port;
    
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
}

module.exports.sockets = sockets;
module.exports.connect = connect;