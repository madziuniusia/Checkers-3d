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
  }

  drawMap() {
    this.box = new THREE.BoxGeometry(100, 100, 100);
    this.camera.position.set(1000, 800, 0);
    this.camera.lookAt(this.scene.position);
    this.board = new THREE.Group();

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

    for (let i = 0; i < this.chessboard.length; i++) {
      for (let j = 0; j < this.chessboard[i].length; j++) {
        if (this.chessboard[i][j] == 0) {
          this.cube = new THREE.Mesh(this.box, this.materialBlack);
          this.cube.color = "black";
        } else if (this.chessboard[i][j] == 1) {
          this.cube = new THREE.Mesh(this.box, this.materialWhite);
          this.cube.color = "white";
        }
        this.cube.position.set(i * 100 - 350, -50, j * 100 - 350);
        this.cube.x = i;
        this.cube.z = j;
        this.board.add(this.cube);
      }
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
        if (intersectsBox[0].object.color == "black") {
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

    for (let i = 0; i < this.chessboard.length; i++) {
      for (let j = 0; j < this.chessboard[i].length; j++) {
        if (this.pawnArr[i][j] == 0) {
        } else if (this.pawnArr[i][j] == 1) {
          this.pawn = new THREE.Mesh(this.cylinder, this.materialYellow);
          this.pawn.position.set(i * 100 - 350, 25, j * 100 - 350);
          this.pawnGroupYellow.add(this.pawn);
          this.Pawnclick.color = "yellow";
        } else if (this.pawnArr[i][j] == 2) {
          this.pawn = new THREE.Mesh(this.cylinder, this.materialGreen);
          this.pawn.position.set(i * 100 - 350, 25, j * 100 - 350);
          this.pawnGroupGreen.add(this.pawn);
          this.Pawnclick.color = "green";
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
      if (intersects.length > 0) {
        this.Pawnclick.clicked = true;
        this.Pawnclick.object = intersects[0].object;
        //this.Pawnclick.object.material = this.materialPicked;
      }
    });
  }

  ChessBoardRotation(myNumber) {
    if (myNumber == "player2") {
      this.camera.position.set(-1000, 800, 0);
      this.camera.lookAt(this.scene.position);
    }
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);

    if (this.Boxclick.clicked == true && this.Pawnclick.clicked == true) {
      let i = (this.Pawnclick.object.position.x + 350) / 100;
      let j = (this.Pawnclick.object.position.z + 350) / 100;
      this.Pawnclick.object.position.x = this.Boxclick.i;
      this.Pawnclick.object.position.z = this.Boxclick.j;
      let x = this.Boxclick.object.x;
      let z = this.Boxclick.object.z;
      console.log(i, j, x, z);

      if (this.myNumber == "player1") {
        //this.Pawnclick.object.material = this.materialYellow;
        this.pawnArr[x][z] = 1;
      } else {
        //this.Pawnclick.object.material = this.materialGreen;
        this.pawnArr[x][z] = 2;
      }
      this.Boxclick.clicked == false;
      this.Pawnclick.clicked == false;
    }
  };
}
