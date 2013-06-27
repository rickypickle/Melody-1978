#pragma strict

var speed = 1.0;
var Character : GameObject;

var walkSpeed : int = 1;
var runSpeed : int = 1;

var east : GameObject;
var west : GameObject;
var north : GameObject;
var south : GameObject;

var northEast : GameObject;
var northWest : GameObject;
var southEast : GameObject;
var southWest : GameObject;

var eastW : GameObject;
var westW : GameObject;
var northW : GameObject;
var southW : GameObject;

var northEastW : GameObject;
var northWestW : GameObject;
var southEastW : GameObject;
var southWestW : GameObject;

var eastStand : GameObject;
var westStand : GameObject;
var northStand : GameObject;
var southStand : GameObject;


var eastRun : GameObject;
var westRun : GameObject;
var northRun : GameObject;
var southRun : GameObject;
var northEastRun :GameObject;
var northWestRun :GameObject;
var southEastRun :GameObject;
var southWestRun :GameObject;


var northEastStand : GameObject;
var northWestStand : GameObject;
var southEastStand : GameObject;
var southWestStand : GameObject;

var gunWest : GameObject;
var gunEast : GameObject;
var gunSouth : GameObject;
var gunNorth : GameObject;

Character = GameObject.FindGameObjectWithTag("Player");
gunWest = GameObject.FindGameObjectWithTag("gunWest");
//gunEast = GameObject.FindGameObjectWithTag("gunEast");
//gunSouth = GameObject.FindGameObjectWithTag("gunSouth");
//gunNorth = GameObject.FindGameObjectWithTag("gunNorth");

eastW = GameObject.FindGameObjectWithTag("East");
westW= GameObject.FindGameObjectWithTag("West");
northW = GameObject.FindGameObjectWithTag("North");
southW = GameObject.FindGameObjectWithTag("South");

northEastW = GameObject.FindGameObjectWithTag("northEast");
northWestW = GameObject.FindGameObjectWithTag("northWest");
southEastW = GameObject.FindGameObjectWithTag("southEast");
southWestW = GameObject.FindGameObjectWithTag("southWest");


eastRun = GameObject.FindGameObjectWithTag("EastRun");
westRun = GameObject.FindGameObjectWithTag("WestRun");
northRun = GameObject.FindGameObjectWithTag("NorthRun");
southRun = GameObject.FindGameObjectWithTag("SouthRun");
		
northEastRun = GameObject.FindGameObjectWithTag("NorthEastRun");
northWestRun = GameObject.FindGameObjectWithTag("NorthWestRun");
southEastRun = GameObject.FindGameObjectWithTag("SouthEastRun");
southWestRun = GameObject.FindGameObjectWithTag("SouthWestRun");


northEastStand = GameObject.FindGameObjectWithTag("northEastIdle");
northWestStand = GameObject.FindGameObjectWithTag("northWestIdle");
southEastStand = GameObject.FindGameObjectWithTag("southEastIdle");
southWestStand = GameObject.FindGameObjectWithTag("southWestIdle");

westStand = GameObject.FindGameObjectWithTag("eastIdle");
eastStand = GameObject.FindGameObjectWithTag("westIdle");
northStand = GameObject.FindGameObjectWithTag("northIdle");
southStand = GameObject.FindGameObjectWithTag("southIdle");




disableAllStates();
eastStand.SetActive(true);


var keyCount : int = 0;
var keyPressed : String = "";
var kPressed : int = 0;

MoveCC.speed = walkSpeed;

var U = 0;
var L = 0;
var R = 0;
var D = 0;

var SW = 0;
var SE = 0;
var NW = 0;
var NE = 0;

static var Gpressed : boolean = false;

var aimDirection : int = 12;
var dir : int = -1;
var rotateSpeed :float = 100;


var aim : GameObject;
var aimAnim:exSpriteAnimation;
aim = GameObject.FindGameObjectWithTag("aim");
aimAnim = aim.GetComponent.<exSpriteAnimation>();
var totFrames = 0;
Debug.Log("Frames "+ totFrames);
aim.SetActive(false);

east = eastW;
		west = westW;
		north = northW;
		south = southW;
		
		northEast = northEastW;
		northWest = northWestW;
		southEast = southEastW;
		southWest = southWestW;

