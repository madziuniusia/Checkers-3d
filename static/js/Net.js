class Net {
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
            //const usersData = data[0].data[0];

            console.log(this.myNumber);
            document.getElementById("header").innerHTML =
              "WITAJ " + myName + ". POCZEKAJ NA DRUGIEGO GRACZA";
            document.getElementById("logowanie").style.display = "none";
            game.drawMap();
            game.drawPawn(this.myNumber);
            game.ChessBoardRotation(this.myNumber); // settings the direction of the board for a specific player
            game.render();
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
            document.getElementById("header").innerHTML =
              "MOŻESZ ROZPOCZĄĆ GRĘ! CHYBA, ŻE NIE JEST TERAZ TWOJA TURA.";
            document.getElementById("root").style.display = "block";
            clearInterval(wait);
          }
        });
    }, 500);
  }

  turnIo() {
    const client = io();
    client.on("turn", (data) => {
      game.pawnTurn(data.X, data.Z, data.I, data.J, data.player);
    });
  }

  Reset() {
    //reset, clear array with users
  }
}
