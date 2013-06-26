#pragma strict

var targets : GameObject[];
var EnterAction : String = "MoveUp";
var ExitAction : String = "MoveDown";

var audio1 : AudioSource; 
var audio2 : AudioSource; 


var Texture:Texture2D ;

Texture = Resources.Load ("05_lockers");

var locker : GameObject;
locker = GameObject.FindGameObjectWithTag("Locker1");
static var guiMessage = "";

var spanner : GameObject;

var TriggerOnce : boolean = false;
var zoneListener : boolean = false;

private var triggeringObject : Collider = null;

function Start () 
{

}

function OnGUI(){
	GUI.Box (Rect (10,10,100,90), "");
   	GUI.Label(Rect(10,10,Screen.width,Screen.height), guiMessage);
}

function Update () 
{
	if (Inventory.items["spanner"] == 1){
		if (spanner != null){
			spanner.SetActive(true);
		}
	}
	else{
		if (spanner != null){
			spanner.SetActive(false);
		}
	}
	if (zoneListener){
	guiMessage = "Why not check the lockers...\n (Press Enter to interact)"; 
	   if ((Input.GetKeyDown(KeyCode.KeypadEnter))||(Input.GetKeyDown(KeyCode.Return))){  
	  guiMessage = "";
	  zoneListener = false;	
		if (Texture){
		Debug.Log("3");
         	guiMessage = "You found a spanner..."; 
         	Inventory.items["spanner"] = 1;
			//OnGui();
         	locker.renderer.material.mainTexture =  Texture; 
         	Debug.Log (Inventory.items["spanner"]);
		}
		else{
 		Debug.Log("4");
        	guiMessage = "Nothing to report..."; 
			//OnGui();
        }
	}
	}
	
}

function OnTriggerEnter (other : Collider)
{
	var tag : String = other.tag;
			Debug.Log (tag);
			if(tag != "Player" && tag != "Enemy"){
				return;
			}
			else{
				zoneListener = true;
			}
		
		if(audio1)
	audio1.Play();
		
	
	
		Debug.Log("Locker");
		 
		
		
	
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
			
			if(tag != "Player" && tag != "Enemy"){
				return;
			}
			else{
				zoneListener = false;
			}
			
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