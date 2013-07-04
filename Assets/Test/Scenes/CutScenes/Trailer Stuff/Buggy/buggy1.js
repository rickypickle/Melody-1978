#pragma strict

var speed = 12.0;
//var Model : GameObject;

function Update () 
{
	//transform.Translate(Input.GetAxis("Vertical") * Vector3.forward * speed);
	transform.Translate(Input.GetAxis("Horizontal") * Vector3.right * speed);
}