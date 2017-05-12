import { SVG_NS } from '../settings'

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 20;
    this.score = 0;
    
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
      }
    });
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  up() {
    this.y = Math.max(0,this.y-this.speed);
  }

  down() {
    this.y = Math.min(this.boardHeight- this.height,  this.y+this.speed);
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
		rect.setAttributeNS(null, 'width', this.width);
		rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', '#FFFFFF');
    rect.setAttributeNS(null, 'x', this.x);
		rect.setAttributeNS(null, 'y', this.y);
    rect.setAttributeNS(null, 'speed', this.speed);
    rect.setAttributeNS(null, 'score', this.score);   

    svg.appendChild(rect)
  }
}