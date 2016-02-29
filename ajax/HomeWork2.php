
<?php
require_once("Util.php");

class HomeWork2 extends Util {
	// ex1
	public static function ex1(){
		header('Content-type: application/json');
		// daca numerele din json N si epsilon sunt numerice
		$n		 =	$_POST['n'];
		$epsilon =	$_POST['epsilon'];
		$b = array();
		// parse array and matrice
		$arrayS	 = self::getArrayFromString($_POST['arr']);
		$matrice = self::getMatrixFromString($_POST['matrice']);
		
		// daca true = true space ship operator "<=>"
		// va returna 0 si daca o negam cu ! va returna true
		// deci daca amandoua numere is numerice(int/float/etc)
		// atunci merge pe condiata respectiva
		if (!(is_numeric($n) <=> is_numeric($epsilon))) {
			// i=0,....n)
			$sumArray = 0;
			for($i=0; $i<$n; $i++) {
				$b[$i] = 0;
				for($j=0; $j<$n; $j++) {
					$b[$i] += round($arrayS[$i] * $matrice[$i][$j], $epsilon);
				}
			}
			
			echo json_encode(
				array(
					"n" => $n,
					"epsilon" => $epsilon,
					"s" => self::getStringFromArray($arrayS),
					"A" => self::getStringFromMatrix($matrice),
					"b" => self::getStringFromArray($b)
				)
			);
		}
		exit();
	}
}

?>
