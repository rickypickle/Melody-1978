var CameraMove : GameObject;

var target : Collider; //this is the variable that will hold the colliding object
private var triggered : boolean = false; //If we only want to detect the first time it's triggered
function OnTriggerExit(collision : Collider) 
{
if (collision != target) //The colliding object isn't our object
{
return; //don't do anything if it's not our target
}
triggered = true; 

Debug.Log("Triggered");
CameraMove.transform.position.x -= 15;

}