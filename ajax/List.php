<?php

// List or sequence abstract data type
interface LList {
	// operation for testing if the list is empty
	public function empty();
	// operation for appending an entity to a list
	public function append($value = 0, $column = 0);
	// operation for determining the first component of a list
	public function head();
	// operating for determining the last component of a list
	public function tail();
}


class Node {
	/**
	* the content of the node
	* @var int | null
	*/
	private $value = null;
	/**
	* the coordinate that the value is
	* @var int | null
	*/
	private $column = null;
	/**
	* the next pointer in our list of nodes
	* @var Node | null
	*/
	private $next = null;
	/**
	 * Constructor for every node
	 * default:
	 * @param $value int = 0;
	 * @param $column int = 0;
	 * @param $next pointer to next Node
	 */
	public function __construct($value = 0, $column = 0, $next = null) {
		$this->value 	= $value;
		$this->column 	= $column;
		$this->next 	= $next;
	}
	/**
	* return the value of a specific node
	* @return int
	*/
	public function Value() {
		return $this->value;
	}
	/**
	* returns the column of a specific node
	* @return int
	*/
	public function Column() {
		return $this->column;
	}
	/**
	* return the next node in our list
	* @return Node object
	*/
	public function Next() {
		return $this->next;
	}
	/**
	* sets the value of a specific node
	* @param int $value => default to 0
	*/
	public function SetValue($value = 0) {
		$this->value = $value;
	}
	/**
	* sets the next node
	* @param Node $next => default to null
	*/
	public function SetNext(Node $next = null) {
		$this->next = &$next;
	}
	/**
	* sets the column of a specific node
	* @param int $column => default to 0
	*/
	public function SetColumn($column = 0) {
		$this->column = $column;
	}

}


/**
 * SinglyList datatype
 * implements LList interface
 */
class SinglyList implements LList{
	/**
	* the number of nodes in the singly list
	* @var int
	*/
	private $count = 0;
	/**
	* first entry on the SinglyList
	* @var Node | null
	*/
	private $tail = null;
	/**
	* last entry on the singly list
	* @var Node | null
	*/
	private $head = null;
	/**
	* constructor for our internal implementation
	* of nodes.
	* @param int $count
	*/
	public function __construct($count = 1) {
		// number of nodes that our LinklyList will store
		$this->count = $count;
		// create first entry on our list;
		$this->$node = new Node($i, 1, null);
		$tail = $node;

		// traverse all nodes creating one by one
		for ($i = 1; $i < $this->count; $i++) {
			// new node
			$node->SetNext(new Node()); // 0 , 0, null default
			// move to the next one
			$node = $node->Next();
		}

		// save the current, last inserted node.
		$head = $node;
	}

	/**
	* returns true if the SInglyList is empty
	* or false if it contains nodes
	* @return bool
	*/
	public function Empty() {
		return ($count===0);
	}
	/**
	* returns the newest entry node in the singly list
	* @return Node
	*/
	public function Head() {
		return $this->head;
	}
	/**
	* return the last entry node in the singly list
	* @return Node
	*/
	public function Tail() {
		return $this->tail;
	}
	/**
	* inserts a new node in to the singly list
	* making a new head.
	* @param int $value
	* @param int $column
	*/
	public function Append($value = 0, $column = 0) {
		// make a new node assigning to the newest node
		$this->head->SetNext(new Node($value, $column, null));
		$this->head = $this->head->Next();
	}
}


?>
