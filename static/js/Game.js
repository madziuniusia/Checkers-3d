class Game {
  constructor() {
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
    this.drawMap();
    this.drawPawn();
    this.render();
  }
  drawMap() {
    this.box = new THREE.BoxGeometry(100, 100, 100);
    this.camera.position.set(1000, 700, 0);
    this.camera.lookAt(this.scene.position);

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

    this.materialPawn = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/mats/pawn.jpg"),
      transparent: true,
      opacity: 1,
    });

    for (let i = 0; i < this.chessboard.length; i++) {
      for (let j = 0; j < this.chessboard[i].length; j++) {
        if (this.chessboard[i][j] == 0) {
          this.cube = new THREE.Mesh(this.box, this.materialBlack);
          //cube.userData = { color: "black", x: i, y: j };
        } else if (this.chessboard[i][j] == 1) {
          this.cube = new THREE.Mesh(this.box, this.materialWhite);
          //cube.userData = { color: "white", x: i, y: j };
        }
        this.cube.position.set(i * 100 - 350, -50, j * 100 - 350);
        this.scene.add(this.cube);

        this.Boxclick = false;
        window.addEventListener("mousedown", (event) => {
          this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
          this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
          this.raycaster.setFromCamera(this.mouseVector, this.camera);
          const intersects = this.raycaster.intersectObjects(
            this.scene.children
          );
          if (intersects.length > 0) {
            this.Boxclick = true;
            this.BoxObjRaycaster = intersects[0].object;
          }
        });
      }
    }
  }

  drawPawn() {
    this.cylinder = new THREE.CylinderGeometry(40, 40, 25, 32);

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

    for (let i = 0; i < this.chessboard.length; i++) {
      for (let j = 0; j < this.chessboard[i].length; j++) {
        if (this.pawnArr[i][j] == 0) {
        } else if (this.pawnArr[i][j] == 1) {
          this.pawn = new THREE.Mesh(this.cylinder, this.materialYellow);
          this.pawn.position.set(i * 100 - 350, 25, j * 100 - 350);
          this.scene.add(this.pawn);
          //pion.userData = { player: "player1", x: i, y: j };
        } else if (this.pawnArr[i][j] == 2) {
          this.pawn = new THREE.Mesh(this.cylinder, this.materialGreen);
          this.pawn.position.set(i * 100 - 350, 25, j * 100 - 350);
          this.scene.add(this.pawn);
          //pion.userData = { player: "player2", x: i, y: j };
        }
        this.Pawnclick = false;
        window.addEventListener("mousedown", (event) => {
          this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
          this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
          this.raycaster.setFromCamera(this.mouseVector, this.camera);
          const intersects = this.raycaster.intersectObjects(
            this.scene.children
          );
          if (intersects.length > 0) {
            this.Pawnclick = true;
            this.pawnObjRaycaster = intersects[0].object;
          }
        });
      }
    }
  }

  ChessBoardRotation(myNumber) {
    if (myNumber == "player2") {
      this.camera.position.set(-1000, 700, 0);
      this.camera.lookAt(this.scene.position);
    }
    console.log(myNumber);
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);

    //console.log(this.Pawnclick, this.Boxclick);

    if (this.Pawnclick == true && this.Boxclick == true) {
      this.Pawnclick = false;
      this.Boxclick = false;
    }
  };
}
