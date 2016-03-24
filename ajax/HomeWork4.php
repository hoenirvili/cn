<?php

include_once './InternalList/SinglyList.php';
include_once './SparseMatrix.php';

use \InternalList\SinglyList;


class HomeWork4 {
	
	/**
	 * define all paths
	 */
	const	A		= '../input/homework4/a.txt';
	const 	B		= '../input/homework4/b.txt';
	const 	AxB		= '../input/homework4/aorib.txt';
	const 	AplusB	= '../input/homework4/aplusb.txt';


	public static function ex1() {
		header('Content-Type: application/json');

		$matrix = new SparseMatrix(new SinglyList);

		$matrix->parseFile(self::B);

		echo json_encode(array(
				"some_param" => "do this"
		));
	}
}

?>
