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
			break;
			$i++;
			$j++;

		}
		//print_r($result);
	}

	private static function crawl(SinglyList $lA, SinglyList $lB, $result) {
		$n = $lA->Count();

		// take the tails
		$crwA = $lA->Tail();
		// for every element in list A
		// $n and $m is the same number
		for ($i=0; $i < $n; $i++) {

			echo "\n".$crwA->Column();

			$found = $lB->FindCol($crwA->Column());

			if ($found !== null)
				$result->Append($crwA->Value() + $found->Value(), $crwA->Column());
			else 
				$result->Append($crwA->Value() + 0 , $crwA->Column());

			$crwA = $crwA->Next();
		}
	}


	// private static function crawl(SinglyList $lA, SinglyList $lB, $result) {
	// 	$n = $lA->Count();
	// 	$m = $lB->Count();
    //
	// 	// take the tails
	// 	$crwA = $lA->Tail();
	// 	$crwB = $lB->Tail();
    //
	// 	// we've not written anything yet
	// 	$appended = false;
	// 	// TODO:
	// 	// for every element in list A
	// 	// $n and $m is the same number
	// 	// 
	// 	for ($i=0; $i < $n; $i++) {
	// 		// for every element in lit B
	// 		for ($j = 0; $j < $m; $j++) {
	// 			// test if we have the same column
	// 			if ($crwA->Column() === $crwB->Column()) {
	// 				// write the result
	// 				$result->Append($crwA->Value() + $crwB->Value(), $crwA->Column());
	// 				// set that was written
	// 				$appended = true;
	// 			}
	// 			// go to the next node in list
	// 			$crwB = $crwB->Next();
	// 		} //for
	// 		// after the for loop if 
	// 		// the result was not found
	// 		// A->Column not equal with B->Column 
	// 		// that means that the B->Value() is 0
	// 		// note that our parsing is sequentially and
	// 		// that is why we pick A->Value()
	// 		if (!$appended) {
	// 			$result->Append($crwA->Value());
	// 			$appended = false;
	// 		} 
    //
	// 		$crwA = $crwA->Next();
	// 		// reset node in list
	// 		// start from the start again
	// 		$crwB = $lB->Tail();
	// 	} // for
	// }

}

?>
