class Game {
  constructor() {
    this.turn = false;
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("root").append(this.renderer.domElement);
    this.Pawnclick = { clicked: false, object: "", color: "" };
    this.Boxclick = { clicked: false, object: "", i: 0, j: 0 };
    this.chessboard = [
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
    ];
    this.pawnArr = [
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
    ];
    this.materialGreen = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/mats/green.jpeg"),
      transparent: true,
      opacity: 1,
    });

    this.materialYellow = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/mats/yellow.jpg"),
      transparent: true,
      opacity: 1,
    });

    this.materialPicked = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/mats/pawn.jpg"),
      transparent: true,
      opacity: 1,
    });
    this.materialBlack = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/mats/black.jpg"),
      transparent: true,
      opacity: 1,
    });

    this.materialWhite = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/mats/white.jpg"),
      transparent: true,
      opacity: 1,
    });
  }

  drawMap() {
    this.box = new THREE.BoxGeometry(100, 100, 100);
    this.camera.position.set(1000, 800, 0);
    this.camera.lookAt(this.scene.position);
    this.board = new THREE.Group();
    this.blackBoard = new THREE.Group();
    this.whiteBoard = new THREE.Group();

    this.chessboardObject = [];

    for (let i = 0; i < this.chessboard.length; i++) {
      let cubeChessboard = [];
      for (let j = 0; j < this.chessboard[i].length; j++) {
        if (this.chessboard[i][j] == 0) {
          this.cube = new THREE.Mesh(this.box, this.materialBlack);
          this.cube.color = "black";
          this.blackBoard.add(this.cube);
        } else if (this.chessboard[i][j] == 1) {
          this.cube = new THREE.Mesh(this.box, this.materialWhite);
          this.cube.color = "white";
          this.whiteBoard.add(this.cube);
        }
        cubeChessboard.push(this.cube);
        this.cube.position.set(i * 100 - 350, -50, j * 100 - 350);
        this.board.add(this.blackBoard, this.whiteBoard);
        this.cube.x = i;
        this.cube.z = j;
      }
      this.chessboardObject.push(cubeChessboard);
    }
    this.scene.add(this.board);
    window.addEventListener("mousedown", (event) => {
      this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouseVector, this.camera);
      const intersectsBox = this.raycaster.intersectObjects(
        this.board.children
      );
      if (intersectsBox.length > 0) {
        if (intersectsBox[0].object.color == "gray") {
          this.Boxclick.clicked = true;
          this.Boxclick.object = intersectsBox[0].object;
          this.Boxclick.i = this.Boxclick.object.position.x;
          this.Boxclick.j = this.Boxclick.object.position.z;
        }
      }
    });
  }

  drawPawn(myNumber) {
    this.myNumber = myNumber;
    this.pawnGroup = new THREE.Group();
    this.pawnGroupYellow = new THREE.Group();
    this.pawnGroupGreen = new THREE.Group();
    this.cylinder = new THREE.CylinderGeometry(40, 40, 25, 32);

    for (let i = 0; i < this.chessboard.length; i++) {
      for (let j = 0; j < this.chessboard[i].length; j++) {
        if (this.pawnArr[i][j] == 0) {
        } else if (this.pawnArr[i][j] == 1) {
          this.pawn = new THREE.Mesh(this.cylinder, this.materialYellow);
          this.pawn.position.set(i * 100 - 350, 25, j * 100 - 350);
          this.Pawnclick.color = "yellow";
          this.pawn.x = this.pawn.position.x;
          this.pawn.z = this.pawn.position.z;
          this.pawnGroupYellow.add(this.pawn);
        } else if (this.pawnArr[i][j] == 2) {
          this.pawn = new THREE.Mesh(this.cylinder, this.materialGreen);
          this.pawn.position.set(i * 100 - 350, 25, j * 100 - 350);
          this.Pawnclick.color = "green";
          this.pawn.x = this.pawn.position.x;
          this.pawn.z = this.pawn.position.z;
          this.pawnGroupGreen.add(this.pawn);
        }
      }
    }
    this.pawnGroup.add(this.pawnGroupGreen, this.pawnGroupYellow);
    this.scene.add(this.pawnGroup);
    window.addEventListener("mousedown", (event) => {
      this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouseVector, this.camera);
      let intersects;
      if (this.myNumber == "player1") {
        intersects = this.raycaster.intersectObjects(
          this.pawnGroupYellow.children
        );
      } else {
        intersects = this.raycaster.intersectObjects(
          this.pawnGroupGreen.children
        );
      }
      this.pawnGroupGreen.children.forEach((element) => {
        element.material = this.materialGreen;
      });
      this.pawnGroupYellow.children.forEach((element) => {
        element.material = this.materialYellow;
      });
      this.blackBoard.children.forEach((element) => {
        element.material = this.materialBlack;
      });

      if (intersects.length > 0) {
        this.Pawnclick.clicked = true;
        this.Pawnclick.object = intersects[0].object;

        this.Pawnclick.object.material = this.materialPicked;

        let x = (this.Pawnclick.object.position.x + 350) / 100;
        let z = (this.Pawnclick.object.position.z + 350) / 100;

        if (this.myNumber == "player1" && this.Pawnclick.clicked == true) {
          if (this.pawnArr[x - 1][z + 1] == 0 && x - 1 >= 0 && z + 1 <= 7) {
            this.chessboardObject[x - 1][z + 1].material = this.materialPicked;
            this.chessboardObject[x - 1][z + 1].color = "gray";
          }
          if (
            x - 2 >= 0 &&
            z + 2 <= 7 &&
            this.pawnArr[x - 1][z + 1] == 2 &&
            this.pawnArr[x - 2][z + 2] == 0
          ) {
            this.chessboardObject[x - 2][z + 2].material = this.materialPicked;
            this.chessboardObject[x - 2][z + 2].color = "gray";
          }

          if (
            x - 1 >= 0 &&
            z - 1 >= 0 &&
            this.pawnArr[x - 1][z - 1] != 1 &&
            this.pawnArr[x - 1][z - 1] != 2
          ) {
            this.chessboardObject[x - 1][z - 1].material = this.materialPicked;
            this.chessboardObject[x - 1][z - 1].color = "gray";
          }
          if (
            x - 2 >= 0 &&
            z - 2 >= 0 &&
            this.pawnArr[x - 1][z - 1] == 2 &&
            this.pawnArr[x - 2][z - 2] == 0
          ) {
            this.chessboardObject[x - 2][z - 2].material = this.materialPicked;
            this.chessboardObject[x - 2][z - 2].color = "gray";
          }
        } else if (
          this.myNumber == "player2" &&
          this.Pawnclick.clicked == true
        ) {
          if (this.pawnArr[x + 1][z + 1] == 0 && x + 1 <= 7 && z + 1 <= 7) {
            this.chessboardObject[x + 1][z + 1].material = this.materialPicked;
            this.chessboardObject[x + 1][z + 1].color = "gray";
          }

          if (
            x + 2 <= 7 &&
            z + 2 <= 7 &&
            this.pawnArr[x + 1][z + 1] == 1 &&
            this.pawnArr[x + 2][z + 2] == 0
          ) {
            this.chessboardObject[x + 2][z + 2].material = this.materialPicked;
            this.chessboardObject[x + 2][z + 2].color = "gray";
          }

          if (
            x + 1 <= 7 &&
            z - 1 >= 0 &&
            this.pawnArr[x + 1][z - 1] != 1 &&
            this.pawnArr[x + 1][z - 1] != 2
          ) {
            this.chessboardObject[x + 1][z - 1].material = this.materialPicked;
            this.chessboardObject[x + 1][z - 1].color = "gray";
          }
          if (
            x + 2 <= 7 &&
            z - 2 >= 0 &&
            this.pawnArr[x + 1][z - 1] == 1 &&
            this.pawnArr[x + 2][z - 2] == 0
          ) {
            this.chessboardObject[x + 2][z - 2].material = this.materialPicked;
            this.chessboardObject[x + 2][z - 2].color = "gray";
          }
        }
      }
    });
  }

  ChessBoardRotation(myNumber) {
    if (myNumber == "player2") {
      this.camera.position.set(-1000, 800, 0);
      this.camera.lookAt(this.scene.position);
      document.getElementById("header").innerHTML += " Grasz zielonymi.";
    } else {
      document.getElementById("header").innerHTML += " Grasz żółtymi.";
    }
  }

  pawnTurn(x, z, i, j, player) {
    if (player != this.myNumber) {
      if (player == "player1") {
        this.pawnGroupYellow.children.forEach((element) => {
          if (
            element.position.x == i * 100 - 350 &&
            element.position.z == j * 100 - 350
          ) {
            element.position.x = x * 100 - 350;
            element.position.z = z * 100 - 350;
            this.pawnArr[x][z] = 1;
          }
        });
      } else if (player == "player2") {
        this.pawnGroupGreen.children.forEach((element) => {
          if (
            element.position.x == i * 100 - 350 &&
            element.position.z == j * 100 - 350
          ) {
            element.position.x = x * 100 - 350;
            element.position.z = z * 100 - 350;
            this.pawnArr[x][z] = 2;
          }
        });
      }
      this.pawnArr[i][j] = 0;
      if (this.myNumber == "player1") {
        if (i - x >= 2) {
          this.pawnArr[x - 1][z + 1] = 0;
          //zbicie, usuniecie pionka
        } else if (i - x <= -2) {
          this.pawnArr[x - 1][z - 1] = 0;
          //zbicie, usuniecie pionka
        }
      } else {
        if (i - x >= 2) {
          this.pawnArr[x + 1][z + 1] = 0;
        } else if (i - x <= -2) {
          this.pawnArr[x + 1][z - 1] = 0;
        }
      }
    }
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);

    if (this.Boxclick.clicked == true && this.Pawnclick.clicked == true) {
      let i = (this.Pawnclick.object.position.x + 350) / 100;
      let j = (this.Pawnclick.object.position.z + 350) / 100;

      this.Pawnclick.object.position.z = this.Boxclick.j;
      this.Pawnclick.object.position.x = this.Boxclick.i;

      let x = this.Boxclick.object.x;
      let z = this.Boxclick.object.z;

      if (i != x || j != z) {
        this.pawnArr[i][j] = 0;
        if (this.myNumber == "player1") {
          this.Pawnclick.object.material = this.materialYellow;
          this.pawnArr[x][z] = 1;
          if (i - x >= 2) {
            this.pawnArr[x - 1][z + 1] = 0;
            //zbicie, usuniecie pionka
          } else if (i - x <= -2) {
            this.pawnArr[x - 1][z - 1] = 0;
            //zbicie, usuniecie pionka
          }
        } else {
          this.Pawnclick.object.material = this.materialGreen;
          this.pawnArr[x][z] = 2;
          if (i - x >= 2) {
            this.pawnArr[x + 1][z + 1] = 0;
          } else if (i - x <= -2) {
            this.pawnArr[x + 1][z - 1] = 0;
          }
        }

        for (let a = 0; a < this.chessboardObject.length; a++) {
          for (let b = 0; b < this.chessboardObject.length; b++) {
            if ((a % 2 == 0 && b % 2 == 1) || (a % 2 == 1 && b % 2 == 0)) {
              this.chessboardObject[a][b].material = this.materialBlack;
              this.chessboardObject[a][b].color = "black";
            }
          }
        }
        console.table(this.pawnArr);
        // sending a stack of pawns
        const client = io();
        client.emit("turn", {
          X: x,
          Z: z,
          I: i,
          J: j,
          player: this.myNumber,
        });
        x = 0;
        z = 0;
        i = 0;
        j = 0;
        this.Pawnclick.clicked = false;
        this.Boxclick.clicked = false;
      }
    }
  };
}
