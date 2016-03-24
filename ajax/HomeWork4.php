<?php

include_once './InternalList/SinglyList.php';

use \InternalList\SinglyList;

class HomeWork4 extends SinglyList {
	public static function ex1() {
		header('Content-Type: application/json');

		$list = new SinglyList(1);
		$list->Append(1, 1);
		$list->Append(2, 1);
		$list->Append(6, 1);
		var_dump($list->Find(1));
		var_dump($list);


		echo json_encode(array(
				"some_param" => "do this"
		));

	}

}

?>
