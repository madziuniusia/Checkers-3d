//const
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const { exit } = require("process");

app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/CHECKERS.html"));
});

app.use(express.static("static"));

const users = [];
const usersData = [
  { player1: { name: "", color: "" }, player2: { name: "", color: "" } },
];
let player = "player1";
let wait = { wait: true };

app.post("/api", function (req, res) {
  res.setHeader("content-type", "application/json");
  if (users.length <= 1) {
    if (!users.includes(req.body.user)) {
      users.push(req.body.user);
      if (users.length == 1) {
        usersData[0].player1.name = req.body.user;
        usersData[0].player1.color = "green";
      } else {
        usersData[0].player2.name = req.body.user;
        usersData[0].player2.color = "yellow";
        player = "player2";
        wait.wait = false;
      }

      let context = [
        {
          user: req.body.user,
          data: usersData,
          numberOfPlayer: player,
          wait: wait,
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
app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
