<?php

class HomeWork3 {
	public static function Ex1() {
		// initializam variabilele
		$n = $_POST['n'];
		$A = $_POST['matrice'];
		$epsilon = $_POST['epsilon'];

		// returnam raspunsul
		header('Content-type: application/json');
		echo json_encode(
			array(
				"n" => $n,
				"epsilon" => $epsilon,
				"A" => $A
			)
		);
	}
}

?>