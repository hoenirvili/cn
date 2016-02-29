<?php
class HomeWork2
{
	// ex1
	public static function ex1()
	{
		// set content type
		header('Content-type: application/json');	
		echo json_encode(array("test"=>"test"));
	}

}

?>
