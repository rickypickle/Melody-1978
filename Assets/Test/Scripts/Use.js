#pragma strict


static var northUse : GameObject;
var northUseAnim:exSpriteAnimation;
northUse = GameObject.FindGameObjectWithTag("northUse");
northUseAnim = northUse.GetComponent.<exSpriteAnimation>();

static var northEastUse : GameObject;
var northEastUseAnim:exSpriteAnimation;
northEastUse = GameObject.FindGameObjectWithTag("northEastUse");
northEastUseAnim = northEastUse.GetComponent.<exSpriteAnimation>();

static var northWestUse : GameObject;
var northWestUseAnim:exSpriteAnimation;
northWestUse = GameObject.FindGameObjectWithTag("northWestUse");
northWestUseAnim = northWestUse.GetComponent.<exSpriteAnimation>();

static var southWestUse : GameObject;
var southWestUseAnim:exSpriteAnimation;
southWestUse = GameObject.FindGameObjectWithTag("southWestUse");
southWestUseAnim = southWestUse.GetComponent.<exSpriteAnimation>();

static var southUse : GameObject;
var southUseAnim:exSpriteAnimation;
southUse = GameObject.FindGameObjectWithTag("southUse");
southUseAnim = southUse.GetComponent.<exSpriteAnimation>();

static var southEastUse : GameObject;
var southEastUseAnim:exSpriteAnimation;
southEastUse = GameObject.FindGameObjectWithTag("southEastUse");
southEastUseAnim = southEastUse.GetComponent.<exSpriteAnimation>();

static var westUse : GameObject;
var westUseAnim:exSpriteAnimation;
westUse = GameObject.FindGameObjectWithTag("westUse");
westUseAnim = westUse.GetComponent.<exSpriteAnimation>();

static var eastUse : GameObject;
var eastUseAnim:exSpriteAnimation;
eastUse = GameObject.FindGameObjectWithTag("eastUse");
eastUseAnim = eastUse.GetComponent.<exSpriteAnimation>();

function disableAll(){
	northUse.SetActive(false);
	southUse.SetActive(false);
	eastUse.SetActive(false);
	westUse.SetActive(false);
	northEastUse.SetActive(false);
	northWestUse.SetActive(false);
	southEastUse.SetActive(false);
	southWestUse.SetActive(false);
}

var totFrames = 0;

function Start () {
	totFrames = eastUseAnim.GetCurFrameIndex();
	Debug.Log ( "dis many " + totFrames);
	disableAll();
}

static function setDir(){
	if (StateMachine.using){
	if (StateMachine.direction == 1){
		Use.northUse.SetActive(true);
	}
	else if (StateMachine.direction == 2){
		Use.northWestUse.SetActive(true);
	}
	else if (StateMachine.direction == 3){
		Use.westUse.SetActive(true);
	}
	else if (StateMachine.direction == 4){
		Use.southWestUse.SetActive(true);
	}
	else if (StateMachine.direction == 5){
		Use.southUse.SetActive(true);
	}
	else if (StateMachine.direction == 6){
		Use.southEastUse.SetActive(true);
	}
	else if (StateMachine.direction == 7){
		Use.eastUse.SetActive(true);
		Debug.Log ("using east");
	}
	else if (StateMachine.direction == 8){
		Use.northEastUse.SetActive(true);
	}
}

}

function Update () {


	if (Input.GetKeyUp(KeyCode.Return)){
		disableAll();
		StateMachine.using = false;	
	}
	//SimpleMove.standCorrect();
}