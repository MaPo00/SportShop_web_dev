// Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
	
var cw = 10;
var d;
var food;


var snake_array;
	
function init()
{
	d = "right";
	create_snake();	
	create_food(); 	
	
	if(typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(paint, 60); //using a timer which will trigger the paint function every 60ms
}	
init();
	
	
function create_snake()
{
	var length = 5; 	//start snake lenght
	snake_array = []; 	
	for(var i = length-1; i>=0; i--)
	{
		//start from top left
		snake_array.push({x: i, y:0});
	}
}
	

function create_food()
{
	food = {
		x: Math.round(Math.random()*(w-cw)/cw), 
		y: Math.round(Math.random()*(h-cw)/cw), 
	};	
}


function paint()
{
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);
	

	var nx = snake_array[0].x;
	var ny = snake_array[0].y;
	
	
	if(d == "right") nx++;
	else if(d == "left") nx--;
	else if(d == "up") ny--;      //increment it to get the new head position
	else if(d == "down") ny++;
	

	// restart the game if the snake hits the wall
	// also adding the code for body collision	
	if(nx==-1||nx==w/cw||ny==-1||ny==h/cw||check_collision(nx,ny,snake_array))
	{
		init();		
		return;
	}

	
	if(nx==food.x&&ny==food.y)
	{
		var tail = {x:nx,y:ny};			// if the new head position matches with that of the food, crete a new head instead of moving the tail
										
		create_food();
	}
	else
	{
		var tail = snake_array.pop(); //pops out the last cell
		tail.x = nx; tail.y = ny;
	}
	// the snake can now eat the food.
	
	snake_array.unshift(tail); //puts back the tail as the first cell
		
	for(var i = 0; i < snake_array.length; i++)
	{
		var c = snake_array[i];
		paint_food(c.x,c.y);
	}

	
	paint_food(food.x,food.y);
}
	

function paint_food(x,y)
{
	ctx.fillStyle = "red";
	ctx.fillRect(x*cw, y*cw, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(x*cw, y*cw, cw, cw);
}	

// function to check if the provided x/y coordinates exist in an array of cells or not
function check_collision(x,y,array)
{
	for(var i=0;i<array.length;i++)
	{
		if(array[i].x==x&&array[i].y==y)
			return true;
	}
	return false;
}

function arrow_key(key) 
{
	if(key == "37" && d != "right") 
		d = "left";
	else if(key == "38" && d != "down") 
		d = "up";
	else if(key == "39" && d != "left") 
		d = "right";
	else if(key == "40" && d != "up") 
		d = "down";
}

function checkKeycode(event) 
{
    var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;

    arrow_key(keycode);

    return false;
}

document.onkeydown = checkKeycode;