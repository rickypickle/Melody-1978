#pragma strict

var targets : GameObject[];
var EnterAction : String = "MoveUp";
var ExitAction : String = "MoveDown";


var TriggerOnce : boolean = false;


private var triggeringObject : Collider = null;

function Start () 
{

}

function Update () 
{
	
}

function OnTriggerEnter (other : Collider)
{
	if (!other.GetComponent( "Move CC"))	// any script attatched to main player
	{
		return;
	}
	if(!triggeringObject)
	{
		triggeringObject = other;
		
	
		for (var i = 0; i < targets.Length; ++i)
		{
		 if (targets[i])
		 	{
		 		targets[i].SendMessage(EnterAction, null);
		 	}
		}
		if(TriggerOnce)
		{
		Destroy(gameObject);
		}
	}
	
}

function OnTriggerExit (other : Collider)
{
	if (!other.GetComponent( "Move CC"))	// any script attatched to main player
	{
		return;
	}
	if(other == triggeringObject)
	{
		triggeringObject = null;
		for (var i = 0; i < targets.Length; ++i)
		{
		 if (targets[i])
		 	{
		 		targets[i].SendMessage(ExitAction, null);
		 	}
		}
	}
}