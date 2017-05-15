import { SVG_NS } from '../settings'

export default class Obstacles {
  constructor(width, height, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  render(svg){
    let rect = document.createElementNS(SVG_NS, 'rect');
		rect.setAttributeNS(null, 'width', this.width);
		rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', '#FFFFFF');
    rect.setAttributeNS(null, 'x', this.x);
		rect.setAttributeNS(null, 'y', this.y);  

    svg.appendChild(rect)
  }
}