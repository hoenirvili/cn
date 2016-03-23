<?php

// List or sequence abstract data type
interface List {
	// operation for testing if the list is empty
	public function empty();
	// operation for appending an entity to a list
	public function append();
	// operation for determining the first component of a list
	public function head();
}

class Node {
	// The content of a specific node
	protected $value;

	// The next node in our SinglyList
	protected Node $next;
}


/**
 * SinglyList datatype
 * implements List interface
 */
class SinglyList implements List{

	protected Node $node;

	// plain old constructor
	public function __construct($n = 1) {

	}

	public function empty() {

	}

	public function head() {

	}

	public function append() {

	}
}



?>
