var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

//   socket.emit('createMessage', {
//     from: 'nir@example.com',
//     text: 'yup thats works'
//   });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//   from:'Frank',
//   text: 'Hi'
// }, function(callbackdata){
//   console.log('Got It ',callbackdata);
// });


jQuery('#message-form').on('submit',function(e){//listener like emit
e.preventDefault();
socket.emit('createMessage',{
  from:'User',
  text: jQuery('[name=message]').val()
},function (){

});
});
