var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
});

io.on('connection', function(socket){

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


function scoreEventEmitter() {
    io.emit('score-event', {
        home: Math.floor(Math.random() * 10),
        away: Math.floor(Math.random() * 10)
    });
}

setInterval(scoreEventEmitter, 2 * 1000);
