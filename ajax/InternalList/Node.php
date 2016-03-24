<?php

namespace InternalList;

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
	 * @param $next Node pointer to next Node
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
