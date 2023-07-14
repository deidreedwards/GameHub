function RPSTP(){
    var p1 = (prompt("Player 1, choose Rock, Paper or Scissors ")).toLowerCase()
    var p2 = (prompt("Player 2, choose Rock, Paper or Scissors ")).toLowerCase()
    if (p1==p2){
        document.write("Player 1 chose "+p1+"<br>")
    document.write("Player 2 chose "+p2+"<br>")
    document.write("It's a draw:( Try again")}

    if (p1=="paper"){
        if(p2=="scissors"){
            document.write("Player 2 wins!")
        } else if(p2=="rock"){
            document.write("Player 1 wins!")
        }
    }

    if (p1=="rock"){
        if(p2=="scissors"){
            document.write("Player 1 wins!")
        } else if(p2=="paper"){
            document.write("Player 2 wins!")
        }
    }

    if (p1=="scissors"){
        if(p2=="paper"){
            document.write("Player 1 wins!")
        } else if(p2=="rock"){
            document.write("Player 2 wins!")
        }
    }

    document.body.style.color = "magenta"
    document.body.style.textAlign = "center"
    document.body.style.fontSize = "400%"
    document.body.style.marginTop = "20%"
    document.body.style.backgroundColor = "rgb(121, 218, 177)"
    document.body.style.fontFamily = "Arial, Helvetica, sans-serif"
  
}

function RPSSP(){
    var comp=Math.floor(Math.random()*3)+1
    var player = (prompt("Choose 1 for Rock, 2 for Paper or 3 for Scissors ")).toLowerCase()
    if (comp==player){
    document.write("It's a draw:( Try again")}

    else if (player==2){
        if(comp==1){
            document.write("The human wins!")
        } else if(comp==3){
            document.write("The computer wins!")
        }
    }

    else if (player==1){
        if(comp==3){
            document.write("The human wins!")
        } else if(comp==2){
            document.write("The computer wins!")
        }
    }

    else if (player==3){
        if(comp==1){
            document.write("The human wins!")
        } else if(comp==2){
            document.write("The computer wins!")
        }
    }
    console.log(Math.floor(Math.random()*3)+1)

    document.body.style.color = "magenta"
    document.body.style.textAlign = "center"
    document.body.style.fontSize = "200%"
    document.body.style.fontFamily = "Arial, Helvetica, sans-serif"
    document.body.style.backgroundColor = "rgb(121, 218, 177)"
}

function TTTTP(){
  var currentPlayer = "X";
    var board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    function checkWin(player) {
      for (var i = 0; i < 3; i++) {
        if (
          board[i][0] === player &&
          board[i][1] === player &&
          board[i][2] === player
        ) {
          return true;
        }
      }

      for (var j = 0; j < 3; j++) {
        if (
          board[0][j] === player &&
          board[1][j] === player &&
          board[2][j] === player
        ) {
          return true;
        }
      }

      if (
        board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player
      ) {
        return true;
      }
      if (
        board[0][2] === player &&
        board[1][1] === player &&
        board[2][0] === player
      ) {
        return true;
      }

      return false;
    }

    function checkDraw() {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            return false;
          }
        }
      }
      return true;
    }

    function makeMove(row, col) {
      if (board[row][col] === "") {
        board[row][col] = currentPlayer;
        if (checkWin(currentPlayer)) {
          document.getElementById("result").innerHTML = "Player " + currentPlayer + " wins!";
          resetGame();
        } else if (checkDraw()) {
          document.getElementById("result").innerHTML = "It's a draw!";
          resetGame();
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
        updateBoard();
      } else {
        console.log("Invalid move. Try again.");
      }
    }

    function resetGame() {
      currentPlayer = "X";
      board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
      updateBoard();
    }

    function updateBoard() {
      var cells = document.getElementsByTagName("td");
      var index = 0;
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          cells[index].innerHTML = board[i][j];
          index++;
        }
      }
    }
}

