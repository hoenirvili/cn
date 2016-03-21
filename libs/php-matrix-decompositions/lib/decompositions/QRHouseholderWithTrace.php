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
 * Calculate a QR decomposition by using householder transformation.
 *
 * @author  David Stutz
 * @license http://www.gnu.org/licenses/gpl-3.0
 */
class QRHouseholderWithTrace extends QRHouseholder {
    
    /**
     * @var array   trace
     */
    protected $_trace = array();
    
    /**
     * Constructor: Get the qr decomposition of the given matrix using householder transformations.
     * The single householder matrizes are stores within the matrix.
     *
     * @param matrix  matrix to get the composition of
     */
    public function __construct(&$matrix) {
        new Assertion($matrix instanceof Matrix, 'Given matrix not of class Matrix.');

        $this->_tau = new Vector($matrix->columns());
        $this->_matrix = $matrix->copy();

        for ($j = 0; $j < $this->_matrix->columns(); $j++) {

            $norm = 0.;
            for ($i = $j; $i < $this->_matrix->rows(); $i++) {
                $norm += pow($this->_matrix->get($i, $j), 2);
            }
            $norm = sqrt($norm);

            $sign = 1.;
            if ($this->_matrix->get($j, $j) < 0) {
                $sign = -1.;
            }

            $v1 = $this->_matrix->get($j, $j) + $sign * $norm;
            $scalar = 1;

            for ($i = $j + 1; $i < $this->_matrix->rows(); $i++) {
                $this->_matrix->set($i, $j, $this->_matrix->get($i, $j) / $v1);
                $scalar += pow($this->_matrix->get($i, $j), 2);
            }

            $this->_tau->set($j, 2. / $scalar);

            $w = new Vector($this->_matrix->columns());
            $w->setAll(0.);

            // First calculate w = v_j^T * A.
            for ($i = $j; $i < $this->_matrix->columns(); $i++) {
                $w->set($i, $this->_matrix->get($j, $i));
                for ($k = $j + 1; $k < $this->_matrix->rows(); $k++) {
                    if ($i == $j) {
                        $w->set($i, $w->get($i) + $this->_matrix->get($k, $j) * $this->_matrix->get($k, $i) * $v1);
                    }
                    else {
                        $w->set($i, $w->get($i) + $this->_matrix->get($k, $j) * $this->_matrix->get($k, $i));
                    }
                }

                $this->_matrix->set($j, $i, $this->_matrix->get($j, $i) - $this->_tau->get($j) * $w->get($i));
                for ($k = $j + 1; $k < $this->_matrix->rows(); $k++) {
                    if ($i > $j) {
                        $this->_matrix->set($k, $i, $this->_matrix->get($k, $i) - $this->_tau->get($j) * $this->_matrix->get($k, $j) * $w->get($i));
                    }
                }
            }
            
            // Assemble v for trace.
            $v = new Vector($this->_matrix->rows() - $j);
            $v->set(0, 1);
            for ($i = 1; $i < $v->size(); $i++) {
                $v->set($i, $this->_matrix->get($i, $j));
            }
            
            $this->_trace[$j] = array(
                'v' => $v,
                'matrix' => $this->_matrix->copy(),
            );
        }
    }
    
    /**
     * Get the assembled trace.
     * 
     * @return  array   trace
     */
    public function getTrace() {
        return $this->_trace;
    }
}
