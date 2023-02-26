class Ui {
  constructor() {
    this.render();
  }
  render() {
    document.getElementById("logowanie").onclick = function () {
      // call classes => fetch (login, reset, SecondPlayer
      net.AnswerFetch();
      net.Reset();
      net.check();
      net.turnIo();
    };
  }
}
