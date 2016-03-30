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

		//$res_aplusb = self::plusMatrix($a->Matrix(), $b->Matrix());
		$res_aorib = self::multiplyMatrix($a->Matrix(), $b->Matrix());
		
		//TODO: response json
		echo json_encode(
			array(
				"aplusb" => "do this"
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
		$n = count($a);
		$m = count($b);
		$i = 0;
		$j = 0;

		//TODO call $crwb->Column == null
		// for every line in matrix $A
		for( $i = 0; $i < $n; $i++) {
			$crwA = $a[$i]->Tail();
			$result[$i] = new SinglyList;
			// for every line in matrix $B
			while ($j < $m) {
				$crwB = $b[$j]->Tail();
				// foe every element in list from matrix $B
				while ($crwB !== null) {
		
					if ($i === $crwB->Column()) {
						// multiply
						$holder += $crwA->Value() * $crwB->Value();
						break;
					}
					
					$crwB = $crwB->Next();
				} // while	

				$result[$i]->Append($holder, $crwB->Column());
				$crwA = $crwA->Next();
				$j++;
			} // while
			break;
		}	//for

		return $result;
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
