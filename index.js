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
	for(let n = 0; n < side * amount; n+= side) {
		let result = new Cell(n, i);
		field.push(result);
	}
}
field.forEach(function(cell, idx) {
	ctx.fillStyle = 'red';
	ctx.fillRect(cell.x, cell.y, side, side)
	ctx.fillStyle = 'black';
	ctx.font = "italic " + 12 + "pt Arial";
	ctx.fillText(idx + 1, cell.x + 10, cell.y + 20);
});

function Player(name) {
	this.name = name;
	this.start = [0, 0];
};

var game = {
	throwDice: function() {
		let rand = 0.5 + Math.random() * 6;
    rand = Math.round(rand);
    return rand;
	},
	players: {

	},
}


