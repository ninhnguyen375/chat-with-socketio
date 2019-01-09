var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var mongoose = require("mongoose")
mongoose.connect(
  "mongodb://ninhnguyen375:ninhnguyen3755@ds123662.mlab.com:23662/appchatdb",
  {useNewUrlParser: true}
)
let db = mongoose.connection

const messSchema = new mongoose.Schema({
  message: String
});

const Mess = mongoose.model('Mess', messSchema, 'Mess');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', async function(socket){
  socket.on('chat message', async function(msg){
    if (msg != "Name: Nhấn 'Go' để bắt đầu!")
      await Mess.insertMany({message: msg});
    
    let newMess = await Mess.find();
    io.emit('chat message', newMess);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
