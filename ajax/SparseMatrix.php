<?php
require_once 'InternalList/SinglyList.php';

use InternalList\SinglyList;

class SparseMatrix extends SplFixedArray{
	/**
	 * Basic type list that implements the LList interface
	 * @var LList
	 */
	private $list;
	/**
	 * Length
	 * @var int
	 */
	private $n;
	/**
	 * Use a special list
	 * @param LList
	 */
	private $vector;
	/**
	 * SparseMatrix
	 *
	 * @param array of LList
	 */
	private $matrix;
	/**
	 * constructor
	 */
	public function __construct() {}
	
	/**
	 * Get private vector
	 */
	public function Vector() {
		return $this->vector;
	}
	/**
	 * Get Matrix
	 */
	public function Matrix() {
		return $this->vector;
	}
	/**
	 * Parse all the file
	 * reading into the list
	 * @param string $file
	 * @throwble Exception
	 */
	public function parseFile($file) {
		// test if the file exists first and can be open
		if( file_exists($file) && is_readable ($file)) {
			// alloc fp
			$fp = fopen($file, "r");
			// n will always be placed in the first line
			// parse one line
			self::getN($fp);
			// parse the rest of the file
			self::vectorParse($fp);
			// sparse matrix
			self::sparseParse($fp);
			// free mem
			fclose($fp);
		} else 
			throw new Exception("Can't read this file ". $file);
		var_dump($this->matrix);
		// var_dump($this->vector);
	}
	/**
	 * @internal
	 */
	private function vectorParse($fp) {
		$i = 0;

		while (!feof($fp)) {

			if ($i === $this->n) 
				break;

			$line = fgets($fp);
			
			if ( filter_var($line, FILTER_VALIDATE_FLOAT, FILTER_NULL_ON_FAILURE) !== null) {
				 $this->vector[$i] = (float)$line;
				 $i ++;
			}
		}
	}
	/**
	 * @internal
	 */
	private function sparseParse($fp) {
		$this->matrix = array();
		$arr;

		while (!feof($fp)) {
			$line = fgets($fp);
			$line = trim($line);
			if (!$line) continue;

			$arr = explode(',', $line);
			if (
				(filter_var($arr[0], FILTER_VALIDATE_FLOAT, FILTER_NULL_ON_FAILURE)	!== null) &&
				(filter_var($arr[2], FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE)	!== null))
				
				$this->matrix[(int)$arr[1]] = new SinglyList;
				$this->matrix[(int)$arr[1]]->Append((float)$arr[0], (int)$arr[2]);
		}
	}

	/**
	 * @internal
	 */
	private function getN($fp) {
		if (!feof($fp)) {
			$line = fgets($fp);
			// validate that on the first line we have int
			if (filter_var($line, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE) !== null)
			{
				$this->n = (int)$line;
			}
		}
		// amke array fixed size
		$this->vector = new SplFixedArray($this->n);
	}

}
?>
