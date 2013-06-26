#pragma strict

var doorMaxSpeed : float = 0.1;
var maxDist : float = 20.0;
var openDirection : Vector3 = new Vector3(0, 1, 0);

private var basePosition : Vector3;
private var velocity : Vector3;
private var targetPosition : Vector3;

function Start () 
{
	basePosition = transform.position;
	targetPosition = basePosition;
	openDirection.Normalize();
}

function Update () 
{
	var currentPosition = transform.position;
	velocity = targetPosition - currentPosition;
	var speed = velocity.magnitude;
	if(speed > doorMaxSpeed)
	{
		velocity.Normalize();
		velocity *= doorMaxSpeed;
	}
	transform.position += velocity;
}

function MoveUp()
{
	targetPosition = basePosition + maxDist * openDirection;
}

function MoveDown()
{
	targetPosition = basePosition;
}