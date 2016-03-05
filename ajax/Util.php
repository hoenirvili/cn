<?php 
class Util {

	protected static function getArrayFromString($string)
	{
		return json_decode($string);
	}

	protected static function getStringFromArray($array)
	{
		if (!is_array($array))
			return "Nu s-a putut parsa.";
		return json_encode($array);
	}

	protected static function getMatrixFromString($string)
	{
		$result = array();
		$strings = explode(']', $string);
		if (is_array($strings))
		foreach ($strings as $str) {
			if($str)
			$result[] = self::getArrayFromString($str . ']');
		}
		return $result;
	}

	protected static function getStringFromMatrix($matrix)
	{
		if (!is_array($matrix)||empty($matrix)) {
			return "Nu s-a putut parsa.";
		}
		foreach ($matrix as $key => $vector) {
			$str=self::getStringFromArray($vector);
			if($str)
			$matrix[$key] = $str;
		}
		$string = implode('<br/>', $matrix);
		return $string;
    }

	protected static function randMatrix($maxn=10,$maxVn=10,$maxNum=10)
	{
		$n=rand(1,$maxn);
		$m=rand(1,$maxVn);
		$result=array();
		for($i=0;$i<$n;$i++)
		{
			$result[]=self::randVectorFixedSize($m);
		}
		return $result;
	}

	protected static function randVectorFixedSize($n,$maxNum=10)
	{
		$result=array();
		for($i=0;$i<$n;$i++)
		{
			$result[]=rand(0,$maxNum);
		}
		return $result;
	}

	protected static function randVector($maxn=10,$maxNum=10)
	{
		$n=rand(1,$maxn);
		$result=array();
		for($i=0;$i<$n;$i++)
		{
			$result[]=rand(0,$maxNum);
		}
		return $result;
	}
}

?>
