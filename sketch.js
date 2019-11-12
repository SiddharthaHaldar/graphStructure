let dragged = false;
let currBlob = null;
let globalSelected = false;
let originOffets = [];
let mouseDoubleClicked = {
	x:null,
	y:null
};
let dblClicked =  false;
var data = {
	"Process" :[{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"},
				{name:"a"}],
	"MLV" : [],
	"Model_Object" : []
}
function loadData(){
	
}
class blob{
	constructor(oX,oY,diameter,col,parent,movable){
		this.oX = oX;
		this.oY = oY;
		this.newX = this.oX;
		this.newY = this.oY;
		this.relativeposX = 0;
		this.relativeposY = 0;
		this.parent = parent;
		this.col = col;
		this.diameter = diameter
		this.originXoffset = 0;
		this.originYoffset = 0;
		this.children_originXoffset = 0;
		this.children_originYoffset = 0;
		this.selected = false;
		// this.deltaoXpX = this.parent.oX - this.oX;
		// this.deltaoYpY = this.parent.oY - this.oY;
		this.movable = movable;
		this.show = function(){
			this.newX = this.oX + this.parent.children_originXoffset;
			this.newY = this.oY + this.parent.children_originYoffset;
			if(this.parent.diameter != 0){
				stroke(color("#F9D342"));
				// /strokeWeight(1);
				// line(this.newX + this.relativeposX,
				// 	 this.newY + this.relativeposY,
				// 	 this.parent.newX + this.parent.relativeposX,
				// 	 this.parent.newY + this.parent.relativeposY);
				context.lineWidth = 5;
				context.setLineDash([5,10]);
				context.beginPath();
				context.moveTo(this.newX + this.relativeposX,
				 	 	   this.newY + this.relativeposY);
				context.lineTo( this.parent.newX + this.parent.relativeposX,
							this.parent.newY + this.parent.relativeposY);
				context.stroke();
			}
				var d = dist(mouseX,mouseY,this.newX + this.relativeposX,this.newY + this.relativeposY)
				if(d<=this.diameter/2)
				{
					context.setLineDash([5,0]);
					stroke(color("#CCF381"));
					strokeWeight(5);
				}
				else
					noStroke();
				fill(this.col);
				ellipse(this.newX + this.relativeposX,
						this.newY + this.relativeposY,
						this.diameter,this.diameter
						);

			if(globalSelected === true)
			{
				this.children_originXoffset = this.relativeposX + this.parent.children_originXoffset;
				this.children_originYoffset = this.relativeposY + this.parent.children_originYoffset;
			}
		};
		this.updatePos = function(){
			 if(dragged === true &&
				mouseX >= this.newX + this.relativeposX - this.diameter/2 &&
				mouseX <= this.newX + this.relativeposX + this.diameter/2 &&
				mouseY >= this.newY + this.relativeposY - this.diameter/2 &&
				mouseY <= this.newY + this.relativeposY + this.diameter/2 &&
				this.movable === true &&
				globalSelected === false)
			{
				globalSelected = true;
				//console.log(globalSelected)
				currBlob = this;
				this.selected = true;
				this.relativeposX = mouseX - this.newX;
				this.relativeposY = mouseY - this.newY;
				this.children_originXoffset = this.relativeposX + this.parent.children_originXoffset;
				this.children_originoffset = this.relativeposY + this.parent.children_originYoffset;
			}
			else if(dragged === true && this.selected === true && this.movable === true){
				this.relativeposX = mouseX - this.newX;
				this.relativeposY = mouseY - this.newY;
				this.children_originXoffset = this.relativeposX + this.parent.children_originXoffset;
				this.children_originYoffset = this.relativeposY + this.parent.children_originYoffset;
			}
		}
		this.checkDoubleClicked = function(){
			//console.log("Inside")
			if(dblClicked ==  true&& 
			   dist(this.newX,this.newY,mouseDoubleClicked.x,mouseDoubleClicked.y)
											<= this.diameter / 2)
			{
				console.log(this);
				alert(this);
				dblClicked =  false;
				mouseDoubleClicked.mouseX = null;
				mouseDoubleClicked.mouseY = null;
			}
		}
	}
}
var blobs = [];

function setup() {
	console.log(data);
	frameRate(70);
	var canvas = createCanvas(displayWidth, displayHeight);
	var c = document.getElementsByTagName("canvas")[0];
	context = c.getContext("2d") ;
	c.addEventListener('dblclick', function (e) {
  			
			mouseDoubleClicked.x = mouseX;
			mouseDoubleClicked.y = mouseY;
			dblClicked =  true;
			//console.log(dblClicked,mouseDoubleClicked.x,mouseDoubleClicked.y);
		});
	background(255);
	fill(color("#101820FF"));
	var dummy = new blob(displayWidth/2,40,0,null,null,true)
	var grandfather = new blob(displayWidth/2, 40,100,color("#EC4D37"),dummy,false);
	var father = new blob(displayWidth/2 - 200, 200,70,color("#EC4D37"),grandfather,true);
	var son1 = new blob(displayWidth/2 - 400, 400,50,color("#EC4D37"),father,true);
	var son2 = new blob(displayWidth/2 , 400,50,color("#EC4D37"),father,true);
	blobs.push(dummy);
	blobs.push(grandfather);
	blobs.push(father);
	blobs.push(son1);
	blobs.push(son2);
}

function draw() {
  background(color("#1D1B1B"));
  for(var x =  blobs.length - 1 ;x >= 1;x--)
  {
  	blobs[x].show();
  	blobs[x].updatePos();
  	blobs[x].checkDoubleClicked();
  }
  dblClicked =  false;
  mouseDoubleClicked.mouseX = null;
  mouseDoubleClicked.mouseY = null;
}

function mouseReleased()
{
	//console.log("Mouse Released");
	//console.log(currBlob)
	if(currBlob !== null)
		currBlob.selected = false;
	currBlob = null;
	dragged = false;
	globalSelected = false;
}

function mouseDragged()
{
	//console.log("Mouse Dragged");	
	dragged = true;
}
