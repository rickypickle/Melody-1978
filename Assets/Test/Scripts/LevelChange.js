#pragma strict

var levelToLoad : String;
 
function OnTriggerEnter(hit : Collider)
{
    Application.LoadLevel(levelToLoad);
}