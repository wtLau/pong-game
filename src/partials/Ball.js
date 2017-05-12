import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    //ball center in board initially
    this.reset();
  }

reset() {
  this.x = this.boardWidth/2;
  this.y = this.boardHeight/2;

  //generate a random nuber between -5 and 5, that's not 0
  this.vy = 0;
  while (this.vy === 0){
    this.vy = Math.floor(Math.random() * 10 - 5); 
  }

  //a number between -5 and 5, based on the vy
  this.vx = this.direction * (6 - Math.abs(this.vy));
}

  wallCollision () {
    const hitLeft = this.x- this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y- this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }
  

  render(svg) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();

    let circle = document.createElementNS(SVG_NS, 'circle');
		circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', '#FFFFFF');
    circle.setAttributeNS(null, 'cx', this.x);
		circle.setAttributeNS(null, 'cy', this.y);

    svg.appendChild(circle)
  }
}
