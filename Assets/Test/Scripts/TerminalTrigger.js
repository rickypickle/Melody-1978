#pragma strict

var targets : GameObject[];
var EnterAction : String = "MoveUp";
var ExitAction : String = "MoveDown";

var audio1 : AudioSource; 
var audio2 : AudioSource; 

var keycard : GameObject;

keycard = GameObject.FindGameObjectWithTag("Keycard1");


var TriggerOnce : boolean = false;
var terminaltriggered : boolean = false;

private var triggeringObject : Collider = null;

function Start () 
{

}

function Update () 
{
	if (terminaltriggered){
		if ((Input.GetKeyDown(KeyCode.Return))||(Input.GetKeyDown(KeyCode.KeypadEnter))){
			Inventory.items["keycard"] = 0;
			LockerTrigger.guiMessage = "You used your keycard and opened the door!";
			//Inventory.items["keycard"] = 1;
			keycard.SetActive(false);
			terminaltriggered = false;
			DoorAnimation.openAnim("lockedDoor");
			//SinkTrigger.switchKeycard(false);
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
		
	if (Inventory.items["keycard"] == 1){
		LockerTrigger.guiMessage = "This keycard should open the door...\nPress Enter to use it...";
		terminaltriggered = true;
	}
	else{
		LockerTrigger.guiMessage = "The door's locked...";
		terminaltriggered = false;
	}
		
		 
		
		
	
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