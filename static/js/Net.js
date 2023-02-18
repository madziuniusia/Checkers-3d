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
            const myNumber = data[0].numberOfPlayer;
            const usersData = data[0].data[0];
            document.getElementById("header").innerHTML = "Witaj " + myName;
            document.getElementById("logowanie").style.display = "none";
            game.ChessBoardRotation(myNumber); // settings the direction of the board for a specific player
            /* if (usersData.player2.name == "") {
              document.getElementById("root").style.display = "none";
            } else {
              document.getElementById("root").style.display = "block";
            } */
          } else {
            document.getElementById("header").innerHTML = data;
          }
        });
    };
  }

  Reset() {
    //reset, clear array with users
  }
}