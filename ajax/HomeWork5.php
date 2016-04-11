<?php
include_once './InternalList/SinglyList.php';
include_once './SparseMatrix.php';
use InternalList\SinglyList;

class HomeWork5 extends Util
{

    // define all constant paths
    //const    RareM1 = '../input/homework5/m_rar_2016_1.txt';
    const    RareM1 = '../input/homework5/m_rar_test.txt';
    const    RareM2 = '../input/homework5/m_rar_2016_2.txt';
    const    RareM3 = '../input/homework5/m_rar_2016_3.txt';
    const    RareM4 = '../input/homework5/m_rar_2016_4.txt';

    /**
     * ex1 method
     * @param void
     * @return void
     */
    public static function ex1()
    {
        header('Content-Type: application/json');
        // Load files and parse them
        $p = 7;
        $kmax = 10000;
        $epsilon = pow(10, -$p);
        $epsilon2 = pow(10, 8);
        $a1 = new SparseMatrix;
        $a2 = new SparseMatrix;
        $a3 = new SparseMatrix;
        $a4 = new SparseMatrix;
        $m = array();
        $b = array();
        $n = array();
        $diagonal = array();
        $L = array();
        $U = array();
        $B = array();
        $C = array();
        $a1->parseFile(self::RareM1);
        //$a2->parseFile(self::RareM2);
        //$a3->parseFile(self::RareM3);
        //$a4->parseFile(self::RareM4);
        // Initialization
        $m[0] = $a1->Matrix();
        //$m[1] = $a2->Matrix();
        //$m[2] = $a3->Matrix();
        //$m[3] = $a4->Matrix();
        $b[0] = $a1->Vector();
        //$b[1] = $a2->Vector();
        //$b[2] = $a3->Vector();
        //$b[3] = $a4->Vector();
        $n[0] = count($a1);
        //$n[1] = count($a2);
        //$n[2] = count($a3);
        //$n[3] = count($a4);
        $xc = array();
        $xp = array();
        //Check elements on the diagonal and build the diagonal matrix at the same time
        for ($q = 0; $q < count($n); $q++) {
            for ($i = 0; $i < $n[$q]; $i++) {
                $el = $m[$q][$i]->FindCol($i);
                if (!$el) {
                    echo "Error, diagonal element null on the matrix " . $i;
                    die();
                } else {
                    $diagonal[$q][$i] = new SinglyList;
                    $diagonal[$q][$i]->Append($el->Value(), $i);
                }
            }
        }
        $output = "";
        // build upper and lower matrix
        for ($q = 0; $q < count($n); $q++) {
            for ($i = 0; $i < $n[$q]; $i++) {
                $crwA = $m[$q][$i]->Tail();
                $U[$q][$i] = new SinglyList;
                $L[$q][$i] = new SinglyList;
                while ($crwA !== null) {
                    $j = $crwA->Column();
                    $output .= $j . '-' . $i . '|';
                    if ($j < $i) {
                        $U[$q][$i]->Append($crwA->Value(), $j);
                    } elseif ($j > $i) {
                        $L[$q][$i]->Append($crwA->Value(), $j);
                    }
                    $crwA = $crwA->Next();
                }

            }
        }
        $resp = array();
        // build b & c matrixes
        for ($q = 0; $q < count($n); $q++) {
            $B[$q] = self::plusMatrix($L[$q], self::multiplyMatrixWithScalar($diagonal[$q], round(5 / 6, $p)));
            $C[$q] = self::substractMatrixes(self::multiplyMatrixWithScalar($diagonal[$q], -round(1 / 6, $p)), $U[$q]);
        }
        unset($L);
        unset($U);
        unset($d);

        for ($q = 0; $q < count($n); $q++) {
            for ($i = 0; $i < $n[$q]; $i++) {
                $xc[$q][0][$i] = $i+1;
                //$xc[$q][0][$i] =0;
            }
            $k = 0;
            do {
                $xc[$q][$k + 1]=array();
                for ($i = 0; $i < $n[$q]; $i++) {
                    $sub=self::computeBSubstraction($m[$q], $i, $xc[$q][$k + 1], $xc[$q][$k]);
                    // cu plus primul x1 da ca in exemplu
                    $xc[$q][$k + 1][$i] = -0.2 * $xc[$q][$k][$i] + 1.2 * round(($b[$q][$i] + $sub)/$m[$q][$i]->FindCol($i)->Value(),$p);
                    //$xc[$q][$k + 1][$i] = -0.2 * $xc[$q][$k][$i] + 1.2 * round(($b[$q][$i] - $sub)/$m[$q][$i]->FindCol($i)->Value(),$p);
                }
                print_r($xc);
                $dx = self::getStandardNorm(self::subtractVectors($xc[$q][$k+1], $xc[$q][$k], $n[$q],$p), $n[$q]);
                $k++;


            } while ($dx >= $epsilon && $k <= $kmax && $dx <= $epsilon2);
            if ($dx < $epsilon) {
                $resp[$q] =$xc[$q][$k-1];
            } else {
                $resp[$q] = "divergenta";
            }
            $norm=array();
            for ($q = 0; $q < count($n); $q++) {
                $norm[$q] = self::subtractVectors(self::multiplyMatrixWithVector($m[$q],$resp[$q]),$b[$q],$n[$q],$p);
            }

        }
        echo json_encode(array("resp"=>$resp,"norm"=>$norm));
        die();
    }

