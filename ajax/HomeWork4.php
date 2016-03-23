<?php

include_once("List.php");

class HomeWork4 extends Node {
	public static function ex1() {
		header('Content-Type: application/json');

		// while($crawl !== null) {
		// 	echo "Value ".$crawl->Value();
		// 	echo "Column ".$crawl->Column();
		// 	$crawl = $crawl->Next();
		// }

		// $node->$next->next = &new Node(3, null);


		echo json_encode(array(
				"some_param" => "do this"
		));

	}
}

?>
