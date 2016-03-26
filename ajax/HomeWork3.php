<?php


class HomeWork3 extends Util
{
    public static function Ex1()
    {
        // returnam raspunsul sub forma de json
        // completant headerul
        header('Content-Type: application/json');
        // initializam variabilele
        $n = $_POST['n'];
        $A = self::getMatrixFromString($_POST['matrice']);
        $epsilon = $_POST['epsilon'];
        $Ae = self::appendIn($A, $n);
        $gauss=self::GaussElimination($Ae,$n,$epsilon);
        if($gauss[1]) //matrice singulara
        {

            echo json_encode(
                array(
                    "sts"=>0,
                    "n" => $n,
                    "epsilon" => pow(10, -$epsilon),
                    "A" => self::getStringFromArray($A),
                    "Ae" => self::getStringFromArray($gauss[0]),
                    "invA" => "Matrice Singulara",
                )
            );
        }
        else
        {
            $divide=self::divideIn($gauss[0],$n);
            $R=$divide[0];
            $B=$divide[1];
            $Ai=array();
            for($i=0;$i<$n;$i++)
            {
                $x = HomeWork2::getX($R, $n, $B[$i]);
                $Ai[$i]=$x;
            }
            $AxAi=self::multiplyMatrixes($A,$Ai);
            $In=self::genI($n);
            $norm=self::getNorm1(self::subtractMatrices($AxAi,$In,$n),$n);
            echo json_encode(
                array(
                    "sts"=>1,
                    "n" => $n,
                    "epsilon" => pow(10, -$epsilon),
                    "A" => self::getStringFromMatrix($A),
                    "Ae" => self::getStringFromMatrix($gauss[0]),
                    "invA" =>self::getStringFromMatrix($Ai),
                    "det"=>self::getDeterminantT($R),
                    "norm"=>self::getStringFromArray($norm)
                )
            );

        }


    }// Ex1




    private static function GaussElimination($Ae, $n,$e)
    {
        $l = 0;
        $epsilon=pow(10, -$e);
        $Ae=self::gaussPartialPivot($l,$Ae,$n);
        while(($l<$n-1)&&($Ae[$l][$l]>$epsilon))
        {
            for($i=$l+1;$i<$n;$i++)
            {
                $f=-($Ae[$i][$l]/$Ae[$l][$l]);
                for($j=$l+1;$j<$n*2;$j++)
                {
                    $Ae[$i][$j]=$Ae[$i][$j]+$f*$Ae[$l][$j];
                }
                $Ae[$i][$l]=0;
            }
            $l++;
            $Ae=self::gaussPartialPivot($l,$Ae,$n);
        }
        return array($Ae,$Ae[$l][$l]>$epsilon);

    }


    public static function gaussPartialPivot($l, $A, $n)
    {
        $max = $A[$l][$l];
        $i0 = $l;
        for ($i = $l; $i < $n; $i++) {
            if ($A[$i][$l] > $max) {
                $i0 = $i;
                $max = $A[$i][$l];
            }
        }
        if ($l != $i0) {
            $A = self::swapLines($A, $i0, $l, $n);
        }
        return $A;

    }



}
