<?php

namespace InternalList;

require_once 'LList.php';
require_once 'Node.php';

use Exception;

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
	* abstract constructor for our internal implementation  of nodes.
	*/
	public function __construct() {}
	/**
	* init for our internal implementation
	* of nodes.
	* @param int $count
	* @throws Exception "Can't make new Linked list if it's set to 0
	*/
	public function Init($count) {
		if ($count === 0)
			throw new Exception("Can't make a new LinkedList of 0 elements");
		// number of nodes that our LinklyList will store
		$this->count = $count;
		// create first entry on our list;
		$node = new Node();
		$this->tail = $node;

		// traverse all nodes creating one by one
		for ($i = 1; $i < $this->count; $i++) {
			// new node
			$node->SetNext(new Node()); // 0 , 0, null default
			// move to the next one
			$node = $node->Next();
		}

		// save the current, last inserted node.
		$this->head = $node;
	}
	/**
	* returns true if the SInglyList is empty
	* or false if it contains nodes
	* @return bool
	*/
	public function isEmpty() {
		return ($this->count === 0);
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
	 * return the length of the singly list
	 * @return int $count
	 */
	public function Count() {
		return $this->count;
	}
	/**
	* inserts a new node in to the singly list
	* making a new head.
	* @param int $value
	* @param int $column
	*/
	public function Append($value = 0, $column = 0) {
		// if the list is empty
		if ($this->isEmpty()) {
			$this->tail = new Node($value, $column, null);
			$this->head = $this->tail;
			$this->count++;
		} else {
			// make a new node assigning to the newest node
			$this->head->SetNext(new Node($value, $column, null));
			$this->head = $this->head->Next();
			$this->count++;
		}
	}
	/**
	* search the value, if we found the value return the node
	* if the value dosen't exist, just return null
	* @param int $value
	* @return Node | null
	*/
	public function Find($value) {
		$crawler = $this->tail->Next();

		if ($this->tail->Value() === $value)
			return $this->tail;

		if ($this->head->Value() === $value)
			return $this->head;

		for ($i = 1; $i < $this->count - 1; $i++) {
			if ($crawler->Value() === $value)
				return $crawler;
			$crawler = $crawler->Next();
		}

		return null;
	}

	/**
	* search the column, if we found the column return the node
	* if the column dosen't exist, just return null
	* @param int $col
	* @return Node | null
	*/
	public function FindCol($col) {
		$crawler = $this->tail->Next();

		if ($this->tail->Column() === $col) {
			return $this->tail;
		}

		if ($this->head->Column() === $col) {
			return $this->head;
		}

		for ($i = 0; $i < $this->count - 1; $i++) {
			if ($crawler->Column() === $col)
				return $crawler;
			$crawler = $crawler->Next();
		}
		return null;
	}
}


?>
