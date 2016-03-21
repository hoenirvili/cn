<?php
/**
 *  Copyright 2013 - 2014 David Stutz
 *
 *  The library is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  @see <http://www.gnu.org/licenses/>.
 */

/**
 * Calculate a cholesky decomposition.
 *
 * @author  David Stutz
 * @license http://www.gnu.org/licenses/gpl-3.0
 */
class Cholesky {
    
    const TOLERANCE = 0.00001;
    
    /**
     * @var matrix
     */
    protected $_matrix;
    
    /**
     * Constructor: Generate cholesky deocmposition of given matrix.
     * 
     * @param   matrix
     */
    public function __construct(&$matrix) {
        new Assertion($matrix instanceof Matrix, 'Given matrix not of class Matrix.');
        new Assertion($matrix->isSquare(), 'Given matrix is not square.');

        $this->_matrix = $matrix->copy();

        for ($j = 0; $j < $this->_matrix->columns(); $j++) {
            $d = $this->_matrix->get($j, $j);
            for ($k = 0; $k < $j; $k++) {
                $d -= pow($this->_matrix->get($j, $k), 2) * $this->_matrix->get($k, $k);
            }

            // Test if symmetric and positive definite can be guaranteed.
            new Assertion($d > Cholesky::TOLERANCE * (double)$this->_matrix->get($j, $j), 'Symmetric and positive definite can not be guaranteed: ' . $d . ' > ' . Cholesky::TOLERANCE * (double)$this->_matrix->get($j, $j));

            $this->_matrix->set($j, $j, $d);

            for ($i = $j + 1; $i < $this->_matrix->rows(); $i++) {
                $this->_matrix->set($i, $j, $this->_matrix->get($i, $j));
                for ($k = 0; $k < $j; $k++) {
                    $this->_matrix->set($i, $j, $this->_matrix->get($i, $j) - $this->_matrix->get($i, $k) * $this->_matrix->get($k, $k) * $this->_matrix->get($j, $k));
                }
                $this->_matrix->set($i, $j, $this->_matrix->get($i, $j) / ((double)$this->_matrix->get($j, $j)));
            }
        }
    }
    
    /**
     * Get the L of the composition L^T*D*L.
     * 
     * @return  matrix  L
     */
    public function getL() {
        $L = $this->_matrix->copy();
        
        // L is the lower triangular matrix.
        for ($i = 0; $i < $L->rows(); $i++) {
            for ($j = $i; $j < $L->columns(); $j++) {
                if ($j == $i) {
                    $L->set($i, $j, 1);
                }
                else {
                    $L->set($i, $j, 0);
                }
            }
        }
        
        return $L;
    }
    
    /**
     * Get D - the diagonal matrix.
     * 
     * @return  matrix  D
     */
    public function getD() {
        $D = new Matrix($this->_matrix->rows(), $this->_matrix->columns());
        
        for ($i = 0; $i < $D->rows(); $i++) {
            $D->set($i, $i, $this->_matrix->get($i, $i));
        }
        
        return $D;
    }
}
