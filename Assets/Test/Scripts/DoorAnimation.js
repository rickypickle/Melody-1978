#pragma strict

static var door : GameObject;
static var doorAnim:exSpriteAnimation;
static var totalFrames: int;

static function openAnim(tag:String){
	door = GameObject.FindGameObjectWithTag(tag);
	//doorAnim = door.GetComponent.<exSpriteAnimation>();	
	door.animation["door"].speed = 1.0f;
	door.animation.Play("door");
	//doorAnim.GetCurrentAnimation().speed = 1.0;
	//doorAnim.Play("Door");
	//doorAnim.GetCurrentAnimation().speed = 1.0f;

}
static function closeAnim(tag:String){
//Debug.Log(tag);
//Debug.Log(doorAnim.GetCurFrameIndex());
	//door = GameObject.FindGameObjectWithTag(tag);
	//doorAnim = door.GetComponent.<exSpriteAnimation>();	
	//doorAnim.GetCurrentAnimation().speed = 1.0;
	if(DoorAnimation.door.animation["door"].time == 0){
		door.animation["door"].time = DoorAnimation.door.animation["door"].length;
	}
	else{
		door.animation["door"].time = DoorAnimation.door.animation["door"].time;
	}
	door.animation["door"].speed = -1.0f;
	door.animation.Play("door");
	
	//doorAnim.Play("Door", doorAnim.GetCurFrameIndex());
	//doorAnim.GetCurrentAnimation().speed = -1.0f;

}
function Start () {

}

function Update () {
	
}