function changeRun()
{
	//disableAllStates();
	if (StateMachine.Run){
		east = eastRun;
		west = westRun;
		north = northRun;
		south = southRun;
		
		northEast = northEastRun;
		northWest = northWestRun;
		southEast = southEastRun;
		southWest = southWestRun;
		
	}
	else{
		east = eastW;
		west = westW;
		north = northW;
		south = southW;
		
		northEast = northEastW;
		northWest = northWestW;
		southEast = southEastW;
		southWest = southWestW;
	}
	if ((!Gpressed)&&(!StateMachine.using)&&(R+L+U+D > 0)){
	disableAllStates();
		if (playerDirection == "north"){
			north.SetActive(true);
		}
		else if (playerDirection == "south"){
			south.SetActive(true);
		}
		else if (playerDirection == "northEast"){
			northEast.SetActive(true);
		}
		else if (playerDirection == "southEast"){
			southEast.SetActive(true);
		}
		else if (playerDirection == "southWest"){
			southWest.SetActive(true);
		}
		else if (playerDirection == "northWest"){
			northWest.SetActive(true);
		}
		else if (playerDirection == "west"){
			west.SetActive(true);
		}
		else if (playerDirection == "east"){
			east.SetActive(true);
		}
	}

}



function rotateAim()
{
	rotateSpeed = 30;
	if (kPressed > 0){
	if (dir == 1){// means we rotate anti clockwise
		StateMachine.aimDirection --;
		if (StateMachine.aimDirection <0){
			StateMachine.aimDirection = 15;
		}
	}
	else if (dir == 0){// means we rotate clockwise
		StateMachine.aimDirection ++;
		if (StateMachine.aimDirection >15){
			StateMachine.aimDirection = 0;
		}
	}
	// go to frame number 'aimDirection
	// repeat at gun speed
	
	aimAnim.SetFrame("16PointAim", StateMachine.aimDirection);
	
		Invoke ("rotateAim", 1/rotateSpeed);
	}

}

function drawGun(){
	totFrames = aimAnim.GetCurFrameIndex();
	totFrames--;

}

function standCorrect(){

disableAllStates();
aim.SetActive(false);
	if (StateMachine.aimDirection < 2){
			northStand.SetActive(true);
		}
	else if ((StateMachine.aimDirection >= 2)&&(StateMachine.aimDirection < 4)){
			northWestStand.SetActive(true);
	}
	else if ((StateMachine.aimDirection >= 4)&&(StateMachine.aimDirection < 6)){
			westStand.SetActive(true);
	}
	else if ((StateMachine.aimDirection >= 6)&&(StateMachine.aimDirection < 8)){
			southWestStand.SetActive(true);
	}
	else if ((StateMachine.aimDirection >= 8)&&(StateMachine.aimDirection < 10)){
			southStand.SetActive(true);
	}
	else if ((StateMachine.aimDirection >= 10)&&(StateMachine.aimDirection < 12)){
			southEastStand.SetActive(true);
	}
	else if ((StateMachine.aimDirection >= 12)&&(StateMachine.aimDirection < 14)){
			eastStand.SetActive(true);
	}
	else if ((StateMachine.aimDirection >= 14)&&(StateMachine.aimDirection < 16)){
			northEastStand.SetActive(true);
	}

}

