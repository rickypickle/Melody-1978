#pragma strict

var targets : GameObject[];
var EnterAction : String = "MoveUp";
var ExitAction : String = "MoveDown";

var audio1 : AudioSource; 
var audio2 : AudioSource; 

var keycard : GameObject;
var keycardPlaced : GameObject;

// sink animation vars
var sink : GameObject;
var sinkAnim:exSpriteAnimation;
var totFrames = 0;

// puddle
var puddle : GameObject;
var keyTrigger : GameObject;
	
keycard = GameObject.FindGameObjectWithTag("Keycard1");
keycardPlaced = GameObject.FindGameObjectWithTag("keyCardPlaced");
keyTrigger = GameObject.FindGameObjectWithTag("keyTrigger");

keyTrigger.SetActive(false);

keycard.SetActive(false);

var TriggerOnce : boolean = false;
var sinktriggered : boolean = false;

private var triggeringObject : Collider = null;

function Start () 
{

}

function reverseAnim(){
Debug.Log("rev");
	sinkAnim.SetFrame("SinkAnim", totFrames);
	totFrames --;
	if (totFrames >=0){
		Invoke ("reverseAnim", .7);
	}
}
var i:int = 1000;

function puddleShrink(){
	
	if(i>0){
		puddle.transform.localScale = Vector3(puddle.transform.localScale.x * .85, puddle.transform.localScale.y *.75, puddle.transform.localScale.z * .55);
		i--;
		//Debug.Log(puddle.transform.localPosition.x); 
		//Debug.Log(puddle.transform.localPosition.y); 
		//Debug.Log(puddle.transform.localPosition.z);
		Invoke("puddleShrink", 0.1);
	}
	else{
	Debug.Log("true");
		
	}

}

function sinkDrain() {
	sink = GameObject.FindGameObjectWithTag("sinkAnim");
	sinkAnim = sink.GetComponent.<exSpriteAnimation>();	
	totFrames = sinkAnim.GetCurFrameIndex();
	
	puddle = GameObject.FindGameObjectWithTag("Puddle");
	
		reverseAnim();
		puddleShrink();
		
		keyTrigger.SetActive(true);
		//sinkAnim.Play("SinkAnim", 10);
		//sinkAnim.GetCurrentAnimation().speed = -1.0f;
		
	
}

function Update () 
{
	if (sinktriggered){
		if ((Input.GetKeyDown(KeyCode.Return))||(Input.GetKeyDown(KeyCode.KeypadEnter))){
			Inventory.items["spanner"] = 0;
			sinkDrain();
			LockerTrigger.guiMessage = "You used your spanner and fixed the sink";
			sinktriggered = false;
		}
	}
	if (Inventory.items["keycard"]){
		keyTrigger.SetActive(false);
		keycard.SetActive(true);
		keycardPlaced.SetActive(false);
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
		
	if (Inventory.items["spanner"] == 1){
		LockerTrigger.guiMessage = "Maybe this spanner will come in handy...\nPress Enter to use it...";
		sinktriggered = true;
	}
	else{
		LockerTrigger.guiMessage = "Hmmm, better find something to fix this sink. \nMaybe I'll look in the lockers...";
		sinktriggered = false;
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