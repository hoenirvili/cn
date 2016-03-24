<?php

namespace Sparse;

class SparseMatrix {

	protected $list;

	public function __construct(LList $list) {
		$this->list = $list;
	}

}

?>
