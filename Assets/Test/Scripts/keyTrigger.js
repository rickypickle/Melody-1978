#pragma strict


var targets : GameObject[];
var EnterAction : String = "MoveUp";
var ExitAction : String = "MoveDown";

var audio1 : AudioSource; 
var audio2 : AudioSource; 
var keytriggered = false;	
private var triggeringObject : Collider = null;

var TriggerOnce : boolean = false;

function Start () {

}

function Update () {

	if (keytriggered){
		if ((Input.GetKeyDown(KeyCode.Return))||(Input.GetKeyDown(KeyCode.KeypadEnter))){
			
			LockerTrigger.guiMessage = "You picked up the key card.\nKeyCard added to inventory!";
			Inventory.items["keycard"] = 1;
			keytriggered = false;
		}
	}
}

function OnTriggerEnter (other : Collider)
{
	var tag : String = other.tag;
			Debug.Log (tag);
			if(tag != "Player" && tag != "Enemy")
			return;
		
		if(audio1)
	audio1.Play();
	
		LockerTrigger.guiMessage = "There's a Key Card on the floor...\nPress Enter to use it...";
		keytriggered = true;
	
		
		 
		
		
	
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

function OnTriggerExit (other : Collider)
{

var tag : String = other.tag;
			
			if(tag != "Player" && tag != "Enemy")
			return;
			
	if(audio2)
    audio2.Play();
	
	
	
    		
		
		for (var i = 0; i < targets.Length; ++i)
		{
		 if (targets[i])
		 	{
		 		targets[i].SendMessage(ExitAction, null);
		 	}
		}
	
}

function OnDrawGizmosSelected()
{
	Gizmos.color = new Color(1.0, 0, 0);
	for(var i = 0; i < targets.Length; ++i)
	{
		Gizmos.DrawLine(transform.position, targets[i].transform.position);
	}
	
}