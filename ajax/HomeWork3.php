<?php


class HomeWork3 extends Util {
	public static function Ex1() {
		// initializam variabilele
		$n = $_POST['n'];
		$A = self::getMatrixFromString($_POST['matrice']);
		
		$epsilon = $_POST['epsilon'];
		$resultArray = array();
		// verifica daca inputurile sunt numerice
		// $n , $epsilon si daca matricea e nxn
		if((is_numeric($n)) && (is_numeric($epsilon))) {
			for($i = 0; $i<$n; $i++){
				for($k=$i+1; $k<$n; $k++) {
					if($A[$i][$i] < $A[$k][$i])
						for($j=0; $j<=$n; $j++){
							$A[$i][$j] ^= $A[$k][$j];
							$A[$k][$j] ^= $A[$i][$j];
							$A[$i][$j] ^= $A[$k][$j];
						}
				}
			}
			
			//algoritmul  guass elimination
			for($i = 0; $i<$n-1; $i++) {
				for($k=$i+1; $k<$n; $k++) {
						$t = floatval( $A[$k][$i] / $A[$i][$i] );
						for($j=0; $j<=$n; $j++) {
							// facem fiecare element mai jos de pivot sa fie 0
							// sau eliminal variabilele
							$A[$k][$j] = $A[$k][$j] - $t * $A[$i][$j];
						}
				}
			}
			
			// back subsituttion
			for($i=$n-1; $i>=0; $i--) {
				$resultArray[$i] = $A[$i][$n];
				for( $j=0; $j<$n; $j++) {
					if($j != $i)
						$resultArray[$i] = $resultArray[$i] - $A[$i][$j] * $resultArray[$j];
					$resultArray[$i] = $resultArray[$i] / $A[$i][$i];
				}
			}
			
			self::dumpMatrix($A);
			var_dump($resultArray);

			// returnam raspunsul sub forma de json
			// completant headerul
			header('Content-type: application/json');
			echo json_encode(
				array(
					"n" => $n,
					"epsilon" =>pow(10, -$epsilon),
					"A" => self::getStringFromArray($A)
				)
			);
		}// if
	}// Ex1
	
	
}


?>