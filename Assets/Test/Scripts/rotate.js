#pragma strict
var speed : float = 1;

function Start () {

}

function Update () 

{
	transform.Rotate(Vector3.right * Time.deltaTime * speed);
}