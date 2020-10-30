//Create variables here
var dog,dog1,happyDog,database,FoodS,FoodStock;
var MilkBottles = 20;

function preload()
{
  //load images here
  dog1 = loadImage("Dog.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,20,25);
  dog.scale = 0.3;
  dog.addImage(dog1);
  FoodStock = database.ref('Food');
  FoodStock.on("value",readStock);

}


function draw() {  
  background(46,139,87);
  text("Note : Press UP_ARROW Key to Feed Drago Milk!",225,10);
  text("Food Remaining :" + MilkBottles,200,100);
  if(keyWentDown(UP_ARROW)) {
    writeStock(FoodS);
    dog.addImage(happyDog);
    MilkBottles = MilkBottles - 1;
  }

  drawSprites();
  //add styles here
  textSize(35);
  fill("black");
  noStroke();
}

function readStock(data) {
  FoodS = data.val();
}

function writeStock(MilkBottles) {

  if(MilkBottles<=0) {
    MilkBottles= 0;
  }else {
    MilkBottles=MilkBottles-1;
  }

  database.ref('/').update({
  Food:MilkBottles
  })
}

