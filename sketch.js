let dragged = false;
let currBlob = null;
let globalSelected = false;
let originOffets = [];
class blob{
	constructor(oX,oY,diameter,color,parent,movable){
		this.oX = oX;
		this.oY = oY;
		this.newX = this.oX;
		this.newY = this.oY;
		this.relativeposX = 0;
		this.relativeposY = 0;
		this.parent = parent;
		this.color = color;
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
			if(this.parent.diameter != 0)
			line(this.newX + this.relativeposX,
				 this.newY + this.relativeposY,
				 this.parent.newX + this.parent.relativeposX,
				 this.parent.newY + this.parent.relativeposY);
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
		
	}
}
var blobs = [];

function setup() {
	//frameRate(70);
	var canvas = createCanvas(displayWidth, displayHeight);
	background(255);
	fill(255,0,0);
	var dummy = new blob(displayWidth/2,40,0,null,null,false)
	var grandfather = new blob(displayWidth/2, 40,100,null,dummy,false);
	var father = new blob(displayWidth/2 - 200, 200,70,null,grandfather,true);
	var son = new blob(displayWidth/2 - 400, 400,50,null,father,true);
	var grandson = new blob(displayWidth/2 - 600, 600,50,null,son,true);
	blobs.push(dummy);
	blobs.push(grandfather);
	blobs.push(father);
	blobs.push(son);
	//blobs.push(grandson);
}

function draw() {
  background(255);
  for(var x =  blobs.length - 1 ;x >= 1;x--)
  {
  	blobs[x].show();
  	blobs[x].updatePos();
  }
}

function mouseReleased()
{
	//console.log(currBlob)
	if(currBlob !== null)
		currBlob.selected = false;
	currBlob = null;
	dragged = false;
	globalSelected = false;
}

function mouseDragged()
{
	dragged = true;
}