function Snake() {
    var BLOCK_SIZE = 10;
  
    var Game = function() {
      var screen = document.getElementById("screen").getContext('2d');
  
      this.size = { x: screen.canvas.width, y: screen.canvas.height };
      this.center = { x: this.size.x / 2, y: this.size.y / 2 };
  
      this.bodies = createWalls(this).concat(new HeadBlock(this));
      this.addFood();
  
      var self = this;
      var tick = function() {
        self.update();
        self.draw(screen);
        requestAnimationFrame(tick);
      };
  
      tick();
    };
  
    Game.prototype = {
      update: function() {
        for (var i = 0; i < this.bodies.length; i++) {
          if (this.bodies[i].update !== undefined) {
            this.bodies[i].update();
          }
        }
  
        reportCollisions(this.bodies);
      },
  
      draw: function(screen) {
        screen.clearRect(0, 0, this.size.x, this.size.y);
        for (var i = 0; i < this.bodies.length; i++) {
          this.bodies[i].draw(screen);
        }
      },
  
      addBody: function(body) {
        this.bodies.push(body);
      },
  
      removeBody: function(body) {
        var bodyIndex = this.bodies.indexOf(body);
        if (bodyIndex !== -1) {
          this.bodies.splice(bodyIndex, 1);
        }
      },
  
      isSquareFree: function(center) {
        return this.bodies.filter(function(b) {
          return isColliding(b, { center: center, size: { x: BLOCK_SIZE, y: BLOCK_SIZE }});
        }).length === 0;
      },
  
      randomSquare: function() {
        return {
          x: Math.floor(this.size.x / BLOCK_SIZE * Math.random()) * BLOCK_SIZE + BLOCK_SIZE / 2,
          y: Math.floor(this.size.y / BLOCK_SIZE * Math.random()) * BLOCK_SIZE + BLOCK_SIZE / 2
        };
      },
  
      addFood: function() {
        this.addBody(new FoodBlock(this));
      }
    };
  
    var WallBlock = function(game, center, size) {
      this.game = game;
      this.center = center;
      this.size = size;
    };
  
    WallBlock.prototype = {
      draw: function(screen) {
        drawRect(screen, this, "black");
      }
    };
  
    var FoodBlock = function(game) {
      this.game = game;
  
      while (this.center === undefined) {
        var center = this.game.randomSquare();
        if (this.game.isSquareFree(center)) {
          this.center = center;
        }
      }
  
      this.size = { x: BLOCK_SIZE, y: BLOCK_SIZE };
    };
  
    FoodBlock.prototype = {
      draw: function(screen) {
        drawRect(screen, this, "green");
      },
  
      collision: function(otherBody) {
        if (otherBody instanceof HeadBlock) {
          this.game.removeBody(this);
        }
      }
    };
  
    var BodyBlock = function(game, center) {
      this.game = game;
      this.center = center;
      this.size = { x: BLOCK_SIZE, y: BLOCK_SIZE };
    };
  
    BodyBlock.prototype = {
      draw: function(screen) {
        drawRect(screen, this, "black");
      }
    };
  
    var HeadBlock = function(game) {
      this.game = game;
      this.center = { x: this.game.center.x, y: this.game.center.y };
      this.direction = { x: 1, y: 0 };
      this.size = { x: BLOCK_SIZE, y: BLOCK_SIZE };
      this.blocks = [];
  
      this.keyboarder = new Keyboarder();
      this.lastMove = 0;
  
      this.addBlock = false;
    };
  
    HeadBlock.prototype = {
      update: function() {
        this.handleKeyboard();
  
        var now = new Date().getTime();
        if (now > this.lastMove + 100) {
          this.move();
          this.lastMove = now;
        }
      },
  
      draw: function(screen) {
        drawRect(screen, this, "black");
      },
  
      collision: function(otherBody) {
        if (otherBody instanceof WallBlock || otherBody instanceof BodyBlock) {
          this.die();
        } else if (otherBody instanceof FoodBlock) {
          this.eat();
        }
      },
  
      handleKeyboard: function() {
        if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) &&
            this.direction.x !== 1) {
          this.direction.x = -1;
          this.direction.y = 0;
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) &&
                   this.direction.x !== -1) {
          this.direction.x = 1;
          this.direction.y = 0;
        }
  
        if (this.keyboarder.isDown(this.keyboarder.KEYS.UP) &&
            this.direction.y !== 1) {
          this.direction.y = -1;
          this.direction.x = 0;
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) &&
                   this.direction.y !== -1) {
          this.direction.y = 1;
          this.direction.x = 0;
        }
      },
  
      move: function() {
        var prevBlockCenter = { x: this.center.x, y: this.center.y };
        this.center.x += this.direction.x * BLOCK_SIZE;
        this.center.y += this.direction.y * BLOCK_SIZE;
  
        if (this.addBlock === true) {
          var block = new BodyBlock(this.game, prevBlockCenter);
          this.game.addBody(block);
          this.blocks.push(block);
          this.addBlock = false;
        }
  
        for (var i = 0; i < this.blocks.length; i++) {
          var oldCenter = this.blocks[i].center;
          this.blocks[i].center = { x: prevBlockCenter.x, y: prevBlockCenter.y };
          prevBlockCenter = oldCenter;
        }
      },
  
      eat: function() {
        this.addBlock = true;
        this.game.addFood();
      },
  
      die: function() {
        this.game.removeBody(this);
        for (var i = 0; i < this.blocks.length; i++) {
          this.game.removeBody(this.blocks[i]);
        }
      }
    };
  
    var Keyboarder = function() {
      var keyState = {};
  
      window.addEventListener('keydown', function(e) {
        keyState[e.keyCode] = true;
      });
  
      window.addEventListener('keyup', function(e) {
        keyState[e.keyCode] = false;
      });
  
      this.isDown = function(keyCode) {
        return keyState[keyCode] === true;
      };
  
      this.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40 };
    };
  
    var isColliding = function(b1, b2) {
      return !(
        b1 === b2 ||
          b1.center.x + b1.size.x / 2 <= b2.center.x - b2.size.x / 2 ||
          b1.center.y + b1.size.y / 2 <= b2.center.y - b2.size.y / 2 ||
          b1.center.x - b1.size.x / 2 >= b2.center.x + b2.size.x / 2 ||
          b1.center.y - b1.size.y / 2 >= b2.center.y + b2.size.y / 2
      );
    };
  
    var reportCollisions = function(bodies) {
      var collisions = [];
      for (var i = 0; i < bodies.length; i++) {
        for (var j = i + 1; j < bodies.length; j++) {
          if (isColliding(bodies[i], bodies[j])) {
            collisions.push([bodies[i], bodies[j]]);
          }
        }
      }
  
      for (var i = 0; i < collisions.length; i++) {
        if (collisions[i][0].collision !== undefined) {
          collisions[i][0].collision(collisions[i][1]);
        }
  
        if (collisions[i][1].collision !== undefined) {
          collisions[i][1].collision(collisions[i][0]);
        }
      }
    };
  
    var createWalls = function(game) {
      var walls = [];
      walls.push(new WallBlock(game,
                               { x: game.center.x, y: BLOCK_SIZE / 2 },
                               { x: game.size.x, y: BLOCK_SIZE })); // top
  
      walls.push(new WallBlock(game,
                               { x: game.size.x - BLOCK_SIZE / 2, y: game.center.y },
                               { x: BLOCK_SIZE, y: game.size.y - BLOCK_SIZE * 2 })); // right
  
      walls.push(new WallBlock(game,
                               { x: game.center.x, y: game.size.y - BLOCK_SIZE / 2 },
                               { x: game.size.x, y: BLOCK_SIZE })); // bottom
  
      walls.push(new WallBlock(game,
                               { x: BLOCK_SIZE / 2, y: game.center.y },
                               { x: BLOCK_SIZE, y: game.size.y - BLOCK_SIZE * 2 })); // left
      return walls;
    };
  
    var drawRect = function(screen, body, color) {
      screen.fillStyle = color;
      screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
                      body.size.x, body.size.y);
    };
  
    window.addEventListener('load', function() {
      new Game();
    });
}(this);

function Wordle(){
  window.location = "https://www.nytimes.com/games/wordle/index.html";
}

function Memory(){
  const cardsArray = [{
    'name': 'shell',
    'img': 'img/blueshell.png',
  },
  {
    'name': 'star',
    'img': 'img/star.png',
  },
  {
    'name': 'bobomb',
    'img': 'img/bobomb.png',
  },
  {
    'name': 'mario',
    'img': 'img/mario.png',
  },
  {
    'name': 'luigi',
    'img': 'img/luigi.png',
  },
  {
    'name': 'peach',
    'img': 'img/peach.png',
  },
  {
    'name': '1up',
    'img': 'img/1up.png',
  },
  {
    'name': 'mushroom',
    'img': 'img/mushroom.png',
  },
  {
    'name': 'thwomp',
    'img': 'img/thwomp.png',
  },
  {
    'name': 'bulletbill',
    'img': 'img/bulletbill.png',
  },
  {
    'name': 'coin',
    'img': 'img/coin.png',
  },
  {
    'name': 'goomba',
    'img': 'img/goomba.png',
  },
];

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});
}
