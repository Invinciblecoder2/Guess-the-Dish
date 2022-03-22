const http = require("http");
const express = require('express');
const socketio = require('socket.io');
var request = require("request");

const app = express();

const clientPath = (__dirname+'/../client');
console.log('Serving static from + '+clientPath);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
  sock.on('chat', (text) =>{
    io.emit('chat', text);
  });
  sock.on('message', (text) =>{
    io.emit('message', text);
  });
    
    
});

server.on('error',(err) =>{
    console.error('Server error:',err);
});


server.listen(8080,() => {
    console.log('RPS started on 8080');
});
