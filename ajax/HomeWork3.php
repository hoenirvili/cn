<?php


class HomeWork3 extends Util {
	public static function Ex1() {
		// initializam variabilele
		$n = $_POST['n'];
		$A = self::getMatrixFromString($_POST['matrice']);
		$epsilon = $_POST['epsilon'];
		// verifica daca inputurile sunt numerice
		// $n , $epsilon si daca matricea e nxn
		if((is_numeric($n)) && (is_numeric($epsilon))) {
		
			$resultArray = GaussPivot($A, $n);
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
	
	// Incapsulam metoda GaussPivot
	// aceasta metoda calculeaza gauss pivotat
	// si ne da rezultatele sub forma de vector a
	// lui x, y , z spre exemplui
	// @param $A = array multidimensional care va reprezenta matricea noastra
	// @n este numarul nxn de cate linii si coloane este declarata matricea
	private static function GaussPivot($A, $n) {
		// un array cu $n elemente pornind de la 0 pan la $n
		// iar fiecare element va lua valoarea $mixed value= null
		// in cazul nostru
		$resultArray = array_fill(0, $n, null);
		// interschimbam toate elementele care sun mai mici ca
		// cele de pe diagonala principala.
		for($i = 0; $i<$n; $i++){
			for($k=$i+1; $k<$n; $k++) {
				if($A[$i][$i] < $A[$k][$i])
					for($j=0; $j<=$n; $j++){
						// interschimbam fara sa folosim
						// a treia variabila
						$A[$i][$j] ^= $A[$k][$j];
						$A[$k][$j] ^= $A[$i][$j];
						$A[$i][$j] ^= $A[$k][$j];
					}
			}
		}
		
		// algoritmul  guass elimination
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
	}
	
	
	// metoda incapsulata pentru a obtine un determinat
	// a unei matrici patratice
	// $A = > matricea
	// $n = > elementele
	private static function getDet($A, $n) {
		echo "Test";
	}
}


?>