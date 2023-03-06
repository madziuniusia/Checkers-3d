class Net {
  constructor() {
    this.myNumber;
  }
  //Class Fetch, create form
  AnswerFetch() {
    //function with Answer from Fetch
    document.getElementById("PostFetch").onclick = function () {
      const body = JSON.stringify({
        user: document.getElementById("input").value,
      });

      const headers = { "Content-Type": "application/json" }; // nagłowek czyli typ danych
      fetch("/api", { method: "post", body, headers })
        .then((response) => response.json())
        .then((data) => {
          if (
            data != "TAKA NAZWA UŻYTKOWNIKA JUZ ISNIEJE" &&
            data != "PRZEPRASZAMY GRA JUŻ 2 UŻYTKOWNIKÓW"
          ) {
            const myName = data[0].user;
            this.myNumber = data[0].numberOfPlayer;
            net.player(this.myNumber);
            document.getElementById("header").innerHTML =
              "WITAJ " + myName + ". POCZEKAJ NA DRUGIEGO GRACZA";
            document.getElementById("logowanie").style.display = "none";
            game.drawMap();
            game.drawPawn(this.myNumber);
            game.ChessBoardRotation(this.myNumber); // settings the direction of the board for a specific player
            game.render();
            if (this.myNumber == "player2") {
              document.getElementById("turn").style.display = "block";
              document.getElementById("header").innerHTML =
                "POCZEKAJ NA SWÓJ RUCH";
            }
          } else {
            document.getElementById("header").innerHTML = data;
          }
        });
    };
  }

  check() {
    let wait = setInterval(function () {
      const body = JSON.stringify({});
      const headers = { "Content-Type": "application/json" }; // nagłowek czyli typ danych
      fetch("/TwoPlayers", { method: "post", body, headers })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("root").style.display = "none";
          if (data == true) {
            document.getElementById("root").style.display = "block";
            clearInterval(wait);
            //if (net.myNumber == "player1") {
            net.time(net.myNumber);
            //}
          }
        });
    }, 100);
  }

  player(player) {
    this.myNumber = player;
  }

  turnIo() {
    const client = io();
    client.on("turn", (data) => {
      game.pawnTurn(data.X, data.Z, data.I, data.J, data.player);
    });

    client.on("turnplayer", (data) => {
      game.time(data.player);
    });
  }

  time(turnplayer) {
    clearInterval(this.timer);
    let seconds = 31;
    const client = io();
    let myNumber = this.myNumber;
    console.log(turnplayer);
    this.timer = setInterval(function () {
      seconds--;
      document.getElementById("time").innerHTML = seconds;
      if (seconds == 0) {
        console.log(turnplayer + " mynumber " + myNumber);
        document.getElementById("time").innerHTML = "";
        if (turnplayer == myNumber) {
          client.emit("turnplayer", {
            player: myNumber,
          });
        }
      }
    }, 1000);
  }

  Reset() {
    //reset, clear array with users
  }
}
