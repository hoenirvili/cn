<?php

class Util
{

    public static function swapLines($A, $line1, $line2, $n)
    {
        for ($i = 0; $i < $n; $i++) {
            {
                $temp = $A[$line1][$i];
                $A[$line1][$i] = $A[$line2][$i];
                $A[$line2][$i] = $temp;
            }

        }
        return $A;
    }

    public static function multiplyMatrixes($A, $B)
    {
        $r = count($A);
        $c = count($B[0]);
        $in = count($B);
        $C = array();
        if ($in != count($A[0])) {
            return 0;
        }
        for ($ri = 0; $ri < $r; $ri++) {
            for ($ci = 0; $ci < $c; $ci++) {
                $C[$ri][$ci] = 0.0;
                for ($j = 0; $j < $in; $j++) {
                    $C[$ri][$ci] += $A[$ri][$j] * $B[$j][$ci];
                }
            }
        }
        return $C;

    }

    public static function subtractMatrices($A, $B, $n)
    {
        $C = array();
        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                $C[$i][$j] = $A[$i][$j] - $B[$i][$j];
            }
        }
        return $C;
    }

    public static function subtractVectors($a, $b, $n,$p)
    {

        for ($i = 0; $i < $n; $i++) {
            if (!$a[$i])
                $a[$i] = 0;
            if (!$b[$i])
                $b[$i] = 0;
            $a[$i] = round($a[$i] - $b[$i],$p);

        }
        return $a;
    }

    protected static function getMatrixFromString($string)
    {
        $result = array();
        $strings = explode(']', $string);
        if (is_array($strings))
            foreach ($strings as $str) {
                if ($str)
                    $result[] = self::getArrayFromString($str . ']');
            }
        return $result;
    }

    protected static function getArrayFromString($string)
    {
        return json_decode($string);
    }

    protected static function getStringFromMatrix($matrix)
    {
        if (!is_array($matrix) || empty($matrix)) {
            return "Nu s-a putut parsa.";
        }
        foreach ($matrix as $key => $vector) {
            $str = self::getStringFromArray($vector);
            if ($str)
                $matrix[$key] = $str;
        }
        $string = implode('<br/>', $matrix);
        return $string;
    }

    protected static function getStringFromArray($array)
    {
        if (!is_array($array))
            return "Nu s-a putut parsa.";
        return json_encode($array);
    }

    protected static function randMatrix($maxn = 10, $maxVn = 10, $maxNum = 10)
    {
        $n = rand(1, $maxn);
        $m = rand(1, $maxVn);
        $result = array();
        for ($i = 0; $i < $n; $i++) {
            $result[] = self::randVectorFixedSize($m);
        }
        return $result;
    }

    protected static function randVectorFixedSize($n, $maxNum = 10)
    {
        $result = array();
        for ($i = 0; $i < $n; $i++) {
            $result[] = rand(0, $maxNum);
        }
        return $result;
    }

    protected static function randsquareMatrix($m, $maxNum = 10)
    {
        $result = array();
        for ($i = 0; $i < $m; $i++) {
            $result[] = self::randVectorFixedSize($m, $maxNum);
        }
        return $result;
    }

    protected static function randVector($maxn = 10, $maxNum = 10)
    {
        $n = rand(1, $maxn);
        $result = array();
        for ($i = 0; $i < $n; $i++) {
            $result[] = rand(0, $maxNum);
        }
        return $result;
    }

    protected static function genI($n)
    {
        $ai = array();
        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                if ($i == $j) {
                    $ai[$i][$j] = 1;
                } else {
                    $ai[$i][$j] = 0;
                }
            }
        }
        return $ai;
    }

    protected static function getZeroedVector($n)
    {
        $vector = array();
        for ($i = 0; $i < $n; $i++) {
            $vector[$i] = 0;
        }
        return $vector;
    }

    protected static function round_array($n)
    {
        $vector = array();
        for ($i = 0; $i < $n; $i++) {
            $vector[$i] = 0;
        }
        return $vector;
    }

    protected static function getInit($squarematrix)
    {
        $m = self::getMatrixColumnLength($squarematrix);
        $n = self::getMatrixLineLength($squarematrix);
        if ($n != $m)
            return 0;
        $array = array();
        for ($i = 0; $i < $n; $i++) {
            $array[] = $squarematrix[$i][$i];
        }
        return $array;
    }

    protected static function getMatrixColumnLength($matrix)
    {
        return count($matrix);
    }

    protected static function getMatrixLineLength($matrix)
    {
        return count($matrix[0]);
    }

    // getUnityMatrix
    // @return array(array())

    protected static function getStandardNorm($vector, $n)
    {
        $sum = 0;
        for ($i = 0; $i < $n; $i++) {
            $sum += abs($vector[$i]);
        }
        return $sum;
    }
    // dumpMatrix
    // @return void

    protected static function getNorm($vector, $n)
    {
        $sum = 0;
        for ($i = 0; $i < $n; $i++) {
            $sum += pow($vector[$i], 2);
        }
        return sqrt($sum);
    }

    // only for triangular matrix

    protected static function getNorm1($matrix, $n)
    {
        $vector = array();
        for ($i = 0; $i < $n; $i++) {
            $max = 0;
            for ($j = 0; $j < $n; $j++) {
                if ($matrix[$i][$j] > $max)
                    $max = $matrix[$i][$j];
            }
            $vector[$i] = $max;
        }
        return $vector;
    }

    protected static function getTransposed($matrix)
    {
        $m = self::getMatrixColumnLength($matrix);
        $n = self::getMatrixLineLength($matrix);
        $transposed = array();
        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                $transposed[$j][$i] = $matrix[$i][$j];
            }
        }
        return $transposed;
    }

    protected static function getUnityMatrix($n)
    {
        // alloc lines
        $unityMatrix = array();
        // pentru fiecare linie
        for ($i = 0; $i < $n; $i++) {
            // alloc colls
            $unityMatrix[$i] = array();
            // pentru fiecare coloana
            for ($j = 0; $j < $n; $j++) {
                if ($i == $j) {
                    $unityMatrix[$i][$j] = 1;
                } else
                    $unityMatrix[$i][$j] = 0;
            }
        }
        return $unityMatrix;
    }

    protected static function dumpMatrix($matrix)
    {
        $n = count($matrix);
        $m = count($matrix[0]);
        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $m; $j++) {
                echo "\t" . $matrix[$i][$j] . "\t";
            }
            echo "\n";
        }
        echo "\n";

    }

    protected static function getDeterminantT($squarematrix)
    {
        $m = self::getMatrixColumnLength($squarematrix);
        $n = self::getMatrixLineLength($squarematrix);
        if ($n != $m)
            return 0;
        $det = 1;
        for ($i = 0; $i < $n; $i++) {
            $det *= $squarematrix[$i][$i];
        }
        return $det;
    }

    protected static function appendIn($A, $n)
    {
        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                if ($j == $i)
                    $A[$i][$j + $n] = 1;
                else
                    $A[$i][$j + $n] = 0;
            }
        }
        return $A;
    }

    protected static function divideIn($Ae, $n)
    {
        $A = array();
        $B = array();
        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                $A[$i][$j] = $Ae[$i][$j];
                $B[$i][$j] = $Ae[$j][$i + $n];
            }
        }
        return array($A, $B);
    }


}

?>
