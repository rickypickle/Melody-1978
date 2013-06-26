var CameraMove : GameObject;
var CameraMove2 : GameObject;

// COMMENT OUT THESE LINES IF YOU WANT TO SET VARS FROM INSPECTOR
//CameraMove = GameObject.FindGameObjectWithTag("MainCamera");
CameraMove = GameObject.FindGameObjectWithTag("MainCamera");
CameraMove2 = GameObject.FindGameObjectWithTag("FloorCamera");

var target : Collider; //this is the variable that will hold the colliding object
private var triggered : boolean = false; //If we only want to detect the first time it's triggered

var trigX : int = 0;
var trigZ : int = 0;
var trigY : int = 0;

var zooming : boolean = false;


var targetCameraX : int;
var targetCameraZ : int;
var targetCameraY : int;

function OnTriggerEnter(collision : Collider) 
{
	if (collision != target) //The colliding object isn't our object
	{
	Debug.Log("Triggerednae" + collision);
	return; //don't do anything if it's not our target
	}
	triggered = true; 
	
	trigX = CameraMove.transform.position.x;
	trigZ = CameraMove.transform.position.z;
	trigY =CameraMove.transform.position.y;
	Debug.Log("Triggered" + trigX + " " + trigZ + " y " + trigY);
	
	
	
	setupPath();
	//zoomDir = "out";

}

var decelerateCamera:double;

var xDistance : double = 0;
var zDistance : double = 0;
var yDistance : double = 0;

var xRate : double = 0;
var zRate : double = 0;

var xPositive : boolean = false;
var zPositive : boolean = false;
var yPositive : boolean = false;

var XorZ : double = 0;

function setupPath(){

//targetCameraX = 25;
//targetCameraZ = 25;
Debug.Log("XorZzzz" + targetCameraX + " " + targetCameraZ + " " + XorZ);

	if (trigX < targetCameraX){ // first check to see dir of cam movement
		xDistance = targetCameraX - trigX;
		xPositive = true;
	}
	else{
		xDistance =  trigX -targetCameraX;
		xPositive = false;
	}
	
	if (trigZ < targetCameraZ){ // first check to see dir of cam movement
		zDistance = targetCameraZ - trigZ;
		zPositive = true;
	}
	else{
		zDistance =  trigZ -targetCameraZ;
		zPositive = false;
	}
	
	if (trigY < targetCameraY){ // first check to see dir of cam movement
		yDistance = targetCameraY - trigY;
		yPositive = true;
	}
	else{
		yDistance =  trigY -targetCameraY;
		yPositive = false;
	}
	
	if (zDistance > xDistance){
		zRate = 1;
		xRate = xDistance / zDistance;
		XorZ = zDistance;
	}
	else {
		xRate = 1;
		zRate = zDistance / xDistance;
		XorZ = xDistance;
	}
	Debug.Log("XorZ" + xRate + " " + zRate + " " + XorZ + "y " + yDistance);
	animateCamera();
}


function animateCamera(){
	
	
	if (XorZ >= 0.0){
		//accelCamera = (targetCamera[0] - trigX);
		//accelCamera = 1 - (accelCamera/100);
		Debug.Log("once!");
		if (xPositive){
			CameraMove.transform.position.x += (xRate/decelerateCamera);
			//CameraMove2.transform.position.x += xRate;
		}
		else{
			CameraMove.transform.position.x -= (xRate/decelerateCamera);
			//CameraMove2.transform.position.x -= xRate;
		}
		if (zPositive){
			CameraMove.transform.position.z += (zRate/decelerateCamera);
			//CameraMove2.transform.position.z += zRate;
		}
		else{
			CameraMove.transform.position.z -= (zRate/decelerateCamera);
			//CameraMove2.transform.position.z -= zRate;
		}
		if (yPositive){
			//CameraMove.transform.position.y += 1;
			//CameraMove2.transform.position.z += zRate;
		}
		else{
			//CameraMove.transform.position.y -= 1;
			//CameraMove2.transform.position.z -= zRate;
		}
		
		XorZ -= (1/decelerateCamera);
		Invoke ("animateCamera", .01);
		
	}
	else{
		CameraMove.transform.position.x = targetCameraX;
		CameraMove.transform.position.z = targetCameraZ;
		//CameraMove.transform.position.y = targetCameraY;
		CameraMove2.transform.position.x = targetCameraX;
		CameraMove2.transform.position.z = targetCameraZ;
		//CameraMove2.transform.position.y = targetCameraY;
			if (zooming){
				zumeCamera();
			}
	
	}
}



var zoom : double = 1;
var zoomEnd : int = 10;
var zoomAmount : double = .1;
var zoomDir : String = "in";
function zumeCamera(){
	
	zoom ++;
	
	if (zoom <= zoomEnd){
		if (zoomDir == "in"){
			//Camera.main.orthographicSize -= .1;
			//CameraMove.main.orthographicSize -= .1;
			CameraMove.camera.orthographicSize -= .1;
			CameraMove2.camera.orthographicSize -= .1;
		}
		else if (zoomDir == "out"){
			CameraMove.camera.orthographicSize += .1;
			CameraMove2.camera.orthographicSize += .1;
		}
		
		Invoke ("zumeCamera", .02);
	}
	else{
		zoom = 1;
	}
}