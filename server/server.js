var express = require("express");
const { SocketAddress } = require("net");

var app = express();

var server = app.listen(3000, async () => {
  console.log("server is running on port", server.address().port);
});

app.get('/game', (req, res) => {
  res.send("hello world!")
})

var http = require("http").Server(app);
var io = require("socket.io")(http);

let fullRooms = {}
let rooms = {}

io.on("connection", async (socket) => {
  console.log("User Connected");
  socket.on("disconnect", (reason) => {
    console.log(reason);
  });

  socket.on("create", async (room) => {
    if (!(room.name in rooms || room.name in fullRooms)) {
      socket.join(room.name)
      rooms[room.name] = { "players": [socket,], "current": 0 }
      socket.emit("create_response", "OK")
    }
    socket.emit("create_response", "Room with same name already exists")
  })

  socket.on("search", async () => {
    socket.emit("search_results", rooms)
  })

  socket.on("join", async (room) => {
    if (room.name in rooms) {
      const room = rooms[room.name]
      room.players.push(socket)

      delete rooms[room.name]
      socket.join(room.name)
      socket.emit("join_response", "joined successfully")
      fullRooms[room.name] = room
    } else {
      socket.emit("join_response", "failed to join")
    }
  })

  socket.on("damage", async (damage) => {
    var rooms = Object.keys(io.sockets.adapter.sids[socket.id]);
    rooms.forEach((room) => {
      io.to(room).emit("receive_damage", damage)
    })
  })

  socket.on("game_result", async (result) => {
    var rooms = Object.keys(io.sockets.adapter.sids[socket.id]);
    rooms.forEach((room) => {
      io.to(room).emit("game_result", result)
      delete fullRooms[room]
    })
  })
});
