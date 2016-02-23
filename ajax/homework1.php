<?php


if(isset($_POST['action']))
{
    if($_POST['action']=='ex1')
    {
        $u = 1;
        $lowest=$u;
        $step=0;

        while(1+$u !== 1.0) {
            $u = $u/10;
            $step++;
            $lowest = $u;
        }
        echo json_encode(array('step'=>$step,'lowest'=>$lowest,'u'=>$u));
        exit();
    }

    if($_POST['action']=='ex2')
    {
        $a = 1.0;
		$u = 1;
        $step = 0;
		while(1 + $u !== 1.0) {
            $step++;
            $u = $u/10;
            $b = $u;
            $c = $u;
            $leftOperand = ($a+$b)+$c;
            $rightOperand =$a+($b+$c);
            if ($leftOperand !== $rightOperand) {
                break;
            }
            if ($step > 20) {
                break;
            }
        }
        echo json_encode(array('step'=>$step,'lowest'=>$lowest,'u'=>$u,'a'=>$a,'b'=>$b,'c'=>$c,'leftOperand'=>$leftOperand,'rightOperand'=>$rightOperand));
        exit();
    }
}
