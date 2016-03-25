<?php

use \InternalList\LList;

class SparseMatrix {
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
	public function __construct(LList $list) {
		$this->list = $list;
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
			self::parseEveryLine($fp);

			// free mem
			fclose($fp);
		} else 
			throw new Exception("Can't read this file ". $file);
	}
	/**
	 * @internal
	 */
	private function parseEveryLine($fp) {
		while (!feof($fp)) {
			$line = fgets($fp);
			echo $line;
		}
	}
	/**
	 * @internal
	 */
	private function getN($fp) {
		if (!feof($fp)) {
			$line = fgets($fp);
			// validate that on the first line we have int
			if (filter_var($line, FILTER_VALIDATE_INT) !== false) {
				$this->n = $line;
			}
		}
	}

}

?>
