<?php


class HomeWork3 extends Util {
	public static function Ex1() {
		// initializam variabilele
		$n = $_POST['n'];
		$A = self::getMatrixFromString($_POST['matrice']);
		$epsilon = $_POST['epsilon'];
		// verifica daca inputurile sunt numerice
		// $n , $epsilon si daca matricea e nxn
		if( (is_numeric($n)) &&
			(is_numeric($epsilon)) &&
			($n == count($A)) &&
			($n == count($A[0]))) {

			// fiecare linie incepand de la a doua
			for($i=1; $i<$n-1; $i++){
				// fiecare coloana incepand de la prima
				for($j=0; $j<$n; $j++) {
					$A[$i][$j] = $A[$i][$j] * (-$A[$i][1] * pow($A[1][1], -1)) * $A[1][$j];
					// $b[$i] = $b[$i] - $A[$i][1] * pow($A[1][1], -1)
				}
				
			}
			
			self::dumpMatrix($A);

			// returnam raspunsul sub forma de json
			// completant headerul
			header('Content-type: application/json');
			echo json_encode(
				array(
					"n" => $n,
					"epsilon" =>pow(10, -$epsilon),
					"A" => self::getStringFromArray($A),
				)
			);
		}// if
	}// Ex1
	
	private static function inversa() {
			
	}
}


?>