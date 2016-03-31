<?php
include_once './InternalList/SinglyList.php';
include_once './SparseMatrix.php';

use \InternalList\SinglyList;
use \InternalList\Node;

class HomeWork4 {
	
	// define all constant paths
	const	A		= '../input/homework4/a.txt';
	const 	B		= '../input/homework4/b.txt';
	const 	AxB		= '../input/homework4/aorib.txt';
	const 	AplusB	= '../input/homework4/aplusb.txt';

	/**
	 * ex1 method
	 * @param void
	 * @return void
	 */
	public static function ex1() {
		header('Content-Type: application/json');
		// Load files and parse them
		$a = new SparseMatrix;
		$b = new SparseMatrix;
		$a->parseFile(self::A);
		$b->parseFile(self::B);
		$aplusb = new SparseMatrix;
		$aplusb->parseFile(self::AplusB);
		
		$res_aplusb = self::plusMatrix($a->Matrix(), $b->Matrix());
		echo json_encode(
			array(
				"aplusb" => json_encode($res_aplusb)
			));
		}


    public static function ex2() {
        header('Content-Type: application/json');
        // Load files and parse them
        $a = new SparseMatrix;
        $b = new SparseMatrix;
        $a->parseFile(self::A);
        $b->parseFile(self::B);
        $aorib = new SparseMatrix;
        $aorib->parseFile(self::AxB);

        $res_aorib = self::multiplyMatrix($a->Matrix(), $b->Matrix());
        print_r($res_aorib);

        echo json_encode(
            array(
                "aorib" => json_encode($res_aorib)
            ));
    }


    public static function ex3() {
        header('Content-Type: application/json');
        // Load files and parse them
        $a = new SparseMatrix;
        $b = new SparseMatrix;
        $a->parseFile(self::A);
        $b->parseFile(self::B);
        $x=array();
        $n=$a->Count();
        for($i=0;$i<=$n;$i++)
        {
            $x[$i-1]=$i;
        }
        $res_aorix = self::multiplyMatrixWithVector($a->Matrix(), $x);
        print_r($res_aorix);
        //TODO: response json
        echo json_encode(
            array(
                "axb" => json_encode($res_aorix)
            ));
    }

	/**
	 * Adition method for two SparseMatrices
	 * Sparse matrix addition
	 * @param $a Node
	 * @param $b Node
	 * @return array of SparseMatrix
	 */
	private static function plusMatrix($a, $b) {
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
			// get count for every list
			// in this way we know how much to crawl
			$countA = $a[$i]->Count();
			$countB = $b[$j]->Count();
			// create one singly list object per line
			$result[$i] = new SinglyList;
			// crawl and make the addition into result
			self::crawl($a[$i], $b[$j], $result[$i]);
			$i++;
			$j++;
		}

		return $result;
	}

	/**
	 * Multiply method for SparseMatrices
	 * @parma $a Node
	 * @param $b Node
	 * @return array of SparseMatrix
	 */
	public static function multiplyMatrix($a, $b) {

		$result = array();
		$holder = 0;
        $n=count($a);
		// for every line in matrix $A
		for ($i = 0; $i < $n; $i++) {
            $result[$i] = new SinglyList;
            for ($j = 0; $j < $n; $j++) {
                    $foundy = $a[$i]->FindCol($j);
                    if($foundy!==null) {
                        $foundx = $b[$j]->FindCol($i);
                        if (($foundx !== null)) {
                            $holder += $foundx->Value() * $foundy->Value();
                        }
                    }
                if ($holder!=0) {
                    $result[$i]->Append($holder, $j);
                    $holder = 0;
                }

            }

		}	//for
		
		return $result;
	}
	/**
	 *
	 */
    public static function multiplyMatrixWithVector($a, $x) {
		$container = array();
        $n=count($a);

        // for every line in matrix $A
        for ($i = 0; $i < $n; $i++) {
			$sum = 0;
			$crwA = $a[$i]->Tail();
			while($crwA !== null) {
				$sum += $crwA->Value() * $x[$crwA->Column()];
				$crwA = $crwA->Next();
			}
			$container[$i] = $sum;
        }	//for
        return $container;
    }



	/**
	 * Core method for crawling for every
	 * list of type Node
	 * @param $lA SinglyList
	 * @param $lB SinglyList
	 * @param $result array
	 */
	private static function crawl(SinglyList $lA, SinglyList $lB, $result) {
		$n = $lA->Count();
		$m = $lB->Count();
		
		// take the tails
		$crwA = $lA->Tail();
		$crwB = $lB->Tail();
		// for every element in list A
		// $n and $m is the same number
		for ($i = 0; $i < $n; $i++) {

			$found = $lB->FindCol($crwA->Column());

			if ($found !== null)
				$result->Append($crwA->Value() + $found->Value(), $crwA->Column());
			else 
				$result->Append($crwA->Value() + 0 , $crwA->Column());

			$crwA = $crwA->Next();
		}

		// after the firts interations 
		// now try to find the missing elements in 
		// the lists that don't have the column the same with
		// elements in the first matrix
		for ($j = 0; $j < $m; $j++) {
			// try to find element with the column the same as in matrix a
			$fount = $lA->FindCol($crwB->Column());
			// we're interested in just the elements 
			// that dosen't have the same column 
			if ($found === null)
				$result->Append($crwB->Value() + 0, $crwB->Column());

			$crwB = $crwB->Next();
		}
	}

	/**
	 * echo method for debugging purpose
	 * @param $result array of SparseMatrix
	 * @param $n int
	 */
	private static function pretty_print($result, $n) {
		for ($i = 0; $i < $n; $i++) {
			$m = $result[$i]->Count();
			$crawl = $result[$i]->Tail();
			for ($j = 0; $j < $m; $j++) {
				echo "Line : " . $i;
				echo "\t\t Value : " . $crawl->Value();
				echo "\t\t Column: " . $crawl->Column();
				$crawl = $crawl->Next();
				echo "\n";
			}
		}
	}
}

?>
