var columns = 24;

var rows = 1;

var fps = 10.0;

function Update () {

var index : int = Time.time * fps;

index = index % (columns * rows);

var size = Vector2 (1.0 / columns, 1.0 / rows);

var columnIndex = index % columns;
var rowIndex = index / columns;

var offset = Vector2 (columnIndex * size.x, 1.0 - size.y - rowIndex * size.y);
renderer.material.SetTextureOffset ("_MainTex", offset);
renderer.material.SetTextureScale ("_MainTex", size);
}