const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const utils = require(__dirname +'/utils/message');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newMessage', { //SOCKET EMIT IS TO ONE PERSON
  //   from: 'nir@example.com',
  //   text: 'sending data to chrome',
  //   createAt: 123
  // });


// socket.emit('newMessage',{//emit from admin text welcome to chat app
//   from:'Admin',
//   text:'Welcome to the chat app'
// });

socket.emit('newMessage',utils.generateMessage('Admin','Welcome to the chat app'));
socket.broadcast.emit('newMessage',utils.generateMessage('Admin','New user joined'));
//socket.broadcast.emit from admin text new user joined
// socket.broadcast.emit('newMessage',{
//   from:'Admin',
//   text:'New user joined',
//   createAt:new Date().getTime()
// });

socket.on('createLocationMessage',(coords)=>{
  io.emit('newLocationMessage',utils.generateLocationMessage('Admin',coords.latitude,coords.longitude));
});

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage',{//IO IS EMIT FOR EVERYONE CONNECTED
      from:message.from,
      text:message.text,
      createAt:new Date().getTime()
    });

    callback('this is from server.');


// socket.broadcast.emit('newMessage',{//emit to everyone exept the user sent the event
//   from:message.from,
//   text:message.text,
//   createAt:new Date().getTime()
// });


  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
