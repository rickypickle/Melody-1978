   var movTexture : MovieTexture;
    function Start () {
        renderer.material.mainTexture = movTexture;
        movTexture.Play();
    }