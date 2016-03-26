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
		self::plusMatrix($a->Matrix(), $b->Matrix());		


		echo json_encode(array(
				"some_param" => "do this"
		));
	}

	private static function plusMatrix($a,$b) {
		$n = count($a);
		$m = count($b);
		if ($n !== $m) {
			exit("Can't make plus operation on this matrices");
		}
		$i = 0;
		$j = 0;
		while (($i < $n) && ($j < $m)) {
			// get count for every list
			// in this way we know how much to crawl
			$countA = $a[$i]->Count();
			$countB = $b[$j]->Count();
			self::crawl($a[$i], $b[$j]);

			$i++;
			$j++;
			break;
		}
	}

	private static function crawl(SinglyList $lA, SinglyList $lB) {
		$n = $lA->Count();
		$m = $lB->Count();
		
		if ($n === $m)
			exit("List A is not the same as List B");
		// take the tails
		$crwA = $lA->Tail();
		$crwB = $lB->Tail();

		// we've not written anything yet
		$appended = false;

		$result = array();
		// TODO:
		// for every element in list A
		// 
		// $n and $m is the same number
		for ($i=0; $i < $n; $i++) {
			// create just once per $i
			// new object
			$result[$i] = new SinglyList;
			// for every element in lit B
			for ($j = 0; $j < $m; $j++) {
				// test if we have the same column
				if ($crwA->Column() === $crwB->Column()) {
					// write the result
					$result[$i]->Append($crwA->Value() + $crwB->Value(), $j);
					// set that was written
					$appended = true;
				}
			}
			// after the for loop if 
			// the result was not found
			// A->Column not equal with B->Column 
			// that means that the B->Value() is 0
			// note that our parsing is sequentially and
			// that is why we pick A->Value()
			if (!$appended) {
				$result[$i]->Append($crwA->Value());
				$appended = false;
			} 
		} // for


		print_r($result);
	}



}
?>
