<?php
class HomeWork2
{
	// ex1
	public static function ex1(){
		header('Content-type: application/json');
		// daca numerele din json N si epsilon sunt numerice
		$n		 =	$_POST['n'];
		$epsilon =	$_POST['epsilon'];
		// TODO:
		// parse array and matrice
		$arrayS	 =	$_POST['arr'];
		$matrice =	$_POST['matrice'];

		if (!(is_numeric($n) <=> is_numeric($epsilon))) {
			echo json_encode(array(
				"n" => $n,
				"epsilon" => $epsilon,
				"s" => $arrayS,
				"A" => $matrice
			));
		}
		exit();
	}
}

?>
