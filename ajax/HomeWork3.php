<?php


class HomeWork3 extends Util {
	public static function Ex1() {
		// returnam raspunsul sub forma de json
		// completant headerul
		header('Content-type: application/json');
		// initializam variabilele
		$n = $_POST['n'];
		$A = self::getMatrixFromString($_POST['matrice']);
		$epsilon = $_POST['epsilon'];
		// verifica daca inputurile sunt numerice
		// $n , $epsilon si daca matricea e nxn
		if((is_numeric($n)) && (is_numeric($epsilon))) {
		
			// matrice nesingulara
			if($det = self::determ($A, $n)) > 0) {
				echo json_encode(
					array(
						"n" => $n,
						"epsilon" =>pow(10, -$epsilon),
						"A" => self::getStringFromArray($A),
						"detA" => $det
					)
				);
			} else { // matrice singulara
				
			}
			
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
	
		return $resultArray;
	}
	
	
	// metoda incapsulata pentru a obtine un determinat
	// a unei matrici patratice
	// $A = > matricea
	// $n = > elementele
	private static function getDet($A, $n) {
		
		switch ($n) {
			// matrice patratica de ordin 2
			case 2:
				break;
			// amtrice patratica de ordin 3
			case 3:
			// matrice patratica de ordin mai mare ca 3
			// poate fi 4, 5, 7 etc..
			default:
				// pentru fiecare coloana din linia 1
				for($step=0; $step<$n; $step++) {
					echo "Primul pas cand A[0,".$step."] =". $A[0][$step]."\n";
					if ($step == 0) {
						for ($i=$step + 1; $i<$n; $i++) {
							for ($j=$step + 1; $j<$n; $j++) {
								echo "\t ". $A[$i][$j] . "\t";
							}
							echo "\n";
						}
						// asta inseamna ca incepem cu cursorul din stanga in dreapta
						// facand skip la cel curent
					} elseif ($step > 0) {
						for($i=1; $i < $n; $i++) {
							for ($j=0; $j < $n; $j++) {
								if ($j != $step){
									echo "\t ". $A[$i][$j] . "\t";
								}
							}
							echo "\n";
						}
					}
					
					// doar de treaba asa
					break;
				}
		}
		
		

	}
	
	// det Matrix
	private static detMatrix($n, $A) {
		$l = 0; $m = 0; $k = 0; $d=0;
		$tmp = array_fill(0, $n-1, null);
		
		if ($n == 2) {
			return $A[0][0] * $A[1][1] - $A[0][1] * $A[1][0];
		}
		
		for($k=0; $k<$n; $k++) {
			if ($k>0) {
				for($i=1; $i<$n; $i++) {
					for($j=0; $j<$n; $j++) {
						if ($k!=$j) {
							$tmp[$m][$l] = $A[$i][$j];
							l++;
						}
					} // for
					$m++;
					$l = 0;
				} // for
				$m = 0;
			} else if ($k == 0) {
				for($i=1; $i<$n; $i++) {
					for($j=1; $j<$n; $j++) {
						if ($k!=$j) {
							$tmp[$m][$l] = $A[$i][$j];
							$l++;
						}
					} // for
					$m++;
				} // for
				$l = 0;
				$m = 0;
			}// else if

			if ($k % 2 == 0)
				$d += $A[0][$k] * self::detMatrix($n-1, $tmp);
			else
				$d -= $A[0][$k] * self::detMatrix($n-1, $tmp);
		}
		return $d;
		}
	}



}
?>