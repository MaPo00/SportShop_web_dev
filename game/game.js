var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var cw = 10;
var food;

function create_snake()
{
	var length = 5; 	// initial length of the snake
	snake_array = []; 	
	for(var i = length-1; i>=0; i--)
	{
		//create a horizontal snake starting from the top left
		snake_array.push({x: i, y:0});
	}
}
	
// function to create the food
function create_food()
{
	food = {
		x: Math.round(Math.random()*(w-cw)/cw), 
		y: Math.round(Math.random()*(h-cw)/cw), 
	};	
}

// function to paint the snake
function paint()
{
}