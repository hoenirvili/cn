<?php

/**
 * Created by PhpStorm.
 * User: ionut
 * Date: 2/24/2016
 * Time: 2:03 PM
 */
class HomeWork1
{
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
        echo json_encode(array('step' => $step, 'lowest' => $lowest, 'u' => $u));
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
            if ($leftOperand !== $rightOperand) {
                break;
            }
            if ($step > 20) {
                break;
            }
        }
        echo json_encode(array('step' => $step, 'u' => $u, 'a' => $a, 'b' => $b, 'c' => $c, 'leftOperand' => $leftOperand, 'rightOperand' => $rightOperand));
        exit();
    }

    public static function ex3()
    {
        if (is_numeric($_POST['x'])) {
            $x = $_POST['x'];
            $p = $_POST['p'];
            if (is_numeric($p)) {
                $e = pow(10, -$p);
                if ($x > -M_PI && $x < M_PI) {
                    $aprox = self::LentzAlgorithm($x, $e);
                    $tan = tan($x);
                    echo json_encode(array('aprox' => $aprox, 'tan' => $tan, 'pi' => M_PI, 'e' => $e, 'x' => $x));
                    exit();
                } elseif ($x < -M_PI || $x > M_PI) {
                    if ($x < 0) {
                        (float)$real_x = fmod($x,(-M_PI / 2));
                    } else {
                        (float)$real_x = fmod($x , (M_PI / 2));
                    }
                    $aprox = -self::LentzAlgorithm($real_x, $e);
                    $tan = -tan($real_x);
                    echo json_encode(array('aprox' => $aprox, 'tan' => $tan, 'pi' => M_PI, 'e' => $e, 'x' => $x));
                    exit();
                } else {
                    //$aprox=self::LentzAlgorithm($x,$e);
                    //$tan=tan($x);
                    echo json_encode(array('aprox' => 0, 'tan' => 0, 'pi' => 0, 'e' => 0, 'x' => 0));
                    exit();
                }

            }
        }
    }

    public static function ex4()
    {

    }

    public static function lGetBForTan($j)
    {
        if ($j == 0) {
            return 0;
        }
        if($j==1)
            return 1;
        return -(($j*2)-1);
    }

    public static function lGetAForTan($j, $x)
    {
        if ($j == 0) {
            return 0;
        }
        if ($j == 1) {
            return $x;
        }
        return pow($x, 2);
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