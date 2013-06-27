#pragma strict
var cc :CharacterController;
/*var speed = 10;

function Start () 
{
	cc = GetComponent("CharacterController");
}

function Update () 
{
	cc.SimpleMove(Vector3.down);
	cc.SimpleMove(Vector3.right * Input.GetAxis("Horizontal")  * speed);
	cc.SimpleMove(Vector3.forward * Input.GetAxis("Vertical")  * speed);
	
	   
    
}
*/

static var speed : float = 6.0;
var jumpSpeed : float = 8.0;
var gravity : float = 20.0;

private var moveDirection : Vector3 = Vector3.zero;

function Update() {
    var controller : CharacterController = GetComponent(CharacterController);
    
    
    if ((!SimpleMove.Gpressed)&&(!StateMachine.using)){ //if we're aiming we won't move
    if (controller.isGrounded) {
        // We are grounded, so recalculate
        // move direction directly from axes
        
	        moveDirection = Vector3(Input.GetAxisRaw("Horizontal"), 0,
	                                Input.GetAxisRaw("Vertical"));
	        //Debug.Log(moveDirection+" first");
	                     
	        moveDirection = transform.TransformDirection(moveDirection);
	        //Debug.Log(moveDirection+" second");
	        moveDirection *= speed;
	        
	        //Debug.Log(moveDirection+" third");
	        
	        
	        
	        if (Input.GetButton ("Jump")) {
	            moveDirection.y = jumpSpeed;
	        }
        
    }

    // Apply gravity
    moveDirection.y -= gravity * Time.deltaTime;
    
    // Move the controller
    controller.Move(moveDirection * Time.deltaTime);
    }
        else{
        
        	//controller.transform.eulerAngles = Vector3(0,15,0);
        
        }
}
