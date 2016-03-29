<?php
include_once './InternalList/SinglyList.php';
include_once './SparseMatrix.php';

use \InternalList\SinglyList;
use \InternalList\Node;

class HomeWork4 {
	
	/**
	 * define all paths
	 */
	const	A		= '../input/homework4/a.txt';
	const 	B		= '../input/homework4/b.txt';
	const 	AxB		= '../input/homework4/aorib.txt';
	const 	AplusB	= '../input/homework4/aplusb.txt';

	public static function ex1() {
		header('Content-Type: application/json');
		// Load files and parse them
		$a = new SparseMatrix;
		$b = new SparseMatrix;
		$a->parseFile(self::A);
		$b->parseFile(self::B);
		$aplusb = new SparseMatrix;
		$aplusb->parseFile(self::AplusB);

		$res = self::plusMatrix($a->Matrix(), $b->Matrix());
		
		echo self::matrix_to_json($res, $aplusb->Count());

		}
	/**
	 * Adition method for two SparseMatrices
	 * Sparse matrix addition
	 * @param $a Node
	 * @param @b Node
	 * @return $array of object of type SparseMatrix
	 */
	private static function plusMatrix($a, $b) {
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
	// TODO
	public static function aorib($a, $b) {
		$n = count($a);
		$m = count($b);
		if ($n !== $m) {
			exit("Can't make multiply operation on this matrices");
		}

		$i = 0; 
		$j = 0;
		$result = array();

		while (($i < $n) && ($j < $m)) {
			$countA = $a[$i]->Count();
			$countB = $b[$j]->Count();

			$result[$i] = new SinglyList;
			//todo
			self::mulcrawl($a[$i], $b[$j], $result[$i]);
			$i++;
			$j++;
		}
	}
	/**
	 * Core method for crawling for every
	 * list of type Node
	 * @param $lA SinglyList
	 * @param $lB SinglyList
	 * @param result array
	 */
	private static function crawl(SinglyList $lA, SinglyList $lB, $result) {
		$n = $lA->Count();
		$m = $lB->Count();
		
		// take the tails
		$crwA = $lA->Tail();
		$crwB = $lB->Tail();
		// for every element in list A
		// $n and $m is the same number
		for ($i=0; $i < $n; $i++) {

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
		for ($j=0; $j < $m; $j++) {
			// try to find element with the column the same as in matrix a
			$fount = $lA->FindCol($crwB->Column());
			// we're interested in just the elements 
			// that dosen't have the same column 
			if ($found === null)
				$result->Append($crwB->Value() + 0, $crwB->Column());

			$crwB = $crwB->Next();
		}
	}

	private static function pretty_print($result, $n) {
		for ($i=0; $i<$n; $i++) {
			$m = $result[$i]->Count();
			$crawl = $result[$i]->Tail();
			for($j=0; $j<$m; $j++) {
				echo "Line : " . $i;
				echo "\t\t Value : " . $crawl->Value();
				echo "\t\t Column: " . $crawl->Column();
				$crawl = $crawl->Next();
				echo "\n";
			}
		}
	}

	// TODO Ionut:
	//
	private static function matrix_to_json($result, $n) {
		$arr = array();

		for ($i = 0; $i < $n; $i++) {
			$m = $result[$i]->Count();
			$crawl = $result[$i]->Tail();

			for ($j = 0; $j < $m; $j++) {
				$arr[$crawl->Column()] = $crawl->Value();
				$crawl = $crawl->Next();
			}
		}
		return json_encode($arr, JSON_PRETTY_PRINT);
	}
}

?>
