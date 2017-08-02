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
}; 
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
};
field.forEach(function(cell, idx) {
	ctx.fillStyle = 'cyan';
	ctx.fillRect(cell.x + 4, cell.y + 4, side - 8, side - 8);
	ctx.fillStyle = 'black';
	ctx.font = "italic " + 12 + "pt Arial";
	ctx.fillText(idx + 1, cell.x + 10, cell.y + 20);
});

function Player(name) {
	this.name = name;
	this.active = false;
	this.start = 0;
};

var dice = document.getElementById('dice');
dice.onclick = function(event) {
	event.preventDefault();
	game.makeMove()
};

var minRange = 10;
var maxRange = 40;
var snakes = [];
var ladders = [];
var emptyCells = [];
for(let i = 0; i < amount * amount; i++) {
	emptyCells.push(i);
}

function randomCells() {
  var first = - 0.5 + Math.random() * (emptyCells.length);
  first = Math.round(first);
  if(first + minRange >= emptyCells.length - 1) {
  	second = first - maxRange - 0.5 + Math.random() * ((first - minRange) - (first - maxRange) + 1);
  	second = Math.round(second);
  	return [second, first];
  } else if (first + minRange < emptyCells.length - 1) {
  	second = first + minRange - 0.5 + Math.random() * (emptyCells.length - (first + minRange));
  	second = Math.round(second);
  	return [first, second];
  }
}

function makeTeleport() {
		let newCells = randomCells();
		let newTeleport = [emptyCells[newCells[0]], emptyCells[newCells[1]]];
		emptyCells = emptyCells.filter(function(number, idx) {
			return idx != newCells[0] && idx != newCells[1];
		});
		return newTeleport;
};
function makeLadders() {
	let laddersAmount = 6;
	for(let i = 0; i < laddersAmount; i++) {
		let newLadder = makeTeleport();
		ladders.push(newLadder);
	}
};
function makeSnakes() {
	let snakesAmount = 6;
	for(let i = 0; i < snakesAmount; i++) {
		let newSnake = makeTeleport();
		snakes.push(newSnake);
	}
};
makeLadders();
makeSnakes();

snakes.forEach(function(snake, idx) {
	ctx.strokeStyle = 'rgb(256,0,0)';
	ctx.beginPath();
	ctx.moveTo(field[snake[0]].x + side/2, field[snake[0]].y + side/2);
	ctx.lineTo(field[snake[1]].x + side/2, field[snake[1]].y + side/2);
	ctx.closePath();
	ctx.lineWidth = 5;
	ctx.stroke();
});
ladders.forEach(function(ladder, idx) {
	ctx.strokeStyle = 'rgb(0,128,0)';
	ctx.beginPath();
	ctx.moveTo(field[ladder[0]].x + side/2, field[ladder[0]].y + side/2);
	ctx.lineTo(field[ladder[1]].x + side/2, field[ladder[1]].y + side/2);
	ctx.closePath();
	ctx.lineWidth = 5;
	ctx.stroke();
});

var game = {
	makeMove: function() {
		game.player.position += game.throwDice();
		if(game.player.position >= amount * amount - 1) {
			ctx.fillStyle = 'red';
			ctx.font = "italic " + 32 + "pt Arial";
			ctx.fillText("Ты победил, сука!", 30, amount*side/2);
		}
		teleports.forEach(function(teleport, idx) {
			if(idx < teleports.length/2 && game.player.position == teleport.start) { 
				game.player.position = teleport.end;
				console.log("лестница")
			}	else if(idx >= teleports.length/2 && game.player.position == teleport.end) {
				game.player.position = teleport.start;
				console.log("змея")
			}
		});
		ctx.fillStyle = 'black';
		ctx.fillRect(field[game.player.position].x, field[game.player.position].y, side, side);
		console.log(game.player.position)
	},
	throwDice: function() {
		let rand = 0.5 + Math.random() * 6;
    rand = Math.round(rand);
    return rand;
	},
	player: { 
		name: "name1",
		active: false,
		position: 0
	}
}


