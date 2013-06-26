#pragma strict

var targets : GameObject[];
var EnterAction : String = "MoveUp";
var ExitAction : String = "MoveDown";

var audio1 : AudioSource; 
var audio2 : AudioSource; 

var keycard : GameObject;

var currentTrigger : String;

keycard = GameObject.FindGameObjectWithTag("Keycard1");


var TriggerOnce : boolean = false;
var terminaltriggered : boolean = false;

private var triggeringObject : Collider = null;



var redLight : GameObject;
var greenLight : GameObject;

function Start () 
{
		//Debug.Log ( transform.parent.tag + "triggering  start");
		//transform.parent.GetComponentInChildren();
		
		for (var i = 0; i < transform.parent.childCount; i++){
		//Debug.Log( i + " scan");
		if (transform.parent.GetChild(i).CompareTag("redLight")){
			redLight = transform.parent.GetChild(i).gameObject;
			//Debug.Log( i + " red");
		}
		if (transform.parent.GetChild(i).CompareTag("greenLight")){
			greenLight = transform.parent.GetChild(i).gameObject;
			//Debug.Log( i + " green");
		}
		}
		
		redLight.SetActive(true);
		greenLight.SetActive(false);
		terminaltriggered = false;

}

function Update () 
{
/*
	if (terminaltriggered){
	Debug.Log("term trig");
		if ((Input.GetKeyDown(KeyCode.Return))||(Input.GetKeyDown(KeyCode.KeypadEnter))){
			Inventory.items["keycard"] = 0;
			LockerTrigger.guiMessage = "You used your keycard and opened the door!";
			Debug.Log("term trig" + Inventory.items["spanner"]);
			//Inventory.items["keycard"] = 1;
			keycard.SetActive(true);
			terminaltriggered = false;
			
			//SinkTrigger.switchKeycard(false);
		}
	}
	*/
}

function OnTriggerEnter (other : Collider)
{
	var tag : String = other.tag;
			//	Debug.Log (transform.parent.tag + "triggering  fsdfsdf");
			if(tag != "Player" && tag != "Enemy")
			return;
		
		if(audio1)
	audio1.Play();
		
	
		 
		//Debug.Log (targets[0].transform.parent.tag);
		currentTrigger = transform.parent.tag;
		DoorAnimation.openAnim(transform.parent.tag);
		greenLight.SetActive(true);
		redLight.SetActive(false);
	
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
	
	DoorAnimation.closeAnim(currentTrigger);
	redLight.SetActive(true);
	greenLight.SetActive(false);
	
    		
		
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