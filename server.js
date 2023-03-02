//const
const PORT = 3000;
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app); // tu zmiana
const { Server } = require("socket.io");
const socketio = new Server(server);

const users = [];
const usersData = [{ player1: { name: "" }, player2: { name: "" } }];
let player = "player1";

app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/CHECKERS.html"));
});

app.use(express.static("static"));

app.post("/TwoPlayers", function (req, res) {
  res.setHeader("content-type", "application/json");
  if (users.length == 2) {
    res.end(JSON.stringify(true));
  } else {
    res.end(JSON.stringify(false));
  }
});
socketio.on("connection", (client) => {
  client.on("turn", (data) => {
    console.log(data);
    client.broadcast.emit("turn", {
      X: data.X,
      Z: data.Z,
      I: data.I,
      J: data.J,
      player: data.player,
    });
  });
});

app.post("/api", function (req, res) {
  res.setHeader("content-type", "application/json");
  if (users.length <= 1) {
    if (!users.includes(req.body.user)) {
      users.push(req.body.user);
      if (users.length == 1) {
        usersData[0].player1.name = req.body.user;
        player = "player1";
      } else {
        usersData[0].player2.name = req.body.user;
        player = "player2";
      }

      let context = [
        {
          user: req.body.user,
          data: usersData,
          numberOfPlayer: player,
        },
      ];
      res.end(JSON.stringify(context));
    } else {
      res.end(JSON.stringify("TAKA NAZWA UŻYTKOWNIKA JUZ ISNIEJE", users));
    }
  } else {
    res.end(JSON.stringify("PRZEPRASZAMY GRA JUŻ 2 UŻYTKOWNIKÓW", users));
  }
});

//nasluch
server.listen(PORT, () => {
  console.log("server listening on " + PORT);
});
