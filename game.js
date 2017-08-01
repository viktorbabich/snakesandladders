var canvas = document.getElementById('game'),
ctx = canvas.getContext('2d'),
side = 50,
amount = 10,
field = [];

ctx.fillRect(0, 0, canvas.width, canvas.height);
canvas.width = canvas.height = side * amount;

function Cell(x, y) {
	this.x = x;
	this.y = y;
} 
for(let i = side * amount - side; i >= 0; i-= side) {
	if(i%100 != 0) {
		for(let n = 0; n < side * amount; n+= side) {
			let result = new Cell(n, i);
			field.push(result);
		}
	} else {
		for(let n = side * amount - side; n >= 0; n-= side) {
			let result = new Cell(n, i);
			field.push(result);
		}
	}
}
field.forEach(function(cell, idx) {
	ctx.fillStyle = 'cyan';
	ctx.fillRect(cell.x + 4, cell.y + 4, side - 8, side - 8);
	ctx.fillStyle = 'black';
	ctx.font = "italic " + 12 + "pt Arial";
	ctx.fillText(idx + 1, cell.x + 10, cell.y + 20);
});

function Player(name) {
	this.name = name;
	this.start = [0, 0];
};

var game = {
	makeMove: function() {
		game.player.position += game.throwDice();
		ctx.fillStyle = 'black';
		ctx.fillRect(field[game.player.position].x, field[game.player.position].y, side, side);
		console.log(game.player.position)
	},
	throwDice: function() {
		let rand = 0.5 + Math.random() * 6;
    rand = Math.round(rand);
    return rand;
	},
	players: [
		{
			player: {
				name: "name1",
				active: false,
				position: 0
			}
		}, 
		{
			player: {
				name: "name2",
				active: false,
				position: 0
			}
		}
	]
}



var dice = document.getElementById('dice');
dice.onclick = function(event) {
	event.preventDefault();
	game.makeMove()
};



function Ledder(start, end) {
	this.start = start;
	this.end = end;
}

var ledders = [];
var ledderAmout = 2;

function randLedder() {
	let maxStart, randStart, randEnd, check;

	check = false;

	// максимальная начальная ячейка
	maxStart = amount * amount - (amount + 2); // 88

	randStart = -0.5 + Math.random() * ( maxStart + 1 ); // от нуля до 88
	randStart = Math.round(randStart);

	// максимальная конечная ячейка
	maxEnd = 40;	
	if(maxStart - randStart < 40) {
		maxEnd = maxStart - randStart;
	}
	randEnd = 9.5 + Math.random() * (maxEnd - 10 + 1);
	randEnd = randStart + Math.round(randEnd);

	ledders.forEach(function(ledder) {
		if(ledder.start == randStart || 
			ledder.start == randEnd ||
			ledder.end == randStart ||
			ledder.end == randEnd) {
			check = true;
			randLedder();
		};
	});
	if(check == false) {
		let result = new Ledder(randStart, randEnd);
		ledders.push(result);
	}		
};


for(let i = 0; i < ledderAmout; i++) {
	randLedder();
}
ledders.forEach(function(ledder) {
	ctx.fillStyle = 'green';
	ctx.beginPath();
	ctx.moveTo(field[ledder.start].x + side/2, field[ledder.start].y + side/2);
	ctx.lineTo(field[ledder.end].x + side/2, field[ledder.end].y + side/2);
	ctx.closePath();
	ctx.strokeStyle = 'rgb(0,128,0)';
	ctx.lineWidth = 5;
	ctx.stroke();

})


console.log(ledders)