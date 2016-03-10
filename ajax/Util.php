<?php

class Util
{

	protected static function getArrayFromString($string) {
		return json_decode($string);
	}

	protected static function getStringFromArray($array) {
		if (!is_array($array))
			return "Nu s-a putut parsa.";
		return json_encode($array);
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

    protected static function randsquareMatrix($m, $maxNum = 10)
    {
        $result = array();
        for ($i = 0; $i < $m; $i++) {
            $result[] = self::randVectorFixedSize($m,$maxNum);
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

    protected static function getMatrixLineLength($matrix)
    {
        return count($matrix[0]);
    }

    protected static function getMatrixColumnLength($matrix)
    {
        return count($matrix);
    }

    protected static function getZeroedVector($n)
    {
        $vector=array();
        for($i=0;$i<$n;$i++)
        {
            $vector[$i]=0;
        }
        return $vector;
    }

	protected static function round_array($n) {
		$vector=array();
		for($i=0;$i<$n;$i++) {
			$vector[$i]=0;
		}
		return $vector;
	}


	protected static function getTransposed($matrix) {
		$m=self::getMatrixColumnLength($matrix);
		$n=self::getMatrixLineLength($matrix);
		$transposed=array();
		for($i=0;$i<$n;$i++) {
			for($j=0;$j<$n;$j++) {
				$transposed[$j][$i]=$matrix[$i][$j];
			}
		}
		return $transposed;
	}

	// getUnityMatrix
	// @return array(array())
	protected static function getUnityMatrix($n) {
		// alloc lines
		$unityMatrix = array();
		// pentru fiecare linie
		for($i=0; $i<$n; $i++) {
			// alloc colls
			$unityMatrix[$i] = array();
			// pentru fiecare coloana
			for($j=0; $j<$n; $j++) {
				
				if ($i == $j) {
					$unityMatrix[$i][$j] = 1;
				}else
					$unityMatrix[$i][$j] = 0;
			}
		}
		
		return $unityMatrix;
	}
	// dumpMatrix
	// @return void
	protected static function dumpMatrix($matrix) {
		$n = count($matrix);
		$m = count($matrix[0]);
		
		for ($i=0; $i<$n; $i++) {
			for($j=0; $j<$m; $j++) {
				echo "\t" . $matrix[$i][$j] . "\t";
			}
			echo "\n";
		}
		
		echo "\n";
	
	}
	

}

?>
