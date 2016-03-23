<?php

include_once("List.php");

class HomeWork4 extends SinglyList {
	public static function ex1() {
		header('Content-Type: application/json');

		$list = new SinglyList(5);

		var_dump($list);



		echo json_encode(array(
				"some_param" => "do this"
		));

	}
}

?>
