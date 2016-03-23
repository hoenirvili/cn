<?php
require_once("Util.php");


class HomeWork2 extends Util
{
    // ex1
    public static function ex1()
    {
        header('Content-type: application/json');
        // daca numerele din json N si epsilon sunt numerice
        $n = $_POST['n'];

        $epsilon = $_POST['epsilon'];
        // parse array and matrice
        $arrayS = self::getArrayFromString($_POST['arr']);
        $matrice = self::getMatrixFromString($_POST['matrice']);
        if ((is_numeric($n) && is_numeric($epsilon))) {
            // i=0,....n)
            $sumArray = 0;
            $b = self::getB($matrice, $arrayS, $n, $epsilon);
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
        $n = $_POST['n'];
        $epsilon = $_POST['epsilon'];
        $arrayS = self::getArrayFromString($_POST['arr']);
        $b = self::getB($A, $arrayS, $n, $epsilon);
        $QR = self::HouseholderDecomposition($A, $epsilon, $n, $b);
        echo json_encode(
            array(
                "A" => Util::getStringFromMatrix($A),
                "epsilon" => pow(10, -$_POST['epsilon']),
                "Q" => self::getStringFromMatrix($QR['Q']),
                "r" => self::getStringFromMatrix($QR['r'])
            )
        );

    }

    public static function ex3()
    {
        header('Content-type: application/json; charset=utf-8');
        // produsul dintre M= Q*R
        $A = self::getMatrixFromString($_POST['matrice']);
        $n = $_POST['n'];
        $epsilon = $_POST['epsilon'];
        $arrayS = self::getArrayFromString($_POST['arr']);
        $b = self::getB($A, $arrayS, $n, $epsilon);
        $QR = self::HouseholderDecomposition($A, $epsilon, $n, $b);
        $x = self::getX($QR["r"], $n, $QR["b"]);
        $matrix = new Matrix($n, $n);
        $matrix->fromArray($A);
        $QRlibf = array();
        $QRlib = new QRGivens($matrix);
        $QRlibf['Qlib'] = $QRlib->getQ()->asArray();
        $QRlibf['rlib'] = $QRlib->getR()->asArray();
        $xlib = self::getX($QR["r"], $n,  $QR["b"]);
        // perf test
        $randomMatrix = Util::randsquareMatrix(25, 10);
        $n = Util::getMatrixLineLength($randomMatrix);
        $m = Util::getMatrixColumnLength($randomMatrix);
        $matrix2 = new Matrix($n, $m);
        $matrix2->fromArray($randomMatrix);
        $time_start = microtime(true);
        $QR2 = self::HouseholderDecomposition($randomMatrix, $epsilon, $n);
        $time_end = microtime(true);
        $extime1 = $time_end - $time_start;
        $time_start = microtime(true);
        $QRlib1 = new QRGivens($matrix2);
        $QRlib2['Qlib'] = $QRlib1->getQ()->asArray();
        $QRlib2['rlib'] = $QRlib1->getR()->asArray();
        $time_end = microtime(true);
        $extime2 = $time_end - $time_start;
        echo json_encode(
            array(
                "A" => Util::getStringFromMatrix($A),
                "epsilon" => $epsilon,
                "Q" => self::getStringFromMatrix($QR['Q']),
                "r" => self::getStringFromMatrix($QR['r']),
                "Qlib" => self::getStringFromMatrix($QRlibf['Qlib']),
                "rlib" => self::getStringFromMatrix($QRlibf['rlib']),
                "x" => Util::getStringFromArray($x),
                "xlib" => Util::getStringFromArray($xlib),
                "timeH" => $extime1,
                "timeQr" => $extime2
            )
        );

    }

    public static function ex4()
    {
        header('Content-type: application/json; charset=utf-8');
        //input matricea A , A init
        $A = self::getMatrixFromString($_POST['matrice']);
        $n = $_POST['n'];
        $epsilon = $_POST['epsilon'];
        $arrayS = self::getArrayFromString($_POST['arr']);
        $b = self::getB($A, $arrayS, $n, $epsilon);
        $QR = self::HouseholderDecomposition($A, $epsilon, $n, $b);
        $x = self::getX($QR["r"], $n, $QR["b"]);
        $matrix = new Matrix($n, $n);
        $matrix->fromArray($A);
        $QRlibf = array();
        $QRlib = new QRGivens($matrix);
        $QRlibf['Qlib'] = $QRlib->getQ()->asArray();
        $QRlibf['rlib'] = $QRlib->getR()->asArray();
        $xlib = self::getX($QR["r"], $n,  $QR["b"]);
        $vector1 = array();
        $ainit = Util::getInit($A);
        for ($i = 0; $i < $n; $i++) {
            $vector1[$i] = $ainit[$i] * $x[$i] - $b[$i];
        }
        $norm1 = Util::getNorm($vector1, $n);
        $vector2 = array();
        for ($i = 0; $i < $n; $i++) {
            $vector2[$i] = $ainit[$i] * $xlib[$i] - $b[$i];
        }
        $norm2 = Util::getNorm($vector2, $n);
        $vector3 = array();
        for ($i = 0; $i < $n; $i++) {
            $vector3[$i] = $x[$i] - $arrayS[$i];
        }
        $norm3 = Util::getNorm($vector3, $n) / Util::getNorm($arrayS, $n);
        $vector4 = array();
        for ($i = 0; $i < $n; $i++) {
            $vector4[$i] = $xlib[$i] - $arrayS[$i];
        }
        $norm4 = Util::getNorm($vector4, $n) / Util::getNorm($arrayS, $n);
        echo json_encode(
            array(
                "A" => Util::getStringFromMatrix($A),
                "epsilon" => $epsilon,
                "Q" => self::getStringFromMatrix($QR['Q']),
                "r" => self::getStringFromMatrix($QR['r']),
                "Qlib" => self::getStringFromMatrix($QRlibf['Qlib']),
                "rlib" => self::getStringFromMatrix($QRlibf['rlib']),
                "x" => Util::getStringFromArray($x),
                "xlib" => Util::getStringFromArray($xlib),
                "norm1" => $norm1,
                "norm2" => $norm2,
                "norm3" => $norm3,
                "norm4" => $norm4,
            )
        );
    }

    public static function getB($A, $s, $n, $epsilon)
    {
        $b = array();
        for ($i = 0; $i < $n; $i++) {
            $b[$i] = 0;
            for ($j = 0; $j < $n; $j++) {
                $b[$i] += $s[$j]* $A[$i][$j];
            }
        }
        return $b;
    }

    public static function HouseholderDecomposition($A, $epsilon, $n, $b="")
    {
        $I = Util::genI($n);
        $Q = $I;
        $epsilon = pow(10, -$epsilon);
        if ($b=="")
            $b = Util::getZeroedVector($n);

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
                } elseif ($i > $r) {
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
            for ($i = $r + 1; $i < $n; $i++) {
                $A[$i][$r] = 0;
            }
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
        return array("Q" => Util::getTransposed($Q), "r" => $A,"b"=>$b);

    }


    public static function getX($A, $n, $b)
    {
        $det = Util::getDeterminantT($A);
        $x = array();
        if ($det != 0) {
            $x[$n - 1] =
                $b[$n - 1] / $A[$n - 1][$n - 1];
            for ($i = $n - 2; $i >= 0; $i--) {
                $sum = 0;
                for ($j = $i + 1; $j < $n; $j++) {
                    $sum += $A[$i][$j] * $x[$j];
                }
                $x[$i] = ($b[$i] - $sum) / $A[$i][$i];
            }
            ksort($x);
        }
        return $x;
    }
}

?>
