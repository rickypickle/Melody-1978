#pragma strict

var Texture:Texture2D ;

Texture = Resources.Load ("03_lockers");

var locker : GameObject;
locker = GameObject.FindGameObjectWithTag("Locker1");


var guiMessage = "";

function Start () {

}

function OnGUI(){
	GUI.Box (Rect (10,10,100,90), "Loader Menu");
   GUI.Label(Rect(10,10,Screen.width,Screen.height), guiMessage);
   }

function Update () {

	if(Input.GetKeyDown(KeyCode.UpArrow)){
		guiMessage = "neil";
      		
		if (Texture){

         	Debug.Log("Texture Loaded Sucessfully..."); 
			
         	locker.renderer.material.mainTexture =  Texture; 
		}
		else{
      	

         Debug.Log("Unable to Load texture..."); 

        }
	
	}

}