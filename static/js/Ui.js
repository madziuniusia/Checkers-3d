class Ui {
  constructor() {
    this.render();
  }
  render() {
    document.getElementById("logowanie").onclick = function () {
      // call classes => fetch (login, reset)
      net.AnswerFetch();
      net.Reset();
    };
  }
}
