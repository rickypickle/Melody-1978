#pragma strict

var flickerSpeed : float = 0.07;

private var randomizer : int = 0;

while (true) {

    if (randomizer == 0) {

        renderer.enabled = false;

    }

    else renderer.enabled = true;

    randomizer = Random.Range (0, 1.1);

    yield WaitForSeconds (flickerSpeed);

}