static var playerDirection : String = "east";
function Update () 
{
	//RUNNING
		if (Input.GetKeyDown(KeyCode.LeftShift)){
		        	StateMachine.Run = true;
		        	
		        		changeRun();
		        	
		        	MoveCC.speed = runSpeed;
		        }
		if (Input.GetKeyUp(KeyCode.LeftShift)){
		        	StateMachine.Run = false;
		        	
		        		changeRun();
		        	
		        	MoveCC.speed = walkSpeed;
		        }
	
	// SHOOTING
	if (Input.GetKeyUp(KeyCode.Return)){
				//disableAllStates();
				aimDirection = (StateMachine.direction - 1) * 2;
				standCorrect();
				
				StateMachine.using = false;
				
				Debug.Log(aimDirection + " whuurr");
				}
			
			if (Input.GetKeyDown(KeyCode.Return)){
			if (StateMachine.useableArea){
				StateMachine.using = true;
				disableAllStates();
				Use.setDir();
			}
				
		}
	else if (Input.GetKeyDown(KeyCode.G)){ // AIMING
		disableAllStates();
		
		aim.SetActive(true);
		aimAnim.SetFrame("16PointAim", StateMachine.aimDirection);
		Gpressed = true;
		
		if (playerDirection == "west"){
			//gunWest.SetActive(true);
			
		}
		if (playerDirection == "east"){
			//gunEast.SetActive(true);
		}
		if (playerDirection == "south"){
			//gunSouth.SetActive(true);
		}
		if (playerDirection == "north"){
			//gunNorth.SetActive(true);
		}
		//gunWest.SetActive(true);
	}
	else if (Input.GetKeyUp(KeyCode.G)){
		kPressed = 0;
		
		Gpressed = false;
		disableAllStates();
		
		// when we release the aim we decide what direction to stand
		standCorrect();
	}
	if (Gpressed){
	
		if (Input.GetKeyDown(KeyCode.LeftArrow))
		{
			kPressed = 1;
			dir = 0;
			
			rotateAim();
		}
		if (Input.GetKeyDown(KeyCode.RightArrow))
		{
			kPressed = 1;
			dir = 1;
			//aim.SetActive(true);
			rotateAim();
		}
		if (Input.GetKeyUp(KeyCode.LeftArrow))
		{
			kPressed = 0;
			dir = 1;
			//aim.SetActive(false);
			//rotateAnim();
		}
		if (Input.GetKeyUp(KeyCode.RightArrow))
		{
			kPressed = 0;
			dir = 1;
			//aim.SetActive(false);
			//rotateAnim();
		}
		
	}
	// Check for key press
	if ((!Gpressed)&&(!StateMachine.using)){
	//Debug.Log(Gpressed);
	if (Input.GetKeyDown(KeyCode.UpArrow))
	{
		if (R+L+U+D < 2){
			U = 1;
			disableAllStates();
			if ((U==1)&&(R==1)){
				
					northEast.SetActive(true);
				
				
				playerDirection = "northEast";
				StateMachine.aimDirection = 14;
				StateMachine.direction = 8;
			}
			else if ((U==1)&&(L==1)){
				northWest.SetActive(true);
				
				playerDirection = "northWest";
				StateMachine.aimDirection = 2;
				StateMachine.direction = 2;
			}
			else{
				north.SetActive(true);
				
				playerDirection = "north";
				StateMachine.aimDirection = 0;
				StateMachine.direction = 1;
			}
		}
	}
	if (Input.GetKeyDown(KeyCode.DownArrow))
	{
		if (R+L+U+D < 2){
			D = 1;
			disableAllStates();
			if ((D==1)&&(R==1)){
				southEast.SetActive(true);
				
				playerDirection = "southEast";
				StateMachine.aimDirection = 10;
				StateMachine.direction = 6;
			}
			else if ((D==1)&&(L==1)){
				southWest.SetActive(true);
				
				playerDirection = "southWest";
				StateMachine.aimDirection = 6;
				StateMachine.direction = 4;
			}
			else{
				south.SetActive(true);
				
				playerDirection = "south";
				StateMachine.aimDirection = 8;
				StateMachine.direction = 5;
			}
		}
	}
	if (Input.GetKeyDown(KeyCode.LeftArrow))
	{
		if (R+L+U+D < 2){
			L = 1;
			disableAllStates();
			if ((U==1)&&(L==1)){
				northWest.SetActive(true);
				
				playerDirection = "northWest";
				StateMachine.aimDirection = 2;
				StateMachine.direction = 2;
			}
			else if ((D==1)&&(L==1)){
				southWest.SetActive(true);
				
				playerDirection = "southWest";
				StateMachine.aimDirection = 6;
				StateMachine.direction = 4;
			}
			else{
				west.SetActive(true);
				
				playerDirection = "west";
				StateMachine.aimDirection = 4;
				StateMachine.direction = 3;
			}
		}
	}
	if (Input.GetKeyDown(KeyCode.RightArrow))
	{
		if (R+L+U+D < 2){
			R = 1;
			disableAllStates();
			if ((U==1)&&(R==1)){
				northEast.SetActive(true);
				
				playerDirection = "northEast";
				StateMachine.aimDirection = 14;
				StateMachine.direction = 8;
			}
			else if ((D==1)&&(R==1)){
			southEast.SetActive(true);
			
			playerDirection = "southEast";
			StateMachine.aimDirection = 10;
			StateMachine.direction = 6;
			}
			else{
				east.SetActive(true);
				
				playerDirection = "east";
				StateMachine.aimDirection = 12;
				StateMachine.direction = 7;
			}
		}
	}
	// check for key release
	if (Input.GetKeyUp(KeyCode.UpArrow))
	{
		disableAllStates();
		//northStand.SetActive(true);
		if (R+L+U+D < 2){
			U = 0;
			if (playerDirection == "northEast"){
				northEastStand.SetActive(true);
				StateMachine.aimDirection = 14;
				//StateMachine.direction = 8;
			}
			else if (playerDirection == "northWest"){
				northWestStand.SetActive(true);
				StateMachine.aimDirection = 2;
				//StateMachine.direction = 2;
			}
			else{
				northStand.SetActive(true);
				StateMachine.aimDirection = 0;
				//StateMachine.direction = 1;
			}
		}
		else{
		U = 0;
			if (R == 1){	east.SetActive(true);}
			else if (L==1) {	west.SetActive(true);}
			else if (D==1) {	south.SetActive(true);}
		}
			
	}
	if (Input.GetKeyUp(KeyCode.DownArrow))
	{
		disableAllStates();
		//southStand.SetActive(true);
		if (R+L+U+D < 2){
			D = 0;
			if (playerDirection == "souththEast"){
				southEastStand.SetActive(true);
				StateMachine.aimDirection = 10;
				//StateMachine.direction = 6;
			}
			else if (playerDirection == "southWest"){
				southWestStand.SetActive(true);
				StateMachine.aimDirection = 6;
				//StateMachine.direction = 4;
			}
			else{
				southStand.SetActive(true);
				StateMachine.aimDirection = 8;
				//StateMachine.direction = 5;
			}
		}
		else{
		D = 0;
			if (R == 1){	east.SetActive(true);}
			else if (L==1) {	west.SetActive(true);}
			else if (U==1){	north.SetActive(true);}
		}
	}
	if (Input.GetKeyUp(KeyCode.LeftArrow))
	{
		disableAllStates();
		//westStand.SetActive(true);
		if (R+L+U+D < 2){
			L = 0;
			if (playerDirection == "southWest"){
				southWestStand.SetActive(true);
				StateMachine.aimDirection = 6;
				//StateMachine.direction = 4;
			}
			else if (playerDirection == "northWest"){
				northWestStand.SetActive(true);
				StateMachine.aimDirection = 2;
				//StateMachine.direction = 2;
			}
			else{
				westStand.SetActive(true);
				StateMachine.aimDirection = 4;
				//StateMachine.direction = 3;
			}
		}
		else{
		L = 0;
			if (R == 1){	east.SetActive(true);}
			else if (D==1) {	south.SetActive(true);}
			else if (U==1){	north.SetActive(true);}
		}
	}
	if (Input.GetKeyUp(KeyCode.RightArrow))
	{
		disableAllStates();
		//eastStand.SetActive(true);
		if (R+L+U+D < 2){
			R = 0;
			if (playerDirection == "northEast"){
				northEastStand.SetActive(true);
				StateMachine.aimDirection = 14;
				//StateMachine.direction = 8;
			}
			else if (playerDirection == "southEast"){
				southEastStand.SetActive(true);
				StateMachine.aimDirection = 10;
				//StateMachine.direction = 6;
			}
			else{
				eastStand.SetActive(true);
				StateMachine.aimDirection = 12;
				//StateMachine.direction = 5;
			}
		}
		else{
		R = 0;
			if (D == 1){	south.SetActive(true);}
			else if (L==1) {	west.SetActive(true);}
			else if (U==1){	north.SetActive(true);}
		}
	}
	}
	
	// after determining the movement direction we check to see a button is pressed then activate that
		//Debug.Log(playerDirection + U + D + L + R);
}

function disableAllStates(){
	if (kPressed < 2){
		eastW.SetActive(false);
		southW.SetActive(false);
		northW.SetActive(false);
		westW.SetActive(false);
		eastStand.SetActive(false);
		westStand.SetActive(false);
		northStand.SetActive(false);
		southStand.SetActive(false);
		
		northEastW.SetActive(false);
		northWestW.SetActive(false);
		southEastW.SetActive(false);
		southWestW.SetActive(false);
		
		gunWest.SetActive(false);
		
		northEastStand.SetActive(false);
		northWestStand.SetActive(false);
		southEastStand.SetActive(false);
		southWestStand.SetActive(false);
		
		
		eastRun.SetActive(false);
		westRun.SetActive(false);
		northRun.SetActive(false);
		southRun.SetActive(false);
		northEastRun.SetActive(false);
		northWestRun.SetActive(false);
		southEastRun.SetActive(false);
		southWestRun.SetActive(false);
		
	}

}