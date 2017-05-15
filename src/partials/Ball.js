import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping1 = new Audio('public/sounds/pong-01.wav');
    this.ping3 = new Audio('public/sounds/pong-03.wav');

    //ball center in board initially
    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    //generate a random nuber between -5 and 5, that's not 0
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    //a number between -5 and 5, based on the vy
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }
  
  paddleCollision(player1, player2) {
    //checking if moving toward the right, execute only the right side; vice-versa
    if (this.vx > 0) {
      //check for collision on player 2
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x + this.radius >= leftX //the right edge of the ball is >= left edge of the paddle
        && this.x + this.radius <= rightX  //&& the right edge of the ball <= right edge of the paddle
        && this.y + this.radius >= topY //&& the ball Y >= the top edge of the paddle
        && this.y <= bottomY  //&& the ball is <= the bottom edge of the paddle
      ) {
        this.vx = -this.vx;
        this.ping3.play();
      }
    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x - this.radius >= leftX
        && this.x - this.radius <= rightX
        && this.y + this.radius >= topY
        && this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping1.play();
      }
      // check for collision on player 1
    }
  }

  goal(player) {
    player.score++;
    this.reset();
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);


    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', '#FFFFFF');
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    svg.appendChild(circle)

    //detect goal
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;

    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }
  }
}
