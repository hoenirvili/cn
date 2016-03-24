<?php

namespace InternalList;

// List or sequence abstract data type
interface LList {
	// operation for testing if the list is empty
	public function isEmpty();
	// operation for appending an entity to a list
	public function append($value = 0, $column = 0);
	// operation for determining the first component of a list
	public function head();
	// operating for determining the last component of a list
	public function tail();
}
