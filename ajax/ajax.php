<?php

include_once('HomeWork1.php');
if(isset($_POST['action']))
{
    if(isset($_POST['homework']))
    {
        switch($_POST['homework']) {
            case 1 :
                    switch($_POST['action'])
                    {
                        case 'ex1' :
                            HomeWork1::ex1();
                            break;
                        case 'ex2' :
                            HomeWork1::ex2();
                            break;
                        case 'ex3' :
                            HomeWork1::ex3();
                            break;
                        case 'ex4' :
                            HomeWork1::ex4();
                            break;
                    }
                break;
        }

    }


}