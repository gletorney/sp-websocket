var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 8080

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})

app.ws('/', (wss, req) => {
  connects.push(ws);

  wss.on('message', message => {
    console.log('Received -', message);
    connects.forEach(socket => {
      socket.send(message);
    });
  });
  
  wss.on('close', () => {
    connects = connects.filter(conn => {
      return (conn === wss) ? false : true;
    });
  });
});


// var wss = new WebSocketServer({server: server})
// console.log("websocket server created")

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });
