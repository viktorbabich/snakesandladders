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
	this.active = false;
	this.start = 0;
};

var dice = document.getElementById('dice');
dice.onclick = function(event) {
	event.preventDefault();
	game.makeMove()
};



function Teleport(start, end) {
	this.start = start;
	this.end = end;
}

var teleports = [];
var teleportsAmout = 6;

function randTeleport() {
	let maxStart, randStart, randEnd;

	maxStart = amount * amount - (amount + 2);

	randStart = -0.5 + Math.random() * ( maxStart + 1 );
	randStart = Math.round(randStart);

	maxEnd = 40;	
	if(maxStart - randStart < 40) {
		maxEnd = maxStart - randStart;
	}
	randEnd = 9.5 + Math.random() * (maxEnd - 10);
	randEnd = randStart + Math.round(randEnd);
	return [randStart, randEnd];
};
function checkTeleports() {
	let check = false;
	let teleport = randTeleport();
	teleports.forEach(function(item) {
		if(item.start == teleport[0] || 
			item.start == teleport[1] ||
			item.end == teleport[0] ||
			item.end == teleport[1]) {
				check = true;
				checkTeleports();
		} 
	});
	if(check == false) { return teleport};
};

function makeTeleports() {
	for(let i = 0; i < teleportsAmout; i++) {
		let teleport;
		while(teleport == undefined) {
			teleport = checkTeleports();		
		};
		let result = new Teleport(teleport[0], teleport[1]);
		teleports.push(result);
	}
}
makeTeleports();


teleports.forEach(function(teleport, idx) {
	if(idx < teleports.length/2) { 
		ctx.strokeStyle = 'rgb(0,128,0)';
	}	else {
		ctx.strokeStyle = 'rgb(256,0,0)';
	}
		ctx.beginPath();
		ctx.moveTo(field[teleport.start].x + side/2, field[teleport.start].y + side/2);
		ctx.lineTo(field[teleport.end].x + side/2, field[teleport.end].y + side/2);
		ctx.closePath();
		ctx.lineWidth = 5;
		ctx.stroke();
})


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

console.log(teleports)


