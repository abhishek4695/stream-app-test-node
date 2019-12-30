var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require("fs");
var moment = require('moment');
var express = require('express');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'))

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
	var msgg = moment() + ' : ' + msg + '\n';
	console.log('Message: ' + msgg);
	socket.emit('chat message', msgg);
	socket.broadcast.emit('chat message', msgg);
	fs.appendFile('./public/text.txt', msgg, function (err) {
		  if (err) throw err;
		  console.log('Saved!');
	});
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