    private static function plusMatrix($a, $b)
    {
        // number of lines
        $n = count($a);
        $m = count($b);
        if ($n !== $m) {
            exit("Can't make plus operation on this matrices");
        }
        $i = 0;
        $j = 0;
        // create array
        $result = array();
        // interate all over 2 array of nodes
        while (($i < $n) && ($j < $m)) {
            $result[$i] = new SinglyList;
            // crawl and make the addition into result
            self::crawl($a[$i], $b[$j], $result[$i]);
            $i++;
            $j++;
        }
        return $result;
    }

    private static function crawl(SinglyList $lA, SinglyList $lB, $result, $sign = "+")
    {
        $n = $lA->Count();
        $m = $lB->Count();
        // take the tails
        $crwA = $lA->Tail();
        $crwB = $lB->Tail();
        // for every element in list A
        // $n and $m is the same number
        for ($i = 0; $i < $n; $i++) {
            if ($crwA && $m)
                $found = $lB->FindCol($crwA->Column());
            else
                $found = null;
            if ($found !== null) {
                if ($sign == "+")
                    $result->Append($crwA->Value() + $found->Value(), $crwA->Column());
                else
                    $result->Append($crwA->Value() - $found->Value(), $crwA->Column());
            } else
                $result->Append($crwA->Value(), $crwA->Column());
            $crwA = $crwA->Next();
        }
        // after the firts interations
        // now try to find the missing elements in
        // the lists that don't have the column the same with
        // elements in the first matrix
        for ($j = 0; $j < $m; $j++) {
            // try to find element with the column the same as in matrix a
            if ($crwB && $n)
                $found = $lA->FindCol($crwB->Column());
            else
                $found = null;
            // we're interested in just the elements
            // that dosen't have the same column
            if ($found === null)
                $result->Append($crwB->Value(), $crwB->Column());
            $crwB = $crwB->Next();
        }
    }

    public static function multiplyMatrixWithScalar($a, $x)
    {
        $n = count($a);
        $result = array();
        // for every line in matrix $A
        for ($i = 0; $i < $n; $i++) {
            $result[$i] = new SinglyList;
            $crwA = $a[$i]->Tail();
            while ($crwA !== null) {
                $sum = (float)$crwA->Value() * $x;
                $result[$i]->Append($sum, $crwA->Column());
                $crwA = $crwA->Next();
            }
        }    //for
        return $result;
    }

    private static function substractMatrixes($a, $b)
    {
        // number of lines
        $n = count($a);
        $m = count($b);
        if ($n !== $m) {
            exit("Can't make plus operation on this matrices");
        }
        $i = 0;
        $j = 0;
        // create array
        $result = array();
        // interate all over 2 array of nodes
        while (($i < $n) && ($j < $m)) {
            // create one singly list object per line
            $result[$i] = new SinglyList;
            // crawl and make the addition into result
            self::crawl($a[$i], $b[$j], $result[$i], "-");
            $i++;
            $j++;
        }
        return $result;
    }

    private static function computeBSubstraction($a, $i, $x1, $x2)
    {
        $sum1 = 0;
        $sum2 = 0;
        $crwA = $a[$i]->Tail();

        while ($crwA !== null) {
            $j = $crwA->Column();
            if ($j > $i) {
                $sum1 += $crwA->Value() * $x2[$j];
            } elseif ($j < $i) {
                $sum2 += $crwA->Value() * $x1[$j];
            }
            $crwA = $crwA->Next();
        }
        $sum=$sum2-$sum1;
        return $sum;


    }

    public static function multiplyMatrixWithVector($a, $x)
    {
        $container = array();
        $n = count($a);
        // for every line in matrix $A
        for ($i = 0; $i < $n; $i++) {
            $sum = 0;
            $crwA = $a[$i]->Tail();
            while ($crwA !== null) {
                $sum += $crwA->Value() * $x[$crwA->Column()];
                $crwA = $crwA->Next();
            }
            $container[$i] = $sum;
        }    //for
        return $container;
    }


}

?>
