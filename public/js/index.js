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


socket.on('newLocationMessage',function(message){
var li = jQuery('<li></li>');
var a = jQuery('<a target="_blank">My Current Location</a>'); //blank is new tab
li.text(`${message.from}: `);
a.attr('href',message.url);
li.append(a);
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


var locationButton = jQuery('#send-location');


//click event
locationButton.on('click',function(){
if(!navigator.geolocation){
  return alert('Geolocation not supported by your browser');
}

// navigator.geolocation.getCurrentPosition(function(position){
//   socket.emit('createLocationMessage',{
//     latitude :position.cords.latitude ,
//     longitude: position.cords.longitude
//   });
// },function(){
//   alert('Unable to fetch location');
// }) ;

navigator.geolocation.getCurrentPosition(function(position){
  socket.emit('createLocationMessage',{
      latitude :position.coords.latitude ,
      longitude: position.coords.longitude
    });
},function(){
  alert('Unable to fetch location');
});



});
