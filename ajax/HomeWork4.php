<?php

include_once './InternalList/SinglyList.php';

use \InternalList\SinglyList;

class HomeWork4 extends SinglyList {
	
	public static function ex1() {
		header('Content-Type: application/json');


		$list = new SinglyList;
		$list->Append(1, 1);
		$list->Append(2, 1);
		$list->Append(6, 3);
		$list->Append(10, 5);
		$list->Append(5, 1);
		$list->Append(111231,31231);

		print_r($list);

		echo json_encode(array(
				"some_param" => "do this"
		));
	}
}

?>
