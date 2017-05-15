import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Obstacles from './Obstacles';

export default class Game {

	constructor(element, width, height) {
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(element);

		this.board = new Board(this.width, this.height);
		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.padding = 10;
		this.radius = 8;

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.padding,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.paddleWidth - this.padding),
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down);

		this.ball = new Ball(
			this.radius,
			this.width,
			this.height);

		this.ball2 =new Ball (
			this.radius*4,
			this.width,
			this.height,

			document.addEventListener('keydown', event => {
			if (event.key === KEYS.b) {
				this.addBall = !this.addBall;
			}
		})
		);

		this.player1Score = new Score(this.width / 2 - 50, 50, 50, 'red')
		this.player2Score = new Score(this.width / 2 + 25, 50, 50, 'blue')

		this.obstacles = new Obstacles(80, 80, this.width/2 - 40, this.height/2 - 40,
		)

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		})
	}

	render() {

		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.player1Score.render(svg, this.player1.score);
		this.player2Score.render(svg, this.player2.score);
		this.ball.render(svg, this.player1, this.player2);
		this.obstacles.render(svg);
		if (this.addBall) {
			return this.ball2.render(svg, this.player1, this.player2);
		}
	}
}