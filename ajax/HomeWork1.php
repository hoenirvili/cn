<?php
require_once("Util.php");

class HomeWork1 extends Util 
{
	// Exercitiul 1
	public static function ex1()
	{
		$u = 1;
		$lowest = $u;
		$step = 0;
		while (1 + $u !== 1.0) {
			$u = (float)$u / 10;
			$step++;
			$lowest = $u;
		}

		header('Content-type: application/json');
		// make json
		echo json_encode(
			array(
				'step' => $step,
				'lowest' => $lowest,
				'u' => $u
			)
		);
		exit();
	}

	public static function ex2()
	{
		$a = 1.0;
		$u = 1;
		$step = 0;
		while (1 + $u !== 1.0) {
			$step++;
			$u = (float)$u / 10;
			$b = $u;
			$c = $u;
			$leftOperand = ($a + $b) + $c;
			$rightOperand = $a + ($b + $c);
			if (($leftOperand !== $rightOperand) || $step > 20)
				break;
		}//while

		header('Content-type: application/json');
		echo json_encode(
			array(
				'step' => $step,
				'u' => $u,
				'a' => $a,
				'b' => $b,
				'c' => $c,
				'leftOperand' => $leftOperand,
				'rightOperand' => $rightOperand
			)
		);
		exit();
	}

	public static function ex3() {
		header('Content-type: application/json');

		if (is_numeric($_POST['x'])) {
			$x = $_POST['x'];
			$p = $_POST['p'];
			if (is_numeric($p)) {
				$e = pow(10, -$p);
					if ($x > -M_PI && $x < M_PI) {
						$aprox = self::LentzAlgorithm($x, $e);
						$tan = tan($x);
						echo json_encode(
							array(
								'aprox' => $aprox,
								'tan' => $tan,
								'pi' => M_PI,
								'e' => $e,
								'x' => $x
							)
						);
						exit();
					} elseif ($x < -M_PI || $x > M_PI) {
						if ($x < 0)
							(float)$real_x = fmod($x, (-M_PI / 2));
						else
							(float)$real_x = fmod($x, (M_PI / 2));
							
						$aprox = -self::LentzAlgorithm($real_x, $e);
						$tan = tan($x);
						echo json_encode(
							array(
								'aprox' => $aprox,
								'tan' => $tan,
								'pi' => M_PI,
								'e' => $e,
								'x' => $x
								)
							);
						exit();
					} else {
						//$aprox=self::LentzAlgorithm($x,$e);
						//$tan=tan($x);
						echo json_encode(
							array(
								'aprox' => 0,
								'tan' => 0,
								'pi' => 0,
								'e' => 0,
								'x' => 0
								)
							);
						exit();
					}
			}//if
		}//if
	}

	public static function ex4()
	{
		
		header('Content-type: application/json');
		$iarray = $_POST['arr'];
		$array = self::getArrayFromString($iarray);

		$imatrix = $_POST['matrice'];
		$matrix = self::getMatrixFromString($imatrix);
		
		$vectorf = file_get_contents('../input/homework1/ex4/vector.txt');
		// daca e false atunci cand nu putem citi tot fisierul in
		// stringul respectiv
		if (!$vectorf) {
			$error = error_get_last();
			echo "HTTP request failed. Error was: ". $error['message'];
			exit();
		}
		$vectorf = self::getArrayFromString($vectorf);

		// daca e false atunci cand nu putem citi tot fisierul in
		// stringul respectiv
		$matricef= file_get_contents('../input/homework1/ex4/matrice.txt');
		if (!$matricef) {
			$error = error_get_last();
			echo "HTTP request failed. Error was: ". $error['message'];
			exit();
		}
		$matricef = self::getMatrixFromString($matricef);

		$vectorr=self::randVector();
		$matricer=self::randMatrix();

		// return json
		echo json_encode(
			array(	'matrice' 	=> self::getStringFromMatrix($matrix),
					'vector'  	=> self::getStringFromArray($array),
					'matricef' 	=> self::getStringFromMatrix($matricef),
					'vectorf' 	=> self::getStringFromArray($vectorf),
					'matricer'	=> self::getStringFromMatrix($matricer),
					'vectorr'	=> self::getStringFromArray($vectorr)
				)
			);
			exit();
	}

	public static function lGetBForTan($j)
	{
		if ($j == 0) {
			return 0;
		}
		if ($j == 1)
			return 1;
		return (($j * 2) - 1);
	}

	public static function lGetAForTan($j, $x)
	{
		if ($j == 0) {
			return 0;
		}
		if ($j == 1) {
			return $x;
		}
		return -pow($x, 2);
	}

	public static function LentzAlgorithm($x, $e)
	{
		$f = self::lGetBForTan(0);
		$mic = pow(10, -20);
		if ($f == 0) {
			$f = $mic;
		}
		$C = $f;
		$D = 0;
		$j = 1;
		do {
			$D = self::lGetBForTan($j) + (float)(self::lGetAForTan($j, $x) * $D);
			if ($D == 0) {
				$D = $mic;
			}
			$C = self::lGetBForTan($j) + (float)(self::lGetAForTan($j, $x) / $C);
			if ($C == 0) {
				$C = $mic;
			}

			$D = (float)(1 / $D);
			$delta = $C * $D;
			$f = $delta * $f;
			$j = $j + 1;
		} while (abs($delta - 1) >= $e);
		return $f;
	}
}
