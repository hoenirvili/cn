<?php

include_once("List.php");

class HomeWork4 {
	public static function ex1() {
		header('Content-Type: application/json');

		echo json_encode(array(
				"some_param" => "do this"
		));

	}
}

?>
