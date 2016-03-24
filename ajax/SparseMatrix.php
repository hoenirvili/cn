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
		//TODO
		if( file_exists($file) && is_readable ($file)) {
			// alloc fp
			$fp = fopen($file, "r");

			while (!feof($fp)) {
				$line = fgets($fp);
				echo $line;
			}

			// free mem
			fclose($fp);
		} else throw new Exception("Can't read this file ". $file);
	}
}

?>
