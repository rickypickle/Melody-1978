var Molotov : Transform;

function Update () 
{
	if (Input.GetMouseButtonUp(0))
		{
			var mol = Instantiate(Molotov, transform.position, Quaternion.identity);
			mol.rigidbody.AddForce(600 * transform.forward);
			Physics.IgnoreCollision(transform.root.collider, mol.collider);
		}
}