var WebSocketServer = require("ws").Server
var https = require("https")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = https.createServer(app)
server.listen(port)

console.log("https server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
