const app = require('express')();
const http = require('http').createServer(app);
// installed socket.io
// passed http into the socket.io to get a 
// new instance of socket.io, io
const io = require('socket.io')(http);

// BTW a script is added to html file 
// where to find local file
// node_modules/socket.io-client/dist/socket.io.js


// home path is serving the html file 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// socket.io - listeners 
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })

  // first argument matches string from html
  socket.on('chat message', (msg) => {
    console.log('message', msg)

    // socket.io - send info out 
    io.emit('chat message', msg)
  })

})






// in their tutorial listen is at the bottom 
// http requirement is added and used to 
// create a server (to do back and forth)
http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});