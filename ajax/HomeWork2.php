<?php
require_once("Util.php");

<<<<<<< HEAD
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
        // ionut -> ce rost are sa inlocuiesti in cazul asta, ca sa pierdem compatibilitatea cu php 5 ? ai adaugat 4 caractere fata de 2 cate necesita &&

		if ((is_numeric($n) && is_numeric($epsilon))) {
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
	public static function ex2() {
		header('Conent-type: application/json; charset=utf-8');
		// produsul dintre M= Q*R
		$M;
	}
=======
class HomeWork2 extends Util
{
    // ex1
    public static function ex1()
    {
        header('Content-type: application/json');
        // daca numerele din json N si epsilon sunt numerice
        $n = $_POST['n'];
        $epsilon = $_POST['epsilon'];
        $b = array();
        // parse array and matrice
        $arrayS = self::getArrayFromString($_POST['arr']);
        $matrice = self::getMatrixFromString($_POST['matrice']);
        // daca true = true space ship operator "<=>"
        // va returna 0 si daca o negam cu ! va returna true
        // deci daca amandoua numere is numerice(int/float/etc)
        // atunci merge pe condiata respectiva
        // nu cred ca are rost, sa pierdem si compatibilitatea doar ca sa inlocuim && cu <=> stiu ce face operatorul dar nu are treaba in cazu asta.
        if ((is_numeric($n) && is_numeric($epsilon))) {
            // i=0,....n)
            $sumArray = 0;
            for ($i = 0; $i < $n; $i++) {
                $b[$i] = 0;
                for ($j = 0; $j < $n; $j++) {
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

    public static function ex2()
    {
        header('Content-type: application/json; charset=utf-8');
        // produsul dintre M= Q*R
        $A = self::getMatrixFromString($_POST['matrice']);
        $QR=self::HouseholderDecomposition($A, $_POST['epsilon']);
        echo json_encode(
            array(
                "A" => Util::getStringFromMatrix($A),
                "epsilon" => pow(10,$_POST['epsilon']),
                "Q" => self::getStringFromMatrix($QR['Q']),
                "r" => self::getStringFromMatrix($QR['r'])
            )
        );

    }


    public static function HouseholderDecomposition($A, $epsilon)
    {
        $n = Util::getMatrixColumnLength($A);
        $I = Util::genI($n);
        $Q=$I;
        $epsilon=pow(10,$epsilon);
        for ($r = 0; $r < $n; $r++) {
            $delta = 0;
            for ($i = $r; $i < $n; $i++) {
                $delta += pow($A[$i][$r], 2);
            }
            if ($delta <= $epsilon)
                break;
            $k = sqrt($delta);
            if ($A[$r][$r] > 0) {
                $k = -$k;
            }
            $beta = $delta - ($k * $A[$r][$r]);

            $u = array();
            for ($i = $r; $i < $n; $i++) {
                if ($i == $r) {
                    $u[$r] = $A[$r][$r] - $k;
                } elseif($i>$r) {
                    $u[$i] = $A[$i][$r];
                }
            }

            for ($j = $r + 1; $j < $n; $j++) {
                $prod = 0;
                for ($i = $r; $i < $n; $i++) {
                    $prod += $u[$i] * $A[$i][$j];
                }
                $y = $prod / $beta;
                for ($i = $r; $i < $n; $i++) {
                    $A[$i][$j] = $A[$i][$j] - ($y * $u[$i]);
                }
            }
            $A[$r][$r] = $k;
            for ($i = $r+1; $i < $n; $i++) {
                $A[$i][$r] = 0;
            }

            $b = Util::getZeroedVector($n);
            $prod = 0;
            for ($i = $r; $i < $n; $i++) {
                $prod += $u[$i] * $b[$i];
            }
            $y = $prod / $beta;
            for ($i = $r; $i < $n; $i++) {
                $b[$i] = $b[$i] - ($y * $u[$i]);
            }


            for ($j = 0; $j < $n; $j++) {
                $prod = 0;
                for ($i = $r; $i < $n; $i++) {
                    $prod += $u[$i] * $Q[$i][$j];
                }
                $y = $prod / $beta;
                for ($i = $r; $i < $n; $i++) {
                    $Q[$i][$j] = $Q[$i][$j] - $y * $u[$i];
                }
            }

        }

        return array("Q"=>Util::getTransposed($Q),"r"=>$A);

    }
>>>>>>> af3c627de437a6eec7e263127b100fb9bb82ec96
}

?>
