
var projectile : Rigidbody;
var speed = 10;
var launchPoint : GameObject;
var ammo : int = 0;

var playerControlled : boolean;

private var ammoRect : Rect;

function Start()
{
	ammoRect.Set(10, Screen.height - 30, 100, 20);
}

function Update(){
	if ((Input.GetKeyDown (KeyCode.Space))&&(SimpleMove.Gpressed)){
		Debug.Log("Firing " + StateMachine.aimDirection + " " + direction);
		if (direction == StateMachine.aimDirection){
		Debug.Log("Firing " + StateMachine.aimDirection + " " + direction);
			Fire();
		}
	}

}

var direction : int;

function Fire()
{
	if (direction == StateMachine.aimDirection){	 
		var instProj : Rigidbody;
		instProj = Instantiate(projectile, launchPoint.transform.position,
			launchPoint.transform.rotation);
		instProj.velocity = 
			launchPoint.transform.TransformDirection(Vector3(0, 0, speed));
		var projectileComponent = instProj.GetComponent("Bullet");
		if (projectileComponent != null){
			projectileComponent.speed = speed;	
		}
		Physics.IgnoreCollision(instProj.collider, transform.root.root.collider);	 
		ammo -= 1;
	}
}



    
function AddAmmo(amount : int)
{
	ammo += amount;
}

function OnGUI()
{
	if (playerControlled && renderer.enabled)
	{
		var ammoString = String.Format("Ammo: {0}", ammo);
		GUI.TextArea(ammoRect, ammoString);
	}
}